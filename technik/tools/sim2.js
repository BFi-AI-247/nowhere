// Nowhere – Prototype 2 simulator: plays random years through ../app/engine.js + ../app/p2/week.js in node and
// checks the rules of the time flow. Usage: node technik/tools/sim2.js [years] [--mock]
// Exit 1 if a check fails. Owner: Spiel_2.
const fs = require('fs'); const vm = require('vm'); const path = require('path');
const APP = path.join(__dirname, '..', 'app');
const years = parseInt(process.argv[2] || '50', 10); const mock = process.argv.includes('--mock');
const ctx = { console, Math, JSON, Date, Array, Object, Set, Promise, parseInt, String, Number, setTimeout, URLSearchParams,
  localStorage: { _: {}, getItem(k) { return this._[k] || null; }, setItem(k, v) { this._[k] = v; } },
  document: { querySelector: () => null }, location: { search: mock ? '?author=mock' : '?author=off' } };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(APP, 'engine.js'), 'utf8'), ctx);
vm.runInContext(fs.readFileSync(path.join(APP, 'p2', 'week.js'), 'utf8'), ctx);
ctx.CARDS_JSON = fs.readFileSync(path.join(APP, 'cards.json'), 'utf8'); ctx.YEARS = years;
vm.runInContext(`
(async () => {
  const fails = []; const stats = { taken: 0, free: 0, long: 0, pair: 0, travel: 0, maxBoard: 0, beats: {}, ai: 0, weeksIdle: 0 };
  for (let y = 0; y < YEARS; y++) {
    cardsLoad(JSON.parse(CARDS_JSON));
    const chars = CARDS.all.filter((c) => c.kind === 'character');
    await act2Start(chars[y % chars.length].id);
    let s = G2.state; let guard = 0;
    while (!s.ended && guard++ < 400) {
      // take up to three things a week, at random
      for (let k = 0; k < 3; k++) {
        const b = s.board[Math.floor(Math.random() * s.board.length)]; if (!b) break;
        const c = cardOf(b.card);
        if (c.kind !== 'event') { act2Take(b.inst, Math.random() < 0.5 ? 'contact' : 'pass'); continue; }
        const opts = optionsFor(s, c).filter((o) => o.ok);
        if (!opts.length) { fails.push('no option on ' + c.id); break; }
        const o = opts[Math.floor(Math.random() * opts.length)];
        if (isPass(c, o.i)) { if (act2Take(b.inst, o.i, [])) stats.free++; continue; }
        const d = doersFor(s, c).filter((x) => x.ok);
        if (!d.length) continue;
        const pickd = d[Math.floor(Math.random() * d.length)];
        if (act2Take(b.inst, o.i, pickd.who)) { stats.taken++; if (pickd.weeks >= 4) stats.long++; if (pickd.who.length === 2) stats.pair++; if (pickd.weeks > takesOf(c)) stats.travel++; }
      }
      // the team, in and out (post/spiel/022)
      if (Math.random() < 0.12 && s.contacts.length) { if (act2Recruit(s.contacts[Math.floor(Math.random() * s.contacts.length)])) stats.recruit = (stats.recruit || 0) + 1; }
      if (Math.random() < 0.06 && s.associates.length) { if (act2Dismiss(s.associates[Math.floor(Math.random() * s.associates.length)].id)) stats.dismiss = (stats.dismiss || 0) + 1; }
      if (s.associates.length > 3) fails.push('more than three associates');
      s.associates.forEach((a) => { if (!s.people[a.id]) fails.push('associate without a place ' + a.id); });
      Object.keys(s.people).forEach((id) => { if (id !== s.character && !s.associates.some((a) => a.id === id) && !s.people[id].busy) fails.push('person outside the team kept ' + id); });
      stats.maxBoard = Math.max(stats.maxBoard, s.board.length);
      stats.storyAdds = (stats.storyAdds || 0) + G2.log.filter((e) => e.t === 'add' && e.week === s.week).reduce((n, e) => n + e.items.filter((i) => !i.personal).length, 0);
      // invariants
      Object.entries(s.people).forEach(([id, p]) => { if (p.res < 0 || p.res > 3) fails.push('resource out of range ' + id + ' ' + p.res); });
      if (s.money < 0 && !s.history.length) fails.push('money below 0 at start');
      if (s.traits.length > 3) fails.push('more than three traits');
      s.board.forEach((b) => { if (b.expires != null && b.expires < s.week) fails.push('expired card on board ' + b.card); });
      await act2Next();
      s = G2.state;
    }
    if (!s.ended) fails.push('year did not end');
    if (s.week !== 53) fails.push('ended in week ' + s.week);
    s.history.forEach((h) => { const c = cardOf(h.card); if (c && c.beat) stats.beats[c.id + '@' + monthOf(h.week)] = (stats.beats[c.id + '@' + monthOf(h.week)] || 0) + 1; });
    stats.ai += G2.log.filter((e) => e.t === 'add' && e.cards).length;
    // replay: the log alone must give the same state
    const log = G2.log.slice(); cardsLoad(JSON.parse(CARDS_JSON));
    const r = reduce2(log);
    if (JSON.stringify(r.history) !== JSON.stringify(s.history) || r.money !== s.money || r.week !== s.week) fails.push('replay differs in year ' + y);
  }
  console.log(JSON.stringify(stats));
  console.log(fails.length ? 'FAIL ' + fails.length + ': ' + [...new Set(fails)].slice(0, 8).join(' | ') : 'ok – ' + YEARS + ' years');
  process.exitCode = fails.length ? 1 : 0;
  LEDGER(2, MOCKED ? 'sim-mock' : 'sim', YEARS, !fails.length);
})();
`, Object.assign(ctx, { process, LEDGER: require('./ledger.js').ledger, MOCKED: mock }));
