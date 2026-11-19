// Nowhere – Prototype 3 simulator (copy of sim2.js on p3/week.js; adds goal, checks, levels, axes): plays random years through ../app/engine.js + ../app/p2/week.js in node and
// checks the rules of the time flow. Usage: node technik/tools/sim3.js [years] [--mock]
// Exit 1 if a check fails. Owner: Spiel_2.
const fs = require('fs'); const vm = require('vm'); const path = require('path');
const APP = path.join(__dirname, '..', 'app');
const years = parseInt(process.argv[2] || '50', 10); const mock = process.argv.includes('--mock');
const ctx = { console, Math, JSON, Date, Array, Object, Set, Promise, parseInt, String, Number, setTimeout, URLSearchParams,
  localStorage: { _: {}, getItem(k) { return this._[k] || null; }, setItem(k, v) { this._[k] = v; } },
  document: { querySelector: () => null }, location: { search: mock ? '?author=mock' : '?author=off' } };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(APP, 'engine.js'), 'utf8'), ctx);
vm.runInContext(fs.readFileSync(path.join(APP, 'p3', 'week.js'), 'utf8'), ctx);
ctx.CARDS_JSON = fs.readFileSync(path.join(APP, 'cards.json'), 'utf8'); ctx.YEARS = years;
vm.runInContext(`
(async () => {
  const fails = []; const stats = { taken: 0, free: 0, long: 0, pair: 0, travel: 0, maxBoard: 0, beats: {}, ai: 0, weeksIdle: 0 };
  for (let y = 0; y < YEARS; y++) {
    cardsLoad(JSON.parse(CARDS_JSON));
    if (!CARDS.all.some((c) => c.kind === 'goal')) [['g-money', 'money', 15], ['g-team', 'team', 4], ['g-contacts', 'contacts', 6]].forEach(([id, m, t]) => { const g = { id, kind: 'goal', title: id, measure: m, target: t, stack: 'goals', requires: [] }; CARDS.all.push(g); CARDS.byId[id] = g; });
    const chars = CARDS.all.filter((c) => c.kind === 'character');
    const lines = storyLines(); const story = lines[y % lines.length]; storySet(story);   // one story-line per game (035)
    await act2Start(chars[y % chars.length].id);
    if (G2.state.story !== story) fails.push('story not taken: ' + story);
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
      
      s.board.forEach((b) => { if (b.expires != null && b.expires < s.week) fails.push('expired card on board ' + b.card); });
      await act2Next();
      s = G2.state;
    }
    if (!s.ended) fails.push('year did not end');
    if (!s.goal) fails.push('no goal'); const gp = goalProgress(s); if (gp && gp.done) stats.goalDone = (stats.goalDone || 0) + 1;
    s.history.forEach((h) => { if (h.check) { stats.checks = (stats.checks || 0) + 1; stats[h.check.outcome] = (stats[h.check.outcome] || 0) + 1; } if (h.rise) stats.rises = (stats.rises || 0) + 1; if (h.changes) stats.traitMoves = (stats.traitMoves || 0) + h.changes.length; });
    Object.values(s.axes).forEach((ax) => Object.values(ax).forEach((v) => { if (!Number.isFinite(v)) fails.push('axis not a number'); stats.axisMax = Math.max(stats.axisMax || 0, Math.abs(v)); }));
    // one story-line: nothing from another one ever came to the board
    G2.log.filter((e) => e.t === 'add').forEach((e) => e.items.forEach((i) => { const c = cardOf(i.card); if (c && c.stack && c.stack !== 'personal' && s.stacks[c.stack] !== true && !(e.cards || []).some((x) => x.id === c.id)) fails.push('other story-line on the board: ' + c.id); }));
    // the fun measures (post/spiel/036 item 6), per story-line
    const F = (stats.fun = stats.fun || {})[story] = stats.fun[story] || { years: 0, playable: [], affordable: [], builds: 0, takes: 0, moneyEnd: 0, paid: 0, goals: 0, noYield: 0, over: 0, yieldAdded: 0 };
    F.years++; F.moneyEnd += s.money; if (gp && gp.done) F.goals++;
    G2.log.forEach((e) => {
      if (e.t === 'take' && e.playable != null) { F.playable.push(e.playable); F.affordable.push(e.affordable); }
      if (e.t === 'add') { if (e.no_yield) F.noYield++; if (e.over) F.over += e.over.length; F.yieldAdded += e.items.filter((i) => i.yield).length; }
    });
    const instCard = {}; G2.log.forEach((e) => { if (e.t === 'add') e.items.forEach((i) => { instCard[i.inst] = i.card; }); });
    G2.log.forEach((e) => { if (e.t !== 'take' || typeof e.option !== 'number') return; const c = cardOf(instCard[e.inst]); if (!c || c.kind !== 'event' || isPass(c, e.option)) return; F.takes++; if ((c.requires || []).some((r) => r.startsWith('flag:')) || isFollowUp(c.id)) F.builds++; if ((c.options[e.option].effects || []).some((ef) => /^(money|influence):[+]?[1-9]/.test(ef))) F.paid++; });
    if (MOCKED) G2.log.filter((e) => e.t === 'add' && e.cards).forEach((e) => e.cards.forEach((c) => { stats.aiCards = (stats.aiCards || 0) + 1; if (c.impact >= 2 && !c.costs && !c.beat) stats.aiFree = (stats.aiFree || 0) + 1; }));
    Object.values(s.lv).forEach((l) => Object.values(l).forEach((v) => { if (v > 3) fails.push('level beyond 3'); }));
    stats.relays = (stats.relays || 0) + G2.log.filter((e) => e.t === 'add').reduce((n, e) => n + e.items.filter((i) => i.again).length, 0);
    stats.plans = (stats.plans || 0) + G2.log.filter((e) => e.t === 'add' && e.plan).length;
    stats.authorErrors = (stats.authorErrors || 0) + G2.log.filter((e) => e.t === 'add' && e.author_error).length;
    stats.repeats = (stats.repeats || 0) + G2.log.filter((e) => e.t === 'add' && e.rejected).reduce((n, e) => n + e.rejected.filter((r) => String(r.errors).startsWith('repeat')).length, 0);
    if (MOCKED && G2.log.some((e) => e.t === 'add' && (e.cards || []).some((c) => /again$/.test(c.title)))) fails.push('a repeat got through');
    stats.repaired = (stats.repaired || 0) + G2.log.filter((e) => e.t === 'add' && e.repaired).length;
    if (s.week !== 53) fails.push('ended in week ' + s.week);
    s.history.forEach((h) => { const c = cardOf(h.card); if (c && c.beat) stats.beats[c.id + '@' + monthOf(h.week)] = (stats.beats[c.id + '@' + monthOf(h.week)] || 0) + 1; });
    stats.ai += G2.log.filter((e) => e.t === 'add' && e.cards).length;
    // replay: the log alone must give the same state
    const log = G2.log.slice(); cardsLoad(JSON.parse(CARDS_JSON));
    const r = reduce2(log);
    if (JSON.stringify(r.history) !== JSON.stringify(s.history) || r.money !== s.money || r.week !== s.week) fails.push('replay differs in year ' + y);
  }
  const fun = stats.fun; delete stats.fun;
  console.log(JSON.stringify(stats));
  const med = (a) => { const b = a.slice().sort((x, y) => x - y); return b.length ? b[Math.floor(b.length / 2)] : 0; };
  const avg = (a) => (a.length ? Math.round(10 * a.reduce((x, y) => x + y, 0) / a.length) / 10 : 0);
  Object.entries(fun || {}).forEach(([k, F]) => console.log('fun ' + k + ': years ' + F.years + ' · playable options per card (median) ' + med(F.playable) + ' · cards with a paid option on the board (avg) ' + avg(F.affordable) +
    ' · takes that build on an earlier choice ' + Math.round(100 * F.builds / Math.max(1, F.takes)) + '% · paying takes per year ' + Math.round(10 * F.paid / F.years) / 10 + ' · money at year end (avg) ' + Math.round(10 * F.moneyEnd / F.years) / 10 +
    ' · goal reached ' + F.goals + '/' + F.years + (F.noYield ? ' · author weeks without yield ' + F.noYield + ' (paying cards added ' + F.yieldAdded + ')' : '') + (F.over ? ' · author cards over the limit ' + F.over : '')));
  console.log(fails.length ? 'FAIL ' + fails.length + ': ' + [...new Set(fails)].slice(0, 8).join(' | ') : 'ok – ' + YEARS + ' years');
  process.exitCode = fails.length ? 1 : 0;
  LEDGER(3, MOCKED ? 'sim-mock' : 'sim', YEARS, !fails.length);
})();
`, Object.assign(ctx, { process, LEDGER: require('./ledger.js').ledger, MOCKED: mock }));
