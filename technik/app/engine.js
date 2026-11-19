// Nowhere – engine. The game state is derived from an append-only log; nothing else is stored.
// Card format: nowhere/technik/technik.md "Card format – draft 1". Scope: konzept.md "Prototype 1".
// Classic script, shared global namespace; load order in index.html. Owner: role Spiel, instance Spiel_2.

const MONTHS = 12;
const DRAWS_PER_MONTH = 5;
const MAX_ASSOCIATES = 3;
const MAX_TRAITS = 3;  // P4: a fourth trait pushes the oldest out
const KIND_WEIGHTS = { event: 6, person: 2, possession: 1 };
// trait pairs – the words of nowhere/karten/README.md (one source; post/spiel/009)
const OPPOSITES = [['brave', 'craven'], ['honest', 'cunning'], ['gregarious', 'shy'], ['ambitious', 'content'],
  ['generous', 'greedy'], ['patient', 'impatient'], ['trusting', 'suspicious'], ['just', 'arbitrary'],
  ['faithful', 'cynical'], ['calm', 'wrathful'], ['compassionate', 'cruel'], ['curious', 'indifferent'],
  ['loyal', 'opportunistic'], ['innovator', 'preserver'], ['globalist', 'patriot']];
const OPP = {};
OPPOSITES.forEach(([a, b]) => { OPP[a] = b; OPP[b] = a; });

// ---------- cards ----------
const CARDS = { byId: {}, all: [], testData: false };
function cardsLoad(data) {
  CARDS.all = data.cards; CARDS.testData = !!data.test_data; CARDS.byId = {}; CARDS.version = data.version || ''; CARDS.built = data.built || ''; CARDS.authorBrief = data.author_brief || '';
  Object.keys(FOLLOW).forEach((k) => { delete FOLLOW[k]; });
  data.cards.forEach((c) => { CARDS.byId[c.id] = c; });
}
function cardOf(id) { return CARDS.byId[id]; }

// ---------- log and state ----------
// Log entries: {t:'start', character, game, at} · {t:'draw', card, n, month} · {t:'choose', card, option}
// · {t:'take', card, as} · {t:'pass', card} · {t:'kind', kind} · {t:'end-month', month}
function newState() {
  return { game: null, character: null, month: 0, draws: 0, kindChosen: false, pendingKind: null,
    money: 0, influence: 0, status: 0, block: null, blockTraits: [], blockValues: {},
    skills: [], traits: [], acquired: [], associates: [], contacts: [], possessions: [],
    flags: {}, stacks: {}, followups: [], drawn: {}, returning: [], current: null, n: 0, ended: false,
    history: [] };
}
function has(list, x) { return list.indexOf(x) >= 0; }
function addUnique(list, x) { if (!has(list, x)) list.push(x); }
function remove(list, x) { const i = list.indexOf(x); if (i >= 0) list.splice(i, 1); }

function reduce(log) {
  const s = newState();
  log.forEach((e) => apply(s, e));
  return s;
}
function apply(s, e) {
  switch (e.t) {
    case 'start': {
      const c = cardOf(e.character); if (!c) return;
      s.game = e.game; s.character = c.id; s.month = 1; s.draws = DRAWS_PER_MONTH;
      s.money = c.money; s.influence = c.influence; s.status = c.status; s.block = c.block;
      s.blockTraits = c.block_traits.slice(); s.blockValues = Object.assign({}, c.block_values);
      s.skills = c.skills.slice(); s.traits = c.traits.slice(); s.acquired = (c.acquired || []).slice();
      s.associates = c.associates.map((id) => ({ id })); s.contacts = c.contacts.slice();
      s.stacks = { 'the-last-boom': true, personal: true };
      break;
    }
    case 'kind': s.kindChosen = true; s.pendingKind = e.kind; s.draws -= 1; break;
    case 'draw': {
      s.n = e.n; s.draws -= 1; s.pendingKind = null; s.drawn[e.card] = true;
      s.followups = s.followups.filter((f) => f.card !== e.card);
      s.current = { card: e.card, n: e.n, instance: s.game + '-' + String(e.n).padStart(3, '0') };
      break;
    }
    case 'choose': {
      const c = cardOf(e.card); const o = c && c.options && c.options[e.option]; if (!o) return;
      s.money -= o.cost.money || 0; s.influence -= o.cost.influence || 0; s.draws -= extraDraws(o.cost);
      o.effects.forEach((ef) => effect(s, ef));
      s.history.push({ month: s.month, card: e.card, text: o.text });
      s.current = null;
      break;
    }
    case 'take': {
      const c = cardOf(e.card); if (!c) return;
      if (e.as === 'contact') { s.influence -= 1; addUnique(s.contacts, c.id); }
      if (e.as === 'possession') { s.money -= 2; addUnique(s.possessions, c.id); }
      s.history.push({ month: s.month, card: e.card, text: e.as === 'contact' ? 'Kept in touch.' : 'Acquired.' });
      s.current = null;
      break;
    }
    case 'pass': s.history.push({ month: s.month, card: e.card, text: 'Let go.' }); s.current = null; break;
    case 'end-month': {
      s.month += 1; s.draws = DRAWS_PER_MONTH; s.kindChosen = false; s.pendingKind = null;
      s.returning = s.returning.filter((r) => {
        if (r.month > s.month) return true;
        remove(s.contacts, r.id); if (s.associates.length < MAX_ASSOCIATES) s.associates.push({ id: r.id }); return false;
      });
      if (s.month > MONTHS) s.ended = true;
      break;
    }
    default:
  }
}
function effect(s, ef) {
  const p = ef.split(':'); const n = parseInt(p[2], 10);  // third part, where the form has one
  switch (p[0]) {
    case 'money': s.money = Math.max(0, s.money + parseInt(p[1], 10)); break;  // P5: effects never push below 0
    case 'influence': s.influence = Math.max(0, s.influence + parseInt(p[1], 10)); break;
    case 'status': if (p[1] === s.block) s.status += n; break;
    case 'block': if (p[1] in s.blockValues) s.blockValues[p[1]] = Math.max(1, Math.min(10, s.blockValues[p[1]] + n)); break;
    case 'trait': {
      const name = p[1].slice(1);
      if (p[1][0] === '+') { if (OPP[name]) remove(s.traits, OPP[name]); addUnique(s.traits, name); while (s.traits.length > MAX_TRAITS) s.traits.shift(); } else remove(s.traits, name);
      break;
    }
    case 'acquired': addUnique(s.acquired, p[1].slice(1)); break;
    case 'associate-to-contact': {
      const i = s.associates.findIndex((a) => a.id === p[1]);
      if (i >= 0) { s.associates.splice(i, 1); addUnique(s.contacts, p[1]); s.returning.push({ id: p[1], month: s.month + n }); }
      break;
    }
    case 'gain': {
      const c = cardOf(p[1]); if (!c) break;
      if (c.kind === 'person') { if (!isKnown(s, c.id)) addUnique(s.contacts, c.id); }
      else if (c.kind === 'possession') addUnique(s.possessions, c.id);
      break;
    }
    case 'lose': {
      remove(s.possessions, p[1]); remove(s.contacts, p[1]);
      const i = s.associates.findIndex((a) => a.id === p[1]); if (i >= 0) s.associates.splice(i, 1);
      break;
    }
    case 'open': s.stacks[p[1]] = true; break;
    case 'close': s.stacks[p[1]] = false; break;
    case 'flag': s.flags[p[1]] = true; break;
    case 'follow': s.followups.push({ card: p[1], from: s.month + 1, by: s.month + n }); break;
    default:
  }
}
function isKnown(s, id) { return has(s.contacts, id) || s.associates.some((a) => a.id === id); }

// ---------- conditions ----------
function skillsOf(s) {
  const out = s.skills.slice();
  s.possessions.forEach((id) => { const c = cardOf(id); (c && c.gives || []).forEach((g) => { if (g.startsWith('skill:')) addUnique(out, g.slice(6)); }); });
  return out;
}
function holds(s, cond) {
  if (cond === 'always') return true;
  const p = cond.split(':'); const ch = cardOf(s.character);
  switch (p[0]) {
    case 'skill': return has(skillsOf(s), p[1]);
    case 'profession': return ch.profession === p[1];
    case 'trait': return has(s.traits, p[1]);
    case 'block': return s.block === p[1];
    case 'associate': return s.associates.some((a) => { const c = cardOf(a.id); return c && c.profession === p[1]; });
    case 'possession': return s.possessions.some((id) => { const c = cardOf(id); return c && c.type === p[1]; });
    case 'status': return s.block === p[1] && s.status >= parseInt(p[2], 10);
    case 'flag': return !!s.flags[p[1]];
    case 'contact': return s.contacts.some((id) => { const c = cardOf(id); return c && c.profession === p[1]; });  // P3
    case 'month': return s.month >= parseInt(p[1], 10);   // P1: from month n
    case 'until': return s.month <= parseInt(p[1], 10);   // P1: through month n
    default: return false;
  }
}
// cost.draws = draws the card costs in total, the draw itself included (default 1); only the extra is taken on choosing
function extraDraws(cost) { return Math.max(0, (cost.draws || 1) - 1); }
function affordable(s, cost) {
  return (!cost.money || s.money >= cost.money) && (!cost.influence || s.influence >= cost.influence) && s.draws >= extraDraws(cost);
}
// Options of the current event card as shown: visible ones with origin, cost, and whether they can be chosen
function optionsFor(s, card) {
  return card.options.map((o, i) => ({ i, text: o.text, text_de: o.text_de, visible: holds(s, o.origin), origin: o.origin,
    cost: o.cost, ok: affordable(s, o.cost) })).filter((o) => o.visible);
}
// true when the player would see nothing but the "wait" option(s) – such a card is kept back while others exist (T4)
function waitOnly(s, card) {
  return card.kind === 'event' && !card.options.some((o) => o.origin !== 'always' && holds(s, o.origin));
}

// ---------- drawing ----------
function drawable(s, c) {
  if (c.kind === 'character') return false;
  if (!s.stacks[c.stack]) return false;
  if (s.drawn[c.id]) return false;
  if (c.kind === 'person' && isKnown(s, c.id)) return false;
  if (c.kind === 'possession' && has(s.possessions, c.id)) return false;
  if (c.kind === 'event' && c.reach && c.reach.startsWith('block:') && c.reach.slice(6) !== s.block) return false;
  if ((c.requires || []).some((r) => !holds(s, r))) return false;
  // follow-ups come only when scheduled; other events whenever
  const f = s.followups.find((x) => x.card === c.id);
  if (f) return s.month >= f.from;
  if (c.beat) return true;  // a beat comes in its month even if some option also schedules it (post/spiel/015)
  return !isFollowUp(c.id);
}
// A card that some option schedules with follow:<id>:<n> is drawn only when scheduled
const FOLLOW = {};
function isFollowUp(id) {
  if (!(id in FOLLOW)) FOLLOW[id] = CARDS.all.some((o) => (o.options || []).some((op) => op.effects.some((e) => e.startsWith('follow:' + id + ':'))));
  return FOLLOW[id];
}
function pick(list, rnd) { return list[Math.floor(rnd() * list.length)]; }
// Returns the id of the next card, or null. rnd: Math.random or a seeded function.
function nextCard(s, kind, rnd) {
  rnd = rnd || Math.random;
  // P1: a beat card is the first draw of its month, whatever the kind asked for
  const beat = CARDS.all.find((c) => c.beat === s.month && drawable(s, c));
  if (beat) return beat.id;
  const due = s.followups.filter((f) => f.by <= s.month).map((f) => cardOf(f.card)).filter((c) => c && drawable(s, c));
  if (due.length && (!kind || kind === 'event')) return pick(due, rnd).id;
  let pool = CARDS.all.filter((c) => drawable(s, c));
  const lively = pool.filter((c) => !waitOnly(s, c));
  if (lively.length) pool = lively;
  const kinds = kind ? [kind] : Object.keys(KIND_WEIGHTS);
  const byKind = {}; kinds.forEach((k) => { byKind[k] = pool.filter((c) => c.kind === k); });
  const available = kinds.filter((k) => byKind[k].length);
  if (!available.length) return null;
  let total = 0; available.forEach((k) => { total += KIND_WEIGHTS[k]; });
  let r = rnd() * total; let chosen = available[0];
  for (const k of available) { r -= KIND_WEIGHTS[k]; if (r <= 0) { chosen = k; break; } }
  return pick(byKind[chosen], rnd).id;
}

// ---------- opinion (concept: Personen → Opinion, first values) ----------
function opinion(a, b) {  // a's opinion of b, both card heads
  let v = 0;
  a.traits.forEach((t) => { if (has(b.traits, t)) v += t === 'suspicious' ? -10 : 10; });
  a.traits.forEach((t) => { if (OPP[t] && has(b.traits, OPP[t])) v += (t === 'faithful') ? -30 : (t === 'cynical') ? -15 : -10; });
  (b.acquired || []).forEach((x) => { v += { murderer: -30, olympian: 15, famous: 10, infamous: -10, indebted: -5 }[x] || 0; });
  if (a.profession === b.profession) v += a.profession === 'spy' ? -10 : 5;
  return v;
}
function opinionWord(v) { return v >= 20 ? 'likes' : v <= -50 ? 'despises' : v <= -20 ? 'distrusts' : 'neutral'; }  // keys, see i18n
function opinionOf(s, personId) {  // the person's opinion of the player's character
  const ch = Object.assign({}, cardOf(s.character), { traits: s.traits, acquired: s.acquired });
  return opinion(cardOf(personId), ch);
}

// ---------- storage ----------
const STORE_KEY = 'nowhere.game';
const GAME = { log: [], state: newState() };
function gameLoad() {
  try { const raw = localStorage.getItem(STORE_KEY); if (raw) { const d = JSON.parse(raw); if (Array.isArray(d.log)) GAME.log = d.log; } }
  catch (e) { /* no storage – the game lives in memory */ }
  GAME.state = reduce(GAME.log);
}
function gameSave() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify({ log: GAME.log, saved: new Date().toISOString() })); } catch (e) { /* ignore */ }
  playTally(1, GAME.log, GAME.state && GAME.state.ended, GAME.state && GAME.state.month);
}
// tally of the games on this device, read by the overview page (Betreiber 07.11., 19:07: "Anzahl der gespielten Runden").
// One line per game: prototype, character, where it stands, ended. Nothing leaves the device.
const TALLY_KEY = 'nowhere.plays';
function playTally(proto, log, ended, step) {
  const st = log && log.find((e) => e.t === 'start'); if (!st || !st.game) return;
  try {
    const all = JSON.parse(localStorage.getItem(TALLY_KEY) || '{}');
    const c = typeof cardOf === 'function' ? cardOf(st.character) : null;
    const prev = all[st.game] || {};
    all[st.game] = { p: proto, who: c ? (c.name || c.title || st.character) : st.character, start: prev.start || st.at || new Date().toISOString(),
      at: new Date().toISOString(), step: step || 0, ended: !!ended, years: Math.max(prev.years || 1, (typeof G2 !== 'undefined' && G2.state && G2.state.year) || 1) };
    const keys = Object.keys(all); if (keys.length > 300) keys.sort((x, y) => (all[x].at < all[y].at ? -1 : 1)).slice(0, keys.length - 300).forEach((k) => { delete all[k]; });
    localStorage.setItem(TALLY_KEY, JSON.stringify(all));
  } catch (e) { /* no storage – no tally */ }
}
function gameAppend(entry) {
  entry.at = new Date().toISOString();
  GAME.log.push(entry); apply(GAME.state, entry); gameSave();
}
function gameReset() { GAME.log = []; GAME.state = newState(); gameSave(); }
function gameExport() { return JSON.stringify({ game: GAME.state.game, cards: CARDS.testData ? 'karten-test' : 'karten', log: GAME.log }, null, 1); }
function gameImport(text) {
  const d = JSON.parse(text);
  if (!d || !Array.isArray(d.log)) throw new Error('not a Nowhere log');
  GAME.log = d.log; GAME.state = reduce(d.log); gameSave();
}

// ---------- actions (each appends to the log) ----------
function actStart(characterId) {
  const game = 'g' + Date.now().toString(36);
  gameAppend({ t: 'start', character: characterId, game, cards: CARDS.version || '' });
}
function actChooseKind(kind) {
  const s = GAME.state; if (s.kindChosen || s.draws < 2 || s.current) return false;
  gameAppend({ t: 'kind', kind }); return true;
}
function actDraw() {
  const s = GAME.state; if (s.current || s.draws < 1 || s.ended) return null;
  const id = nextCard(s, s.pendingKind, Math.random); if (!id) return null;
  gameAppend({ t: 'draw', card: id, n: s.n + 1, month: s.month }); return id;
}
function actChoose(i) {
  const s = GAME.state; if (!s.current) return false;
  const c = cardOf(s.current.card); const o = c.options[i];
  if (!o || !holds(s, o.origin) || !affordable(s, o.cost)) return false;
  gameAppend({ t: 'choose', card: c.id, option: i }); return true;
}
function actTake(as) {
  const s = GAME.state; if (!s.current) return false;
  if (as === 'contact' && s.influence < 1) return false;
  if (as === 'possession' && s.money < 2) return false;
  gameAppend({ t: 'take', card: s.current.card, as }); return true;
}
function actPass() { const s = GAME.state; if (!s.current) return false; gameAppend({ t: 'pass', card: s.current.card }); return true; }
function actEndMonth() { const s = GAME.state; if (s.current || s.ended) return false; gameAppend({ t: 'end-month', month: s.month }); return true; }
