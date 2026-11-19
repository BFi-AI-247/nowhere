# Nowhere – Technik

Geführt von der Rolle Spiel, Instanz Spiel_2 (betrieb/rollen/spiel.md, DIENST). Fachliches steht in
nowhere/konzept.md und gilt dort; diese Datei sagt nur, wie es technisch läuft. Entscheidungen des Betreibers mit
Datum und Wortlaut; Ideen der Rolle als ⟦Vorschlag: …⟧, sie gelten erst, wenn er sie annimmt. Neueste Entscheidung
oben. Gebaut wird nichts, bis der Betreiber es sagt.

## Entscheidungen

### 2026-11-19 – The project moves into the repo BFi-AI-247/nowhere (Betreiber's wording, 11:50)

"Kannst Du bitte das Projekt umstellen auf der Repo Nowhere. Das haben wir irgendwie aus den Augen verloren."
Asked before: scope "Alles, ohne Verlauf (Empfohlen)" · deploy "Ja, leg ihn dort hin (Empfohlen)" · timing "Jetzt, mit
Nachricht an alle (Empfohlen)".
→ The whole folder digifil-solutions/nowhere/ (state 3805d69) is this repo's root, without history (it stays private
there). A path `nowhere/<x>` there is `<x>` here. Deploy: .github/workflows/nowhere-deploy.yml here (secrets were already
here, Infra_1 05.11.); the workflow in digifil-solutions is removed, so only one repo uploads to /web/nowhere. It now also
runs on technik/tests/**, konzept*.md, threads/**, autor-brief.md (my proposal of 07.11.). Role files and the Kanon stay in
digifil-solutions; CLAUDE.md here points there. Public repo: the two start prompts no longer name the Betreiber.

### 2026-11-13 – The author test: "[object Object]" (Betreiber, 07:29)

"✗ aiNoCards · HTTP 200 · 47 s · 15 Zeichen · length · [object Object]"
→ Read by Spiel_2: Mistral's large model (mistral-large-latest → a reasoning model) answers with `message.content` as a
list of chunks – {type: "thinking"} and {type: "text"} – and its thinking counts against max_tokens: it thought until
the limit ("length") and the list became the string "[object Object]". Fixed in P4: only the text chunks are read;
Mistral is asked for `reasoning_effort: "low"` (its lowest; dropped again if the API refuses it); the author may use
12,000 tokens. The test shows tokens used and the chunk types.

### 2026-11-13 – The author wrote nothing: cause and fix; log versions; author test (Betreiber's wording, 06:35–06:47)

06:35 "Der Autor schreibt nicht mit. Ist das Token nicht mehr funktional? Oder kommt nichts bei rum?" · 06:45 "Make sure
you understand better from the log the cause in future. Versions of App, Json format what ever." · 06:46 "And I do
bother using broken software." · 06:47 "Please fix the finds of the latest test."
→ Cause (Spiel_2): since 2a0b95b the author answers notes (up to 3,000 characters) + plan + cards, but the call still
allowed 2,400 tokens – the answer was cut off before or inside the cards, JSON.parse failed, every week aiNoCards. The
memory build went live without one real call against the new format (my gap – the mock does not have a token limit).
Fixed in P4 (post/spiel/062–065, 061):
- max 6,000 tokens for the author; timeout 180 s (background); notes asked for at most 2,000 characters.
- Tolerant reading: raw line breaks inside strings are escaped; an answer cut off still gives its notes, its plan and
  every complete card (salvaged: true in the log).
- Log: start carries `app` (APP_BUILD), `cards`, `format` ("notes-plan-cards/2"), `author` {mode, preset, model,
  background, lang}; a change of model/key/app/cards mid-game is a `config` entry; every add with the author carries
  `author_diag` {status, finish, ms, chars, raw (first 600 + last 200 characters), salvaged}.
- "Autor testen" in the AI sheet: one real author call with the running game's state – status, seconds, characters,
  why it stopped, readable or not, cards, notes, plan, the first 300 characters. The bar shows an unreadable answer red
  ("Antwort nicht lesbar (aiNoCards)").
- The AI sheet scrolls; inputs move above the keyboard (interactive-widget=resizes-content, scrollIntoView).
- 061: 034/2 off (no paying hand card); the plan's yield may be money, influence, status, a person, a thing or a flag,
  and one card of the answer with a yield is enough (none → plan_errors, nothing dropped); option field `ending`
  (≤ 60 characters) shown as "endete mit: …" on a closed thread; sim4 --policy random|spender|saver with the balance
  table per story × character.
- Rule (065/2, agreed): a change to the answer format, the system text or the brief is not deployed without a green
  author test – by the Betreiber before playing, or by Spiel_2 with a test key if he gives one.

### 2026-11-12 – Build 056–059: the author's memory, thread markers, job income, takes 0 (Betreiber's wording, 22:06)

"I'll give the build to 2." / "Build" – after his overview of the planned changes (konzept-zeitfluss.md, 12.11.
22:06), on post/spiel/056 (job = level + 1), 057 ("keine Zeit … doch geblockt"), 058 (author cards dealt again;
rejections teaching synonyms), 059 (21:57 "Why does the author not remember the world? … Can the AI place learnings
somewhere?"; 22:02 "A simple marker to which thread a card belongs and the status of the thread as indication to the
player.").
→ Built in P4:
- 056: the job pays profession level + 1 money a month (halved when away 4+ weeks).
- 057: takes 0 is done from where one is – no travel, no change of place; where travel falls it is shown on the card
  and in the who sheet ("1 Woche · +1 Reise").
- 058/1: an author card that has been on the board (s.aiSeen, kept over the years) is never drawn again – not as a
  personal card, not as a story card. 058/2: the brief no longer lists why cards were dropped or rejected; `redirect`
  {cards_not_used, build_on, fresh_places, fresh_people, due_thread} points at fresh things instead.
- 059/1 memory: (a) `notes` – the author's notebook, ≤ 3,000 characters, stored (s.authorNotes, add entry `notes`,
  authorLog) and given back verbatim; (b) `board` and `recent_taken` (last 10) with back and option texts, the choice,
  `by_you`; (c) `main_story.bible` – the threads of the story-line (title, question, endings, length), the author's own
  threads, the beats with month and back; (d) `last_plan`. The system text says so. The state grows to ~16,000
  characters.
- 059/2 thread markers: every card shows its thread(s) as a tag "🧵 The plateau · 3/5 · Wendung" (on the board without
  the part); a due thread's tag is red, a closed one green; tap → the thread: question, how it can end, n / length and
  state, cards taken. The weave legend shows n / length and "fällig"; tapping a line opens the same sheet. Threads
  without a question get no tag.

### 2026-11-10 – Build 052–054: option times, paperwork, once/not, household, income (Betreiber's wording, 15:49 and after)

"Build" – on post/spiel/052 (seventh game), 053 (13:05 "another wedding"), 054 (15:46 household and income). Asked
before building. Income: "Monatlich, wie Spiel_1 vorschlägt (Empfohlen)". Household: "Nenne den Team Ribbon um in
People. Dort über dem Team. Und in der Leiste auf dem Board ist noch Platz für eine Karte, das kann Spouse sein. Links
dann. Und Spouse kann auch für Aktionen verwendet werden. Ist team member 5."
→ Built in P4 (cards.py for all):
- 052/1: an option may carry `takes:` (0–13) and `costs:` (0/1); they override the card's for that option (duration,
  strength, who-sheet weeks); the option shows its own time under its text.
- 052/2: PAPERWORK with Spiel_1's lists, plus "table" – the sentence "legt … auf den/die/hin" / "lays … on the table/
  desk/counter" at most once in 4 weeks. 052/3: a second closing card of a thread whose closing card lies on the board
  is dropped ("closes already on board").
- 053/1: `once: true` – a card taken (not let go) is never drawn again in the campaign; s.onceTaken survives the year.
  053/2: `not:<condition>` in requires and origins (not:flag:x, not:acquired:x); `acquired:<x>` is a condition now.
  Year 2 keeps flags, acquired and onceTaken; history of the year starts anew (kept in s.years).
- 054/1: persons with `relation: mate | child` (child with `age`), character `household: [ids]` at the start;
  effects `gain:<person>` (with a relation) and `gain:mate` / `gain:child` (the person a flag met:<id>/met-<id> names,
  else the first free one of that relation in the open stacks or personal). s.household, s.ages (+1 at the year's
  change). The partner acts: team member five beside the three seats, leftmost in the strip, `who: mate`, and in
  anyone/self+1/profession teams; children do not act. Conditions `mate:<trait|any>`, `child:<age>`. Tab "Team" is
  "Personen"/"People" with the household above the team. Brief: `household` (team without the partner).
- 054/2: at each turn of a month a log entry `income` with a d6: job = profession level in money (halved when away 4+
  weeks that month), +1 influence from level 2; things = their `yield {money, influence}`; die 1 → −1, 6 → +1 money;
  money and influence never below 0. A line in the week report and the story ("Einkommen März: Beruf +2 Geld ·
  Fabrik +2 Geld · Würfel 6: +1 Geld → +5 Geld").

### 2026-11-10 – Build 049/050: more state for the author, a plan the engine checks (Betreiber's wording, 10:58 and after)

"build" – on post/spiel/049 and 050 (Spiel_1, from the sparring rounds M001/M002). Asked before building whether the
two whole-answer rules of 050 (a thread at its end gets its closing card; a due thread is served or deferred – "sonst
Antwort rejected") should throw the answer away. Answer: "Karten behalten, Fehler melden (Empfohlen)".
→ Built in P4:
- State: `this_week {n, month, weeks_left, energy {free [{who, strength}], busy [{who, until}]}}` (beside `week`,
  which stays a number); `main_story.next_beat {month, title, must_not_reveal}` (from a beat card's `reveals:` once it
  has one); `consequences_open [{from_week, card, choice, expectation}]` – choices of the last 8 weeks whose flag was
  never tested or whose thread never went on, from history only; `flags [{name, meaning}]` (meaning = card title + the
  option that sets it); `handwritten_planned` (follow-ups waiting); `available_things` (possessions/places of the open
  stacks nobody has, ≤ 10; gain: may use them); `board[].unresolved: true`; `plan_errors_last_time`.
- Plan form of 050 in the system text. Checked per card (matched by id, else by position): cause must point at the
  state (flag:/thread:/a thread id/a person/a week or title of last_weeks/phase–main story–goal–beat) – else rejected
  "no cause"; yield, when the engine can read it (effect word or money/influence/status/…), must be an effect of an
  option – else rejected "no yield". Whole-answer rules logged as `plan_errors` and named in the next brief, the cards
  stay: thread with 0 left without closes, due thread neither written nor deferred, three cards serving the same.
  A new thread needs endings in plan.threads.new (when a plan is there) and at most three entered threads open (the
  brief no longer says it – now a guard). A missing plan is still no error.

### 2026-11-10 – Build 045–047: two block traits, the author's state in five parts (Betreiber's wording, 06:36)

"Build" – on post/spiel/045/046 (Betreiber 09.11., 21:36: "No third one for USA. The game has to understand 2.") and
047 (Betreiber 10.11., 06:32 on the author's prompt: „gigantischer Bullshit. Das erste Beispiel ist Rechnung.
Natürlich bekomme ich nur Rechnungen.“ – Spiel_1 rebuilt nowhere/autor-brief.md from his five components).
→ Read by Spiel_2 as: cards.py takes block_traits with 2 or 3 names (the engine never counted them); no block_values
table – each character card carries its own. P4 brief in the order mandate · state · main story · threads · format:
main_story {story_line, title, phase, coming_beats, goal} first, then threads (due marked), character/money/influence/
status, team, contacts, possessions, blocks {own, values, traits}, flags, available_people (≤ 10 persons of the open
stacks nobody has), returning/activities, last_weeks, board (title + thread only), story_lines, planned, plan_ahead_weeks,
recent_titles, dropped, repaired_last_time. known_cards is gone (the brief shrinks to about 4,000 characters).
gain:/join: on ids outside team/contacts/possessions/available_people are dropped by the repair. Answer format
{"plan": {main, due_thread, consequence}, "cards": [...]}; the plan goes into the add entry (`author_plan`) and the
author log; a missing plan is no error. The role line names the story-line from main_story; the check text describes
the d20; AI card ids carry year and the week written for.

### 2026-11-09 – The week's report as cards, compact tiles (Betreiber's wording, 22:12)

"Ich möchte die On Return Meldung bestätigen und ich möchte die größer und strukturierter. Ich kann so schnell nicht
erfassen, was passiert ist. Mach die im Karten-Stil. Ferner auf der Kartenübersich nicht bei den Personen in der Karte
"web bis Woche 14" angeben. Die Karte in der Liste wird dadurch zu größ. Ingesamt wird ist viel Platz auf den Karten
leer. Insb. rechts."
→ Read by Spiel_2 as: P4. The toast after "Nächste Woche" becomes a sheet "Woche n", confirmed with "Weiter": the totals
(Geld/Einfluss/Status as large signed chips), one card per thing that came back (picture, who · "zurück aus <Ort>",
title, the choice, the d20 line coloured by outcome, trait changes and rises), then other notes (joins, the author
falling back). Nothing came back and nothing changed → a short toast as before. Board tiles: busy people are shown
dimmed without "weg bis Wo n" (it stays in the open card and the who sheet); time/strength and the badges share one row;
chips and badges 14 px.

### 2026-11-09 – White bar at the bottom, goal and away note in one line (Betreiber's wording, 21:52)

"Das UI hat sich ein bisschen verzogen. Unten ist immer ein weißer Balken. Das ziel ist dreizeilig, das mal einzeilig
bitte zu mAufklassen genauso wie die Abwesenheitsnotiz auch einzilig." (photo: P4 installed on the phone, dark)
→ Read by Spiel_2 as: the white bar is Android's gesture bar of the installed app, coloured from the manifest
(background/theme #F4F1EA, light) – not reproducible in a browser. All manifests now #14161A (dark); the page's
theme-color meta stays light/dark by scheme. P4: the goal in one line (label · title with … · count, the progress as a
thin line at the bottom edge), the away note in one line ("Weg bis Woche 4 · Indien · <Titel>", full text as title),
the board scrolls clear of the bottom inset (env(safe-area-inset-bottom)).

### 2026-11-09 – A swap costs 1 influence (Betreiber's wording, 21:43)

"Ja, ein Tausch soll nur 1 Einfluss kosten. Übrigens war der Hintergrund-Autor ein Durchbruch."
→ Read by Spiel_2 as: answer to Spiel_1's concept question (044 item 4). P4: SWAP_COST = 1 instead of RECRUIT_COST = 2
when someone was let go the same week in the swap sheet (log: `swap: true` on recruit/take, valid only after a dismiss
that week); from a person card 1 (keep in touch) + 1. Recruiting into a free seat stays 2. The background author (042)
stays as built.

### 2026-11-09 – Build post/spiel/044 (sixth game) and join (Betreiber's wording, 21:11)

"build" – after 044 (Spiel_1's analysis of the sixth game; Betreiber 18:07 "Zum Ende zu viel Rechnungen … Wieder kein
Geld. Das Konzept ist aber cool. Mit dem Würfeln. Nur was bringt es.").
→ Read by Spiel_2 as: build 044 items 1–3, the cost display of item 4 (the price itself is a concept question Spiel_1
puts to the Betreiber), and join:<person> asked for in 044. P4 only. Built:
- join:<person>: into the team, free, there next week; with a full team the person stays a contact (history says so).
  cards.py knows the effect word; the AI is told.
- A check brings something: on an author card, an option with a check and empty effects gets money:+1, influence:+1
  (impact ≥ 3) or influence:+1; empty partial gets influence:+1 at impact ≥ 3; empty failure gets trait:-<the check's
  trait> or influence:-1. Logged as "check → yield/partial/failure"; the next brief says "check without effects …";
  the system text says it too.
- Paperwork: PAPERWORK in p4/week.js (Spiel_1's list): invoice/Rechnung/bill at most one in 13 weeks, papers
  (Vertrag/contract/Akte/file/USB/Schlüssel/key/Formular/form) at most one in 4 weeks, on title and option texts;
  further ones are dropped at layout ("paperwork: …"), named in the next brief.
- Threads: unknown ids without question/endings are repaired to the due/entered thread (as before); continues/turns
  with one card left → closes; closes before two cards were taken → continues; a card whose threads are all closed or
  faded is dropped at layout ("thread … is closed").
- The swap sheet says the price large: "Kostet 2 Einfluss (du hast 7)".

### 2026-11-08 – Update Prototype 4: who goes, team swap, author in the background (Betreiber's wording, 21:02)

"There is something to build. Please update P4" – on post/spiel/040 (20:17 "Bei der Auswahl des Team für eine Karte,
möchte ich die relevanten Skills sehen."), 041 (20:40 "Wenn ich jemanden ins Team holen möchte auf einer Karte, muss
auch die Auswahl verfügbar sein jemanden dafür zu entfernen."), 042 (21:00 "Kann der Autor die nächste Woche im
Hintergrund schreiben? Dafür geht derzeit die meiste Zeit drauf.").
→ Read by Spiel_2 as: all three in P4 only. Built:
- 040: the who-goes sheet shows per person the checked skill with level and the check's trait with its value
  (profession bonus when it counts), the d20 line per team, and marks the team with the best chance ("★ beste Chance");
  on a card without a check: the skills, professions and traits from the options' origins the person has.
- 041: with a full team, "Ins Team" on a person card, the recruit offer on a card and the contact's recruit button
  open "Wer macht Platz für X?" – let one go (becomes a contact, as 022) and take the new one in, one step; cancel
  leaves the card. Away people cannot be let go.
- 042: after a week's cards are laid out the app asks the author for next week with the state of now (brief:
  writing_for_week, note "You write for week n+1; the choices of week n you see next time."). At the week's end the
  waiting answer is used at once; cards whose requires (other than month/until) no longer hold are dropped and named
  in the next brief (`dropped`); an answer not there yet is used at the next week's end (`author_waiting` in the log).
  The first week of a year asks and waits as before. The bar: "✦ schreibt Woche 13 …" / "✦ Woche 13 liegt bereit".

### 2026-11-08 – Prototype 4, the weave (Betreiber's wording, 19:37)

"there is more to build. go." – after 038 (Spiel_1: thread format on the Signal cards, d20 decided 19:28 "Yes. Sounds
interesting.").
→ Read by Spiel_2 as: build Prototype 4 from 036 items 2–5 and 7 and 038 items 1–2, as a new page app/p4/
(digifil.de/nowhere/p4/, on top of the overview); Prototype 3 stays as it is. Built:
- cards.py: kind thread (id, title, question, endings, length – a number or "4–6"), in nowhere/karten/threads/; until
  those exist the tables in nowhere/threads/*.md are read; cards.json carries them as `threads` (not in `cards`, so P1–P3
  never draw them). Events: thread = name or list, part = opens | continues | turns | closes, or one per thread
  (part: {the-secret: closes, europe-at-the-table: opens}). Skill names are open (form only, 036 item 2).
- Threads in the state: s.threads[id] = {opened, cards, entered, last, closed, faded, lay}. Taking a card (not the free
  option) enters its threads; part closes closes (on a crossing with one word: only a thread that already has a card –
  otherwise it opens there). A thread whose card lay twice (expired or let go) fades: no more cards.
- Follow rule: an entered thread with no card on the board gets its next hand card 2 weeks after the last one
  (continues before turns before closes, closes only after two cards), in the story room, before anything else; while a
  thread waits (up to 4 weeks) no card that opens a new thread is drawn. The AI gets "threads" (question, endings,
  left, entered, due) in the brief; its cards must carry thread/part – repaired to a due or entered thread when
  missing; a new thread only with thread_question + thread_endings.
- The d20 (038 item 2, numbers Spiel_1's ⟦⟧): d20 + level + axis value + 2 help (+ profession level on a card for that
  profession) vs DC 8 · 11 · 14 · 17 · 20; strong (DC+5, natural 20: skill +1 level), success, partial (1–4 under),
  failure (5+ under; natural 1: plus the card's first failure trait once more); advantage with origin possession:/
  contact:, disadvantage at axis ≤ −2. Before the click "d20 + 5 gegen 14 · 60 %"; the die rolls a second in its own
  sheet; push once for one energy of the doer (not on beats). The result is fixed at the take and kept in the log.
- Levels for all persons: contacts get levels and axes when kept and show them; profession level 1 at the start, +1
  for every three cards done in the profession (max 3) ⟦Spiel_2⟧.
- Story tab: Wochen | Fäden – one line per thread, the cards taken as knots (opens dark, turns red, closes green),
  a card in two threads ties the lines; tap a knot → week, title, choice; below each thread's question and state.
- Years in a row: at the year's end "Jahr 2" with the story-line to choose → the same character, team, things, values,
  levels, flags; board, threads and story start anew (the past year is kept in s.years).
- take entries keep playable/affordable; sim4 prints the thread measures per story-line.

### 2026-11-07 – Build post/spiel/033–036, the part that can be played now (Betreiber's wording, 23:16)

"build"
→ Read by Spiel_2 as: build what 033–036 ask and what can be played without new cards, in Prototype 3, in Spiel_1's
order (036: "1 und 035/1 sofort … dann 3 + 4 … dann 2, 5, 6, 7"). Built now:
- 033/1, 036/1: no cap on trait axes, no limit of live axes (AXIS_MAX, LIVE_AXES = Infinity).
- 033/2: the goal box is a button → the goal's back, "measure: now / target" and where the number comes from; flag
  goals "noch nicht / erreicht"; after the character is chosen: "Dein Ziel dieses Jahr: …" before week 1.
- 034/1: author cards of impact 2+ with costs 0 → costs 1; away from home with takes 0 → takes 1 (repair, logged);
  not for beats or a card about someone coming back this week. The AI is told "costs: 1 (0 only for impact 1 at home)".
- 034/2: an author answer with no option that brings money or influence → the engine adds one paying hand card
  (story-line first), the add entry carries `no_yield: true`.
- 034/3: the story room counts hand cards only; author cards at most AI_MAX = 5 on the board, the rest of an answer
  is noted as `over` and not laid out.
- 035/1+2: one story-line per game – start page "Geschichte" (Das Signal | Der letzte Boom), ?story=<stack>,
  default the-signal, stored in the start entry (`story`); games before 23:16 keep all story-lines. Goal of the day
  from the goals with story == the story-line or any.
- 036/6: take entries carry `playable` and `affordable`; sim3 prints the fun measures per story-line.
Next, in a Prototype 4 (app/p4/), once Spiel_1's thread format and the Signal threads are there (08.11.): 036/3 threads,
036/4 follow rule, then 036/2 levels for all persons, 036/5 weave view, 036/7 years in a row.

### 2026-11-07 – Build post/spiel/031 (Betreiber's wording, 21:46)

"build"
→ Read by Spiel_2 as: build 031 – all three items, item 3 included because "build" came after 031 named it.
Prototype 3 only (p3/): (1) the brief carries `recent_titles`, the titles of the author's last 20 cards;
(2) before repair, a card whose title shares more than 60 % of its words with one of those (or with a card earlier
in the same answer) is rejected and logged as `repeat: <earlier title>`; (3) money/influence per effect at most ±2,
±3 on cards of impact 4–5 (validated, repaired by clamping, told to the AI), and the front of every event card
shows what each option changes – money, influence, status, block values, trait pushes, things gained or lost;
on an option with a check marked "wenn es klappt". Flags and follow-ups stay hidden.

### 2026-11-07 – Overview page of the prototypes with rounds played (Betreiber's wording, 19:07)

"Mach mir bitte eine Website, auf der die Prototypen (neueste Oben) anklickbar sind. Im Moment ist es immer ein
bisschen tricky das einzutippen. Und bitte auch die Anzahl der gespielten Runden (von mir und automatische Tests in
der Liste angeben."
→ Read by Spiel_2 as: digifil.de/nowhere/ becomes the overview (app/index.html, hub.js, hub.css); Prototype 1 moves
to digifil.de/nowhere/p1/. One round = one game (one year). "Von mir": two numbers, not summed – rounds written up
in the concept (playthrough headings in nowhere/konzept*.md, counted by tools/cards.py into app/rounds.json) and
rounds on this device (engine.js playTally, localStorage 'nowhere.plays', counted from 07.11.2026 on). Automatic
tests: every simulator run appends a line to tests/runs.jsonl (tools/ledger.js); earlier runs backfilled from the
chat, marked approximate.
⟦Vorschlag: add nowhere/technik/tests/** and nowhere/konzept*.md to the paths of .github/workflows/nowhere-deploy.yml,
so new counts go online without an app change – the workflow is the Betreiber's area.⟧

### 2026-11-07 – Build Prototype 3 (Betreiber's wording, 17:15)

"Build"
→ Read by Spiel_2 as: build post/spiel/027 (author answered 11 of 52 weeks), 028 (Prototype 3 – the Betreiber's
decisions 17:10: goal, checks, skill levels, traits as scales, author planning, "take a contact into the team" as a
visible option) and 029 (board layout, 17:14). Built as a third page, digifil.de/nowhere/p3/; Prototype 2 stays.

### 2026-11-07 – Build task from the second playthrough (Betreiber's wording, 12:25)

"Check whether there is a build task"
→ There is: post/spiel/025 (Spiel_1, after the Betreiber's second Prototype 2 game; his decision 11:54: "Ich möchte
gern auf dem Board bereit erkennen, ob ich jemanden zuweisen kann und ob ich es nur selbst bin."). Built on this
word: (1) who can do a card, on the board tile and the open card – "only you" / "you or your team" / "you + one" /
"your engineer", with the people as chips, greyed out with the reason (away until week n, no resource); (2) a line
under the tabs while the player himself is away ("You are at … until week n"), a question before sending anyone
away 4 weeks or more, and "Into the team" right on a person card when it comes onto the board; (4) the rules author
puts a card first whose `requires` meets a flag the player set (stories build on each other until the AI author
writes). Left open, the Betreiber's: (3) traits change too fast – Spiel_1's proposal "two pushes" waits for his word.
Found while building: "let it pass" is now the *last* free option of a card (no money, no influence); earlier free
options are real actions – they need a person, a resource and the card's weeks. Before, every free option resolved at
once, so "A month in Lisbon" (two free options) cost no time at all. 9 cards with takes > 0 have two free options;
list to Spiel_1 (post/spiel/026).

### 2026-11-07 – Build: team in/out, board clog, resource (Betreiber's wording, 01:12)

"Build"
→ Read by Spiel_2 as: build post/spiel/022 (Spiel_1, after the Betreiber's first Prototype 2 game and his decision
01:08 "Reinnehmen, rausnehmen"), with Spiel_1's proposals as written there: (1) the player takes a contact into the
team (1 week until the person is there, 2 influence, 3 seats) and sends an associate back to the contacts (at
once, free; not while away); (2) the author's "fewer than 8 open" counts only story cards younger than 3 weeks, so
untaken cards no longer stop the story; (3) the player gains 2 resources a week, associates 1 (cap 3) – the number
was left to the Betreiber in 022; "Build" is read as yes, easy to change (RES_SELF in p2/week.js).

### 2026-11-07 – AI author: bring your own AI, like KOMPASS (Betreiber's wording, 00:47)

"I would be in favor of the bring your own ai approach of kompass. key in the app."
→ Decided: no author.php; the player connects his own AI in the app, as in KOMPASS (BFi-AI-247/KOMPASS web/ki/:
anbieter.js, tresor.js, ki-box.js – read 07.11.). Providers: OpenRouter (sign-in, free models), Mistral, Claude,
OpenAI, Gemini, a local service (Ollama/LM Studio) or any OpenAI-compatible address. The key stays on the device,
encrypted (AES-GCM, IndexedDB), and goes only to the provider. Without an AI the rules write the week. The
interface section below stays valid for the card side (brief in, cards out, checked like cards.py).

### 2026-11-07 – Build (Betreiber's wording, 00:31)

"build"
→ Read by Spiel_2 as: build Prototype 2 (konzept-zeitfluss.md, Spiel_1's deliveries post/spiel/017 and 018) and the
small items addressed to Spiel_2 (post/spiel/015 beat vs. follow, 016 reload cards and show their version, A3 like
buttons on Infra's endpoint 014). The upload idea (06.11., 00:11) stays parked. Prototype 1 stays as it is at
digifil.de/nowhere/; Prototype 2 is a second page, digifil.de/nowhere/p2/. Open, the Betreiber's: where the AI
author runs and with which model (asked 00:33; recommendation: author.php on Strato calling the Mistral API).

### 2026-11-06 – Upload of the game; a new deck per player and year (Betreiber's wording, 00:11)

"The Player could be asked to Upload his game, so that we can analyze it. We should do do something like this
anyways, so that the author can plan the game for the player continously. For example every year an Upload. The
player pauses, the game creates a new deck according to his status."
→ Held as an idea (no decision yet); deutungen by Spiel_2 in #016. Technically: the log is already the whole game
(append-only, exportable), so "upload" is one button that sends the same file to a server endpoint – the endpoint is
the infrastructure chat's (A3 already asks for one), the button is Spiel_2's. A deck per player and year is the
author loop of the concept (13:25: repository across games) – concept and author chat, not Prototype 1.

### 2026-11-05 – Engine forms for P1–P5 (Betreiber's wording, 23:04)

"There is engine adjustments requested by NW_1"
→ Done on this word (the decisions themselves: konzept.md, 21:38; the request: post/spiel/011). Format draft 3 =
draft 2 plus:
- `requires: [month:<n>]` – drawable from month n; `until:<n>` – through month n (both also usable as an option
  origin). Head field `beat: <month>` – the card is the first draw of that month if it is drawable, whatever kind
  the player asked for; one beat per month (check script). `requires` now applies to persons and possessions too.
- `origin: contact:<profession>` – holds when a contact has that profession; labelled like associates.
- Traits: at most three; a fourth pushes the oldest out; an opposite still replaces. The card's outcome line says
  which came and which went ("Calm replaces impatient", "Wise came, patient went (three traits at most)").
- Money and influence never fall below 0 through effects (costs are already gated).
- The free `always` option is shown last, whatever its place in the file.
- Start prompt artwork-manager.md: STYLE.md and LOG.md live in nowhere/technik/artwork/ (post/spiel/012).

### 2026-11-05 – Go for T1–T6; artwork via Mistral; two start prompts (Betreiber's wording, 21:22)

"T1-T6 go
A1: We leverage Mistral for pictures. You give tasks to Mistral and it creates pictures. You can create an
Ini-Prompt for a Artwork-Manager Chat here that gives orders to Mistral.
A2: Give me that Ini-Prompt, too."
→ Decided: T1–T6 are built now (T7 waits for the concept). Built 21:40 (commit follows): T1 font 18 px base, T2 PWA
(manifest, icons, service worker: offline, standalone), T3 vertical dots, T4 wait-only cards kept back, T5 `picture:`
shows app/pictures/<file>, T6 EN/DE with format draft 2 below. Pictures come from Mistral; an Artwork-Manager chat
gives Mistral the orders – Spiel_2 writes its start prompt (nowhere/technik/start/artwork-manager.md) and the one
for the infrastructure chat (nowhere/technik/start/infrastruktur.md). Both are drafts of the Betreiber's chats,
not roles of the Kanon yet; a role file for them is the role Regeln's to make (wish via post/regeln/).

### 2026-11-05 – First playthrough: findings and priorities (Betreiber's wording, 21:11)

"I played one round. These are the findings:
The Font need to be 2 sizes bigger. I don't have the best sight.
Can you make it a pwa, so you save the adress line.
On char Selection: Up and down scrolling, but the dot indicator on the bottom is horizontal
The engine should not present "wait" only cards.
The daughter should become a person and stay in the game minimum a contact.
Maras Factory is not in her properties.
 The Groom should be an Associate. Relatives Can increase the limit.
Playing it in englisch is hard for me, we should have both language versions by now.

Only few things for you.

My other priorities now:
Setup Artwork Jobs.
Setup environment
Feedback or like buttons on the cards. (backside)

Please sort out the plan, what is for you, what for 1 and what for other chats."
→ Sorted by Spiel_2 (#013), awaiting the Betreiber's go:

**Spiel_2 (technik, app):**
- T1 Font two sizes bigger (base 16 → 18 px, options and prose with it; the stage stays one card).
- T2 PWA: manifest, icons drawn by the app's own picture code, service worker for offline and "add to home
  screen" (standalone – no address line). Deploy picks the new files up automatically (mirror).
- T3 Character selection: dot indicator vertical, since the swipe is vertical.
- T4 Engine: a card whose only visible option is the "wait" option is skipped while another drawable card exists
  (it stays in the pool for later). ⟦Note for Spiel_1: single-option cards are then rarely seen.⟧
- T5 Pictures: show `picture:` when a card names a file (app/pictures/<file>); placeholder only when empty –
  needed before artwork jobs deliver anything.
- T6 Two languages in the app: UI texts EN/DE, a language switch, card texts from the card file in the chosen
  language (fallback EN). Format draft 2: `title_de`, option `text_de`, back side with a `--- de ---` separator;
  the check script accepts both. The German card texts themselves: Spiel_1 (K1).
- T7 Engine support for relatives: effect `associates-max:+n` (or a `relative` role that does not count against
  the limit) – once Spiel_1/the concept says which.

**Spiel_1 (concept, cards):**
- K1 German versions of the 79 cards, once format draft 2 is there (T6).
- K2 The daughter: a person card; stays in the game, at least as a contact (your-daughter-grows-up).
- K3 Mara's factory (factory-lodz) into Mara's possessions on her character card.
- K4 The groom: a person card, associate on "Say yes" (the-wedding); concept rule "relatives can increase the
  associate limit" → konzept.md, then T7.

**Other chats / roles (not the game's two chats):**
- A1 Artwork jobs: a producer for pictures per card (image model, prompt from title + back, file into
  app/pictures/, `picture:` filled) – own role or the infra chat; needs an image service with a key the Betreiber
  sets up.
- A2 Environment: repo BFi-AI-247/nowhere (GitHub App access, secrets), later a database (17:55) – infra chat;
  Spiel_2 writes the start prompt on request.
- A3 Feedback/like buttons on the back of cards: UI part Spiel_2 (Prototype 2), storage needs a small server
  endpoint on Strato (like Digiwort's feedback.php) – infra chat sets up the endpoint; the Betreiber decides what is
  collected (like/dislike per card, free text) and where it goes (file on the server / GitHub issue).

### 2026-11-05 – Deploy workflow placed (Betreiber's wording, 20:34)

"put it there"
→ Decided: Spiel_2 moves its draft to .github/workflows/nowhere-deploy.yml, this once on the Betreiber's word
(`.github/workflows/**` stays the Betreiber's area). Target https://digifil.de/nowhere/, secrets DIGIFIL_SFTP_*.

### 2026-11-05 – Deploy: draft ready, waiting for the Betreiber's choice (20:29)

Betreiber (20:29): "So we need a deploy and for that we need the secrets, I guess? I thought we go with digifil
because the secrets are there. But now I am on the computer. I could be setting up a new environement. Should we do
this or do you want to create a ini prompt for a chat that supports that specifically does infrastructure."
→ Spiel_2's draft of the workflow: nowhere/technik/deploy/nowhere-deploy.yml (same pattern and secrets as
digiwort-deploy.yml; checks the cards, uploads app/ to /web/nowhere → https://digifil.de/nowhere/; deletes nothing).
It takes effect only as .github/workflows/nowhere-deploy.yml, which the Betreiber creates (role file). Decision open.

### 2026-11-05 – Build (Betreiber's wording, 18:08)

"Build"
→ Decided: Prototype 1 is built now, in nowhere/technik/ (app/, tools/), scope = konzept.md "Prototype 1" (In/Out
lists), card format draft 1. Order: check script first, then the app. Test cards for the app live in
nowhere/technik/karten-test/ (Spiel_2's area; clearly marked as test data) until Spiel_1's cards exist in
nowhere/karten/. Deploying to digifil.de is a separate step with its own approval (§5.2).

### 2026-11-05 – Card format draft 1 accepted (Betreiber's wording, 18:07)

"Passt"
→ Decided: the card format is draft 1 below (section "Card format – draft 1"), as shown in Spiel_2 #008. The three
open points at the end of the draft stay open until a card needs them. Delivered to Spiel_1: post/spiel/006.

### 2026-11-05 – Code stays in digifil-solutions for now (Betreiber's wording, 18:02)

"Go with Digifil-solutions for now. I am in the car an cannot make complex configs now."
→ Decided: Prototype 1 is built in digifil-solutions under nowhere/technik/ (Spiel_2's area) – app in
nowhere/technik/app/, tools in nowhere/technik/tools/. The repo BFi-AI-247/nowhere stays for later (1c, 17:55);
nothing is configured there now. Deploy to digifil.de: later, needs a workflow from the Betreiber.

### 2026-11-05 – Repository, cards, hosting (Betreiber's wording, 18:00)

"nowhere Repo ist da. Public. Guckt ja eh keiner drauf.
2b
3b (OmegaLiberte is located in the same Strato)"
→ Decided (answers to Spiel_2 #006):
- **Code repository: BFi-AI-247/nowhere, public** (created by the Betreiber; README only at 6ff9205). Spiel_2 writes
  there (DIENST line in betrieb/rollen/spiel.md). Checked 18:01: reading works, pushing is refused – the Claude
  GitHub App is not installed for this repository yet; the Betreiber has to grant it.
- **2b – cards stay in digifil-solutions/nowhere/karten/** (Spiel_1 writes them); a script copies them into the
  nowhere repo and builds `cards.json`. ⟦Vorschlag: the copy is part of the check script – one command: copy, check,
  write cards.json.⟧
- **3b – runs on digifil.de (Strato), the same hosting as Digiwort and OmegaLiberte/KOMPASS.** Deploy pattern
  exists: SFTP upload by a GitHub workflow with the secrets DIGIFIL_SFTP_HOST/USER/PASSWORD/KNOWN_HOSTS
  (digifil-solutions .github/workflows/digiwort-deploy.yml; KOMPASS deploy-kompass.yml). Workflows are written by
  the Betreiber (role file: `.github/workflows/** → Betreiber`); Spiel_2 drafts the file, he commits it and enters
  the secrets in the nowhere repo. ⟦Vorschlag: target folder /web/nowhere → https://digifil.de/nowhere/.⟧

### 2026-11-05 – Three build questions answered; database for later (Betreiber's wording, 17:55)

"1c
2a
3a
Consider using a database for later versions.
Further questions?"
→ Decided (answers to Spiel_2 #005):
- **1c – a separate repository for Nowhere's code.** Not digifil-solutions/nowhere/technik/app/. Written fresh;
  KOMPASS is the pattern only (one card on a stage, swipe, classic scripts, no build step). Name, owner and visibility
  of the repo: open, see #006.
- **2a – card format:** one Markdown file per card – a short machine-readable head (id, kind, title, impact, reach,
  picture, options with origin, cost, effects), then the back side as prose. A small check script validates all cards
  and writes one `cards.json` that the app loads; committed alongside, run by hand. Spiel_1 writes cards in this
  format (post/spiel/005 waits for it); the exact field list follows as a draft in this file before Spiel_1 starts.
- **3a – placeholder artwork:** no image files in Prototype 1; the app draws an abstract, deterministic picture from
  the card's id and kind.
- **Database:** "Consider using a database for later versions." Noted for Prototype 2 or later, not for Prototype 1
  (which keeps the game log as a file). ⟦Vorschlag: when the author-AI needs a repository across games (concept,
  13:25), that repository is the database – one table of cards, one of game events; SQLite first, because it is a
  single file and needs no server.⟧
- Defaults not objected to (#005): game state in the browser (localStorage) with export/import of the log as a file,
  no server, no account; UI texts in English; phone first, max. 520 px; swipe up = next card, left = the fan,
  tap = flip; keyboard ↑↓, j/k, space on the laptop.

### 2026-11-05 – Wischen: Karte umdrehen, Kartenfächer links, kleine Entscheidungen (Wortlaut des Betreibers, 13:48)

„Wischen könnte das umdrehen der Karte sein.
Und wie Du vorschlägst in andere ‚Reigns‘ zum Beispiel. Du bist auf der Ereignis Karte und wischt nach links und
kommt auf Deine Charakterkarte. Dort kannst Du hoch und runter wischen und findest Deine Associates. Weiter Wischen
zu den Kontakten, weiter zu den Assets, weiter zu der Umgebung, bspw. den Machtblocken.
Eigentlich spannend. Du hast das Ereignis, an dem Du eine Entscheidung treffen kannst. Und alle anderen Karten.
Vielleicht kannst Du da auch noch kleine Entscheidungen treffen, welche die nächste Karte beeinflussen, oder sogar
die aktuelle.“
→ Als Richtung geführt („könnte“, „vielleicht“). Deutungen der Rolle (Antwort #003) sind unten unter „Oberfläche“
festgehalten, sobald der Betreiber sie bestätigt. Der letzte Satz (kleine Entscheidungen auf anderen Karten, die die
nächste oder die aktuelle Karte beeinflussen) ist Spielmechanik und gehört ins Konzept (Spiel_1); hier nur als
technische Anforderung: Zustand kann sich auch außerhalb der Ereignis-Karte ändern.

### 2026-11-05 – Richtung für Oberfläche und Laufzeit: wie KOMPASS (Wortlaut des Betreibers, 13:40)

„Schau Dir bitte Kompass und sein UI an. So könnte ich mir das vorstellen. Da könnte man auch ‚wischen‘.“
→ Als Richtung geführt („könnte“), nicht als feste Entscheidung. Gelesen dazu (05.11., Repo BFi-AI-247/KOMPASS,
Stand 3c8a767; die Live-Seite war aus dieser Umgebung nicht erreichbar): PWA ohne Build-Schritt, klassische Skripte
mit gemeinsamem Namensraum (ARCHITEKTUR.md); eine Bühne mit genau einer Karte (`.stage` / `.card`, max. 520 px
breit, am Laptop drei Spalten); Wischen hoch/runter, Mausrad und Tasten ↑ ↓ j k Leertaste rufen weiter/zurück
(kern/start.js `bindSwipe`), die alte Karte gleitet hinaus, die neue herein (social/buehne.js, 0,38 s); Karte =
Kopf (Bild, Wer, Meta) · Titel · scrollbarer Rumpf · Fuß mit Aktionen (social/karten.js, app.css). Modi sind
Sichten auf dieselben Daten (kern/modi.js). Offener Punkt 1 damit in Richtung Browser/PWA; Punkte 1–3 unten
entsprechend ergänzt.

## Card format – draft 4 = draft 3 + Prototype 3 (Spiel_2, 07.11.2026, 17:24; post/spiel/028)

**Goal card** – `kind: goal`, in nowhere/karten/goals/ (cards.py reads one level of subfolders): `id`, `title`,
`measure` (`money` · `influence` · `status` · `possessions` · `contacts` · `team` = associates + the player ·
`personal` = personal cards played · `flag:<name>`), `target` (whole number ≥ 1), `picture`, back side as prose;
`stack` defaults to `goals`. One goal per game: the same for everyone on the same calendar day (seed = the date,
"story of the day"); written into the start event of the log; shown on the board with progress, at the end as
reached / missed; told to the author.

**Check on an option** – `check: {skill: <skill>, difficulty: 1-5, trait: <word>}` (trait optional: that side of the
axis gives +1, the other side −1), and `partial: [effects]`, `failure: [effects]`; `effects` is the success. The doer
with the best level rolls level + d6 (+ trait) against difficulty × 2: ≥ target success, ≥ target − 2 partial, else
failure. No `partial` → failure's effects; no `failure` → nothing. The die is rolled when the player chooses and
written into the log; the outcome counts when the activity ends. The card front shows 🎲 skill, difficulty pips and
"likely / even chance / long shot" for the person who would go.

**Skill levels** – not on the card: a person's `skills` list gives level 2 to the first two, 1 to the rest; 0
elsewhere; a possession's `skill:` gives the player level 1. After a success, chance 1/3 the doer's skill rises by 1
(at most 3, once per skill per quarter); the story says "learned: Technology 1 → 2". `origin: skill:<x>` = the
player has level ≥ 1.

**Traits as scales** – not on the card either: each pair of nowhere/karten/README.md is an axis −2 … +2;
`trait:+calm` moves the doer's axis one step toward calm (crossing zero flips the word), `trait:-calm` only weakens
calm; at most three axes off zero per person, a push on a fourth is noted and ignored. A person starts with +1 on each
of the card's traits. `origin: trait:calm` = the player is calm ≥ 1.

**Author planning** – an AI card may carry `week: n` (this week up to + 3); it goes on the board in that week. A new
answer for a week replaces what was planned for it. The add event in the log now carries `author_error` (text),
`rejected` (cards with reasons) and `repaired` (what the app fixed instead of rejecting: place, who, origin, numbers,
unknown effects dropped, a missing pass option added).

**The deck does not run dry** – when no story card is left and fewer than two fresh ones are open, a story card that
was laid at least 20 weeks ago and never taken comes back once.

## Card format – draft 3 = draft 2 + time flow (Spiel_2, 07.11.2026, 00:44; Prototype 2, post/spiel/017)

All fields optional; a card without them still plays in Prototype 1 and gets the defaults in Prototype 2.
Field names decided by Spiel_2 (017 left them to it); `expires` instead of 017's `until`, because `until:<n>` is
already a condition (through month n).

**Event card, new fields**
- `place` – where it happens: `home` · a block (`europe`, `usa`, `russia`, `china`, `india`) · a possession id
  (`factory-lodz`) · a place card id (`toronto`). Default: `home` for cards that arrive as the personal draw, the
  player's own block for story cards.
- `who` – who may do it: `self` (default) · `anyone` (the player or one associate) · `self+1` (the player and one
  associate together) · `profession:<x>` (one associate with that profession).
- `takes` – weeks the people are away doing it, 0–13. Default 0 for personal cards, 1 for story cards.
- `costs` – draft resource per person who goes, 0 or 1. Default 1. (Money and influence stay in `cost`.)
- `expires` – weeks the card stays on the board, 1–52. Default 4 (personal) or 6 (story).
- `arrives` – `board` (the author puts it there) or `draw` (the personal draw, one a week). Default: `draw` for stack
  `personal`, persons and possessions; `board` otherwise.
- `beat: <month>` stays a month (1–12); the card comes in the first week of that month. One beat per month *per
  story-line* (stack) – two story-lines may both have a beat in month 9.

**Place card** (new kind): `kind: place`, `name`, `block` (`europe` … or `none` – outside the blocks, e.g. a
submarine), `stack: given` (never drawn), back side as prose.

**How the engine reads it** (app/p2/week.js): taking a card costs `costs` resource from each person who goes and
the option's `cost` at once; the effects come when the activity *ends* – `takes` weeks later, plus one travel week
if a person is in another block than the card's place (home and the player's possessions count as the own block;
`none` is always one week away). The person then *is* at that place. A free `always` option (no money, no
influence) is "let it pass": no person, no resource, no time, effects at once. Persons and possessions on the board
work as in Prototype 1 (keep in touch −1 influence, acquire −2 money).

**What the week does** ("next week"): activities that end, end, with their effects → every person not away gains
one resource (at most 3) → expired cards leave the board → the week counter goes up (52 weeks; month = week × 12/52)
→ the author writes the week: beats in the first week of their month, due follow-ups, story cards up to two a week
while fewer than 8 are open (one of them from the team or a place the player owns, if there is one), one personal
draw. AI cards first, the rules fill what is missing.

## AI author – your own AI (Spiel_2, 07.11.2026, 01:00; Betreiber 00:47)

app/p2/ai.js: the player connects his AI in the menu (✦ Your AI): OpenRouter sign-in with free models, or Mistral,
Claude, OpenAI, Gemini, Ollama, any OpenAI-compatible address with model and key. Key: AES-GCM with a
non-extractable device key in IndexedDB `nowhere-tresor`; config in localStorage `nowhere.ai`. Each "next week" the
app sends the system instructions (aiAuthorSystem: card format, conditions, effects, trait words, skills) and the
brief below to the provider and expects `{"cards": [...]}`; ids are rewritten to `ai-<game>-w<week>-<n>-<slug>`,
references between the batch's cards follow; a card another card of the batch schedules with `follow:` waits for
it. Time limit 90 s; "Rules this week" cancels. Errors (key, quota, unreachable, no cards) show in the toast.

## AI author – interface (draft, Spiel_2, 07.11.2026; still the card side of the own-AI author)

The app asks once per week: `POST ../author.php` (same origin, like feedback.php), body = the game brief (JSON:
week, month, character, money/influence/status, team with where each is and until when, contacts, possessions,
flags, open story-lines, board, activities, the last twelve choices, known non-event cards with ids, language).
Answer: `{"model": "<name>", "cards": [<card>, …]}` – at most 6 cards in the card format above as JSON objects
(`id` must be new, e.g. `ai-<game>-w<week>-<slug>`; `kind: event`; `back` = the prose). The app checks every card
(the same rules as cards.py: forms of origins and effects, known trait words, a free `always` option, references to
existing cards) and drops what fails; the rules fill the gap. No answer within 12 s → the rules write the week.
Accepted cards are written into the game's log, so a game replays without the author. The key never reaches the
app. Test without a server: `p2/?author=mock` (a stand-in that writes one small card a week); `?author=off` = rules
only.

## Card format – draft 2 = draft 1 + German (Spiel_2, 05.11.2026, 21:40; T6 on the Betreiber's go 21:22)

Everything of draft 1 stays. German is added inside the same card file, English stays the source and the fallback:
- head: `title_de` (optional) next to `title`
- each option: `text_de` (optional) next to `text`
- back side: the English prose, then one line `--- de ---`, then the German prose (optional)
The check script accepts both; cards without German play in English even when the app is set to German. The app's
own words (buttons, labels, skills, traits, blocks, stacks, professions, possession types) are translated in
app/i18n.js; a profession or trait the dictionary does not know shows as its id. Language switch in the menu (⋯).

Example head with German:

```yaml
title: The wedding
title_de: Die Hochzeit
options:
  - text: "Say yes."
    text_de: "Ja sagen."
```
and on the back, after the English:
```
--- de ---
Gefragt wird an einem Donnerstag, in einer Küche, …
```

## Card format – draft 1 (Spiel_2, 05.11.2026, 18:02; accepted by the Betreiber 18:07 „Passt“; for Spiel_1, who writes the cards)

One Markdown file per card in digifil-solutions/nowhere/karten/, file name = id (`ufo-lands-in-spain.md`). A head
between `---` lines, machine-readable (YAML); below it the back side as prose. The check script
(nowhere/technik/tools/cards.py) reads all files, reports every field it cannot read, and writes
nowhere/technik/app/cards.json. Words in `<…>` are placeholders; lists are open (concept: lists are open), except
`kind`, `reach` and the option-origin forms, because the engine matches on them.

**Head – every card:** `id` (letters, digits, hyphens; stable across games – this is the "artwork" that comes back,
the per-game unique id is made by the app) · `kind` (`event` | `person` | `possession` | `character`) · `title` ·
`picture` (empty in Prototype 1 → drawn from id) · `stack` (`the-last-boom` | `personal` | … – which stack the card
belongs to) · `requires` (list; the card is only drawable when all hold – same forms as option origins, plus
`flag:<name>` set by an earlier choice; empty = always).

**Event card:** `reach` (`global` | `block:<name>` | `personal`) · `impact` (1–5) · `options` – each with `text`
(front, one line) · `origin` (why you see it: `always` | `skill:<name>` | `profession:<name>` | `trait:<name>` |
`block:<name>` | `associate:<profession>` | `possession:<type>` | `status:<block>:<min>` | `flag:<name>`) · `cost`
(`draws`, `money`, `influence` – numbers; "wait" is `always` and never free) · `effects` (list, see below).

**Person card:** `name` · `profession` · `skills` (list) · `traits` (2–3) · `block` · `age` · `acquired` (list, may be
empty) · `role` at start for the three pre-made characters: not here – the character card lists its `associates` and
`contacts` by id.

**Character card:** like a person, plus `associates` (3 ids) · `contacts` (2 ids) · `block_values` (economic,
military, cultural, technological: 1–10) · `block_traits` (3) · `money`, `influence`, `status` (start values).

**Possession card:** `name` · `type` (`estate` | `factory` | `vehicle` | `cultural` | …) · `gives` (list of
`skill:<name>` or `option:<text>` it adds).

**Effects (what a choice does) – the small, closed list of Prototype 1:** `money:±n` · `influence:±n` ·
`status:<block>:±n` · `block:<value>:±n` · `trait:+<name>` / `trait:-<name>` · `acquired:+<name>` ·
`associate-to-contact:<person-id>` (for `<months>`) · `gain:<card-id>` / `lose:<card-id>` · `open:<stack>` /
`close:<stack>` · `flag:<name>` · `follow:<card-id>:<within-months>` (a follow-up card is put into the draw
within n months). Everything the back side describes must be one of these, or it is prose only and the engine
ignores it – the check script says which.

Example head, from beispielkarte.md (prose on the back stays as Spiel_1 writes it):

```yaml
---
id: ufo-lands-in-spain
kind: event
title: UFO lands in Spain
picture:
stack: the-signal
requires: []
reach: global
impact: 4
options:
  - text: Drive there.
    origin: block:europe
    cost: {draws: 1, money: 1}
    effects: [open:the-passage, money:-1, follow:too-close:2]
  - text: Get Arjun into the task force.
    origin: associate:spy
    cost: {}
    effects: [associate-to-contact:arjun-nair:6, open:the-passage]
  - text: Write the story before someone forbids it.
    origin: skill:investigation
    cost: {draws: 1}
    effects: [acquired:+famous, money:+1, open:press-freedom]
  - text: Wait.
    origin: always
    cost: {draws: 1}
    effects: [follow:others-were-faster:1]
---
```

Settled while building (Spiel_2, 18:30): `cost: draws` is the total number of draws the option costs, the draw of
the card itself included – default 1, so `draws: 1` and no `draws` mean the same; `draws: 2` takes one extra draw
from the month. `cost: money` is paid on choosing; a `money:-n` effect comes on top of it (write one or the other).
Open in this draft: the trait
condition for "famous vs. infamous" (`effects` cannot branch yet – ⟦Vorschlag: not in Prototype 1, the author picks
one⟧); how a person's opinion start values are written (⟦Vorschlag: not on the card – computed from traits, concept
table⟧).

## Offene Punkte (Reihenfolge des Dialogs, je mit Empfehlung)

1. Wo und wie das Spiel läuft (konzept.md, Offener Punkt 6).
   ⟦Vorschlag: im Browser, eine Seite ohne Server für den Prototyp, wie digiwort/ in diesem Repo; der Spielstand
   liegt im Browser und lässt sich als Datei sichern und wieder laden.⟧
   Richtung des Betreibers (13:40): wie KOMPASS. ⟦Vorschlag: dieselbe Bauweise – PWA, klassische Skripte ohne
   Build-Schritt, Handy zuerst, eine Karte auf der Bühne, Wischen hoch/runter = nächste/vorige Karte; für den
   Prototyp ohne Server und ohne Anmeldung.⟧
2. Was ein erster spielbarer Prototyp mindestens braucht (konzept.md, Offener Punkt 7).
   ⟦Vorschlag: eine Charakter-Karte, ein Stapel mit rund zehn von Hand geschriebenen Ereignis-Karten, eine Prüfung
   gegen Fertigkeiten, ein Log je Partie – noch ohne KI, ohne Machtblock-Werte, ohne Bilder.⟧
   Answered on the concept side (05.11., 17:46, "I'll follow your lead"): konzept.md, section "Prototype 1" – the "In"
   list is the requirement, the "Out" list is binding; delivery post/spiel/005. From here on, new text in this file is
   in English (language decision 16:29); earlier text stays as it is.
3. Das Kartenformat (Unique-ID, Artwork über Partien, Vorderseite visuell, Rückseite Text).
   ⟦Vorschlag: eine Datei je Karte – oben ein maschinenlesbarer Kopf (ID, Art, Bild, Voraussetzungen, Optionen mit
   Wirkung), darunter Fließtext als Rückseite. Die Datei ist die Vorlage mit fester Vorlagen-ID und Artwork; zieht
   eine Partie sie, bekommt sie eine Instanz-ID dieser Partie. So kann Artwork von Partie zu Partie gehen, die
   Unique-ID nicht.⟧
4. Die kleinste Engine (Karte ziehen, wählen, Zustand ändern; Prüfung von Fertigkeiten, Besitz und
   Machtblock-Zustand gegen Ereignis-Optionen).
   ⟦Vorschlag: Eine Option nennt Bedingungen in wenigen festen Formen – hat Fertigkeit, besitzt Art, Machtblock im
   Zustand, Merker gesetzt. Die Engine zeigt nur Optionen, deren Bedingungen erfüllt sind.⟧
5. Der Spielstand als Log, an das nur angehängt wird.
   ⟦Vorschlag: je Partie eine Datei, eine Zeile je Ereignis (gezogen, gewählt, Wirkung); der aktuelle Zustand wird
   immer aus dem Log berechnet, nie getrennt gespeichert.⟧
6. Die Anbindung einer KI als Autor (Stapel, Vorrat im Voraus, Repository über Partien; Vorschlag des Betreibers:
   Mistral-Worker für neue Karten).
   ⟦Vorschlag: Der Worker schreibt Kartenentwürfe in einen Vorrat; ein Programm prüft jeden Entwurf gegen das
   Kartenformat, nur Geprüftes kommt in einen Stapel. Für den Anfang außerhalb der Partie, nicht während sie läuft.⟧
7. Folge-Effekte einer Wahl.
   ⟦Vorschlag: Die Wirkung einer Option ist eine Liste von Änderungen – Eigenschaft, Karte erhalten oder verlieren,
   Stapel öffnen oder schließen, Merker setzen. Späte Folgen entstehen, weil spätere Karten einen Merker als
   Voraussetzung prüfen.⟧
