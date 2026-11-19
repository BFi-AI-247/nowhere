// Nowhere – Prototype 4 engine, the weave (post/spiel/036, 038; Betreiber 08.11., 19:37 "there is more to build. go."):
// threads with a follow rule, the d20 check, levels and axes for every person, profession levels, years in a row.
// Started as a copy of p3/week.js – Prototype 3 stays as it is.
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
const SWAP_COST = 1;        // the same in a swap – someone made room (Betreiber 09.11., 21:43: "Ja, ein Tausch soll nur 1 Einfluss kosten.")
function teamCost(s, swap) { return swap && s.swapWeek === s.week ? SWAP_COST : RECRUIT_COST; }
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
function takesOf(c, oi) { const o = oi != null && c.options ? c.options[oi] : null; if (o && o.takes != null) return o.takes; return c.takes != null ? c.takes : (arrivesOf(c) === 'draw' ? 0 : 1); }
function costsOf(c, oi) { const o = oi != null && c.options ? c.options[oi] : null; if (o && o.costs != null) return o.costs; return c.costs != null ? c.costs : 1; }   // an option may say its own time and strength (post/spiel/052 item 1)
function isFree(o) { return o.origin === 'always' && !(o.cost && (o.cost.money || o.cost.influence)); }
// "let it pass" is the LAST free option of a card; earlier free options are real actions that take people and time
// (found in the second playthrough review: "A month in Lisbon" had two free options and both resolved at once)
function passIndex(c) { let k = -1; (c.options || []).forEach((o, i) => { if (isFree(o)) k = i; }); return k; }
function isPass(c, i) { return passIndex(c) === i; }

// ---------- state ----------
function newState2() {
  const s = newState();
  return Object.assign(s, { week: 0, month: 1, draws: 99, people: {}, board: [], activities: [], aiCards: {}, author: 'rules', ended: false,
    axes: {}, lv: {}, rose: {}, prof: {}, profUses: {}, threads: {}, year: 1, goal: null, household: [], ages: {}, onceTaken: {}, awayWeeks: {}, income: [], planned: [], drawnAt: {}, personalPlayed: 0, authorLog: [], notes: [] });
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
function team(s) { const m = mateOf(s); return [s.character].concat(s.associates.map((a) => a.id), m ? [m] : []).filter((id) => s.people[id]); }
function mateOf(s) { return (s.household || []).find((id) => (cardOf(id) || {}).relation === 'mate') || null; }
function childrenOf(s) { return (s.household || []).filter((id) => (cardOf(id) || {}).relation === 'child'); }

function reduce2(log) { const s = newState2(); log.forEach((e) => apply2(s, e)); return s; }
function apply2(s, e) {
  switch (e.t) {
    case 'income': {                     // passive income for the month that ends (Betreiber 10.11., 15:46; form 054)
      const r = incomeOf(s, e.month, e.d6);
      s.money = Math.max(0, s.money + r.money); s.influence = Math.max(0, s.influence + r.influence);
      s.income.push(r);
      s.history.push({ week: s.week, month: s.month, card: null, income: r, text: incomeLine(r, 'en'), text_de: incomeLine(r, 'de'), who: [] });
      break;
    }
    case 'config': s.config = e.author; break;   // what changed mid-game (064) – nothing in the game changes
    case 'year': {                       // years in a row (post/spiel/036 item 7): the people, things, values and flags go on
      if (!s.ended) return;
      s.years = (s.years || []).concat([{ year: s.year, story: s.story, goal: s.goal, history: s.history, threads: s.threads }]);
      s.year++; s.week = 1; s.month = 1; s.ended = false; s.awayWeeks = {};
      childrenOf(s).forEach((id) => { s.ages[id] = (s.ages[id] || 0) + 1; });   // children grow (054)
      s.board = []; s.activities = []; s.planned = []; s.followups = []; s.drawn = {}; s.drawnAt = {}; s.history = []; s.threads = {}; s.personalPlayed = 0;
      Object.keys(s.people).forEach((id) => { s.people[id].busy = null; s.people[id].at = 'home'; });
      s.story = e.story || s.story; s.stacks = {}; if (s.story) { s.stacks[s.story] = true; s.stacks.personal = true; }
      s.goal = e.goal && cardOf(e.goal) ? e.goal : null;
      break;
    }
    case 'start': {
      apply(s, e);                       // character, resources, associates, contacts (../engine.js)
      s.week = 1; s.month = 1; s.draws = 99;
      ((cardOf(e.character) || {}).household || []).forEach((id) => householdAdd(s, id));   // children (and a partner) from the start (054)
      s.stacks = {}; s.story = e.story || null;
      if (e.story) { s.stacks[e.story] = true; s.stacks.personal = true; }   // one story-line per game (post/spiel/035 item 1)
      else CARDS.all.forEach((c) => { if (c.stack && c.stack !== 'given' && c.stack !== 'start') s.stacks[c.stack] = true; });   // games before 07.11., 23:16
      addPerson(s, s.character, 'home'); s.associates.forEach((a) => addPerson(s, a.id, 'home'));
      s.goal = e.goal && cardOf(e.goal) ? e.goal : null;
      refreshTraits(s);
      break;
    }
    case 'add': {                        // the author's cards for this week (rules or AI); AI cards travel in the log
      (e.cards || []).forEach((c) => { s.aiCards[c.id] = c; cardsRegister(c); threadDefine(s, c); });
      e.items.forEach((it) => { s.drawn[it.card] = true; s.drawnAt[it.card] = s.week; s.followups = s.followups.filter((f) => f.card !== it.card); s.board.push(it); threadSeen(s, it.card); if (s.aiCards[it.card]) (s.aiSeen || (s.aiSeen = {}))[it.card] = s.week; });
      if (e.notes != null) s.authorNotes = e.notes;   // the author's notebook (059 item 1a)
      // the author's plan for the next weeks: a new plan for a week replaces the old one for that week
      if (e.plan && e.plan.length) {
        const weeks = new Set(e.plan.map((x) => x.week));
        s.planned = s.planned.filter((x) => !weeks.has(x.week)).concat(e.plan);
      }
      if (e.author) s.author = e.author;
      s.authorLog.push({ week: s.week, author: e.author || 'rules', error: e.author_error || '', rejected: (e.rejected || []).length, repaired: (e.repaired || []).length, cards: (e.cards || []).length, dropped: (e.dropped || []).length, waiting: e.author_waiting || null, plan: e.author_plan || null, notes: e.notes != null ? e.notes : null, diag: e.author_diag || null });
      break;
    }
    case 'take': {
      const i = s.board.findIndex((b) => b.inst === e.inst); if (i < 0) return;
      const item = s.board[i]; const c = cardOf(item.card); if (!c) return;
      s.board.splice(i, 1);
      if (item.personal && e.option !== 'pass') s.personalPlayed++;
      if (c.kind === 'person' || c.kind === 'possession') {
        if (e.option === 'contact') { s.influence -= 1; addUnique(s.contacts, c.id); initPerson(s, c.id); }   // contacts have levels and axes too (036 item 2)
        if (e.option === 'team') {          // straight into the team: keep in touch + recruit (post/spiel/025)
          s.influence -= 1 + teamCost(s, e.swap); if (e.swap) s.swapWeek = null; s.associates.push({ id: c.id });
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
      threadTake(s, c, isPass(c, e.option), c.options[e.option]);
      if (c.once && !isPass(c, e.option)) s.onceTaken[c.id] = s.year || 1;   // once: never again in this campaign (053)
      s.money -= o.cost.money || 0; s.influence -= o.cost.influence || 0;
      if (isPass(c, e.option) || !e.who || !e.who.length) { finish(s, c, o, null); return; }
      const roll = { res: checkAt(s, c, o, e) };
      if (e.roll && e.roll.push) { const d = s.people[(roll.res && roll.res.parts.who) || e.who[0]]; if (d) d.res = Math.max(0, d.res - 1); }   // a push costs one energy
      const place = placeOf(c);
      let dur = takesOf(c, e.option);
      // takes 0 is a call or a decision from where one is – no travel (post/spiel/057; Betreiber 11.11., 17:40 "keine Zeit … doch geblockt")
      const travel = dur > 0 ? Math.max(...e.who.map((id) => travelWeeks(s, s.people[id] ? s.people[id].at : 'home', place))) : 0;
      dur += travel;
      e.who.forEach((id) => { const p = s.people[id]; if (p) p.res = Math.max(0, p.res - costsOf(c, e.option)); });
      if (dur === 0) { finish(s, c, o, e.who, roll); return; }   // no change of place without time (057)
      const act = { inst: e.inst, card: c.id, option: e.option, who: e.who.slice(), from: s.week, until: s.week + dur, place, res: roll.res };
      s.activities.push(act);
      e.who.forEach((id) => { const p = s.people[id]; if (p) p.busy = act; });
      break;
    }
    case 'recruit': {                    // a contact joins the team: 2 influence, there next week (Betreiber 01:08)
      const cost = teamCost(s, e.swap);
      if (!has(s.contacts, e.id) || s.associates.length >= MAX_ASSOCIATES || s.influence < cost) return;
      s.influence -= cost; if (e.swap) s.swapWeek = null; remove(s.contacts, e.id); s.associates.push({ id: e.id });
      s.people[e.id] = { at: 'home', res: 0, busy: null }; initPerson(s, e.id);
      const act = { inst: 'join-' + e.id + '-' + s.week, card: null, join: true, who: [e.id], from: s.week, until: s.week + 1, place: 'home' };
      s.activities.push(act); s.people[e.id].busy = act;
      s.history.push({ week: s.week, month: s.month, card: e.id, text: 'Joined the team.', text_de: 'Kommt ins Team.', who: [] });
      break;
    }
    case 'dismiss': {                    // an associate goes back to the contacts: at once, free; not while away
      const i = s.associates.findIndex((a) => a.id === e.id); const p = s.people[e.id];
      if (i < 0 || (p && p.busy)) return;
      s.associates.splice(i, 1); addUnique(s.contacts, e.id); delete s.people[e.id]; s.swapWeek = s.week;
      s.history.push({ week: s.week, month: s.month, card: e.id, text: 'Back to the contacts.', text_de: 'Zurück zu den Kontakten.', who: [] });
      break;
    }
    case 'next': {
      const nw = s.week + 1;
      { const me = s.people[s.character]; if (me && me.busy && me.busy.place && me.busy.place !== 'home') s.awayWeeks[s.month] = (s.awayWeeks[s.month] || 0) + 1; }
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
      s.board = s.board.filter((b) => { if (b.expires == null || b.expires >= nw) return true; threadLay(s, b.card, nw); return false; });
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
        s.board.push({ card: x.card, inst: x.inst, since: nw, expires: nw + exp - 1, personal: !!x.personal, ai: true, planned: true }); threadSeen(s, x.card); (s.aiSeen || (s.aiSeen = {}))[x.card] = nw;
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
  if (res && res.fumble) { const t = (o.failure || []).find((ef) => String(ef).startsWith('trait:')); if (t) { DOERS = [res.parts.who]; effect(s, t); DOERS = null; } }   // natural 1: the turn
  if (res && res.outcome === 'strong') riseSkill(s, res);
  if (who && who.length) profUse(s, c, who);
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
function doersFor(s, c, oi) {
  const ok = (id) => { const p = s.people[id]; return p && !p.busy && p.res >= costsOf(c, oi); };
  const ch = s.character; const assoc = s.associates.map((a) => a.id).filter((id) => s.people[id]);
  const w = whoOf(c);
  let teams;
  const mate = mateOf(s);
  if (w === 'mate') teams = mate ? [[mate]] : [];   // the partner acts too – team member five (Betreiber 10.11., 15:5x)
  else if (w === 'self') teams = [[ch]];
  else if (w === 'anyone') teams = [[ch]].concat(assoc.concat(mate ? [mate] : []).map((id) => [id]));
  else if (w === 'self+1') teams = assoc.concat(mate ? [mate] : []).map((id) => [ch, id]);
  else if (w.startsWith('profession:')) teams = assoc.concat(mate ? [mate] : []).filter((id) => { const p = cardOf(id); return p && p.profession === w.slice(11); }).map((id) => [id]);
  else teams = [[ch]];
  const place = placeOf(c);
  return teams.map((t) => ({ who: t, ok: t.every(ok), busy: t.some((id) => s.people[id] && s.people[id].busy), noRes: t.some((id) => s.people[id] && s.people[id].res < costsOf(c, oi)),
    weeks: takesOf(c, oi) + (takesOf(c, oi) > 0 ? Math.max(...t.map((id) => travelWeeks(s, s.people[id] ? s.people[id].at : 'home', place))) : 0),
    travel: takesOf(c, oi) > 0 ? Math.max(...t.map((id) => travelWeeks(s, s.people[id] ? s.people[id].at : 'home', place))) : 0 }));
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
  const story = events.filter((c) => arrivesOf(c) === 'board' && !c.beat && !isFollowUp(c.id) && !taken.has(c.id) && threadAlive(s, c));
  const lively = story.filter((c) => !waitOnly(s, c));
  let pool = lively.length ? lively : story;
  const teamish = pool.filter((c) => (s.possessions.indexOf(placeOf(c)) >= 0) || (whoOf(c).startsWith('profession:') && doersFor(s, c).length) || whoOf(c) === 'self+1');
  let room = Math.max(0, Math.min(STORY_PER_WEEK - already.filter((x) => !x.personal).length, BOARD_MAX - open));
  // the follow rule (post/spiel/036 item 4): a thread the player entered gets its next card 2–4 weeks after the last one,
  // before any new thread opens; it is in the room of the story deck
  const due = dueThreads(s);
  due.forEach((d) => {
    if (!room) return;
    const next = nextOfThread(s, d.id, events.filter((c) => !taken.has(c.id) && !c.beat && !isFollowUp(c.id)), rnd);
    if (next) { put(next, false); room--; d.served = true; }
  });
  if (due.some((d) => !d.served && s.week - d.rec.last <= FOLLOW_MAX)) { const keep = pool.filter((c) => !opensNew(s, c)); if (keep.length) pool = keep; }
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

// ---------- the weave: threads (post/spiel/036 items 3+4, 038; Betreiber 07.11., 23:06 "I want to follow that story") ----------
// s.threads[id] = { opened, cards: [card ids taken], entered, last, closed, faded, lay }; definitions in cards.json "threads"
const FOLLOW_MIN = 2, FOLLOW_MAX = 4, FADE_AFTER = 2;
const THREADS = {};
const cardsLoadBase = cardsLoad;
cardsLoad = function (data) { cardsLoadBase(data); Object.keys(THREADS).forEach((k) => { delete THREADS[k]; }); (data.threads || []).forEach((t) => { THREADS[t.id] = t; }); };
function threadsOf(c) { const t = c && c.thread; return !t ? [] : Array.isArray(t) ? t : [t]; }
function threadDef(s, id) { return THREADS[id] || (s.threadDefs && s.threadDefs[id]) || { id, title: id.replace(/-/g, ' '), question: '', endings: [], length: 4 }; }
function threadRec(s, id) { return s.threads[id] || (s.threads[id] = { opened: s.week, cards: [], entered: null, last: null, closed: null, faded: null, lay: 0 }); }
// the part a card plays in one of its threads: part may be a word or { thread: word } (a crossing that closes one and opens another)
function partIn(s, c, id) {
  const p = c.part && typeof c.part === 'object' ? c.part[id] : c.part;
  const rec = s.threads[id];
  if (p === 'closes' && (!rec || !rec.cards.length)) return 'opens';   // a crossing that closes another thread opens this one
  return p || 'continues';
}
function threadSeen(s, cardId) { threadsOf(cardOf(cardId)).forEach((id) => threadRec(s, id)); }
function threadTake(s, c, passed, o) {
  threadsOf(c).forEach((id) => {
    const r = threadRec(s, id);
    if (passed) { r.lay++; if (r.lay >= FADE_AFTER && !r.closed) r.faded = r.faded || s.week; return; }
    const part = partIn(s, c, id);
    r.cards.push(c.id); r.last = s.week; r.lay = 0;
    if (part === 'closes') { r.closed = s.week; if (o && o.ending) r.ending = String(o.ending).slice(0, 60); } else r.entered = r.entered || s.week;
  });
}
function threadLay(s, cardId, week) {
  threadsOf(cardOf(cardId)).forEach((id) => { const r = threadRec(s, id); r.lay++; if (r.lay >= FADE_AFTER && !r.closed) r.faded = r.faded || week; });
}
// a card the AI wrote for a new thread brings its definition along: thread_question, thread_endings
function threadDefine(s, c) {
  if (!c || !c.thread_question) return;
  const id = threadsOf(c)[0]; if (!id || THREADS[id]) return;
  (s.threadDefs || (s.threadDefs = {}))[id] = { id, title: c.thread_title || id.replace(/-/g, ' '), question: c.thread_question, endings: c.thread_endings || [], length: c.thread_length || 4, ai: true };
}
function threadAlive(s, c) { const ts = threadsOf(c); return !ts.length || ts.some((id) => { const r = s.threads[id]; return !r || (!r.closed && !r.faded); }); }
function threadOnBoard(s, id) { return s.board.some((b) => threadsOf(cardOf(b.card)).indexOf(id) >= 0) || s.activities.some((a) => threadsOf(cardOf(a.card)).indexOf(id) >= 0); }
function dueThreads(s) {
  return Object.keys(s.threads).map((id) => ({ id, rec: s.threads[id] }))
    .filter((d) => d.rec.entered && !d.rec.closed && !d.rec.faded && d.rec.last != null && s.week - d.rec.last >= FOLLOW_MIN && !threadOnBoard(s, d.id))
    .sort((a, b) => a.rec.last - b.rec.last);
}
const PART_RANK = { continues: 0, turns: 1, closes: 2 };
function nextOfThread(s, id, events, rnd) {
  const r = s.threads[id];
  const cand = events.filter((c) => threadsOf(c).indexOf(id) >= 0 && r.cards.indexOf(c.id) < 0 && partIn(s, c, id) !== 'opens' && !(partIn(s, c, id) === 'closes' && r.cards.length < 2));
  if (!cand.length) return null;
  const best = Math.min(...cand.map((c) => PART_RANK[partIn(s, c, id)] != null ? PART_RANK[partIn(s, c, id)] : 3));
  return pick(cand.filter((c) => (PART_RANK[partIn(s, c, id)] != null ? PART_RANK[partIn(s, c, id)] : 3) === best), rnd || Math.random);
}
// would this card open a thread the player has not met yet?
function opensNew(s, c) { const ts = threadsOf(c); return ts.length > 0 && ts.every((id) => !s.threads[id] || !s.threads[id].cards.length); }
// for the author: the open threads, what each asks, how they can end, how much is left, which one is due
function threadBrief(s) {
  const due = new Set(dueThreads(s).map((d) => d.id));
  return Object.keys(s.threads).filter((id) => !s.threads[id].closed && !s.threads[id].faded).map((id) => {
    const r = s.threads[id]; const d = threadDef(s, id);
    return { id, question: d.question, endings: d.endings, cards_taken: r.cards.length, left: Math.max(0, (d.length || 4) - r.cards.length), entered: !!r.entered, due: due.has(id) };
  });
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
const V_EFFECTS = ['money', 'influence', 'status', 'block', 'trait', 'acquired', 'associate-to-contact', 'gain', 'lose', 'open', 'close', 'flag', 'follow', 'join'];
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
// the mock fills its plan from its cards: cause the phase, yield what the first option brings
function mockAuthor(b) {
  const o = mockAuthorRaw(b);
  o.plan.cards = o.cards.map((c) => { const ef = ((c.options || [])[0] || {}).effects || []; return { id: c.id, serves: 'main', cause: 'phase', yield: ef[0] || 'influence', impact: c.impact }; });
  o.notes = 'mock notebook, week ' + b.week + '; last time ' + String(b.notes || '').length + ' characters';
  return o;
}
function mockAuthorRaw(b) {
  if (b.writing_for_week) b = Object.assign({}, b, { week: b.writing_for_week });   // the background asks for next week (042)
  const plan = { decisions: { main_story: { move: 'mock' }, due_thread: { id: ((b.threads || []).find((t) => t.due) || {}).id || null, move: 'mock' }, last_choice: { from: null, move: 'mock' } }, cards: [], threads: { new: [], advance: [], close: [] }, deferred: [] };
  const mate = b.team.find((p) => p.id !== b.character.id) || b.team[0];
  const thing = (k) => MOCK_THINGS[(b.week + k) % MOCK_THINGS.length] + ' ' + b.week;
  const id = 'ai-' + b.game + '-w' + b.week + '-letter';
  return { model: 'mock', plan, cards: [{
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
const STORE2 = 'nowhere.p4.game';
const G2 = { log: [], state: newState2() };
function game2Load() {
  try { const raw = localStorage.getItem(STORE2); if (raw) { const d = JSON.parse(raw); if (Array.isArray(d.log)) G2.log = d.log; } } catch (e) { /* memory only */ }
  G2.state = reduce2(G2.log);
}
function game2Save() { try { localStorage.setItem(STORE2, JSON.stringify({ log: G2.log, saved: new Date().toISOString() })); } catch (e) { /* ignore */ } playTally(4, G2.log, G2.state && G2.state.ended, G2.state && G2.state.week); }
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
  game2Reset(); BG.job = null;
  const story = storyChoice();
  game2Append({ t: 'start', character: characterId, game: 'p' + Date.now().toString(36), cards: CARDS.version || '', app: APP_BUILD, format: typeof AI_FORMAT !== 'undefined' ? AI_FORMAT : null, author: authorConfig(), story, goal: goalOfTheDay(undefined, story), day: dayKey() });
  return writeWeek(rnd);
}
// the next year: the same character and everything they have, a story-line chosen anew (036 item 7)
// which build of the app wrote the log (bumped with the service worker), and with which author (064)
const APP_BUILD = 'p4-v27';
function authorConfig() {
  const c = typeof AI !== 'undefined' && AI.cfg ? AI.cfg : {};
  return { mode: AUTHOR.mode, preset: c.preset || null, model: c.model || null, background: true, lang: typeof LANG !== 'undefined' ? LANG : null, app: APP_BUILD, cards: CARDS.version || '' };
}
function configCheck() {
  const now = authorConfig(); const st = G2.log.find((e) => e.t === 'start'); if (!st) return;
  const last = G2.log.slice().reverse().find((e) => e.t === 'config') || { author: st.author || {} };
  const was = last.author || {};
  if (['mode', 'preset', 'model', 'app', 'cards'].some((k) => (was[k] || null) !== (now[k] || null))) game2Append({ t: 'config', author: now, week: G2.state.week });
}
function act2NextYear(story, rnd) {
  const s = G2.state; if (!s.ended) return Promise.resolve(0);
  const st = story && storyLines().indexOf(story) >= 0 ? story : storyChoice(); BG.job = null;
  game2Append({ t: 'year', story: st, goal: goalOfTheDay(undefined, st), day: dayKey() });
  return writeWeek(rnd);
}
function act2Take(inst, option, who, roll) {
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
    if (o.check && !isPass(c, option)) {
      // the page shows the die first and passes what fell (and a push); without it (simulators) the engine rolls
      e.roll = roll && roll.dice ? { dice: roll.dice, push: roll.push || null } : { dice: rollD20x2(), push: null };
      if (!roll && PUSH_AUTO) { const r = d20Result(s, c, o, who, e.roll.dice); if (r && canPush(s, c, r)) e.roll.push = rollD20x2(); }
    }
    game2Append(e);
    return true;
  }
  if (option === 'contact' && s.influence < 1) return false;
  const swap = roll === 'swap';   // act2Take(inst, 'team', null, 'swap') right after a dismiss
  if (option === 'team' && (c.kind !== 'person' || s.influence < 1 + teamCost(s, swap) || s.associates.length >= MAX_ASSOCIATES)) return false;
  if (option === 'possession' && s.money < 2) return false;
  game2Append(swap ? { t: 'take', inst, option, swap: true } : { t: 'take', inst, option });
  return true;
}
function act2Next(rnd) {
  const s = G2.state; if (s.ended) return Promise.resolve(0);
  configCheck();   // a new model, key or app version mid-game is written down (064)
  if (monthOf(s.week + 1) !== s.month || s.week + 1 > WEEKS) game2Append({ t: 'income', month: s.month, d6: 1 + Math.floor((rnd || Math.random)() * 6) });
  game2Append({ t: 'next' });
  if (G2.state.ended) return Promise.resolve(0);
  return writeWeek(rnd);
}

function act2Recruit(id, swap) {
  const s = G2.state;
  if (!has(s.contacts, id) || s.associates.length >= MAX_ASSOCIATES || s.influence < teamCost(s, swap)) return false;
  game2Append(swap ? { t: 'recruit', id, swap: true } : { t: 'recruit', id }); return true;
}
function act2Dismiss(id) {
  const s = G2.state; const p = s.people[id];
  if (!s.associates.some((a) => a.id === id) || (p && p.busy)) return false;
  game2Append({ t: 'dismiss', id }); return true;
}

// ---------- passive income (Betreiber 10.11., 15:46: "Passive income for both money and influence. The yield can come
// from the Job and the assets. It may have a reasonable random factor."; 16:0x "Monatlich, wie Spiel_1 vorschlägt") ----------
// job: profession level in money, from level 2 one influence; four weeks or more away in the month halve the job's money;
// things: their yield {money, influence}; the die: 1 → −1 money, 6 → +1 money. Money and influence never fall below 0.
function incomeOf(s, month, d6) {
  const lvl = profLevel(s, s.character);
  const away = (s.awayWeeks || {})[month] || 0;
  const pay = lvl + 1;   // level + 1 (post/spiel/056: with level only, a spender sat on 0 for 20–54 % of the year)
  const job = { money: away >= 4 ? Math.floor(pay / 2) : pay, influence: lvl >= 2 ? 1 : 0, away };
  const things = s.possessions.map((id) => { const c = cardOf(id); const y = (c && c.yield) || {}; return { id, money: y.money || 0, influence: y.influence || 0 }; }).filter((t) => t.money || t.influence);
  const dice = d6 === 1 ? -1 : d6 === 6 ? 1 : 0;
  const money = job.money + things.reduce((n, t) => n + t.money, 0) + dice;
  const influence = job.influence + things.reduce((n, t) => n + t.influence, 0);
  return { month, job, things, d6, dice, money, influence };
}
function incomeLine(r, lang) {
  const de = lang === 'de'; const M = de ? ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'] : MONTH_EN;
  const amt = (m, i) => [m ? (m > 0 ? '+' : '−') + Math.abs(m) + (de ? ' Geld' : ' money') : null, i ? (i > 0 ? '+' : '−') + Math.abs(i) + (de ? ' Einfluss' : ' influence') : null].filter(Boolean).join(', ') || '±0';
  const parts = [(de ? 'Beruf ' : 'job ') + amt(r.job.money, r.job.influence) + (r.job.away >= 4 ? (de ? ' (halb – weg)' : ' (half – away)') : '')]
    .concat(r.things.map((t) => { const c = cardOf(t.id); return (c ? (de && c.title_de) || c.name || c.title : t.id) + ' ' + amt(t.money, t.influence); }),
      [(de ? 'Würfel ' : 'die ') + r.d6 + (r.dice ? ': ' + amt(r.dice, 0) : '')]);
  return (de ? 'Einkommen ' : 'Income ') + M[r.month - 1] + ': ' + parts.join(' · ') + ' → ' + amt(r.money, r.influence);
}
// ---------- the household: partner and children (Betreiber 10.11., 15:46 "You should have a mate card when being married. As
// well as kids cards when being parent."; 16:0x "Spouse kann auch für Aktionen verwendet werden. Ist team member 5.") ----------
function householdAdd(s, id) {
  const c = cardOf(id); if (!c || c.kind !== 'person' || (s.household || []).indexOf(id) >= 0) return false;
  if (c.relation === 'mate' && mateOf(s)) return false;
  remove(s.contacts, id); s.household.push(id);
  if (c.relation === 'mate') { s.people[id] = s.people[id] || { at: 'home', res: 1, busy: null }; }
  initPerson(s, id);
  if (c.relation === 'child') s.ages[id] = c.age != null ? c.age : 0;
  s.history.push({ week: s.week, month: s.month, card: id, text: c.relation === 'mate' ? 'Now at your side.' : 'A child in the house.', text_de: c.relation === 'mate' ? 'Jetzt an deiner Seite.' : 'Ein Kind im Haus.', who: [] });
  return true;
}
// gain:mate / gain:child without an id: the person the story prepared (flag met:<id> or met-<id>), else the first free one
function householdPick(s, rel) {
  const held = new Set([s.character].concat(s.household || [], s.associates.map((a) => a.id)));
  const met = Object.keys(s.flags || {}).map((f) => f.replace(/^met[:-]/, '')).filter((id) => id !== '' && cardOf(id) && cardOf(id).relation === rel && !held.has(id));
  if (met.length) return met[0];
  const c = CARDS.all.find((x) => x.kind === 'person' && x.relation === rel && !held.has(x.id) && (s.stacks[x.stack] || x.stack === 'personal'));
  return c ? c.id : null;
}
// once: a card taken once does not come again, in any year (053 item 1)
const drawableBase = drawable;
drawable = function (s, c) {
  if (c && c.once && s.onceTaken && s.onceTaken[c.id]) return false;
  if (c && s.aiSeen && s.aiSeen[c.id]) return false;   // an author card that has been on the board lives once (058 item 1)
  return drawableBase(s, c);
};

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
  if (String(cond).startsWith('not:')) return !holds(s, cond.slice(4));   // not:flag:x, not:acquired:x (053 item 2)
  if (s.axes === undefined) return holdsBase(s, cond);
  const p = cond.split(':');
  if (p[0] === 'mate') { const m = mateOf(s); return !!m && (p[1] === 'any' || !p[1] || traitValue(s, m, p[1]) >= 1); }   // 054
  if (p[0] === 'child') { const n = parseInt(p[1], 10) || 0; return childrenOf(s).some((id) => (s.ages[id] || 0) >= n); }
  if (p[0] === 'acquired') return (s.acquired || []).indexOf(p[1]) >= 0;
  if (p[0] === 'trait') return traitValue(s, s.character, p[1]) >= 1;
  if (p[0] === 'skill') return levelOf(s, s.character, p[1]) >= 1;
  return holdsBase(s, cond);
};
effect = function (s, ef) {
  if (s.axes === undefined) return effectBase(s, ef);
  const p = String(ef).split(':');
  if (p[0] === 'trait') { (DOERS || [s.character]).forEach((id) => pushTrait(s, id, p[1].slice(1), p[1][0] === '+' ? 1 : -1)); return; }
  if (p[0] === 'join') { joinTeam(s, p[1]); return; }
  if (p[0] === 'gain' && (p[1] === 'mate' || p[1] === 'child')) { const id = householdPick(s, p[1]); if (id) householdAdd(s, id); return; }
  if (p[0] === 'gain' && cardOf(p[1]) && (cardOf(p[1]).relation === 'mate' || cardOf(p[1]).relation === 'child')) { householdAdd(s, p[1]); return; }
  effectBase(s, ef);
};
// join:<person> – a card takes someone into the team, free, there next week; with a full team they stay a contact
// (post/spiel/043 ⟦offen⟧ → 044 "join:<person> brauche ich, bitte bauen")
function joinTeam(s, id) {
  const c = cardOf(id); if (!c || c.kind !== 'person' || id === s.character || s.associates.some((a) => a.id === id)) return;
  if (s.associates.length >= MAX_ASSOCIATES) { addUnique(s.contacts, id); initPerson(s, id); s.history.push({ week: s.week, month: s.month, card: id, text: 'The team is full – stays a contact.', text_de: 'Das Team ist voll – bleibt Kontakt.', who: [] }); return; }
  remove(s.contacts, id); s.associates.push({ id });
  s.people[id] = { at: 'home', res: 0, busy: null }; initPerson(s, id);
  const act = { inst: 'join-' + id + '-' + s.week, card: null, join: true, who: [id], from: s.week, until: s.week + 1, place: 'home' };
  s.activities.push(act); s.people[id].busy = act;
  s.history.push({ week: s.week, month: s.month, card: id, text: 'Joined the team.', text_de: 'Kommt ins Team.', who: [] });
}
skillsOf = function (s) {
  if (!s.lv) return [];
  const out = Object.keys(s.lv[s.character] || {}).filter((k) => s.lv[s.character][k] > 0);
  s.possessions.forEach((id) => { const c = cardOf(id); (c && c.gives || []).forEach((g) => { if (g.startsWith('skill:')) addUnique(out, g.slice(6)); }); });
  return out;
};

// ---------- checks: d20 + level + trait axis (+2 help) against DC 8 · 11 · 14 · 17 · 20 (post/spiel/038 item 2;
// Betreiber 08.11., 19:11 "Ich bin ein Fan von W20 Würfen ala d&d", 19:28 "Yes. Sounds interesting.") ----------
const DC = [8, 11, 14, 17, 20];   // ⟦Spiel_1's numbers, open until played⟧
const STRONG_BY = 5, PARTIAL_BY = 4;
let PUSH_AUTO = false;            // simulators: push every failed or partial check that may be pushed
function rollD20x2() { return [1 + Math.floor(Math.random() * 20), 1 + Math.floor(Math.random() * 20)]; }
function checkParts(s, o, who) {
  const ck = o.check; if (!ck) return null;
  const doers = (who && who.length ? who : [s.character]);
  // the doer with the best level rolls, with their own level and axis (036 item 2); a second doer with the skill helps
  let best = doers[0], lv = -1;
  doers.forEach((id) => { const l = levelOf(s, id, ck.skill); if (l > lv) { lv = l; best = id; } });
  const help = doers.some((id) => id !== best && levelOf(s, id, ck.skill) >= 1) ? 2 : 0;
  const axis = ck.trait ? traitValue(s, best, ck.trait) : 0;
  const prof = profBonus(s, CHECK_CARD, best);
  const adv = /^(possession|contact):/.test(String(o.origin || ''));
  const dis = axis <= -2;
  return { skill: ck.skill, difficulty: ck.difficulty, dc: DC[Math.max(1, Math.min(5, ck.difficulty)) - 1], lv, axis, help, prof,
    mod: lv + axis + help + prof, who: best, trait: ck.trait, adv: adv && !dis, dis: dis && !adv };
}
let CHECK_CARD = null;   // the card being checked (for the profession bonus)
function outcomeOf(nat, total, dc) {
  if (nat === 20) return 'strong';
  if (nat === 1) return 'failure';
  return total >= dc + STRONG_BY ? 'strong' : total >= dc ? 'success' : total >= dc - PARTIAL_BY ? 'partial' : 'failure';
}
function d20Of(p, dice) { return p.adv ? Math.max(dice[0], dice[1]) : p.dis ? Math.min(dice[0], dice[1]) : dice[0]; }
function d20Result(s, c, o, who, dice) {
  CHECK_CARD = c; const p = checkParts(s, o, who); CHECK_CARD = null; if (!p) return null;
  const nat = d20Of(p, dice); const total = nat + p.mod; const outcome = outcomeOf(nat, total, p.dc);
  return { outcome, nat, total, dice: dice.slice(), parts: p, fumble: nat === 1 };
}
function canPush(s, c, r) {
  if (!r || c.beat || (r.outcome !== 'failure' && r.outcome !== 'partial')) return false;
  const d = s.people[r.parts.who]; return !!d && d.res >= costsOf(c, r.oi) + 1;
}
// chances before rolling (exact: 20 or 400 cases)
function checkOdds(s, o, who, c) {
  CHECK_CARD = c || null; const p = checkParts(s, o, who); CHECK_CARD = null; if (!p) return null;
  const n = { strong: 0, success: 0, partial: 0, failure: 0 }; let all = 0;
  for (let a = 1; a <= 20; a++) for (let b = 1; b <= ((p.adv || p.dis) ? 20 : 1); b++) { const nat = d20Of(p, [a, b]); n[outcomeOf(nat, nat + p.mod, p.dc)]++; all++; }
  return { parts: p, strong: n.strong / all, success: (n.strong + n.success) / all, partial: n.partial / all, failure: n.failure / all };
}
// the result kept at the take (checkAt) is what the effects follow
function checkAt(s, c, o, e) {
  if (!o.check || !e.roll || !e.roll.dice || !e.who || !e.who.length) return null;
  const first = d20Result(s, c, o, e.who, e.roll.dice);
  const r = e.roll.push ? d20Result(s, c, o, e.who, e.roll.push) : first;
  if (e.roll.push) r.pushed = { first: first.outcome, nat: first.nat };
  return r;
}
function checkResolve(s, o, who, act) {
  const r = act && act.res; if (!o.check || !r) return null;
  const effects = r.outcome === 'strong' || r.outcome === 'success' ? o.effects : r.outcome === 'partial' ? (o.partial || o.failure || []) : (o.failure || []);
  const p = r.parts;
  return { outcome: r.outcome, effects, parts: p, fumble: r.fumble,
    line: { skill: p.skill, lv: p.lv, roll: r.nat, dice: r.dice, mod: p.mod, dc: p.dc, target: p.dc, outcome: r.outcome, who: p.who, adv: p.adv, dis: p.dis, pushed: r.pushed || null } };
}
// ---------- professions have levels too (036 item 2): 1 at the start, +1 for every three cards done in the profession ----------
const PROF_MAX = 3, PROF_STEP = 3;
function profOf(id) { const c = cardOf(id); return c && c.profession; }
function profLevel(s, id) { return (s.prof || {})[id] != null ? s.prof[id] : (profOf(id) ? 1 : 0); }
function profBonus(s, c, id) { const w = c ? whoOf(c) : ''; return w.startsWith('profession:') && profOf(id) === w.slice(11) ? profLevel(s, id) : 0; }
function profUse(s, c, who) {
  const w = whoOf(c); if (!w.startsWith('profession:')) return;
  who.forEach((id) => {
    if (profOf(id) !== w.slice(11)) return;
    s.profUses[id] = (s.profUses[id] || 0) + 1; const now = profLevel(s, id);
    if (s.profUses[id] % PROF_STEP === 0 && now < PROF_MAX) { s.prof[id] = now + 1; s.history.push({ week: s.week, month: s.month, card: id, rise: { skill: 'profession:' + profOf(id), from: now, to: now + 1 }, text: 'Better at the work.', text_de: 'Besser im Beruf.', who: [id] }); }
  });
}
function riseSkill(s, res) {
  const id = res.parts.who; const k = res.parts.skill; const q = Math.ceil(s.month / 3);
  const now = (s.lv[id] || (s.lv[id] = {}))[k] || 0;
  if (now >= SKILL_MAX) return;   // a strong success raises the skill (d20, 038)
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
  if (!want) { try { want = localStorage.getItem('nowhere.p4.story'); } catch (e) { /* no storage */ } }
  if (want && lines.indexOf(want) >= 0) return want;
  return lines.indexOf(STORY_DEFAULT) >= 0 ? STORY_DEFAULT : (lines[0] || null);
}
function storySet(stack) { try { localStorage.setItem('nowhere.p4.story', stack); } catch (e) { /* no storage */ } }
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
  // gain:/join: only on ids from team, contacts, possessions or available_people (post/spiel/047 item 2)
  if (Array.isArray(s.available_people)) {
    const ok = new Set([].concat((s.team || []).map((p) => p.id), (s.contacts || []).map((p) => p.id), (s.possessions || []).map((p) => p.id), s.available_people.map((p) => p.id), (s.available_things || []).map((p) => p.id)));
    (Array.isArray(c.options) ? c.options : []).forEach((o, i) => ['effects', 'partial', 'failure'].forEach((k) => {
      if (!o || !Array.isArray(o[k])) return;
      o[k] = o[k].filter((ef) => { const p = String(ef).split(':'); if ((p[0] === 'gain' || p[0] === 'join') && !ok.has(p[1])) { fix('option ' + i + ' ' + ef + ' dropped (not in the state)'); return false; } return true; });
    }));
  }
  // a check must bring something (post/spiel/044 item 1; Betreiber 09.11. "Mit dem Würfeln. Nur was bringt es.")
  (Array.isArray(c.options) ? c.options : []).forEach((o, i) => {
    if (!o || !o.check) return;
    const big = (c.impact || 1) >= 3;
    if (!Array.isArray(o.effects) || !o.effects.length) { o.effects = big ? ['money:+1', 'influence:+1'] : ['influence:+1']; fix('option ' + i + ' check → yield'); }
    if (!Array.isArray(o.partial) || !o.partial.length) { if (big) { o.partial = ['influence:+1']; fix('option ' + i + ' check → partial'); } }
    if (!Array.isArray(o.failure) || !o.failure.length) { o.failure = o.check.trait ? ['trait:-' + o.check.trait] : ['influence:-1']; fix('option ' + i + ' check → failure'); }
  });
  // the weave (036 item 3): every author card names its thread; a new thread only with its question and endings
  if (typeof c.thread === 'string') c.thread = [c.thread];
  const open = Array.isArray(s.threads) ? s.threads : []; const known = (id) => !!THREADS[id] || open.some((t) => t.id === id);
  const fallback = () => { const d = open.find((t) => t.due) || open.find((t) => t.entered) || open[0]; return d ? d.id : null; };
  if (Array.isArray(c.thread)) c.thread = c.thread.filter((id) => typeof id === 'string' && /^[a-z0-9-]+$/.test(id)).slice(0, 2);
  const planNew = s.__plan && s.__plan.threads && Array.isArray(s.__plan.threads.new) ? s.__plan.threads.new : null;
  const isNew = Array.isArray(c.thread) && c.thread.length && !known(c.thread[0]) && typeof c.thread_question === 'string' && Array.isArray(c.thread_endings) && c.thread_endings.length
    && open.filter((t) => t.entered).length < 3 && (!planNew || planNew.some((t) => t && t.id === c.thread[0] && Array.isArray(t.endings) && t.endings.length));
  if (Array.isArray(c.thread) && c.thread.length && !isNew) { const k = c.thread.filter(known); if (k.length !== c.thread.length) { fix('thread ' + c.thread.join(',') + ' → ' + (k.join(',') || fallback())); c.thread = k.length ? k : (fallback() ? [fallback()] : []); } }
  if (!Array.isArray(c.thread) || !c.thread.length) { const f = fallback(); if (f) { c.thread = [f]; fix('thread → ' + f); } else delete c.thread; }
  if (c.thread && ['opens', 'continues', 'turns', 'closes'].indexOf(c.part) < 0 && !(c.part && typeof c.part === 'object')) { c.part = isNew ? 'opens' : 'continues'; fix('part → ' + c.part); }
  // a thread ends at its length; it cannot close before two cards were taken (044 item 3)
  const tb = c.thread && typeof c.part === 'string' && open.find((t) => t.id === c.thread[0]);
  if (tb && (c.part === 'continues' || c.part === 'turns') && tb.left <= 1) { c.part = 'closes'; fix('part → closes (thread at its length)'); }
  if (tb && c.part === 'closes' && tb.cards_taken < 2) { c.part = 'continues'; fix('part → continues (too early to close)'); }
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
// the author in the background (post/spiel/042; Betreiber 08.11., 21:00 "Kann der Autor die nächste Woche im Hintergrund
// schreiben?"): at the start of week n the app asks for week n+1 with the state of now; at the week's end the answer
// waits ready. Cards that no longer fit the new state are dropped and named in the next brief. An answer that is not
// there at the week's end is used at the next one.
const BG = { job: null };   // { game, year, forWeek, done, got, started }
function authorFetch(s, forWeek) {
  // ask and check; the result does not depend on the week it is used in
  const got = { error: '', rejected: [], repaired: [], cards: null, model: '' };
  if (AUTHOR.mode === 'off' || AUTHOR.mode === 'rules') return Promise.resolve(null);
  const byo = AUTHOR.mode === 'byo';
  if (byo && !(typeof aiConfigured === 'function' && aiConfigured())) return Promise.resolve(null);
  const brief = authorBrief(s);
  if (forWeek && forWeek > s.week) { brief.writing_for_week = forWeek; brief.note = 'You write for week ' + forWeek + '; the choices of week ' + s.week + ' you see next time.'; }
  const ac = typeof AbortController !== 'undefined' ? new AbortController() : null;
  let cancelled; const stop = new Promise((res) => { cancelled = res; });
  const cancel = () => { got.error = 'cancelled by the player'; try { if (ac) ac.abort(); } catch (e) { /* ignore */ } cancelled(null); };
  const ask = AUTHOR.mode === 'mock' ? Promise.resolve(mockAuthor(brief)) :
    byo ? aiAuthor(brief, ac && ac.signal).catch((e) => { got.error = String((e && e.message) || e).slice(0, 200); got.diag = (e && e.diag) || (typeof AI !== 'undefined' && AI.last ? Object.assign({}, AI.last) : null); return null; }) :
    fetch(AUTHOR.url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(brief) }).then((r) => (r.ok ? r.json() : null)).catch((e) => { got.error = String(e.message || e); return null; });
  // 180 s: the longer answer (notes, plan, cards) takes longer; in the background nobody waits for it
  const timeout = new Promise((res) => setTimeout(() => { if (!got.error) got.error = 'timeout ' + (byo ? 180 : 12) + ' s'; res(null); }, byo ? 180000 : 12000));
  const p = Promise.race([ask, timeout, stop]).then((res) => {
    if (!res) { if (!got.error) got.error = 'no answer'; return got; }
    if (!Array.isArray(res.cards)) { got.error = 'answer without cards'; return got; }
    if (!res.cards.length) { got.error = 'zero cards'; return got; }
    const ids = new Set(res.cards.map((c) => c && c.id));
    const plan = res.plan && typeof res.plan === 'object' ? res.plan : null;
    brief.__plan = plan;   // the repair reads plan.threads.new
    const good = []; const seen = (brief.recent_titles || []).slice();
    res.cards.slice(0, 6).forEach((c) => {
      const rep = c && repeatOf(c.title, seen);
      if (rep) { got.rejected.push({ id: c.id, title: c.title, errors: ['repeat: ' + rep] }); return; }
      const fixes = repairCard(c, brief);
      const err = validateCard(c, ids);
      if (err.length) got.rejected.push({ id: c && c.id, title: c && c.title, errors: err.slice(0, 6) });
      else { good.push(c); seen.push(c.title); if (fixes.length) got.repaired.push({ id: c.id, fixes: fixes.slice(0, 8) }); }
    });
    delete brief.__plan;
    // the plan is checked: every card names a cause in the state and a yield one of its options brings (050)
    if (plan) {
      const pe = planCheck(brief, plan, res.cards, good);
      got.plan_errors = pe.errors;
      pe.drop.forEach((x) => { const i = good.indexOf(x.card); if (i >= 0) { good.splice(i, 1); got.rejected.push({ id: x.card.id, title: x.card.title, errors: [x.why] }); } });
    }
    if (!good.length) { got.error = 'all ' + res.cards.length + ' cards rejected'; return got; }
    got.cards = good; got.model = res.model || 'ai'; if (res.plan && typeof res.plan === 'object') got.plan = res.plan;
    if (typeof res.notes === 'string') got.notes = res.notes.slice(0, 3000);   // the notebook (059 item 1a)
    if (res.diag) got.diag = res.diag;
    return got;
  });
  p.cancel = cancel;
  return p;
}
// lay out an answer in the week it is used: items now, the plan later; cards whose conditions no longer hold drop out
function authorLayout(s, got) {
  AUTHOR.error = got.error || ''; AUTHOR.rejected = got.rejected.slice(); AUTHOR.repaired = got.repaired.slice(); AUTHOR.dropped = []; AUTHOR.diag = got.diag || null;
  if (!got.cards) return null;
  const later = new Set(); got.cards.forEach((c) => c.options.forEach((o) => ['effects', 'partial', 'failure'].forEach((k) => (o[k] || []).forEach((ef) => { const p = String(ef).split(':'); if (p[0] === 'follow') later.add(p[1]); }))));
  const mk = (c) => ({ card: c.id, inst: s.game + '-y' + (s.year || 1) + '-w' + String(c.week && c.week > s.week ? c.week : s.week).padStart(2, '0') + '-' + c.id, since: s.week,
    expires: s.week + (c.expires || (arrivesOf(c) === 'draw' ? EXPIRES_PERSONAL : EXPIRES_STORY)) - 1, personal: arrivesOf(c) === 'draw', ai: true });
  const paper = paperworkSeen(s);
  const fits = (c) => {
    const bad = (c.requires || []).filter((r) => !/^(month|until):/.test(r) && !holds(s, r));
    if (bad.length) { AUTHOR.dropped.push({ id: c.id, title: c.title, why: 'needs ' + bad.join(', ') }); return false; }
    const pw = PAPERWORK.find((k) => k.re.test(cardText(c)));
    if (pw) { const n = paper[pw.name].filter((w) => s.week - w < pw.weeks).length; if (n >= 1) { AUTHOR.dropped.push({ id: c.id, title: c.title, why: 'paperwork: ' + pw.name + ' at most one in ' + pw.weeks + ' weeks' }); return false; } paper[pw.name].push(s.week); }
    const ts = threadsOf(c); const live = ts.filter((id) => !s.threads[id] || (!s.threads[id].closed && !s.threads[id].faded));
    if (ts.length && !live.length) { AUTHOR.dropped.push({ id: c.id, title: c.title, why: 'thread ' + ts.join(', ') + ' is closed' }); return false; }
    if (live.length !== ts.length) c.thread = live;
    // one closing card per thread on the board – the author wrote the end again every week (052 item 3)
    const closing = c.thread && c.thread.find((id) => partIn(s, c, id) === 'closes' && s.board.some((b) => { const k = cardOf(b.card); return k && threadsOf(k).indexOf(id) >= 0 && partIn(s, k, id) === 'closes'; }));
    if (closing) { AUTHOR.dropped.push({ id: c.id, title: c.title, why: 'closes already on board: ' + closing }); return false; }
    return true;
  };
  const now = got.cards.filter((c) => !later.has(c.id) && !(c.week > s.week) && fits(c));
  const plan = got.cards.filter((c) => !later.has(c.id) && c.week > s.week).map((c) => Object.assign(mk(c), { week: c.week, expires_weeks: c.expires || EXPIRES_STORY }));
  return { cards: got.cards, items: now.map(mk), plan, author: got.model, thought: got.plan || null, plan_errors: got.plan_errors || null, notes: got.notes != null ? got.notes : null };
}
// paperwork at most so often (post/spiel/044 item 2) – the list is Spiel_1's to keep
const PAPERWORK = [
  { name: 'invoice', weeks: 13, re: /rechnung|invoice|\bbills?\b|scheck|cheque/i },
  { name: 'papers', weeks: 4, re: /vertrag|contract|\bakte\b|\bfiles?\b|usb|schlüssel|\bkeys?\b|formular|\bforms?\b|zettel|\bnote\b|blatt|sheet|umschlag|envelope|mappe|folder|\bstift\b|\bpen\b/i },
  { name: 'table', weeks: 4, re: /legt .{0,40}(auf den|auf die|hin)\b|lays? .{0,40}on the (table|desk|counter)/i },   // the sentence itself (052 item 2)
];
function cardText(c) { return [c.title, c.title_de].concat((c.options || []).map((o) => (o && (o.text + ' ' + (o.text_de || ''))) || '')).join(' '); }
function paperworkSeen(s) {
  const out = {}; PAPERWORK.forEach((k) => { out[k.name] = []; });
  G2.log.forEach((e) => { if (e.t === 'add' && e.cards) e.cards.forEach((c) => { if ((e.dropped || []).some((d) => d.id === c.id)) return; const k = PAPERWORK.find((x) => x.re.test(cardText(c))); if (k) out[k.name].push(e.week); }); });
  return out;
}
// the plan against the state and the cards (post/spiel/049 item 2, form 050). Per card: a cause that points at
// something in the state (flag:, thread:, a person, a week or title from last_weeks, the phase / main story / goal / a
// beat) and a yield that one of its options brings – else the card is dropped. Rules about the whole answer (a thread
// at its end gets its closing card, a due thread is served or deferred, serves not three times the same) are logged
// and named in the next brief; the cards stay (Betreiber 10.11.: "Karten behalten, Fehler melden").
const YIELD_WORDS = { money: ['money', 'geld', 'cash', 'pay'], influence: ['influence', 'einfluss'], status: ['status', 'ansehen'], trait: ['trait'], flag: ['flag'], gain: ['gain', 'possession', 'besitz', 'thing'], join: ['join', 'team', 'person'], acquired: ['acquired'] };
function planCheck(brief, plan, all, good) {
  const errors = []; const drop = []; let yields = 0;
  const pcards = Array.isArray(plan.cards) ? plan.cards : [];
  const people = [].concat(brief.team || [], brief.contacts || [], brief.available_people || []);
  const lastWeeks = brief.last_weeks || [];
  const causeOk = (cause) => {
    const t = String(cause || '').toLowerCase(); if (!t.trim()) return false;
    if (/flag:([a-z0-9-]+)/.test(t) && (brief.flags || []).some((f) => t.indexOf('flag:' + f.name) >= 0)) return true;
    if (/thread:([a-z0-9-]+)/.test(t) && (brief.threads || []).some((x) => t.indexOf('thread:' + x.id) >= 0)) return true;
    if ((brief.threads || []).some((x) => t.indexOf(x.id) >= 0)) return true;
    if (people.some((p) => p && (t.indexOf(String(p.id)) >= 0 || (p.name && t.indexOf(String(p.name).split(' ')[0].toLowerCase()) >= 0)))) return true;
    if (lastWeeks.some((w) => t.indexOf('week ' + w.week) >= 0 || t.indexOf('woche ' + w.week) >= 0 || (w.title && t.indexOf(String(w.title).toLowerCase().slice(0, 18)) >= 0))) return true;
    if (/phase|main.?story|goal|ziel|beat|takt/.test(t)) return true;
    if (brief.main_story && brief.main_story.story_line && t.indexOf(brief.main_story.story_line) >= 0) return true;
    return false;
  };
  const brings = (c, y) => {
    const t = String(y || '').toLowerCase(); if (!t.trim()) return null;
    const effs = (c.options || []).flatMap((o) => [].concat(o.effects || [], o.partial || [])).map((ef) => String(ef).toLowerCase());
    const m = t.match(/([a-z-]+):([a-z0-9+-]+)/);
    if (m && YIELD_WORDS[m[1]]) return effs.some((ef) => ef.startsWith(m[1] + ':'));
    const kinds = Object.keys(YIELD_WORDS).filter((k) => YIELD_WORDS[k].some((w) => t.indexOf(w) >= 0));
    if (!kinds.length) return null;   // a yield in words the engine cannot read – not checked
    return kinds.some((k) => effs.some((ef) => ef.startsWith(k + ':')));
  };
  good.forEach((c, i) => {
    const p = pcards.find((x) => x && x.id === c.id) || pcards[all.indexOf(c)] || null;
    if (!p) { errors.push('card ' + c.id + ' is not in the plan'); return; }
    if (!causeOk(p.cause)) drop.push({ card: c, why: 'no cause: "' + String(p.cause || '').slice(0, 80) + '" points at nothing in the state' });
    else if (brings(c, p.yield) !== false && String(p.yield || '').trim()) yields++;
  });
  // one card of the answer with a yield is enough (061 item 1); none → noted, nothing dropped
  if (good.length && !yields) errors.push('no card of this answer brings anything (money, influence, status, a person, a thing or a flag)');
  const serves = pcards.map((x) => x && x.serves).filter(Boolean); const cnt = {}; serves.forEach((x) => { cnt[x] = (cnt[x] || 0) + 1; });
  Object.entries(cnt).forEach(([k, n]) => { if (n >= 3) errors.push('three cards serve "' + k + '"'); });
  const deferred = Array.isArray(plan.deferred) ? plan.deferred : [];
  (brief.threads || []).forEach((t) => {
    const written = good.some((c) => threadsOf(c).indexOf(t.id) >= 0);
    if (t.left === 0 && t.entered && !good.some((c) => threadsOf(c).indexOf(t.id) >= 0 && c.part === 'closes')) errors.push('thread ' + t.id + ' has no cards left and got no closing card');
    if (t.due && !written && !deferred.some((d) => d && JSON.stringify(d).indexOf(t.id) >= 0)) errors.push('due thread unaddressed: ' + t.id);
  });
  return { errors: errors.slice(0, 8), drop };
}
// the old way, still used when nothing waits in the background (the first week of a year)
authorAsk = function (s) {
  AUTHOR.error = ''; AUTHOR.rejected = []; AUTHOR.repaired = []; AUTHOR.dropped = [];
  const p = authorFetch(s, s.week); if (!p.cancel) return p;
  AUTHOR.cancel = p.cancel;
  return p.then((got) => { AUTHOR.cancel = null; return got ? authorLayout(s, got) : null; });
};
function bgStart(s) {
  if (s.ended || AUTHOR.mode === 'off' || AUTHOR.mode === 'rules') { BG.job = null; return; }
  if (AUTHOR.mode === 'byo' && !(typeof aiConfigured === 'function' && aiConfigured())) { BG.job = null; return; }
  const job = { game: s.game, year: s.year || 1, forWeek: s.week + 1, done: false, got: null, started: Date.now() };
  BG.job = job;
  authorFetch(s, s.week + 1).then((got) => { job.got = got; job.done = true; if (typeof onAuthorReady === 'function') onAuthorReady(job); });
}
function bgFor(s) { const j = BG.job; return j && j.game === s.game && j.year === (s.year || 1) && j.forWeek <= s.week ? j : null; }
// what the bar says: "schreibt Woche 13 …" / "Woche 13 liegt bereit"
function bgStatus(s) { const j = BG.job; if (!j || j.game !== s.game) return null; return { week: j.forWeek, done: j.done, failed: j.done && j.got && !j.got.cards }; }
// an option that brings something in: money or influence as an effect (post/spiel/034 item 2)
const NO_YIELD_GUARD = false;   // 034/2 off: income pays the month (post/spiel/061 item 1, brief v3.2)
function pays(c) { return c && c.kind === 'event' && (c.options || []).some((o) => (o.effects || []).some((ef) => /^(money|influence):\+?[1-9]/.test(String(ef)))); }
writeWeek = function (rnd) {
  const s = G2.state;
  const job = bgFor(s); let waiting = null;
  let first;
  if (job && job.done) { BG.job = null; first = Promise.resolve(job.got ? authorLayout(s, job.got) : null); }
  else if (job) { waiting = job.forWeek; AUTHOR.error = ''; AUTHOR.rejected = []; AUTHOR.repaired = []; AUTHOR.dropped = []; AUTHOR.diag = null; first = Promise.resolve(null); }   // not there yet: next time
  else first = authorAsk(s);
  return first.then((ai) => {
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
    if (NO_YIELD_GUARD && ai && !ai.cards.some(pays)) {
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
      if (AUTHOR.dropped && AUTHOR.dropped.length) entry.dropped = AUTHOR.dropped;
      if (waiting) entry.author_waiting = waiting;
      if (ai && ai.notes != null) entry.notes = ai.notes;
      if (AUTHOR.diag) entry.author_diag = AUTHOR.diag;   // status, finish, ms, chars, raw – read the cause off the log (064)
      if (ai && ai.thought) entry.author_plan = ai.thought;   // what the author decided before writing (047 item 3)
      if (ai && ai.plan_errors && ai.plan_errors.length) entry.plan_errors = ai.plan_errors;   // logged, named next time – the cards stay (Betreiber 10.11., 11:0x)   // the answer for this week was not there yet – it comes next week
    }
    if (items.length || entry.plan || entry.author_error || entry.author_waiting) game2Append(entry);
    if (!bgFor(G2.state) && !(BG.job && BG.job.game === G2.state.game && !BG.job.done)) bgStart(G2.state);   // ask for next week now
    return items.length;
  });
};
// what the author is told, Prototype 3: goal, levels, trait scales, the plan
const authorBriefBase = authorBrief;
// the state for the author, in the order of the Betreiber's five components (10.11., 06:32: mandate · state of team and
// world · main story with status and goals · side threads · format) – post/spiel/047: main_story first, then threads,
// team · contacts · possessions · blocks · flags, last_weeks, board (titles only), planned/recent_titles last;
// no list of every known card any more, a short available_people instead
const MONTH_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function phaseOf(m) { return MONTH_EN[m - 1] + ', ' + (m <= 3 ? 'the beginning of the year' : m <= 6 ? 'spring into summer' : m <= 9 ? 'the middle of the year' : 'the end of the year comes into view'); }
// things the author may hand over with gain: – possessions and places of the open stacks nobody has (049 item 1)
function availableThings(s) {
  const held = new Set(s.possessions);
  return CARDS.all.filter((c) => (c.kind === 'possession' || c.kind === 'place') && !held.has(c.id) && s.stacks[c.stack]).slice(0, 10).map((c) => ({ id: c.id, name: c.name || c.title, kind: c.kind, type: c.type }));
}
// a flag means what the option that sets it says (049 item 1)
function flagMeaning(s, name) {
  const all = CARDS.all.concat(Object.values(s.aiCards || {}));
  for (const c of all) for (const o of (c.options || [])) if (['effects', 'partial', 'failure'].some((k) => (o[k] || []).some((ef) => ef === 'flag:' + name))) return (c.title ? c.title + ': ' : '') + o.text;
  return '';
}
// choices of the last weeks that have had no consequence yet: their flag was never tested, their thread never went on
// (049 item 1; 050 rule 4 – only from last_weeks, never from the board)
function consequencesOpen(s) {
  const out = []; const recent = s.history.filter((h) => h.week >= s.week - 8 && cardOf(h.card) && cardOf(h.card).kind === 'event' && h.text);
  const later = (w) => s.history.filter((h) => h.week > w).map((h) => cardOf(h.card)).filter(Boolean);
  recent.forEach((h) => {
    const c = cardOf(h.card); const o = (c.options || []).find((x) => x.text === h.text || x.text_de === h.text_de); if (!o || isPass(c, c.options.indexOf(o))) return;
    const flags = (o.effects || []).filter((ef) => String(ef).startsWith('flag:')).map((ef) => ef.slice(5));
    const ths = threadsOf(c).filter((t) => s.threads[t] && !s.threads[t].closed && !s.threads[t].faded);
    const after = later(h.week);
    const flagOpen = flags.filter((f) => !after.some((k) => (k.requires || []).indexOf('flag:' + f) >= 0 || (k.options || []).some((x) => x.origin === 'flag:' + f)));
    const thOpen = ths.filter((t) => !after.some((k) => threadsOf(k).indexOf(t) >= 0));
    if (flagOpen.length || thOpen.length) out.push({ from_week: h.week, card: c.title, choice: h.text, expectation: flagOpen.map((f) => 'flag:' + f).concat(thOpen.map((t) => 'thread:' + t)).join(', ') });
  });
  return out.slice(-6);
}
function availablePeople(s) {
  const held = new Set([s.character].concat(s.associates.map((a) => a.id), s.contacts));
  return CARDS.all.filter((c) => c.kind === 'person' && !held.has(c.id) && s.stacks[c.stack]).slice(0, 10).map((c) => ({ id: c.id, name: c.name, profession: c.profession, block: c.block }));
}
authorBrief = function (s) {
  const base = authorBriefBase(s);
  const gp = goalProgress(s);
  const person = (p) => Object.assign(p, { skills: Object.fromEntries(Object.entries(s.lv[p.id] || {}).filter(([, v]) => v > 0)), traits: traitWords(s, p.id).map((w) => w + ' ' + Math.abs(traitValue(s, p.id, w))) });
  const story = s.story || (base.story_lines || [])[0] || null;
  const b = { game: base.game, year: s.year || 1, week: base.week, weeks: base.weeks, month: base.month, lang: base.lang };
  // 0 – the author's own notebook, as it wrote it last time (059 item 1a)
  b.notes = s.authorNotes || '';
  // 1 – the main story with its status and the goal
  // the week itself and the strength left in it (049 item 1)
  b.this_week = { n: s.week, month: s.month, weeks_left: WEEKS - s.week,
    energy: { free: team(s).filter((id) => s.people[id] && !s.people[id].busy).map((id) => ({ who: id, strength: s.people[id].res })),
      busy: team(s).filter((id) => s.people[id] && s.people[id].busy).map((id) => ({ who: id, until: s.people[id].busy.until })) } };
  const beats = CARDS.all.filter((c) => c.beat && c.stack === story && c.beat >= s.month).sort((x, y) => x.beat - y.beat);
  b.main_story = {
    story_line: story, title: story ? (typeof word === 'function' ? word('stacks', story) : story) : '', phase: phaseOf(s.month),
    coming_beats: beats.map((c) => ({ month: c.beat, title: c.title })),
    next_beat: beats[0] ? { month: beats[0].beat, title: beats[0].title, must_not_reveal: beats[0].reveals || null } : null,
    goal: gp ? { title: gp.goal.title, measure: gp.goal.measure, now: gp.now, target: gp.target } : null,
    // the story bible of the open story-line: its threads and its beats, in full (059 item 1c)
    bible: {
      threads: Object.values(THREADS).filter((t) => t.stack === story || (t.cards || []).some((id) => (cardOf(id) || {}).stack === story)).map((t) => ({ id: t.id, title: t.title, question: t.question, endings: t.endings, length: t.length })),
      author_threads: Object.values(s.threadDefs || {}).map((t) => ({ id: t.id, title: t.title, question: t.question, endings: t.endings })),
      beats: CARDS.all.filter((c) => c.beat && c.stack === story).sort((x, y) => x.beat - y.beat).map((c) => ({ month: c.beat, title: c.title, back: c.back || '' })),
    },
  };
  // 2 – the side threads, the due one marked
  b.threads = threadBrief(s);
  // 3 – the team and the world
  b.character = Object.assign(base.character, { skills: Object.fromEntries(Object.entries(s.lv[s.character] || {}).filter(([, v]) => v > 0)), traits: traitWords(s, s.character).map((w) => w + ' ' + Math.abs(traitValue(s, s.character, w))) });
  b.money = base.money; b.influence = base.influence; b.status = base.status;
  b.team = base.team.filter((p) => p.id !== mateOf(s)).map(person);
  b.household = (s.household || []).map((id) => { const c = cardOf(id) || {}; return person({ id, name: c.name, relation: c.relation, age: s.ages[id] != null ? s.ages[id] : undefined, profession: c.profession, acts: c.relation === 'mate' }); });   // 054
  b.contacts = base.contacts; b.possessions = base.possessions;
  b.blocks = { own: s.block, values: s.blockValues, traits: s.blockTraits };
  b.flags = base.flags.map((f) => ({ name: f, meaning: flagMeaning(s, f) }));
  b.available_people = availablePeople(s);
  b.available_things = availableThings(s);
  b.consequences_open = consequencesOpen(s);
  b.handwritten_planned = s.followups.map((f) => ({ card: f.card, title: (cardOf(f.card) || {}).title, months: [f.from, f.by] }));
  b.returning_this_week = base.returning_this_week; b.returning_next_week = base.returning_next_week; b.activities = base.activities;
  // 4 – what the player chose, what lies there
  b.last_weeks = base.last_weeks;
  // texts, not titles (059 item 1b): what lies on the board and the last ten cards taken, with the choice
  const texts = (c) => ({ title: c.title, back: c.back || '', options: (c.options || []).map((o) => o.text) });
  b.board = s.board.map((x) => { const c = cardOf(x.card) || {}; return Object.assign(texts(c), { thread: threadsOf(c), by_you: !!s.aiCards[x.card], unresolved: true }); });   // what lies there is no cause (050 rule 3)
  b.recent_taken = s.history.filter((x) => { const c = cardOf(x.card); return c && c.kind === 'event' && x.text; }).slice(-10)
    .map((x) => { const c = cardOf(x.card); return Object.assign({ week: x.week }, texts(c), { chose: x.text, by_you: !!s.aiCards[x.card] }); });
  // the last plan back, so that deferred means something (059 item 1d)
  const lastPlanned = G2.log.slice().reverse().find((e) => e.t === 'add' && e.author_plan);
  if (lastPlanned) b.last_plan = Object.assign({ week: lastPlanned.week }, lastPlanned.author_plan);
  // 5 – the bookkeeping
  b.story_lines = base.story_lines;
  b.planned = s.planned.map((x) => ({ week: x.week, card: x.card, title: (cardOf(x.card) || {}).title }));
  b.plan_ahead_weeks = PLAN_AHEAD;
  b.recent_titles = recentTitles(G2.log);
  // cards of the last answer that no longer fitted when their week came (042)
  const lastAdd = G2.log.slice().reverse().find((e) => e.t === 'add' && e.dropped);
  // cards that could not be used: no list of what was wrong (that teaches the synonym) – fresh things to build on
  // instead (058 item 2, sparring M003)
  const lastBad = G2.log.slice().reverse().find((e) => e.t === 'add' && ((e.dropped && e.dropped.length) || (e.rejected && e.rejected.length)));
  if (lastBad) {
    const n = (lastBad.dropped || []).length + (lastBad.rejected || []).length;
    const places = [...new Set(CARDS.all.filter((c) => c.kind === 'event' && s.stacks[c.stack] && c.place && c.place !== 'home').map((c) => { const p = cardOf(c.place); return p ? p.name || p.title : c.place; }))];
    const rot = (a, k) => a.length ? [a[(s.week + k) % a.length], a[(s.week + k + 1) % a.length]].filter((x, i, all) => all.indexOf(x) === i) : [];
    b.redirect = { week: lastBad.week, cards_not_used: n, build_on: 'a scene nobody has seen yet – one of these places or people, or the due thread',
      fresh_places: rot(places, 0), fresh_people: rot((b.available_people || []).map((p) => p.name), 3), due_thread: ((b.threads || []).find((t) => t.due) || {}).id || null };
  }
  const lastRep = G2.log.slice().reverse().find((e) => e.t === 'add' && e.repaired && e.repaired.length);
  const lastPlan = G2.log.slice().reverse().find((e) => e.t === 'add' && e.plan_errors);
  if (lastPlan) b.plan_errors_last_time = lastPlan.plan_errors;
  if (lastRep) { const kinds = new Set(); lastRep.repaired.forEach((r) => r.fixes.forEach((f) => kinds.add(String(f).replace(/^option \d+ /, '').replace(/ → .*/, '')))); if (kinds.has('check')) { kinds.delete('check'); kinds.add('check without effects – a check must say what success, partial and failure bring'); } b.repaired_last_time = [...kinds].slice(0, 8); }
  return b;
};
