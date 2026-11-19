# Nowhere – cards for Prototype 1

Written by Spiel_1 (role Spiel) on the Betreiber's word ("Write the cards", 05.11.2026, 18:09). Format: card format
draft 1 in nowhere/technik/technik.md. One file per card, file name = id. Front side = the YAML head; back side = the
prose below it. Everything here is draft content until played.

## Decisions taken by the author while writing (Spiel_1, 05.11.2026)
- `cost: draws` is always 1, written out on every option, including "wait" – the format leaves it open; the app may
  drop the field later.
- No branching by trait inside `effects` (format: not in Prototype 1); where the concept would branch, the author
  picked one outcome and said so in the prose.
- Opinion start values are not on the cards; they come from the concept table.
- Every event has at least one option with `origin: always` and no money/influence cost, so no card can leave the
  player without a playable option (check script rule; fixed on 7 cards 05.11. after Spiel_2's finding, post/spiel/007).
- No card schedules itself with `follow:` – the engine draws a follow-up target only when something schedules it,
  so a self-follow makes the card unreachable (fixed on 3 cards 05.11. after the first playthrough).
- P2 (decided 05.11., 21:38): every event offers at least two options every character can see (`always` or
  `block:europe`); one of them is free. Exception: cards gated by `requires: [possession:…]`, whose options are about
  that possession.
- New options are appended after the existing ones, never inserted – a saved game is a log of option numbers.
- P5 (21:38): no card makes the player bankrupt easily – costs mostly 1, rarely 2; no effect below −2 money or
  influence.
- P1 phases (06.11.): crash-tuesday is `beat: 9` (with `requires: [month:9]`) and every option sets `flag:crashed`;
  what-remains is `beat: 12`; aftermath cards require `flag:crashed`; the rising-market cards carry `until:8`
  (contracts `until:6`). A beat card must never be a `follow:` target – the engine draws follow targets only when
  scheduled, so a beat that is also a follow target would not fire.
- P3 contacts (06.11.): `contact:<profession>` options cost 1 influence and do less than the associate version.
  Their text names no person ("a lawyer you know"); the app adds the name.
- An option that checks `associate:` or `contact:` never names a person in its text or explanation – "Ask your
  doctor", not "Ask Ines"; the app shows who it is. Named persons stay only where the card is about that person as
  part of the world (Hanna as committee chair, Arjun's own favour, Priya's startup). Fixed on 27 cards 06.11. after the
  third playthrough (Samir's doctor is Meera, the cards said Ines).
- Follow-up windows are at most 3 months, and a card that starts a story thread carries `until:9`, so the thread can
  finish inside the year (06.11. after the fourth playthrough: the levy vote was lost in 109 of 500 simulated years,
  now in none).
- Time flow (Prototype 2, format draft 3, 07.11.): `place` · `who` · `takes` · `costs` · `expires` · `arrives`; place
  cards (`kind: place`, `block` or `none`, stack `given`). Set only where the defaults do not fit; small personal
  cards of impact 1 may carry `takes: 0, costs: 0`; from impact 2 a card costs 1 and takes 1 unless it is a phone call
  or a decision at home (fifth game, 07.11. 22:27: cards that cost nothing mean nothing). `possession:<x>` in `requires`/`origin` is a *type* (estate, factory, servers,
  energy …), not an id – the engine matches by type; the card's `place` ties it to the specific possession.
- `who: anyone` on story cards with block or global reach (07.11., after the second P2 playthrough): the player or
  any associate may do them; cards that need the player stay `self` (personal cards, decisions about his own life).
- `picture:` lines are set by the artwork role (Artwork_1), not by Spiel_1.
- A price is written once: in `cost` (shown on the front), never repeated as a `money:-n` / `influence:-n` effect
  (32 duplicates removed 05.11., same finding).
- The player's block in Prototype 1 is Europe (traits diplomatic · federal · cultural; start values economic 7,
  military 4, cultural 8, technological 6). All five characters are Europeans; persons come from several blocks.
- Second batch (05.11. evening, "create more content"): 2 characters, 7 persons, 4 possessions, 49 events. Every new
  event offers, besides the free option, a real choice every character can see (`always` with a price, or
  `block:europe`) – P2 in the concept, applied to new cards only. New cards use only trait words the engine also
  knows (until the vocabulary is aligned, post/spiel/009): brave honest shy ambitious content generous greedy patient
  impatient trusting just arbitrary cynical calm compassionate cruel curious indifferent loyal innovator preserver
  globalist patriot wise. New possession type: `energy`.
- Stacks: `start` (character cards, not drawable) · `given` (cards only an event gives – never drawn at random,
  so a `gain:` can never hand the player something they already have) · `the-last-boom` (the story-line, 34 cards) · `personal` (26
  cards). Persons and possessions carry the stack they are drawn from.

## The second story-line: the-signal (Spiel_1, 07.11.2026, 22:40–22:55, on the Betreiber's "i start hating this story. make anotherone." / "just pick one")

Stack `the-signal` (story-lines.md, Entwurf 1): 53 events, 3 persons (rosa-almeida, li-na, daniel-ross), 1 possession
(the-array), 1 place (atacama), 3 goals. Spine: six beats – eleven-days (1) · the-blocks-know (4) · the-world-hears-it
(6) · someone-answers (9) · what-it-says (10) · the-ring (12). Phases: secret (1–3, `until:3`), the blocks (4–6), the
reply (7–9), what it says (10–12). Three readings in months 7–9 (engineer: blueprint, doctor: warning, banker:
ledger) set the flags the beats of months 10 and 12 answer. Ten cards pay (grant, lecture, book, dish time, auction,
documentary, market, consultancy, funding round, year in review); every card above impact 1 costs 1; beats cost 0.
Meant to run **alone** – the P3 engine opens every stack, so until Spiel_2 adds a story switch both lines run together.

## Vocabulary used (ids, lowercase; lists are open – the check script matches on these)
- skills: persuasion · deception · intimidation · insight · performance · languages · stealth · sleight-of-hand ·
  athletics · survival · perception · technology · medicine · science · history · investigation · religion · finance
- professions: businessperson · journalist · scientist · doctor · pilot · hacker · lawyer · engineer · politician ·
  artist · spy · cleric · athlete
- traits (pairs): brave/craven · honest/cunning · gregarious/shy · ambitious/content · generous/greedy ·
  patient/impatient · trusting/suspicious · just/arbitrary · faithful/cynical · calm/wrathful ·
  compassionate/cruel · curious/indifferent · loyal/opportunistic · innovator/preserver · globalist/patriot;
  single: wise
- acquired: famous · infamous · indebted · scarred · wanted · burned-out · parent · married
- blocks: europe · usa · russia · china · india
- block values: economic · military · cultural · technological
- possession types: estate · factory · vehicle · cultural · airfield · servers
- flags set by choices (all in the-last-boom unless noted): levy-supported · levy-opposed · sold-factory ·
  kept-humans · went-public · took-the-offer · model-in-house · union-ally · minister-contact · burned-bridges
- flags in the-signal (07.11., 22:55): heard-first · leaked · kept-secret · told-europe · sold-data · invested ·
  bought-the-sky · been-to-the-plateau · on-the-paper · committee-seat · joined-the-watch · left-the-watch ·
  knows-the-gobi · knows-the-hoaxer · heard-the-gobi · argued-silence · writing-the-book · listened-from-orbit ·
  read-blueprint · read-warning · read-ledger · blueprint-known · warning-known · ledger-known · you-answered ·
  europe-answered · ring-funded · ring-builder · ring-stopped · the-passage (hand-over to Der Durchgang)
- **Arcs** (15.11., 07:21, Betreiber: „reshape The Signal as well as the Last Boom“): a thread is an arc – a thread card
  (`kind: thread`: question, endings, length, `nodes`) and node cards. The opening has no `after`; every later node has
  `after: [{card: <id>, options: [i, …]}]` (a list = OR; the option indices that trigger it) and `wait: [min, max]` weeks;
  `requires` only for what can change; `until` stays the expiry. Beats keep `requires: [month:n]`. Until the engine reads
  `after`, the old `follow:` effects stay on the cards; then they come out (post/spiel/069). the-signal: 12 arcs, 34
  nodes with after; the-last-boom: 12 arcs (boom-and-bust · the-levy · the-ninety · the-paper-thread · the-union ·
  the-source · your-own-model · the-minister · a-world-of-models · the-power · the-offer · far-away), 56 nodes with after.
- `once: true` (10.11., 13:15) on one-time life events (the wedding, a child, enlightenment, the inheritance, the
  reunion, the dog, the new car, moving house, the godchild, the speech, the show, the influencer month, the long
  walk, the marathon): taken once in a campaign, never dealt again – engine reads it (request post/spiel/053). Found
  by the Betreiber: year 2 opened with a second wedding.
- Prototype 4 (08.11., 19:35): `thread: [<id>, …]` and `part: opens | continues | turns | closes` on every event card
  (the-signal done; personal and the-last-boom follow); thread definitions in nowhere/threads/<stack>.md until cards.py
  knows `kind: thread`. Checks: d20 + level + trait vs DC 8/11/14/17/20 for difficulty 1–5 (konzept-zeitfluss.md).
- possession type `observatory` (the-array); place `atacama`; goal cards carry `story: <stack> | any` so the goal of
  the day can be drawn from the open story-line (request to Spiel_2, post/spiel/035)
