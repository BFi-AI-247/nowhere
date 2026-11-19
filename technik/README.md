# technik – how Nowhere runs (the overview and Prototypes 1–4)

Owner: role Spiel, instance Spiel_2 (betrieb/rollen/spiel.md). Decisions and the card format: technik.md.
Concept (what the game is): ../konzept.md. Live: https://digifil.de/nowhere/ (deploy: ../.github/workflows/nowhere-deploy.yml).

```text
technik.md        decisions of the Betreiber, card format, open points
tools/sim1.js     Prototype 1 simulator: node technik/tools/sim1.js [games]
tools/ledger.js   every simulator run appends one line to tests/runs.jsonl (rounds for the overview page)
tests/runs.jsonl  test ledger; tools/cards.py sums it (and the playthroughs in ../konzept*.md) into app/rounds.json
tools/sim4.js     Prototype 4 simulator: node technik/tools/sim4.js [years] [--mock] – also two years in a row, thread measures
tools/sim3.js     Prototype 3 simulator: node technik/tools/sim3.js [years] [--mock]
tools/sim2.js     Prototype 2 simulator: node technik/tools/sim2.js [years] [--mock] – plays random years, checks invariants and replay
tools/cards.py    check script: reads one Markdown file per card, validates the head, writes app/cards.json
                  python3 technik/tools/cards.py            (needs PyYAML)
                  source: ../karten/ (Spiel_1's cards); falls back to karten-test/ while that is empty
karten-test/      test cards (invented, marked TEST DATA) so the app has something to draw
app/              the game – a PWA-style page without build step, classic scripts, one shared namespace
  index.html      overview: the prototypes newest first, rounds played (hub.js, hub.css, rounds.json): digifil.de/nowhere/
  p1/             Prototype 1 – months: digifil.de/nowhere/p1/ – index.html (load order ../engine.js → ../i18n.js →
                  ../picture.js → ../feedback.js → ui.js), ui.js, manifest
  i18n.js         UI texts EN/DE, game vocabulary DE; card texts come from the card file (title_de, text_de, --- de ---)
  sw.js           service worker: shell offline, cards.json network first; bump VERSION when shell files change
  manifest.webmanifest, icon.svg, icon-192/512.png   PWA (add to home screen, no address line)
  pictures/       artwork files named in a card's picture: field (none yet; placeholder drawn until then)
  engine.js       state derived from an append-only log; drawing, options, effects, opinion, storage
  picture.js      placeholder picture drawn from the card's id (no image files)
  p1/ui.js        stage with one card, flip, swipe, the fan, menu, export/import
  app.css         phone first, max. 520 px, light and dark
  p2/             Prototype 2 – time flow (weeks, people, open board, author): digifil.de/nowhere/p2/
    week.js       engine on top of ../engine.js: people, resource, activities, travel, rules author, AI-author client
    board.js      board by place, card view, who goes, team, story; board.css
    ai.js         bring your own AI (as in KOMPASS): providers, encrypted key on the device, the author's instructions
  p3/             Prototype 3 – goal, checks, skill levels, trait scales, author planning, team on top: digifil.de/nowhere/p3/
    week.js       copy of p2/week.js plus the Prototype 3 block at the end (overrides holds/effect/skillsOf on this page)
    board.js      copy of p2/board.js with team strip, small top bar, goal, check lines; ai.js with checks/plan/goal
  p4/             Prototype 4 – the weave: threads and the follow rule, the d20, levels for all persons, years in a row:
                  digifil.de/nowhere/p4/ – copy of p3/ plus: thread engine (threadTake/dueThreads/nextOfThread), d20Result/checkOdds,
                  profession levels, act2NextYear; board.js: dice sheet, story tab Wochen | Fäden (renderWeave)
  feedback.js     like/dislike on card backs → feedback.php (Infra_1)
  cards.json      built by tools/cards.py (the deploy rebuilds it on every push) – do not edit by hand
```

Run locally: any static server in `app/` (e.g. `python3 -m http.server 8080` there, then http://localhost:8080/ –
the overview; Prototype 1 at /p1/).
`cards.json` is fetched, so opening index.html as a file does not work.

Controls: tap a card = flip · swipe up (or ↓ / j / space) = draw the next card · swipe left/right (←/→) = the fan:
character → associates → contacts → possessions → environment · 1–5 = choose an option · e = end the month ·
f = flip · ⋯ = menu (save the story as a file, load one, new game).

Game rules in the code (from konzept.md "Prototype 1"): 12 months, 5 draws each; once a month one extra draw buys
the kind of the next card; options show only when their origin holds, with origin and cost; "wait" is always there;
drawn persons can be kept as contacts (−1 influence), possessions acquired (−2 money); associates may become
contacts for n months and return; follow-up cards come within n months; the log is the only saved state.
