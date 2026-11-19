// Nowhere – overview of the prototypes, newest first, each with the rounds played (Betreiber 07.11., 19:07:
// "eine Website, auf der die Prototypen (neueste Oben) anklickbar sind … Anzahl der gespielten Runden (von mir und
// automatische Tests)"). One round = one game, i.e. one year. Sources:
//   played by you, written up  – rounds.json: playthrough headings in nowhere/konzept*.md (built by tools/cards.py)
//   played on this device      – localStorage 'nowhere.plays' (engine.js playTally, written on every save)
//   automatic tests            – rounds.json: sum of nowhere/technik/tests/runs.jsonl (simulators, browser runs)
// Classic script after i18n.js. Owner: Spiel_2.

const HUB_VERSION = '13.11.2026 · v27';   // shown in the footer – if it is older than the last deploy, reload
const PROTOS = [
  { n: 4, href: 'p4/', store: 'nowhere.p4.game', date: '08.11.2026', step: 'week',
    en: 'The weave: every card in a thread, the story follows what you click; the d20; levels for everyone; years in a row.',
    de: 'Das Gewebe: jede Karte in einem Faden, die Geschichte folgt deinem Klick; der W20; Stufen für alle; Jahre hintereinander.' },
  { n: 3, href: 'p3/', store: 'nowhere.p3.game', date: '07.11.2026', step: 'week',
    en: 'A goal for the year, checks with odds, skill levels, traits as scales; the author plans ahead; your team on top.',
    de: 'Ein Ziel fürs Jahr, Proben mit Chancen, Fertigkeitsstufen, Eigenschaften als Skalen; der Autor plant voraus; dein Team oben.' },
  { n: 2, href: 'p2/', store: 'nowhere.p2.game', date: '07.11.2026', step: 'week',
    en: 'The year in weeks: people on the way, an open board by place, an author (the rules or your own AI).',
    de: 'Das Jahr in Wochen: Leute unterwegs, ein offenes Brett nach Orten, ein Autor (die Regeln oder deine eigene KI).' },
  { n: 1, href: 'p1/', store: 'nowhere.game', date: '05.11.2026', step: 'month',
    en: 'One year in twelve months, five cards a month; flip, swipe, the fan of your people and things.',
    de: 'Ein Jahr in zwölf Monaten, fünf Karten je Monat; umdrehen, wischen, der Fächer deiner Leute und Dinge.' }
];

const HUB = {
  en: { lead: 'The prototypes, newest first. Tap one to play. A round is one game – one year.', proto: 'Prototype {n}', newest: 'newest',
    open: 'Play →', running: 'Game running: {step} · {who}', runningAny: 'A game is saved', week: 'week {n}', month: 'month {n}',
    you: 'Played by you', youWritten: 'written up (in the concept)', youDevice: 'on this device ({e} played to the end)',
    tests: 'Automatic tests', sims: '{n} simulated years', mock: '{n} of them with a test AI', browser: '{n} browser runs',
    approx: 'earlier runs counted afterwards, approximate', none: 'none yet', list: 'Written-up rounds',
    asOf: 'Counts as of {t}. Rounds on this device are counted from today (07.11.2026) on.', offline: 'Counts not available offline.', pageVersion: 'Page {v}.' },
  de: { lead: 'Die Prototypen, neueste oben. Antippen zum Spielen. Eine Runde ist ein Spiel – ein Jahr.', proto: 'Prototyp {n}', newest: 'neu',
    open: 'Spielen →', running: 'Spiel läuft: {step} · {who}', runningAny: 'Ein Spielstand ist gespeichert', week: 'Woche {n}', month: 'Monat {n}',
    you: 'Von dir gespielt', youWritten: 'ausgewertet (im Konzept)', youDevice: 'auf diesem Gerät ({e} zu Ende gespielt)',
    tests: 'Automatische Tests', sims: '{n} simulierte Jahre', mock: 'davon {n} mit Test-KI', browser: '{n} Browser-Durchläufe',
    approx: 'frühere Läufe nachgetragen, ungefähr', none: 'noch keine', list: 'Ausgewertete Runden',
    asOf: 'Zahlen vom {t}. Runden auf diesem Gerät zählen ab heute (07.11.2026).', offline: 'Zahlen offline nicht verfügbar.', pageVersion: 'Seite {v}.' }
};
function H(key, vars) { let s = (HUB[LANG] || HUB.en)[key] || HUB.en[key] || key; Object.entries(vars || {}).forEach(([k, v]) => { s = s.split('{' + k + '}').join(v); }); return s; }

function el(tag, attrs, ...kids) {
  const e = document.createElement(tag);
  Object.entries(attrs || {}).forEach(([k, v]) => { if (k === 'class') e.className = v; else if (k.startsWith('on')) e.addEventListener(k.slice(2).toLowerCase(), v); else if (v != null) e.setAttribute(k, v); });
  kids.flat(Infinity).forEach((k) => { if (k != null && k !== false) e.append(k.nodeType ? k : String(k)); });
  return e;
}
function readJSON(key) { try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch (e) { return null; } }

// games on this device: the tally, plus a saved game that is older than the tally
function deviceGames() {
  const all = readJSON('nowhere.plays') || {};
  PROTOS.forEach((p) => {
    const saved = readJSON(p.store); const st = saved && Array.isArray(saved.log) && saved.log.find((e) => e.t === 'start');
    if (st && st.game && !all[st.game]) all[st.game] = { p: p.n, who: '', step: 0, ended: false, at: saved.saved || '' };
  });
  return all;
}
function currentGame(p, games) {
  const saved = readJSON(p.store); const st = saved && Array.isArray(saved.log) && saved.log.find((e) => e.t === 'start');
  if (!st || !st.game) return null;
  const g = games[st.game]; if (g && g.ended) return null;
  return g || { step: 0, who: '' };
}
function stamp(iso) {
  const d = new Date(iso); if (isNaN(d)) return iso || '';
  return d.toLocaleString(LANG === 'de' ? 'de-DE' : 'en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function render(rounds) {
  const games = deviceGames();
  const head = el('header', {}, el('h1', {}, 'Nowhere'),
    el('div', { class: 'lang' }, ['de', 'en'].map((l) => el('button', { type: 'button', class: LANG === l ? 'on' : '', onClick: () => { langSet(l); render(rounds); } }, l.toUpperCase()))));
  const cards = PROTOS.map((p, i) => {
    const r = rounds && rounds.prototypes ? rounds.prototypes[String(p.n)] || { played: [], tests: {} } : null;
    const mine = Object.values(games).filter((g) => g.p === p.n);
    const run = currentGame(p, games);
    const runLine = run ? el('div', { class: 'running' }, run.step ? H('running', { step: H(p.step, { n: run.step }), who: run.who || '' }).replace(/ · $/, '') : H('runningAny')) : null;
    const go = el('a', { class: 'go', href: p.href },
      el('div', { class: 'head' }, el('h2', {}, H('proto', { n: p.n }), i === 0 ? el('span', { class: 'new' }, H('newest')) : null), el('span', { class: 'date' }, p.date)),
      el('p', { class: 'what' }, p[LANG] || p.en), runLine, el('span', { class: 'open' }, H('open')));
    let counts;
    if (rounds === undefined) counts = null; // still loading
    else if (!r) counts = el('div', { class: 'counts' }, el('span', { class: 'k' }, H('offline')));
    else {
      const t = r.tests || {}; const sims = (t.sim || 0) + (t['sim-mock'] || 0);
      const testBits = [sims ? H('sims', { n: sims }) : null, t['sim-mock'] ? H('mock', { n: t['sim-mock'] }) : null, t.browser ? H('browser', { n: t.browser }) : null].filter(Boolean);
      counts = el('div', { class: 'counts' },
        el('span', { class: 'k' }, H('you')),
        // not summed: a round played here may also be written up later
        el('span', { class: 'v' }, el('b', {}, String(r.played.length)), ' ', H('youWritten'), el('br'), el('b', {}, String(mine.length)), ' ', H('youDevice', { e: mine.filter((g) => g.ended).length })),
        el('span', { class: 'k' }, H('tests')),
        el('span', { class: 'v' }, testBits.length ? [el('b', {}, String(sims + (t.browser || 0))), ' – ', testBits.join(' · ')] : H('none'), t.approx ? [el('br'), el('small', {}, H('approx'))] : null),
        r.played.length ? el('details', {}, el('summary', {}, H('list')), el('ul', {}, r.played.map((x) => el('li', {}, x.date + (x.character ? ' · ' + x.character : ''))))) : null);
    }
    return el('section', { class: 'proto' }, go, counts);
  });
  const foot = el('footer', {}, (rounds && rounds.built ? H('asOf', { t: stamp(rounds.built.replace(/Z$/, ':00Z')) }) + ' ' : '') + H('pageVersion', { v: HUB_VERSION }));
  document.getElementById('hub').replaceChildren(head, el('p', { class: 'lead' }, H('lead')), ...cards, foot);
}

langLoad();
render(undefined);
fetch('rounds.json', { cache: 'no-cache' }).then((r) => (r.ok ? r.json() : null)).then((d) => render(d)).catch(() => render(null));
if ('serviceWorker' in navigator) { navigator.serviceWorker.register('sw.js').catch(() => { /* offline later */ }); }
