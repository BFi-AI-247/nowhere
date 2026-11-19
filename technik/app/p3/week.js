// Nowhere – Prototype 3 engine (post/spiel/027, 028; Betreiber 07.11., 17:10/17:15): Prototype 2's time flow plus a goal
// per game, checks with chance, skill levels that rise with use, traits as scales (for the player and the team), an
// author who may plan three weeks ahead and whose failures are written into the log. Started as a copy of p2/week.js.
// Prototype 2 engine: the time flow (nowhere/konzept-zeitfluss.md, "Prototype 2"; post/spiel/017, 018).
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
// Prototype 3
const AXIS_MAX = Infinity;  // no cap on a trait axis (Betreiber 23:06: "No cap right now."; post/spiel/036 item 1)
const LIVE_AXES = Infinity; // no limit of live axes (Betreiber 22:12: "das Limit von 3 aufheben"; post/spiel/033 item 1); an axis at 0 is silent
const AI_MAX = 5;           // author cards on the board at most; the rest of an answer waits out (post/spiel/034 item 3a)
const SKILL_MAX = 3;        // skill levels 0–3
const RISE_CHANCE = 1 / 3;  // after a success, chance that the skill rises – once per skill per quarter
const PLAN_AHEAD = 3;       // the author may plan cards up to three weeks ahead
const RELAY_WEEKS = 20;     // a story card nobody took may come back after 20 weeks when the deck is empty

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
  return Object.assign(s, { week: 0, month: 1, draws: 99, people: {}, board: [], activities: [], aiCards: {}, author: 'rules', ended: false,
    axes: {}, lv: {}, rose: {}, goal: null, planned: [], drawnAt: {}, personalPlayed: 0, authorLog: [], notes: [] });
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
function addPerson(s, id, at) { if (!s.people[id]) s.people[id] = { at: at || 'home', res: 1, busy: null }; initPerson(s, id); }
function team(s) { return [s.character].concat(s.associates.map((a) => a.id)).filter((id) => s.people[id]); }

function reduce2(log) { const s = newState2(); log.forEach((e) => apply2(s, e)); return s; }
function apply2(s, e) {
  switch (e.t) {
    case 'start': {
      apply(s, e);                       // character, resources, associates, contacts (../engine.js)
      s.week = 1; s.month = 1; s.draws = 99;
      s.stacks = {}; s.story = e.story || null;
      if (e.story) { s.stacks[e.story] = true; s.stacks.personal = true; }   // one story-line per game (post/spiel/035 item 1)
      else CARDS.all.forEach((c) => { if (c.stack && c.stack !== 'given' && c.stack !== 'start') s.stacks[c.stack] = true; });   // games before 07.11., 23:16
      addPerson(s, s.character, 'home'); s.associates.forEach((a) => addPerson(s, a.id, 'home'));
      s.goal = e.goal && cardOf(e.goal) ? e.goal : null;
      refreshTraits(s);
      break;
    }
    case 'add': {                        // the author's cards for this week (rules or AI); AI cards travel in the log
      (e.cards || []).forEach((c) => { s.aiCards[c.id] = c; cardsRegister(c); });
      e.items.forEach((it) => { s.drawn[it.card] = true; s.drawnAt[it.card] = s.week; s.followups = s.followups.filter((f) => f.card !== it.card); s.board.push(it); });
      // the author's plan for the next weeks: a new plan for a week replaces the old one for that week
      if (e.plan && e.plan.length) {
        const weeks = new Set(e.plan.map((x) => x.week));
        s.planned = s.planned.filter((x) => !weeks.has(x.week)).concat(e.plan);
      }
      if (e.author) s.author = e.author;
      s.authorLog.push({ week: s.week, author: e.author || 'rules', error: e.author_error || '', rejected: (e.rejected || []).length, repaired: (e.repaired || []).length, cards: (e.cards || []).length });
      break;
    }
    case 'take': {
      const i = s.board.findIndex((b) => b.inst === e.inst); if (i < 0) return;
      const item = s.board[i]; const c = cardOf(item.card); if (!c) return;
      s.board.splice(i, 1);
      if (item.personal && e.option !== 'pass') s.personalPlayed++;
      if (c.kind === 'person' || c.kind === 'possession') {
        if (e.option === 'contact') { s.influence -= 1; addUnique(s.contacts, c.id); }
        if (e.option === 'team') {          // straight into the team: keep in touch + recruit (post/spiel/025)
          s.influence -= 1 + RECRUIT_COST; s.associates.push({ id: c.id });
          s.people[c.id] = { at: 'home', res: 0, busy: null }; initPerson(s, c.id);
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
      const roll = { roll: e.roll, rise: e.rise };
      const place = placeOf(c);
      let dur = takesOf(c);
      const travel = Math.max(...e.who.map((id) => travelWeeks(s, s.people[id] ? s.people[id].at : 'home', place)));
      dur += travel;
      e.who.forEach((id) => { const p = s.people[id]; if (p) p.res = Math.max(0, p.res - costsOf(c)); });
      if (dur === 0) { e.who.forEach((id) => { if (s.people[id]) s.people[id].at = place === 'own' ? 'home' : place; }); finish(s, c, o, e.who, roll); return; }
      const act = { inst: e.inst, card: c.id, option: e.option, who: e.who.slice(), from: s.week, until: s.week + dur, place, roll: e.roll, rise: e.rise };
      s.activities.push(act);
      e.who.forEach((id) => { const p = s.people[id]; if (p) p.busy = act; });
      break;
    }
    case 'recruit': {                    // a contact joins the team: 2 influence, there next week (Betreiber 01:08)
      if (!has(s.contacts, e.id) || s.associates.length >= MAX_ASSOCIATES || s.influence < RECRUIT_COST) return;
      s.influence -= RECRUIT_COST; remove(s.contacts, e.id); s.associates.push({ id: e.id });
      s.people[e.id] = { at: 'home', res: 0, busy: null }; initPerson(s, e.id);
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
      // 5. planned cards whose week has come go on the board (Prototype 3: the author plans ahead)
      s.planned = s.planned.filter((x) => {
        if (x.week > nw) return true;
        if (!cardOf(x.card) || onBoard(s, x.card)) return false;
        const exp = x.expires_weeks || EXPIRES_STORY;
        s.board.push({ card: x.card, inst: x.inst, since: nw, expires: nw + exp - 1, personal: !!x.personal, ai: true, planned: true });
        s.drawn[x.card] = true; s.drawnAt[x.card] = nw;
        return false;
      });
      if (nw > WEEKS) s.ended = true;
      break;
    }
    default:
  }
}
// the effects of a choice; persons who left the team leave the people list
function finish(s, c, o, who, act) {
  const res = checkResolve(s, o, who, act);
  DOERS = who && who.length ? who.slice() : [s.character];
  const before = snapPeople(s);
  (res ? res.effects : o.effects).forEach((ef) => effect(s, ef));
  DOERS = null;
  if (res && res.outcome === 'success' && act && act.rise) riseSkill(s, res);
  refreshTraits(s);
  const changes = diffPeople(s, before);
  Object.keys(s.people).forEach((id) => { if (id !== s.character && !s.associates.some((a) => a.id === id) && !(s.people[id].busy)) delete s.people[id]; });
  s.associates.forEach((a) => addPerson(s, a.id, 'home'));
  s.history.push({ week: s.week + (act && act.until ? (act.until - s.week) : 0), month: s.month, card: c.id, text: o.text, text_de: o.text_de, who: who || [],
    check: res ? res.line : undefined, changes: changes.length ? changes : undefined });
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
  const open = s.board.filter((b) => !b.personal && !b.beat && !b.ai && s.week - b.since < FRESH_WEEKS).length + items.filter((x) => !x.personal).length;   // hand cards only (034)
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
// money/influence per effect: ±2, ±3 on cards of impact 4–5 (post/spiel/031 item 3, Betreiber "build" 07.11., 21:46)
function effectMax(c) { return c && c.impact >= 4 ? 3 : 2; }
// the titles of the author's last cards, for the variety rule (post/spiel/031 item 1)
const RECENT_TITLES = 20;
function recentTitles(log) {
  const out = []; (log || []).forEach((e) => { if (e.t === 'add' && Array.isArray(e.cards)) e.cards.forEach((c) => { if (c && c.title) out.push(c.title); }); });
  return out.slice(-RECENT_TITLES);
}
// a title that shares more than 60 % of its words with one of the recent titles is a repeat (post/spiel/031 item 2)
const REPEAT_SHARE = 0.6;
function titleWords(t) { return new Set(String(t || '').toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean)); }
function repeatOf(title, earlier) {
  const a = titleWords(title); if (a.size < 2) return null;
  for (const t of earlier) { const b = titleWords(t); let n = 0; a.forEach((w) => { if (b.has(w)) n++; }); if (n / a.size > REPEAT_SHARE) return t; }
  return null;
}
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
        if ((p[0] === 'money' || p[0] === 'influence') && !(/^[+-]?\d+$/.test(p[1]) && Math.abs(+p[1]) <= effectMax(c))) err.push('effect ' + ef);
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
const MOCK_THINGS = ['kettle', 'harbour', 'ladder', 'violin', 'lantern', 'compass', 'orchard', 'ferry', 'kite', 'anvil', 'quarry', 'meadow', 'telescope'];
function mockAuthor(b) {
  const mate = b.team.find((p) => p.id !== b.character.id) || b.team[0];
  const thing = (k) => MOCK_THINGS[(b.week + k) % MOCK_THINGS.length] + ' ' + b.week;
  const id = 'ai-' + b.game + '-w' + b.week + '-letter';
  return { model: 'mock', cards: [{
    id, kind: 'event', title: String(mate.name || 'a friend').split(' ')[0] + ' and the ' + thing(0), stack: 'personal', requires: [], reach: 'personal', impact: 1,
    place: 'home', who: 'self', takes: 0, costs: 1, arrives: 'draw',
    options: [{ text: 'Write back properly.', origin: 'always', cost: {}, effects: ['influence:+1'], check: { skill: 'persuasion', difficulty: 2, trait: 'honest' }, partial: [], failure: ['influence:-1'] }, { text: 'Leave it for now.', origin: 'always', cost: {}, effects: [] }],
    back: 'MOCK AUTHOR. Written for week ' + b.week + ' from the game state – stands in for the AI author in tests.',
  }, {
    id: id + '-later', kind: 'event', title: 'Planned: the ' + thing(5), stack: 'personal', reach: 'personal', impact: 9, week: b.week + 2, place: 'nowhere-land', who: 'chef',
    options: [{ text: 'Go and see.', origin: 'magic:x', cost: { money: 7 }, effects: ['money:+12', 'trait:+bogus', 'influence:+1'] }],
    back: 'MOCK AUTHOR – deliberately broken fields, to be repaired.',
  }, {
    id: id + '-again', kind: 'event', title: String(mate.name || 'a friend').split(' ')[0] + ' and the ' + thing(0) + ' again', stack: 'personal', reach: 'personal', impact: 1,
    options: [{ text: 'Leave it.', origin: 'always', cost: {}, effects: [] }],
    back: 'MOCK AUTHOR – a repeat of the first title, to be thrown away (post/spiel/031).',
  }] };
}

// ---------- storage and actions ----------
const STORE2 = 'nowhere.p3.game';
const G2 = { log: [], state: newState2() };
function game2Load() {
  try { const raw = localStorage.getItem(STORE2); if (raw) { const d = JSON.parse(raw); if (Array.isArray(d.log)) G2.log = d.log; } } catch (e) { /* memory only */ }
  G2.state = reduce2(G2.log);
}
function game2Save() { try { localStorage.setItem(STORE2, JSON.stringify({ log: G2.log, saved: new Date().toISOString() })); } catch (e) { /* ignore */ } playTally(3, G2.log, G2.state && G2.state.ended, G2.state && G2.state.week); }
function game2Append(entry) { entry.at = new Date().toISOString(); G2.log.push(entry); apply2(G2.state, entry); game2Save(); }
function game2Reset() { G2.log = []; G2.state = newState2(); game2Save(); }
function game2Export() { return JSON.stringify({ prototype: 3, game: G2.state.game, cards: CARDS.version || '', log: G2.log }, null, 1); }
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
  const story = storyChoice();
  game2Append({ t: 'start', character: characterId, game: 'p' + Date.now().toString(36), cards: CARDS.version || '', story, goal: goalOfTheDay(undefined, story), day: dayKey() });
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
    const e = { t: 'take', inst, option, who: isPass(c, option) ? [] : who };
    // for the fun measures (post/spiel/036 item 6): options playable on this card, cards on the board with a paid-for option
    e.playable = optionsFor(s, c).filter((x) => x.ok).length;
    e.affordable = s.board.filter((x) => { const k = cardOf(x.card); return k && k.kind === 'event' && optionsFor(s, k).some((y) => y.ok && !isPass(k, y.i)); }).length;
    if (o.check && !isPass(c, option)) { e.roll = 1 + Math.floor(Math.random() * 6); e.rise = Math.random() < RISE_CHANCE; }
    game2Append(e);
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

// =====================================================================================================================
// Prototype 3 – people with skill levels and trait scales, checks, the goal (post/spiel/028; Betreiber 17:10)
// =====================================================================================================================
let DOERS = null;   // who did the card whose effects are being applied (trait effects move their axes)

// ---------- trait axes: one per pair, −2 … +2; positive = the first word of the pair ----------
const AXIS = {}; OPPOSITES.forEach(([a, b]) => { AXIS[a] = { key: a, sign: 1 }; AXIS[b] = { key: a, sign: -1 }; });
function axisWord(key, v) { const pair = OPPOSITES.find((x) => x[0] === key); return pair ? (v > 0 ? pair[0] : pair[1]) : key; }
function initPerson(s, id) {
  const c = cardOf(id); if (!c) return;
  if (!s.axes[id]) { s.axes[id] = {}; (c.traits || []).forEach((t) => { const a = AXIS[t]; if (a && Object.keys(s.axes[id]).length < LIVE_AXES) s.axes[id][a.key] = a.sign; }); }
  if (!s.lv[id]) { s.lv[id] = {}; (c.skills || []).forEach((k, i) => { s.lv[id][k] = i < 2 ? 2 : 1; }); }
  if (!s.rose[id]) s.rose[id] = {};
}
// the words a person has now: "calm" when the calm axis is above zero; for the player also s.traits (engine.js uses it)
function traitWords(s, id) { const ax = s.axes[id] || {}; return Object.keys(ax).filter((k) => ax[k]).map((k) => axisWord(k, ax[k])); }
function traitValue(s, id, word) { const a = AXIS[word]; if (!a) return 0; const v = (s.axes[id] || {})[a.key] || 0; return v * a.sign; }  // ≥1: has it
function refreshTraits(s) { if (s.character) s.traits = traitWords(s, s.character); }
function pushTrait(s, id, word, dir) {
  const a = AXIS[word]; if (!a) return; const ax = s.axes[id] || (s.axes[id] = {});
  const v = ax[a.key] || 0;
  if (dir > 0) {
    if (!v && Object.keys(ax).filter((k) => ax[k]).length >= LIVE_AXES) { s.notes.push({ id, full: word }); return; }   // no fourth axis
    ax[a.key] = Math.max(-AXIS_MAX, Math.min(AXIS_MAX, v + a.sign));
  } else if (v * a.sign > 0) ax[a.key] = v - a.sign;                                                                  // only weakens
  if (!ax[a.key]) delete ax[a.key];
}
// ---------- skill levels 0–3 ----------
function levelOf(s, id, skill) {
  let l = (s.lv[id] || {})[skill] || 0;
  if (id === s.character && !l && s.possessions.some((p) => { const c = cardOf(p); return c && (c.gives || []).indexOf('skill:' + skill) >= 0; })) l = 1;
  return l;
}

// ---------- engine.js functions, P3 versions (assigned, so the page's engine.js calls them) ----------
const holdsBase = holds, effectBase = effect;
holds = function (s, cond) {
  if (s.axes === undefined) return holdsBase(s, cond);
  const p = cond.split(':');
  if (p[0] === 'trait') return traitValue(s, s.character, p[1]) >= 1;
  if (p[0] === 'skill') return levelOf(s, s.character, p[1]) >= 1;
  return holdsBase(s, cond);
};
effect = function (s, ef) {
  if (s.axes === undefined) return effectBase(s, ef);
  const p = String(ef).split(':');
  if (p[0] === 'trait') { (DOERS || [s.character]).forEach((id) => pushTrait(s, id, p[1].slice(1), p[1][0] === '+' ? 1 : -1)); return; }
  effectBase(s, ef);
};
skillsOf = function (s) {
  if (!s.lv) return [];
  const out = Object.keys(s.lv[s.character] || {}).filter((k) => s.lv[s.character][k] > 0);
  s.possessions.forEach((id) => { const c = cardOf(id); (c && c.gives || []).forEach((g) => { if (g.startsWith('skill:')) addUnique(out, g.slice(6)); }); });
  return out;
};

// ---------- checks: level + d6 (+ trait) against difficulty × 2 ----------
function checkParts(s, o, who) {
  const ck = o.check; if (!ck) return null;
  const doers = (who && who.length ? who : [s.character]);
  // the best of the doers does the check
  let best = doers[0], lv = -1;
  doers.forEach((id) => { const l = levelOf(s, id, ck.skill); if (l > lv) { lv = l; best = id; } });
  let mod = 0;
  if (ck.trait) { const v = traitValue(s, best, ck.trait); mod = v >= 1 ? 1 : v <= -1 ? -1 : 0; }
  return { skill: ck.skill, difficulty: ck.difficulty, target: ck.difficulty * 2, lv, mod, who: best, trait: ck.trait };
}
function outcomeOf(total, target) { return total >= target ? 'success' : total >= target - 2 ? 'partial' : 'failure'; }
// chance of success / partial / failure before rolling
function checkOdds(s, o, who) {
  const p = checkParts(s, o, who); if (!p) return null;
  const n = { success: 0, partial: 0, failure: 0 };
  for (let d = 1; d <= 6; d++) n[outcomeOf(p.lv + d + p.mod, p.target)]++;
  return { parts: p, success: n.success / 6, partial: n.partial / 6, failure: n.failure / 6 };
}
function checkResolve(s, o, who, act) {
  if (!o.check || !act || !act.roll || !who || !who.length) return null;
  const p = checkParts(s, o, who);
  const total = p.lv + act.roll + p.mod;
  const outcome = outcomeOf(total, p.target);
  const effects = outcome === 'success' ? o.effects : outcome === 'partial' ? (o.partial || o.failure || []) : (o.failure || []);
  return { outcome, effects, parts: p, line: { skill: p.skill, lv: p.lv, roll: act.roll, mod: p.mod, target: p.target, outcome, who: p.who } };
}
function riseSkill(s, res) {
  const id = res.parts.who; const k = res.parts.skill; const q = Math.ceil(s.month / 3);
  const now = (s.lv[id] || (s.lv[id] = {}))[k] || 0;
  if (now >= SKILL_MAX || (s.rose[id] || (s.rose[id] = {}))[k] === q) return;
  s.lv[id][k] = now + 1; s.rose[id][k] = q;
  s.history.push({ week: s.week, month: s.month, card: id, rise: { skill: k, from: now, to: now + 1 }, text: 'Learned.', text_de: 'Gelernt.', who: [id] });
}
// what changed for the people: trait axes and levels, for the story and the toast
function snapPeople(s) { return { axes: JSON.parse(JSON.stringify(s.axes)), notes: s.notes.length }; }
function diffPeople(s, b) {
  const out = [];
  Object.keys(s.axes).forEach((id) => {
    const now = s.axes[id] || {}, was = b.axes[id] || {};
    new Set(Object.keys(now).concat(Object.keys(was))).forEach((k) => {
      const v0 = was[k] || 0, v1 = now[k] || 0; if (v0 === v1) return;
      out.push({ id, from: v0 ? axisWord(k, v0) + ' ' + Math.abs(v0) : '0', to: v1 ? axisWord(k, v1) + ' ' + Math.abs(v1) : '0', key: k });
    });
  });
  s.notes.slice(b.notes).forEach((n) => out.push({ id: n.id, full: n.full }));
  return out;
}

// ---------- the goal: one per game, the same for everyone on the same day ("story of the day") ----------
function dayKey() { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
// the story-line of a new game: ?story=<stack>, else the last one chosen on the start page, else the-signal (post/spiel/035)
const STORY_DEFAULT = 'the-signal';
function storyLines() { const out = []; CARDS.all.forEach((c) => { if (c.kind === 'event' && c.stack && ['personal', 'given', 'start', 'goals'].indexOf(c.stack) < 0 && out.indexOf(c.stack) < 0) out.push(c.stack); }); return out; }
function storyChoice() {
  const lines = storyLines(); let want = null;
  try { want = new URLSearchParams(location.search).get('story'); } catch (e) { /* no location */ }
  if (!want) { try { want = localStorage.getItem('nowhere.p3.story'); } catch (e) { /* no storage */ } }
  if (want && lines.indexOf(want) >= 0) return want;
  return lines.indexOf(STORY_DEFAULT) >= 0 ? STORY_DEFAULT : (lines[0] || null);
}
function storySet(stack) { try { localStorage.setItem('nowhere.p3.story', stack); } catch (e) { /* no storage */ } }
function goalOfTheDay(day, story) {
  // goals of the open story-line or of any (post/spiel/035 item 2)
  const goals = CARDS.all.filter((c) => c.kind === 'goal' && (!story || !c.story || c.story === 'any' || c.story === story)).sort((a, b) => a.id.localeCompare(b.id));
  if (!goals.length) return null;
  const k = String(day || dayKey()); let h = 2166136261; for (let i = 0; i < k.length; i++) { h ^= k.charCodeAt(i); h = Math.imul(h, 16777619); }
  return goals[(h >>> 0) % goals.length].id;
}
function goalProgress(s) {
  const g = s.goal && cardOf(s.goal); if (!g) return null;
  const m = g.measure; let now = 0;
  if (m === 'money') now = s.money; else if (m === 'influence') now = s.influence; else if (m === 'status') now = s.status;
  else if (m === 'possessions') now = s.possessions.length; else if (m === 'contacts') now = s.contacts.length;
  else if (m === 'team') now = s.associates.length + 1; else if (m === 'personal') now = s.personalPlayed;
  else if (m.startsWith('flag:')) now = s.flags[m.slice(5)] ? 1 : 0;
  return { goal: g, now, target: g.target, done: now >= g.target, flag: m.startsWith('flag:') };
}

// ---------- the deck does not run dry: a story card nobody took may come back after 20 weeks ----------
function relayable(s, c) {
  return c.kind === 'event' && arrivesOf(c) === 'board' && !c.beat && s.stacks[c.stack] && s.drawnAt[c.id] != null && s.week - s.drawnAt[c.id] >= RELAY_WEEKS &&
    !onBoard(s, c.id) && !s.history.some((h) => h.card === c.id) && (c.requires || []).every((r) => holds(s, r));
}
const rulesAuthorBase = rulesAuthor;
rulesAuthor = function (s, rnd, already) {
  const items = rulesAuthorBase(s, rnd, already);
  const story = items.filter((x) => !x.personal).length + (already || []).filter((x) => !x.personal).length;
  const fresh = s.board.filter((b) => !b.personal && !b.beat && !b.ai && s.week - b.since < FRESH_WEEKS).length;
  if (!story && fresh < 2) {
    const back = CARDS.all.filter((c) => relayable(s, c));
    if (back.length) { const c = pick(back, rnd || Math.random); items.push({ card: c.id, inst: s.game + '-w' + String(s.week).padStart(2, '0') + '-again-' + c.id, since: s.week, expires: s.week + EXPIRES_STORY - 1, personal: false, again: true }); }
  }
  return items;
};

// ---------- the AI author: repair what can be repaired, plan ahead, write every failure into the log (027) ----------
const V3_PLACES = ['home', 'europe', 'usa', 'russia', 'china', 'india'];
function repairCard(c, s) {
  const fixes = [];
  if (!c || typeof c !== 'object' || !Array.isArray(c.options) || !c.options.length || typeof c.title !== 'string' || !c.title.trim()) return fixes;
  const fix = (what) => fixes.push(what);
  c.kind = 'event';
  if (c.title.length > 80) { c.title = c.title.slice(0, 77) + '…'; fix('title shortened'); }
  if (typeof c.stack !== 'string' || !V_NAME.test(c.stack)) { c.stack = 'personal'; fix('stack → personal'); }
  if (!(c.reach === 'global' || c.reach === 'personal' || /^block:[a-z]+$/.test(c.reach || ''))) { c.reach = 'personal'; fix('reach → personal'); }
  const clamp = (k, lo, hi, def) => { if (c[k] == null) return; let v = parseInt(c[k], 10); if (!Number.isFinite(v)) { delete c[k]; fix(k + ' dropped'); return; } const w = Math.max(lo, Math.min(hi, v)); if (w !== c[k]) { c[k] = w; fix(k + ' → ' + w); } };
  if (!Number.isInteger(c.impact)) { c.impact = 2; fix('impact → 2'); } clamp('impact', 1, 5); clamp('takes', 0, 13); clamp('expires', 1, 52); clamp('week', s.week, s.week + PLAN_AHEAD);
  if (c.costs != null && c.costs !== 0 && c.costs !== 1) { c.costs = 1; fix('costs → 1'); }
  // the engine sets the numbers the game hangs on (post/spiel/034 item 1): an act of impact 2+ costs strength,
  // away from home it takes a week – except the card of someone coming back this week
  const returning = (s.returning_this_week || []).some((r) => r && (String(c.id).indexOf(r.id) >= 0 || (Array.isArray(c.requires) && c.requires.some((q) => String(q).indexOf(r.id) >= 0))));
  if (c.impact >= 2 && !c.costs && !c.beat && !returning) { c.costs = 1; fix('costs → 1'); }
  if (c.arrives != null && c.arrives !== 'board' && c.arrives !== 'draw') { delete c.arrives; fix('arrives dropped'); }
  if (c.who != null && !/^(self|anyone|self\+1|profession:[a-z0-9-]+)$/.test(c.who)) { c.who = 'anyone'; fix('who → anyone'); }
  if (c.place != null && !(has(V3_PLACES, c.place) || (cardOf(c.place) && /place|possession/.test(cardOf(c.place).kind)))) { c.place = 'home'; fix('place → home'); }
  if (c.place && c.place !== 'home' && !c.takes && !c.beat && !returning) { c.takes = 1; fix('takes → 1'); }   // 034 item 1
  const cond = (x) => { if (typeof x !== 'string') return false; if (x === 'always') return true; const p = x.split(':'); if (!has(V_ORIGINS, p[0]) || !p[1]) return false; if (p[0] === 'trait') return !!V_TRAITS[p[1]]; if (p[0] === 'month' || p[0] === 'until') return /^\d+$/.test(p[1]); return true; };
  if (!Array.isArray(c.requires)) c.requires = [];
  const req = c.requires.filter(cond); if (req.length !== c.requires.length) { c.requires = req; fix('requires cleaned'); }
  c.options = c.options.filter((o) => o && typeof o.text === 'string' && o.text.trim()).slice(0, 5);
  c.options.forEach((o, i) => {
    if (!cond(o.origin)) { o.origin = 'always'; fix('option ' + i + ' origin → always'); }
    o.cost = o.cost && typeof o.cost === 'object' ? o.cost : {};
    Object.keys(o.cost).forEach((k) => { if (!has(['money', 'influence'], k) || !Number.isInteger(o.cost[k]) || o.cost[k] < 0) { delete o.cost[k]; fix('option ' + i + ' cost ' + k + ' dropped'); } else if (o.cost[k] > 2) { o.cost[k] = 2; fix('option ' + i + ' cost ' + k + ' → 2'); } });
    ['effects', 'partial', 'failure'].forEach((key) => {
      if (o[key] == null) return; if (!Array.isArray(o[key])) { delete o[key]; fix('option ' + i + ' ' + key + ' dropped'); return; }
      const ok = o[key].filter((ef) => {
        const p = String(ef).split(':');
        if (!has(V_EFFECTS, p[0])) return false;
        if ((p[0] === 'money' || p[0] === 'influence') && !/^[+-]?\d+$/.test(p[1] || '')) return false;
        if (p[0] === 'trait' && !(/^[+-]/.test(p[1] || '') && V_TRAITS[(p[1] || '').slice(1)])) return false;
        return true;
      }).map((ef) => { const p = String(ef).split(':'); const m = effectMax(c); if ((p[0] === 'money' || p[0] === 'influence') && Math.abs(+p[1]) > m) { p[1] = (+p[1] > 0 ? '+' : '-') + m; fix('option ' + i + ' ' + key + ' ' + ef + ' → ' + p.join(':')); } return p.join(':'); });
      if (ok.length !== o[key].length) fix('option ' + i + ' ' + key + ': ' + (o[key].length - ok.length) + ' dropped');
      o[key] = ok;
    });
    if (!o.effects) o.effects = [];
    if (o.check != null && !(o.check && SKILL_WORDS.indexOf(o.check.skill) >= 0 && Number.isInteger(o.check.difficulty))) { delete o.check; delete o.partial; delete o.failure; fix('option ' + i + ' check dropped'); }
    else if (o.check) { o.check.difficulty = Math.max(1, Math.min(5, o.check.difficulty)); if (o.check.trait && !V_TRAITS[o.check.trait]) delete o.check.trait; }
  });
  if (!c.options.some((o) => o.origin === 'always' && !o.cost.money && !o.cost.influence)) { c.options.push({ text: (s && s.lang === 'de') ? 'Vorbeiziehen lassen.' : 'Let it pass.', origin: 'always', cost: {}, effects: [] }); fix('pass option added'); }
  return fixes;
}
const SKILL_WORDS = ['persuasion', 'deception', 'intimidation', 'insight', 'performance', 'languages', 'stealth', 'sleight-of-hand', 'athletics', 'survival', 'perception', 'technology', 'medicine', 'science', 'history', 'investigation', 'religion', 'finance'];

const authorAskBase = authorAsk;
authorAsk = function (s) {
  // the P2 path asks, validates and builds items; here: repair before validating, keep rejects and the error, plan ahead
  AUTHOR.error = ''; AUTHOR.rejected = []; AUTHOR.repaired = [];
  if (AUTHOR.mode === 'off' || AUTHOR.mode === 'rules') return Promise.resolve(null);
  const byo = AUTHOR.mode === 'byo';
  if (byo && !(typeof aiConfigured === 'function' && aiConfigured())) return Promise.resolve(null);
  const brief = authorBrief(s);
  const ac = typeof AbortController !== 'undefined' ? new AbortController() : null;
  let cancelled; const stop = new Promise((res) => { cancelled = res; });
  AUTHOR.cancel = () => { AUTHOR.error = 'cancelled by the player'; try { if (ac) ac.abort(); } catch (e) { /* ignore */ } cancelled(null); };
  const ask = AUTHOR.mode === 'mock' ? Promise.resolve(mockAuthor(brief)) :
    byo ? aiAuthor(brief, ac && ac.signal).catch((e) => { AUTHOR.error = String((e && e.message) || e).slice(0, 200); return null; }) :
    fetch(AUTHOR.url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(brief) }).then((r) => (r.ok ? r.json() : null)).catch((e) => { AUTHOR.error = String(e.message || e); return null; });
  const timeout = new Promise((res) => setTimeout(() => { if (!AUTHOR.error) AUTHOR.error = 'timeout ' + (byo ? 90 : 12) + ' s'; res(null); }, byo ? 90000 : 12000));
  return Promise.race([ask, timeout, stop]).then((res) => {
    AUTHOR.cancel = null;
    if (!res) { if (!AUTHOR.error) AUTHOR.error = 'no answer'; return null; }
    if (!Array.isArray(res.cards)) { AUTHOR.error = 'answer without cards'; return null; }
    if (!res.cards.length) { AUTHOR.error = 'zero cards'; return null; }
    const ids = new Set(res.cards.map((c) => c && c.id));
    const good = []; const seen = (brief.recent_titles || []).slice();
    res.cards.slice(0, 6).forEach((c) => {
      const rep = c && repeatOf(c.title, seen);
      if (rep) { AUTHOR.rejected.push({ id: c.id, title: c.title, errors: ['repeat: ' + rep] }); return; }
      const fixes = repairCard(c, brief);
      const err = validateCard(c, ids);
      if (err.length) AUTHOR.rejected.push({ id: c && c.id, title: c && c.title, errors: err.slice(0, 6) });
      else { good.push(c); seen.push(c.title); if (fixes.length) AUTHOR.repaired.push({ id: c.id, fixes: fixes.slice(0, 8) }); }
    });
    if (!good.length) { AUTHOR.error = 'all ' + res.cards.length + ' cards rejected'; return null; }
    const later = new Set(); good.forEach((c) => c.options.forEach((o) => ['effects', 'partial', 'failure'].forEach((k) => (o[k] || []).forEach((ef) => { const p = String(ef).split(':'); if (p[0] === 'follow') later.add(p[1]); }))));
    const mk = (c) => ({ card: c.id, inst: s.game + '-w' + String(c.week && c.week > s.week ? c.week : s.week).padStart(2, '0') + '-' + c.id, since: s.week,
      expires: s.week + (c.expires || (arrivesOf(c) === 'draw' ? EXPIRES_PERSONAL : EXPIRES_STORY)) - 1, personal: arrivesOf(c) === 'draw', ai: true });
    const now = good.filter((c) => !later.has(c.id) && !(c.week > s.week));
    const plan = good.filter((c) => !later.has(c.id) && c.week > s.week).map((c) => Object.assign(mk(c), { week: c.week, expires_weeks: c.expires || EXPIRES_STORY }));
    return { cards: good, items: now.map(mk), plan, author: res.model || 'ai' };
  });
};
// an option that brings something in: money or influence as an effect (post/spiel/034 item 2)
function pays(c) { return c && c.kind === 'event' && (c.options || []).some((o) => (o.effects || []).some((ef) => /^(money|influence):\+?[1-9]/.test(String(ef)))); }
writeWeek = function (rnd) {
  const s = G2.state;
  return authorAsk(s).then((ai) => {
    let already = ai ? ai.items : []; let over = [];
    // author cards on the board at most AI_MAX (034 item 3a); the personal one always comes
    const onBoardAI = s.board.filter((b) => b.ai && !b.personal).length;
    let free = Math.max(0, AI_MAX - onBoardAI);
    already = already.filter((x) => { if (x.personal) return true; if (free > 0) { free--; return true; } over.push(x.card); return false; });
    // the story deck keeps its room: author cards do not count against it (034 item 3b)
    const rules = rulesAuthor(s, rnd, already.filter((x) => x.personal));
    let items = already.concat(rules);
    const entry = { t: 'add', week: s.week, items, author: ai ? ai.author : 'rules' };
    if (ai) { entry.cards = ai.cards; if (ai.plan.length) entry.plan = ai.plan; if (over.length) entry.over = over; }
    // the author brought nothing that pays: the engine adds a paying hand card from the story deck (034 item 2)
    if (ai && !ai.cards.some(pays)) {
      entry.no_yield = true;
      const taken = new Set(items.map((x) => x.card));
      const payers = CARDS.all.filter((c) => pays(c) && arrivesOf(c) === 'board' && !c.beat && !isFollowUp(c.id) && s.stacks[c.stack] && !taken.has(c.id) && boardDrawable(s, c));
      const fromStory = payers.filter((c) => c.stack === s.story);   // the story-line first, then the personal stack
      if (payers.length) { const c = pick(fromStory.length ? fromStory : payers, rnd || Math.random); items.push({ card: c.id, inst: s.game + '-w' + String(s.week).padStart(2, '0') + '-' + c.id, since: s.week, expires: s.week + (c.expires || EXPIRES_STORY) - 1, personal: false, yield: true }); }
    }
    if (AUTHOR.mode !== 'off' && AUTHOR.mode !== 'rules' && (AUTHOR.mode !== 'byo' || (typeof aiConfigured === 'function' && aiConfigured()))) {
      if (AUTHOR.error) entry.author_error = AUTHOR.error;
      if (AUTHOR.rejected && AUTHOR.rejected.length) entry.rejected = AUTHOR.rejected;
      if (AUTHOR.repaired && AUTHOR.repaired.length) entry.repaired = AUTHOR.repaired;
    }
    if (!items.length && !entry.plan && !entry.author_error) return 0;
    game2Append(entry);
    return items.length;
  });
};
// what the author is told, Prototype 3: goal, levels, trait scales, the plan
const authorBriefBase = authorBrief;
authorBrief = function (s) {
  const b = authorBriefBase(s);
  const gp = goalProgress(s);
  b.goal = gp ? { title: gp.goal.title, measure: gp.goal.measure, target: gp.target, now: gp.now } : null;
  b.character.skills = Object.fromEntries(Object.entries(s.lv[s.character] || {}).filter(([, v]) => v > 0));
  b.character.traits = traitWords(s, s.character).map((w) => w + ' ' + Math.abs(traitValue(s, s.character, w)));
  b.team = b.team.map((p) => Object.assign(p, { skills: Object.fromEntries(Object.entries(s.lv[p.id] || {}).filter(([, v]) => v > 0)), traits: traitWords(s, p.id).map((w) => w + ' ' + Math.abs(traitValue(s, p.id, w))) }));
  b.planned = s.planned.map((x) => ({ week: x.week, card: x.card, title: (cardOf(x.card) || {}).title }));
  b.plan_ahead_weeks = PLAN_AHEAD;
  b.recent_titles = recentTitles(G2.log);
  return b;
};
