// Nowhere – test ledger: every automatic test run appends one line to technik/tests/runs.jsonl.
// tools/cards.py sums it into app/rounds.json for the overview page (Betreiber 07.11., 19:07). Owner: Spiel_2.
const fs = require('fs'); const path = require('path');
const FILE = path.join(__dirname, '..', 'tests', 'runs.jsonl');
function ledger(prototype, kind, rounds, ok, extra) {
  const line = Object.assign({ at: new Date().toISOString(), prototype, kind, rounds, ok: !!ok }, extra || {});
  try { fs.mkdirSync(path.dirname(FILE), { recursive: true }); fs.appendFileSync(FILE, JSON.stringify(line) + '\n'); } catch (e) { /* a test never fails for its ledger */ }
}
module.exports = { ledger };
