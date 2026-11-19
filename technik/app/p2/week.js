// Nowhere – Prototype 2 engine: the time flow (nowhere/konzept-zeitfluss.md, "Prototype 2"; post/spiel/017, 018).
// Weeks instead of months with five draws; every person has a draft resource; cards have a place, who may do them,
// how long they take; the player chooses from an open board; an author puts cards on it each week.
// Reuses the card logic of ../engine.js (conditions, effects, opinion). The game is an append-only log; the state is
// always computed from it, nothing else is stored. Classic script, loaded after ../engine.js. Owner: Spiel_2.

const WEEKS = 52;
const RES_CAP = 3;          // draft resource per person, at most
const RES_SELF = 2;         // the player gains two a week, each associate one (post/spiel/022)
const RECRUIT_COST = 2;     // influence to take a contact into the team; the person joins a week later
const FRESH_WEEKS = 3;      // the author's "fewer than 8 open" counts only story cards younger than this
const BOARD_MAX = 8;        // the author adds story cards only while fewer are open
const STORY_PER_WEEK = 2;   // story cards per week (rules author)
const EXPIRES_STORY = 6;    // default weeks on the board, when a card says nothing
const EXPIRES_PERSONAL = 4;

function monthOf(week) { return Math.min(MONTHS, Math.floor((Math.max(1, week) - 1) * MONTHS / WEEKS) + 1); }
function firstWeekOfMonth(week) { return week === 1 || monthOf(week) !== monthOf(week - 1); }

// ---------- card defaults of format draft 3 ----------
function arrivesOf(c) { return c.arrives || (c.kind !== 'event' || c.stack === 'personal' ? 'draw' : 'board'); }
function placeOf(c) { return c.place || (arrivesOf(c) === 'draw' ? 'home' : 'own'); }
function whoOf(c) { return c.who || 'self'; }
function takesOf(c) { return c.takes != null ? c.takes : (arrivesOf(c) === 'draw' ? 0 : 1); }
function costsOf(c) { return c.costs != null ? c.costs : 1; }
function isFree(o) { return o.origin === 'always' && !(o.cost && (o.cost.money || o.cost.influence)); }
// "let it pass" is the LAST free option of a card; earlier free options are real actions that take people and time
// (found in the second playthrough review: "A month in Lisbon" had two free options and both resolved at once)
function passIndex(c) { let k = -1; (c.options || []).forEach((o, i) => { if (isFree(o)) k = i; }); return k; }
function isPass(c, i) { return passIndex(c) === i; }

// ---------- state ----------
function newState2() {
  const s = newState();
  return Object.assign(s, { week: 0, month: 1, draws: 99, people: {}, board: [], activities: [], aiCards: {}, author: 'rules', ended: false });
}
function blockOfPlace(s, place) {
  if (!place || place === 'home' || place === 'own') return s.block;
  if (has(['europe', 'usa', 'russia', 'china', 'india'], place)) return place;
  const c = cardOf(place);
  if (c && c.kind === 'possession') return s.block;
  if (c && c.kind === 'place') return c.block || 'none';
  return s.block;
}
function placeName(s, place) {
  if (!place || place === 'home') return { key: 'home' };
  if (place === 'own') return { block: s.block };
  if (has(['europe', 'usa', 'russia', 'china', 'india'], place)) return { block: place };
  const c = cardOf(place); return { name: c ? (c.name || c.title) : place };
}
function travelWeeks(s, from, to) {
  const a = blockOfPlace(s, from), b = blockOfPlace(s, to);
  return a === b && a !== 'none' ? 0 : (from === to ? 0 : 1);
}
function addPerson(s, id, at) { if (!s.people[id]) s.people[id] = { at: at || 'home', res: 1, busy: null }; }
function team(s) { return [s.character].concat(s.associates.map((a) => a.id)).filter((id) => s.people[id]); }

function reduce2(log) { const s = newState2(); log.forEach((e) => apply2(s, e)); return s; }
function apply2(s, e) {
  switch (e.t) {
    case 'start': {
      apply(s, e);                       // character, resources, associates, contacts (../engine.js)
      s.week = 1; s.month = 1; s.draws = 99;
      s.stacks = {}; CARDS.all.forEach((c) => { if (c.stack && c.stack !== 'given' && c.stack !== 'start') s.stacks[c.stack] = true; });
      addPerson(s, s.character, 'home'); s.associates.forEach((a) => addPerson(s, a.id, 'home'));
      break;
    }
    case 'add': {                        // the author's cards for this week (rules or AI); AI cards travel in the log
      (e.cards || []).forEach((c) => { s.aiCards[c.id] = c; cardsRegister(c); });
      e.items.forEach((it) => { s.drawn[it.card] = true; s.followups = s.followups.filter((f) => f.card !== it.card); s.board.push(it); });
      if (e.author) s.author = e.author;
      break;
    }
    case 'take': {
      const i = s.board.findIndex((b) => b.inst === e.inst); if (i < 0) return;
      const item = s.board[i]; const c = cardOf(item.card); if (!c) return;
      s.board.splice(i, 1);
      if (c.kind === 'person' || c.kind === 'possession') {
        if (e.option === 'contact') { s.influence -= 1; addUnique(s.contacts, c.id); }
        if (e.option === 'team') {          // straight into the team: keep in touch + recruit (post/spiel/025)
          s.influence -= 1 + RECRUIT_COST; s.associates.push({ id: c.id });
          s.people[c.id] = { at: 'home', res: 0, busy: null };
          const act = { inst: 'join-' + c.id + '-' + s.week, card: null, join: true, who: [c.id], from: s.week, until: s.week + 1, place: 'home' };
          s.activities.push(act); s.people[c.id].busy = act;
        }
        if (e.option === 'possession') { s.money -= 2; addUnique(s.possessions, c.id); }
        s.history.push({ week: s.week, month: s.month, card: c.id, text: e.option === 'pass' ? 'Let go.' : e.option === 'contact' ? 'Kept in touch.' : e.option === 'team' ? 'Joined the team.' : 'Acquired.',
          text_de: e.option === 'pass' ? 'Ziehen lassen.' : e.option === 'contact' ? 'Kontakt gehalten.' : e.option === 'team' ? 'Kommt ins Team.' : 'Übernommen.' });
        return;
      }
      const o = c.options[e.option]; if (!o) return;
      s.money -= o.cost.money || 0; s.influence -= o.cost.influence || 0;
      if (isPass(c, e.option) || !e.who || !e.who.length) { finish(s, c, o, null); return; }
      const place = placeOf(c);
      let dur = takesOf(c);
      const travel = Math.max(...e.who.map((id) => travelWeeks(s, s.people[id] ? s.people[id].at : 'home', place)));
      dur += travel;
      e.who.forEach((id) => { const p = s.people[id]; if (p) p.res = Math.max(0, p.res - costsOf(c)); });
      if (dur === 0) { e.who.forEach((id) => { if (s.people[id]) s.people[id].at = place === 'own' ? 'home' : place; }); finish(s, c, o, e.who); return; }
      const act = { inst: e.inst, card: c.id, option: e.option, who: e.who.slice(), from: s.week, until: s.week + dur, place };
      s.activities.push(act);
      e.who.forEach((id) => { const p = s.people[id]; if (p) p.busy = act; });
      break;
    }
    case 'recruit': {                    // a contact joins the team: 2 influence, there next week (Betreiber 01:08)
      if (!has(s.contacts, e.id) || s.associates.length >= MAX_ASSOCIATES || s.influence < RECRUIT_COST) return;
      s.influence -= RECRUIT_COST; remove(s.contacts, e.id); s.associates.push({ id: e.id });
      s.people[e.id] = { at: 'home', res: 0, busy: null };
      const act = { inst: 'join-' + e.id + '-' + s.week, card: null, join: true, who: [e.id], from: s.week, until: s.week + 1, place: 'home' };
      s.activities.push(act); s.people[e.id].busy = act;
      s.history.push({ week: s.week, month: s.month, card: e.id, text: 'Joined the team.', text_de: 'Kommt ins Team.', who: [] });
      break;
    }
    case 'dismiss': {                    // an associate goes back to the contacts: at once, free; not while away
      const i = s.associates.findIndex((a) => a.id === e.id); const p = s.people[e.id];
      if (i < 0 || (p && p.busy)) return;
      s.associates.splice(i, 1); addUnique(s.contacts, e.id); delete s.people[e.id];
      s.history.push({ week: s.week, month: s.month, card: e.id, text: 'Back to the contacts.', text_de: 'Zurück zu den Kontakten.', who: [] });
      break;
    }
    case 'next': {
      const nw = s.week + 1;
      // 1. activities that end this week end, with their effects
      s.activities = s.activities.filter((a) => {
        if (a.until > nw) return true;
        const c = cardOf(a.card); const o = c && c.options[a.option];
        a.who.forEach((id) => { const p = s.people[id]; if (p) { p.busy = null; p.at = a.place === 'own' ? 'home' : a.place; } });
        if (o) finish(s, c, o, a.who, a);
        return false;
      });
      // 2. every free person gains one draft resource
      team(s).forEach((id) => { const p = s.people[id]; if (!p.busy) p.res = Math.min(RES_CAP, p.res + (id === s.character ? RES_SELF : 1)); });
      // 3. cards whose time is up leave the board
      s.board = s.board.filter((b) => b.expires == null || b.expires >= nw);
      // 4. the counter; a new month brings back associates who were away as contacts (associate-to-contact)
      const oldMonth = s.month; s.week = nw; s.month = monthOf(nw);
      if (s.month !== oldMonth) {
        s.returning = s.returning.filter((r) => {
          if (r.month > s.month) return true;
          remove(s.contacts, r.id); if (s.associates.length < MAX_ASSOCIATES) { s.associates.push({ id: r.id }); addPerson(s, r.id, 'home'); } return false;
        });
      }
      if (nw > WEEKS) s.ended = true;
      break;
    }
    default:
  }
}
// the effects of a choice; persons who left the team leave the people list
function finish(s, c, o, who, act) {
  o.effects.forEach((ef) => effect(s, ef));
  Object.keys(s.people).forEach((id) => { if (id !== s.character && !s.associates.some((a) => a.id === id) && !(s.people[id].busy)) delete s.people[id]; });
  s.associates.forEach((a) => addPerson(s, a.id, 'home'));
  s.history.push({ week: s.week + (act ? (act.until - s.week) : 0), month: s.month, card: c.id, text: o.text, text_de: o.text_de, who: who || [] });
}
function cardsRegister(c) { if (!CARDS.byId[c.id]) { CARDS.all.push(c); CARDS.byId[c.id] = c; } }

// ---------- who may do a card ----------
// Returns the possible teams: [[id], …] or, for self+1, [[self, partner], …]. Each entry also tells why not.
function doersFor(s, c) {
  const ok = (id) => { const p = s.people[id]; return p && !p.busy && p.res >= costsOf(c); };
  const ch = s.character; const assoc = s.associates.map((a) => a.id).filter((id) => s.people[id]);
  const w = whoOf(c);
  let teams;
  if (w === 'self') teams = [[ch]];
  else if (w === 'anyone') teams = [[ch]].concat(assoc.map((id) => [id]));
  else if (w === 'self+1') teams = assoc.map((id) => [ch, id]);
  else if (w.startsWith('profession:')) teams = assoc.filter((id) => { const p = cardOf(id); return p && p.profession === w.slice(11); }).map((id) => [id]);
  else teams = [[ch]];
  const place = placeOf(c);
  return teams.map((t) => ({ who: t, ok: t.every(ok), busy: t.some((id) => s.people[id] && s.people[id].busy), noRes: t.some((id) => s.people[id] && s.people[id].res < costsOf(c)),
    weeks: takesOf(c) + Math.max(...t.map((id) => travelWeeks(s, s.people[id] ? s.people[id].at : 'home', place))) }));
}

// ---------- the rules author (the fallback while no AI author answers) ----------
function onBoard(s, id) { return s.board.some((b) => b.card === id); }
function boardDrawable(s, c) { return !onBoard(s, c.id) && drawable(s, c); }
function rulesAuthor(s, rnd, already) {
  rnd = rnd || Math.random; already = already || [];
  const items = []; const taken = new Set(already.map((x) => x.card));
  const put = (c, personal) => {
    if (!c || taken.has(c.id)) return; taken.add(c.id);
    // a beat is the spine of the story-line: it stays until the player answers it, unless the card itself says otherwise
    const exp = c.expires || (c.beat ? null : (personal ? EXPIRES_PERSONAL : EXPIRES_STORY));
    items.push({ card: c.id, inst: s.game + '-w' + String(s.week).padStart(2, '0') + '-' + c.id, since: s.week, expires: exp ? s.week + exp - 1 : null, personal: !!personal, beat: !!c.beat });
  };
  const events = CARDS.all.filter((c) => c.kind === 'event' && boardDrawable(s, c));
  // the spine: beats in the first week of their month, one per story-line
  if (firstWeekOfMonth(s.week)) events.filter((c) => c.beat === s.month).forEach((c) => put(c, false));
  // follow-ups that are due
  s.followups.filter((f) => f.by <= s.month && s.month >= f.from).forEach((f) => { const c = cardOf(f.card); if (c && boardDrawable(s, c)) put(c, arrivesOf(c) === 'draw'); });
  // story cards from the open story-lines, while the board has room; one of them from the team or a place the player owns
  const open = s.board.filter((b) => !b.personal && !b.beat && s.week - b.since < FRESH_WEEKS).length + items.filter((x) => !x.personal).length;
  const story = events.filter((c) => arrivesOf(c) === 'board' && !c.beat && !isFollowUp(c.id) && !taken.has(c.id));
  const lively = story.filter((c) => !waitOnly(s, c));
  const pool = lively.length ? lively : story;
  const teamish = pool.filter((c) => (s.possessions.indexOf(placeOf(c)) >= 0) || (whoOf(c).startsWith('profession:') && doersFor(s, c).length) || whoOf(c) === 'self+1');
  let room = Math.max(0, Math.min(STORY_PER_WEEK - already.filter((x) => !x.personal).length, BOARD_MAX - open));
  // threads first: a card that builds on a flag the player set (post/spiel/025 – "the stories do not build")
  const thread = pool.filter((c) => (c.requires || []).some((r) => r.startsWith('flag:') && s.flags[r.slice(5)]));
  if (room && thread.length) { put(pick(thread, rnd), false); room--; }
  if (room && teamish.length) { put(pick(teamish.filter((c) => !taken.has(c.id)).length ? teamish.filter((c) => !taken.has(c.id)) : teamish, rnd), false); room--; }
  while (room > 0) { const rest = pool.filter((c) => !taken.has(c.id)); if (!rest.length) break; put(pick(rest, rnd), false); room--; }
  // the personal draw: one card a week arrives unasked – an event, a person or a possession
  if (!already.some((x) => x.personal)) {
    const personal = CARDS.all.filter((c) => c.kind !== 'character' && c.kind !== 'place' && c.kind !== 'goal' && arrivesOf(c) === 'draw' && !c.beat && !isFollowUp(c.id) && boardDrawable(s, c) && !taken.has(c.id));
    const ev = personal.filter((c) => c.kind === 'event' && !waitOnly(s, c));
    const others = personal.filter((c) => c.kind !== 'event');
    const src = (others.length && rnd() < 0.3) ? others : (ev.length ? ev : personal);
    if (src.length) put(pick(src, rnd), true);
  }
  return items;
}

// ---------- the AI author: the player's own AI (p2/ai.js, Betreiber 07.11., 00:47); rules when there is none ----------
// ?author=mock – a stand-in for tests · ?author=off – rules only · ?author=server – a server endpoint (meta nowhere-author)
const AUTHOR = { url: (document.querySelector('meta[name="nowhere-author"]') || {}).content || '../author.php', mode: 'byo', last: '', error: '', cancel: null };
(function () { try { const q = new URLSearchParams(location.search); if (q.get('author')) AUTHOR.mode = q.get('author'); } catch (e) { /* no location */ } })();

// what the author is told: the game state in words and ids, never the whole log
function authorBrief(s) {
  const p = (id) => { const c = cardOf(id) || {}; const x = s.people[id] || {}; return { id, name: c.name, profession: c.profession, traits: c.traits, at: x.at, busy_until: x.busy ? x.busy.until : null, resource: x.res }; };
  const ch = cardOf(s.character);
  return {
    game: s.game, week: s.week, weeks: WEEKS, month: s.month, lang: typeof LANG === 'string' ? LANG : 'en',
    character: { id: ch.id, name: ch.name, profession: ch.profession, block: s.block, skills: skillsOf(s), traits: s.traits, acquired: s.acquired },
    money: s.money, influence: s.influence, status: s.status, block_values: s.blockValues,
    team: team(s).map(p), contacts: s.contacts.map((id) => { const c = cardOf(id) || {}; return { id, name: c.name, profession: c.profession }; }),
    possessions: s.possessions.map((id) => { const c = cardOf(id) || {}; return { id, name: c.name, type: c.type }; }),
    flags: Object.keys(s.flags), story_lines: Object.keys(s.stacks).filter((k) => s.stacks[k] && k !== 'personal'),
    board: s.board.map((b) => ({ card: b.card, title: (cardOf(b.card) || {}).title, expires: b.expires })),
    activities: s.activities.map((a) => ({ card: a.card, who: a.who, until: a.until })),
    returning_this_week: s.history.filter((h) => h.week === s.week && h.who && h.who.some((id) => id !== s.character)).flatMap((h) => h.who.filter((id) => id !== s.character).map((id) => ({ id, from: h.card }))),
    returning_next_week: s.activities.filter((a) => a.until === s.week + 1 && a.card).flatMap((a) => a.who.filter((id) => id !== s.character).map((id) => ({ id, from: a.card }))),
    last_weeks: s.history.slice(-12).map((h) => ({ week: h.week, card: h.card, title: (cardOf(h.card) || {}).title, chose: h.text })),
    known_cards: CARDS.all.filter((c) => c.kind !== 'event').map((c) => ({ id: c.id, kind: c.kind, name: c.name || c.title })),
  };
}
// A card written by the author must pass the same checks as a hand-written one before it reaches the board.
const V_ORIGINS = ['always', 'skill', 'profession', 'trait', 'block', 'associate', 'possession', 'status', 'flag', 'contact', 'month', 'until'];
const V_EFFECTS = ['money', 'influence', 'status', 'block', 'trait', 'acquired', 'associate-to-contact', 'gain', 'lose', 'open', 'close', 'flag', 'follow'];
const V_TRAITS = {}; OPPOSITES.forEach(([a, b]) => { V_TRAITS[a] = 1; V_TRAITS[b] = 1; }); V_TRAITS.wise = 1;
const V_NAME = /^[a-z0-9][a-z0-9-]*$/;
function validateCard(c, batchIds) {
  const err = [];
  const known = (id) => !!cardOf(id) || (batchIds && batchIds.has(id));
  if (!c || typeof c !== 'object') return ['not an object'];
  if (typeof c.id !== 'string' || !V_NAME.test(c.id) || cardOf(c.id)) err.push('id missing, malformed or taken');
  if (c.kind !== 'event') err.push('kind must be event');
  if (typeof c.title !== 'string' || !c.title.trim() || c.title.length > 80) err.push('title');
  if (typeof c.stack !== 'string' || !V_NAME.test(c.stack)) err.push('stack');
  if (!(c.reach === 'global' || c.reach === 'personal' || /^block:[a-z]+$/.test(c.reach || ''))) err.push('reach');
  if (!Number.isInteger(c.impact) || c.impact < 1 || c.impact > 5) err.push('impact');
  if (c.who != null && !/^(self|anyone|self\+1|profession:[a-z0-9-]+)$/.test(c.who)) err.push('who');
  if (c.takes != null && !(Number.isInteger(c.takes) && c.takes >= 0 && c.takes <= 13)) err.push('takes');
  if (c.costs != null && c.costs !== 0 && c.costs !== 1) err.push('costs');
  if (c.expires != null && !(Number.isInteger(c.expires) && c.expires >= 1 && c.expires <= 52)) err.push('expires');
  if (c.arrives != null && c.arrives !== 'board' && c.arrives !== 'draw') err.push('arrives');
  if (c.place != null && !(c.place === 'home' || has(['europe', 'usa', 'russia', 'china', 'india'], c.place) || (cardOf(c.place) && /place|possession/.test(cardOf(c.place).kind)))) err.push('place');
  const cond = (x) => { if (typeof x !== 'string') return false; if (x === 'always') return true; const p = x.split(':'); if (!has(V_ORIGINS, p[0]) || !p[1]) return false; if (p[0] === 'trait') return !!V_TRAITS[p[1]]; if (p[0] === 'month' || p[0] === 'until') return /^\d+$/.test(p[1]); return true; };
  (c.requires = Array.isArray(c.requires) ? c.requires : []).forEach((r) => { if (!cond(r)) err.push('requires ' + r); });
  if (!Array.isArray(c.options) || !c.options.length || c.options.length > 5) err.push('options');
  else {
    c.options.forEach((o, i) => {
      if (!o || typeof o.text !== 'string' || !o.text.trim()) err.push('option ' + i + ' text');
      if (!cond(o && o.origin)) err.push('option ' + i + ' origin');
      o.cost = o.cost && typeof o.cost === 'object' ? o.cost : {};
      Object.keys(o.cost).forEach((k) => { if (!has(['money', 'influence', 'draws'], k) || !Number.isInteger(o.cost[k]) || o.cost[k] < 0 || o.cost[k] > 2) err.push('option ' + i + ' cost'); });
      o.effects = Array.isArray(o.effects) ? o.effects : [];
      o.effects.forEach((ef) => {
        const p = String(ef).split(':');
        if (!has(V_EFFECTS, p[0])) { err.push('effect ' + ef); return; }
        if ((p[0] === 'money' || p[0] === 'influence') && !(/^[+-]?\d+$/.test(p[1]) && Math.abs(+p[1]) <= 3)) err.push('effect ' + ef);
        if (p[0] === 'trait' && !(/^[+-]/.test(p[1] || '') && V_TRAITS[p[1].slice(1)])) err.push('effect ' + ef);
        if (has(['gain', 'lose', 'follow', 'associate-to-contact'], p[0]) && !known(p[1])) err.push('effect refers to unknown card ' + ef);
      });
    });
    if (!c.options.some((o) => o && o.origin === 'always' && !o.cost.money && !o.cost.influence)) err.push('needs a free always option');
  }
  return err;
}
// ask the author for this week; resolves to {cards, items, author} or null (then the rules write the week)
function authorAsk(s) {
  AUTHOR.error = '';
  if (AUTHOR.mode === 'off' || AUTHOR.mode === 'rules') return Promise.resolve(null);
  const byo = AUTHOR.mode === 'byo';
  if (byo && !(typeof aiConfigured === 'function' && aiConfigured())) { AUTHOR.last = ''; return Promise.resolve(null); }
  const brief = authorBrief(s);
  const ac = typeof AbortController !== 'undefined' ? new AbortController() : null;
  let cancelled; const stop = new Promise((res) => { cancelled = res; });
  AUTHOR.cancel = () => { try { if (ac) ac.abort(); } catch (e) { /* ignore */ } cancelled(null); };
  const ask = AUTHOR.mode === 'mock' ? Promise.resolve(mockAuthor(brief)) :
    byo ? aiAuthor(brief, ac && ac.signal).catch((e) => { AUTHOR.error = typeof aiErrorText === 'function' ? aiErrorText(e) : String(e.message || e); return null; }) :
    fetch(AUTHOR.url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(brief) })
      .then((r) => (r.ok ? r.json() : null)).catch(() => null);
  const timeout = new Promise((res) => setTimeout(() => { if (byo && !AUTHOR.error) AUTHOR.error = 'timeout'; res(null); }, byo ? 90000 : 12000));
  return Promise.race([ask, timeout, stop]).then((res) => {
    AUTHOR.cancel = null;
    if (!res || !Array.isArray(res.cards)) { AUTHOR.last = 'no answer'; return null; }
    const ids = new Set(res.cards.map((c) => c && c.id));
    const good = []; const bad = [];
    res.cards.slice(0, 6).forEach((c) => { const e = validateCard(c, ids); (e.length ? bad : good).push(e.length ? { id: c && c.id, err: e } : c); });
    AUTHOR.last = good.length + ' written, ' + bad.length + ' rejected';
    if (bad.length && typeof console !== 'undefined') console.info('Nowhere author: rejected', bad);
    if (!good.length) return null;
    // a card that another card of this batch schedules with follow: waits for that follow-up, it does not go on the board now
    const later = new Set(); good.forEach((c) => c.options.forEach((o) => o.effects.forEach((ef) => { const p = String(ef).split(':'); if (p[0] === 'follow') later.add(p[1]); })));
    const items = good.filter((c) => !later.has(c.id)).map((c) => ({ card: c.id, inst: s.game + '-w' + String(s.week).padStart(2, '0') + '-' + c.id, since: s.week, expires: s.week + (c.expires || (arrivesOf(c) === 'draw' ? EXPIRES_PERSONAL : EXPIRES_STORY)) - 1, personal: arrivesOf(c) === 'draw', ai: true }));
    return { cards: good, items, author: res.model || 'ai' };
  });
}
// a stand-in author for tests (?author=mock): one small card a week from the team, in the card format
function mockAuthor(b) {
  const mate = b.team.find((p) => p.id !== b.character.id) || b.team[0];
  const id = 'ai-' + b.game + '-w' + b.week + '-letter';
  return { model: 'mock', cards: [{
    id, kind: 'event', title: 'A note from ' + String(mate.name || 'a friend').split(' ')[0], stack: 'personal', requires: [], reach: 'personal', impact: 1,
    place: 'home', who: 'self', takes: 0, costs: 1, arrives: 'draw',
    options: [{ text: 'Write back properly.', origin: 'always', cost: {}, effects: ['influence:+1'] }, { text: 'Leave it for now.', origin: 'always', cost: {}, effects: [] }],
    back: 'MOCK AUTHOR. Written for week ' + b.week + ' from the game state – stands in for the AI author in tests.',
  }] };
}

// ---------- storage and actions ----------
const STORE2 = 'nowhere.p2.game';
const G2 = { log: [], state: newState2() };
function game2Load() {
  try { const raw = localStorage.getItem(STORE2); if (raw) { const d = JSON.parse(raw); if (Array.isArray(d.log)) G2.log = d.log; } } catch (e) { /* memory only */ }
  G2.state = reduce2(G2.log);
}
function game2Save() { try { localStorage.setItem(STORE2, JSON.stringify({ log: G2.log, saved: new Date().toISOString() })); } catch (e) { /* ignore */ } playTally(2, G2.log, G2.state && G2.state.ended, G2.state && G2.state.week); }
function game2Append(entry) { entry.at = new Date().toISOString(); G2.log.push(entry); apply2(G2.state, entry); game2Save(); }
function game2Reset() { G2.log = []; G2.state = newState2(); game2Save(); }
function game2Export() { return JSON.stringify({ prototype: 2, game: G2.state.game, cards: CARDS.version || '', log: G2.log }, null, 1); }
function game2Import(text) { const d = JSON.parse(text); if (!d || !Array.isArray(d.log)) throw new Error('not a Nowhere log'); G2.log = d.log; G2.state = reduce2(d.log); game2Save(); }

// the author writes the week: AI first, the rules fill what is missing; one log entry
function writeWeek(rnd) {
  const s = G2.state;
  return authorAsk(s).then((ai) => {
    const already = ai ? ai.items : [];
    const rules = rulesAuthor(s, rnd, already);
    const items = already.concat(rules);
    if (!items.length) return 0;
    game2Append({ t: 'add', week: s.week, items, cards: ai ? ai.cards : undefined, author: ai ? ai.author : 'rules' });
    return items.length;
  });
}
function act2Start(characterId, rnd) {
  game2Reset();
  game2Append({ t: 'start', character: characterId, game: 'p' + Date.now().toString(36), cards: CARDS.version || '' });
  return writeWeek(rnd);
}
function act2Take(inst, option, who) {
  const s = G2.state; const b = s.board.find((x) => x.inst === inst); if (!b) return false;
  const c = cardOf(b.card);
  if (c.kind === 'event') {
    const o = c.options[option]; if (!o || !holds(s, o.origin) || !affordable(s, o.cost)) return false;
    if (!isPass(c, option)) {
      const ok = doersFor(s, c).find((d) => d.ok && JSON.stringify(d.who) === JSON.stringify(who));
      if (!ok) return false;
    }
    game2Append({ t: 'take', inst, option, who: isPass(c, option) ? [] : who });
    return true;
  }
  if (option === 'contact' && s.influence < 1) return false;
  if (option === 'team' && (c.kind !== 'person' || s.influence < 1 + RECRUIT_COST || s.associates.length >= MAX_ASSOCIATES)) return false;
  if (option === 'possession' && s.money < 2) return false;
  game2Append({ t: 'take', inst, option });
  return true;
}
function act2Next(rnd) {
  const s = G2.state; if (s.ended) return Promise.resolve(0);
  game2Append({ t: 'next' });
  if (G2.state.ended) return Promise.resolve(0);
  return writeWeek(rnd);
}

function act2Recruit(id) {
  const s = G2.state;
  if (!has(s.contacts, id) || s.associates.length >= MAX_ASSOCIATES || s.influence < RECRUIT_COST) return false;
  game2Append({ t: 'recruit', id }); return true;
}
function act2Dismiss(id) {
  const s = G2.state; const p = s.people[id];
  if (!s.associates.some((a) => a.id === id) || (p && p.busy)) return false;
  game2Append({ t: 'dismiss', id }); return true;
}
