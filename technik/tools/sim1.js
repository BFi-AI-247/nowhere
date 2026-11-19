// Nowhere – Prototype 1 simulator: plays random years through app/engine.js (12 months, 5 draws), checks that every
// game ends and that the log replays to the same state. Usage: node technik/tools/sim1.js [games]. Owner: Spiel_2.
const fs = require('fs'); const vm = require('vm');
const path = require('path'); const dir = path.join(__dirname, '..', 'app'); const GAMES = parseInt(process.argv[2] || '30', 10);
const ctx = { console, LEDGER: require('./ledger.js').ledger, GAMES, localStorage: { _: {}, getItem(k) { return this._[k] || null; }, setItem(k, v) { this._[k] = v; } }, Math, JSON, Date, Array, Object, parseInt, String };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(dir + '/engine.js', 'utf8'), ctx);
vm.runInContext(`
cardsLoad(JSON.parse(${JSON.stringify(fs.readFileSync(dir + '/cards.json', 'utf8'))})); gameLoad();
const results = [];
for (let game = 0; game < GAMES; game++) {
  gameReset();
  const chars = CARDS.all.filter((c) => c.kind === 'character');
  actStart(chars[game % chars.length].id); let s = GAME.state;
  let steps = 0, draws = 0, kinds = {event:0, person:0, possession:0}, noOption = 0;
  while (!s.ended && steps < 300) { steps++;
    if (s.draws < 1) { actEndMonth(); continue; }
    if (!s.kindChosen && s.draws >= 2 && Math.random() < 0.3) actChooseKind('event');
    const id = actDraw(); if (!id) { actEndMonth(); continue; }
    draws++; const c = cardOf(id); kinds[c.kind]++;
    if (c.kind === 'event') { const opts = optionsFor(s, c).filter((o) => o.ok); if (!opts.length) { noOption++; if (!actPass()) break; continue; } actChoose(opts[Math.floor(Math.random() * opts.length)].i); }
    else if (c.kind === 'person') { if (!actTake('contact')) actPass(); }
    else { if (!actTake('possession')) actPass(); }
  }
  s = GAME.state;
  const ex = gameExport(); gameImport(ex); const s2 = GAME.state;
  const same = JSON.stringify(s2) === JSON.stringify(reduce(GAME.log));
  results.push({ ended: s.ended, month: s.month, draws, kinds, noOption, money: s.money, infl: s.influence, status: s.status, traits: s.traits.length, flags: Object.keys(s.flags).length, poss: s.possessions.length, contacts: s.contacts.length, assoc: s.associates.length, replay: same, hist: s.history.length });
}
console.log('all ended:', results.every((r) => r.ended), 'all replay ok:', results.every((r) => r.replay), 'noOption total:', results.reduce((a, r) => a + r.noOption, 0), 'avg draws:', results.reduce((a, r) => a + r.draws, 0) / results.length);
LEDGER(1, 'sim', GAMES, results.every((r) => r.ended) && results.every((r) => r.replay));
`, ctx);
