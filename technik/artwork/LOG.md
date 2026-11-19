# Artwork log – Nowhere (written by Artwork_1)

## Decision of the Betreiber (§5.1)

- 2026-11-05, 22:18 – "Ja", answering Artwork_1 #004: „Darf ich die geprüften Bilder nach app/pictures/ legen und
  die Zeile picture: in den Karten von Spiel_1 setzen?“
  Context: start prompt nowhere/technik/start/artwork-manager.md; order channel nowhere/technik/artwork/ on the
  Betreiber's word 21:47. Affected files: nowhere/technik/app/pictures/* (Spiel_2's area) and the line `picture:` in
  nowhere/karten/*.md (Spiel_1's files) – Artwork_1 writes only these and nothing else on the cards.
  Not decided by this: a role file for Artwork and the second instance Mistral_2 (§6.2) – asked of Regeln,
  claude_1/post/regeln/043.

- 2026-11-05, 22:54 – "Ja, verlege bitte die beiden Dateien nach technik/artwork." Context: Artwork_1 #006 –
  the deploy mirrors nowhere/technik/app/ to digifil.de, so LOG.md and STYLE.md would be public. This log and
  STYLE.md live in nowhere/technik/artwork/ (not deployed). The old app/pictures/LOG.md stays as a pointer
  (§4.4); the pictures themselves still go to app/pictures/.

## Runs

One entry per run: date · card · prompt (order card) · attempts · result · cost (as Mistral reports it).

- 2026-11-05, 23:06 · A001 (mara-lindqvist, aisha-benali, tomas-reyes) · attempt 1 · result: no picture in the
  repo. Mistral_2 delivered M001 with status blocked for all three: its GitHub tool encodes file content as UTF-8,
  so bytes >= 0x80 arrive corrupt (its measured test: 512 bytes sent, 768 bytes arrived). It named three storage
  URLs instead; Artwork_1 checked one in the browser at 23:06 – HTTP 409, PublicAccessNotPermitted, so the
  pictures are not readable there either, for anyone. Cost: none reported by the tool. Not checked by Artwork_1:
  the pictures themselves (never seen), so the style is NOT decided.
  Note: the run added eingang/.binary-test.bin and removed it again (commits 91e27d8, e91b0b2) – against §4.4;
  recorded as a finding in A002, nothing repaired.
- 2026-11-05, 23:07 · A002 placed: the same three pictures, delivered as base64 text (.b64, pure ASCII, survives
  the UTF-8 path) with raw byte count and measured SHA-256, so Artwork_1 can decode and verify.
- 2026-11-05, 23:14 · A002 → M002 · attempt 2 · result: all three delivered. Artwork_1 decoded the .b64 files and
  measured SHA-256: identical to Mistral_2's figures (84618 / 112779 / 100615 bytes), valid JPEG, 1024x775 each.
  Checked by Artwork_1 (seen, not only reported): no text, no writing, no numbers, no logo or brand, no
  recognisable real person; one light source each; each scene matches its card. Cost: not reported by the tool.
- 2026-11-05, 23:18 · Decision of the Betreiber on the style (§5.1): „Ich find den Stil auf allen dreien Stimmig
  genug. Ich würde das nicht fester ziehen." → STYLE.md written; the three pictures are the reference. Placed as
  app/pictures/mara-lindqvist.jpg, aisha-benali.jpg, tomas-reyes.jpg; `picture:` set on those three cards, nothing
  else on them touched. The hand rule (22:14, E-003) did not yet apply to these three; hands are visible on all
  three without visible errors, and the rule is in STYLE.md for every further order.
- 2026-11-05, 23:20 · Two decisions of the Betreiber (§5.1):
  (a) Framing: „Ich würde gern Personen mehr Geltung auf dem Bild geben. Es sollte bei Thomas beispielsweise um
  Faktor 1,5 oder 2 reingezoomt. werden." → written into STYLE.md; tomas-reyes is reordered as version 2.
  mara-lindqvist and aisha-benali stay as they are for now – their figures already carry the picture.
  (b) Cost: „Wenn wir so vorgehen, dass es über einen geplanten Lauf geht, dann kostet es erstmal monetät nichts.
  Ich bin mir nicht sicher, ob Mistral sagen kann wie viele tokens er benutzt." → no cost figure is required
  before a pack; the delivery keeps reporting what the tool reports, token count included when it reports one.
- 2026-11-05, 23:20 · A003 placed (pack 1, ten pictures): tomas-reyes again (closer), the two remaining
  characters samir-haddad and elena-rossi, and seven persons (leo-brandt, sofia-marin, yusuf-demir, hanna-vogt,
  arjun-nair, priya-raman, david-okoro – the associates and contacts of the characters, so the ones seen first in
  play). Every prompt carries the framing rule and the hand rule.
- 2026-11-05, 23:24 · Decision of the Betreiber (§5.1): „Mara soll auch näher ran Aisha ist ok, aber gerade so."
  → A004 placed (mara-lindqvist version 2, closer); aisha-benali version 1 stays and is now the written lower
  limit for how close a person must be (STYLE.md). A003 was left unchanged (§4.4); A004 is a card of its own.
- 2026-11-05, 23:38 · A003 → M003 · pack 1, ten pictures, all arrived. Artwork_1 decoded every .b64 and measured
  SHA-256: all ten identical to Mistral_2's figures, valid JPEG, 1024x775, each under 200 KB. Seen and checked by
  Artwork_1: no text, no writing, no numbers, no logo, no recognisable real person, one light source each, every
  person half-length or closer. Two places inspected closely because they could have carried writing – the screen
  behind priya-raman and the open notebook beside leo-brandt: blurred lines and a sketch, no legible characters.
  Attempts (Mistral_2): hanna-vogt 2, samir-haddad 4 (one generator error), yusuf-demir 3, the rest 1. Cost: not
  reported by the tool.
  Placed (8): tomas-reyes (version 2, closer – replaces version 1; both .b64 stay in eingang/), elena-rossi,
  leo-brandt, sofia-marin, hanna-vogt, arjun-nair, priya-raman, david-okoro. `picture:` set on the seven new
  cards; tomas-reyes already carried the line.
  Held back (2): samir-haddad and yusuf-demir – Mistral_2 marked them unsicher because fingers are visible
  despite the pose instruction (4 and 3 attempts, every attempt with visible hands). Artwork_1 looked: the hands
  are well formed, not deformed, and sit at the very bottom edge; the app crops about the bottom 8 percent
  (object-fit: cover, .pic height 44 percent), so they are only partly cut. Put to the Betreiber, because the
  hand rule is his.
- 2026-11-05, 23:45 · Two decisions of the Betreiber (§5.1):
  (a) „Wir nehmen die So." → samir-haddad and yusuf-demir placed as delivered, visible hands and all. Pack 1 is
  complete: ten of ten placed.
  (b) „Ich habe Mistral grad gesagt, dass ich gerade bei den Männern die Archetypen sehr ähnlich finde. Und
  Divers ist es noch gar nicht. Er sagt er befolgt den Prompt. bitte für die Zukunft beachten." → the cause is
  the prompt, not the generator (§3.5): pack 1's prompts said almost nothing about how a person looks, so the
  generator filled in one default face for every man. New section in STYLE.md, "Faces and bodies – every person a
  different one": age from the card, origin named where the name and block point there, build and height, one or
  two features of that person alone, plainness allowed, and the view varied. Mistral_2 is told in A005 that
  following the prompt was correct.
- 2026-11-05, 23:45 · A005 placed (pack 2): the eleven remaining person cards – amara-diallo, chen-wei,
  ines-koller, james-whitfield, jonas-weber, marta-kowalska, meera-iyer, nadia-fall, oskar-lind, tomasz-wiek,
  viktor-sokolov. Eleven rather than ten, so the person cards are finished in one go. Every prompt written to the
  new section; read side by side first, no two people could be the same actor.
- 2026-11-06, 00:08 · A004 → M004 and A005 → M005 · partial delivery. Nine pictures arrived, all nine decoded
  and SHA-256 verified against Mistral_2's figures, valid JPEG, 1024x775, each under 200 KB. Seen and checked by
  Artwork_1: no text, no logo, no recognisable real person, one light source each, every person half-length or
  closer. Cost: not reported by the tool.
  Placed (9): mara-lindqvist (version 2, closer – replaces version 1; both .b64 stay in eingang/), amara-diallo,
  chen-wei, ines-koller, james-whitfield, jonas-weber, marta-kowalska, meera-iyer, nadia-fall. Twenty of the 143
  cards now carry a picture.
  jonas-weber was marked unsicher by Mistral_2 (hands visible at the workbench although the card said hidden).
  Placed anyway: the hands are well formed, and the Betreiber set the precedent at 23:45 („Wir nehmen die So.").
  The variety rule worked: the eight are visibly eight different people – heavy and bespectacled, broad and grey,
  bald and soft, stout and hard-faced, young and stooped, the plait, the cropped hair, the runner.
  Blocked (3): oskar-lind, tomasz-wiek, viktor-sokolov – „Bild-Generator-Kontingent erreicht, Reset 01:59 Uhr
  Berlin; Prompt nicht ausgefuehrt". Reordered unchanged as A006, because a delivery naming A005 in "Answer to"
  makes that card answered – without a new card those three would never be picked up again.
  The Betreiber has paused the scheduled run (00:08: „Der Plan muss eine Pause machen. Mistral hat das notiert.").
  Two findings, nothing repaired: (a) M004 and M005 were written to nowhere/technik/artwork/ instead of
  .../artwork/eingang/; both stay where they are (§4.4) and A006 asks for M006 in eingang/ again. (b) Mistral_2
  notes in several rows that the style came out photographic rather than painted (its E-006). Artwork_1 sees the
  same: amara-diallo, nadia-fall and mara-lindqvist are painted, chen-wei, james-whitfield, marta-kowalska,
  ines-koller, meera-iyer and jonas-weber lean photographic. Left alone for now – the Betreiber decided on
  2026-11-05, 23:18 that the span of the first three is allowed and is not to be narrowed; put to him as a
  question because the trend is towards the photographic end of that span.
- 2026-11-06, 00:27 · A007 placed (pack 3, fifteen pictures, on the Betreiber's word: „Leg bitte eine Karte für
  ca. 15 Anfragen ab. ich stelle den Job auf 3 Uhr."): all eleven possession cards – airfield-vosges,
  delivery-vans, drone-fleet, estate-eifel, factory-lodz, flat-in-lisbon, gallery-berlin, house-in-the-hills,
  server-farm, solar-park, the-local-paper – then the four highest-impact events: crash-tuesday (impact 5),
  the-whistleblower, the-reactors-run-again, the-open-model (impact 4). That keeps the order of the start prompt:
  characters, persons, possessions, events by impact descending. A006 (the three blocked persons) is older and is
  named in A007 as the one to take first.
  Eleven of the fifteen have no person in them, so the framing rule does not apply there; the style rules do. The
  two scenes that could have carried writing are written around it: the trading screens show falling lines with no
  figures, the monitors in the-open-model show blocks of light. Checked before placing: fifteen prompts, fifteen
  different cards, each one carrying the format, the single light source and the no-text clause.
  The style question of 00:08 (painted vs photographic) was not answered and nothing was changed; the Betreiber
  said at 00:27 he likes the pictures.
- 2026-11-06, 05:53 · A006 → M006 · the three blocked persons delivered, run 03:46 after the quota reset. The
  person cards are complete: all 18 carry a picture, 23 of 143 cards in all.
  Mistral_2 delivered honestly with three self-reported limits. Artwork_1 measured each of them:
  (a) Size: raw JPEGs of 308880 / 244374 / 314603 bytes, over the 200 KB limit, because its Pillow bundle was not
  available in that run. Artwork_1 resized them to 1024 px wide and re-encoded at quality 80 – 102644 / 78966 /
  101270 bytes. That is the Artwork_1 step anyway (start prompt, point 4), so this is no defect.
  (b) Format: Mistral_2 reported "ca. 16:9 instead of 4:3" from its image-analysis tool and could not parse the
  JPEG header. Measured by Artwork_1: all three are 1184x896, which is exactly 4:3. The report was a wrong
  estimate; the pictures are right. Same for M004/M005, where the same note appears.
  (c) Hands: visible and well formed on oskar-lind and viktor-sokolov. Placed under the Betreiber's precedent of
  2026-11-05, 23:45.
  Checked by Artwork_1 (seen): no text, no logo, no recognisable real person, one light source each, half-length
  or closer. md5 verified for oskar-lind (d423ec558e86…, identical); M006 states no hash for tomasz-wiek and
  viktor-sokolov, so for those two only the byte count matches and the JPEG decodes cleanly.
  Finding on the prompt, for the next pack (§3.5, my own work): viktor-sokolov was written as "thin and sallow,
  ordinary-looking, worn" and came back as a good-looking, well-built man with a full beard – close to the pack-1
  archetype the Betreiber objected to. The word "ordinary-looking" alone is too weak against the generator's
  default. Future prompts name the plainness as a physical fact (uneven features, a weak chin, thinning hair, bad
  skin), not as an adjective.
  A007 (pack 3, fifteen pictures) was not started: A006 was named in it as the older card to take first, and the
  run ended after those three. A007 is still open for the next run.
- 2026-11-06, 06:08 · Decision of the Betreiber (§5.1) on the viktor-sokolov finding of 05:53: „Ich find der
  junge Mann sieht abgearbeitet aus." → the picture stays, nothing reordered, and the rule stays as it is. Noted
  for my own prompt writing: do not reorder a picture over a wording of mine when the Betreiber finds it right.
- 2026-11-06, 06:08 · A007 → M007 · pack 3, run 03:53. Thirteen of fifteen delivered, two blocked. Artwork_1
  decoded all thirteen and verified md5 AND byte count against M007: thirteen of thirteen identical. Measured
  1184x896 each, resized to 1024x775 at quality 80 (82-157 KB).
  Seen and checked: no text anywhere, no logo, no recognisable real person, one light source each. The two
  scenes written around writing worked - the trading screens in crash-tuesday carry falling red lines and no
  figures, the delivery vans are entirely unbadged.
  Placed (13): airfield-vosges, delivery-vans, drone-fleet, estate-eifel, factory-lodz, flat-in-lisbon,
  gallery-berlin, house-in-the-hills, server-farm, solar-park, the-local-paper, crash-tuesday, the-whistleblower.
  The possession cards are complete (11 of 11). 36 of 143 cards carry a picture.
  crash-tuesday and the-whistleblower were marked unsicher for visible, well-formed hands; placed under the
  Betreiber's precedent of 2026-11-05, 23:45.
  Blocked (2): the-reactors-run-again and the-open-model - the generator returned an empty result twice, with no
  URI and no error text. Mistral_2 stopped after two attempts rather than loop, which is right.
  Measured finding against the delivery (§3.4): Mistral_2 reports "ca. 16:9 instead of 4:3" for every picture in
  M004, M005, M006 and M007. Measured from the JPEG header, every one of them is 1184x896 - exactly 4:3. Its
  image-analysis tool estimates the ratio and estimates it wrongly. Told in A008: stop reporting the format from
  that tool. Also told: raw JPEGs over 200 KB are not a defect, resizing is the Artwork_1 step.
- 2026-11-06, 06:08 · A008 placed (pack 4, fifteen pictures, all events): the two blocked ones unchanged, then
  thirteen more by impact - the-model-goes-dark, the-minister-resigns, the-levy-vote, the-hearing,
  the-deepfake-of-the-minister, the-chip-embargo, sabotage-at-the-data-centre, parliament-debates-the-levy,
  heatwave, europe-votes, deepfake-of-you, basic-something, your-model-your-lawsuit.
  These cards are about votes, videos, news and hearings, so writing is the real risk: every prompt is built so
  that no surface in the picture needs to carry any. Checked before placing: fifteen prompts, fifteen different
  cards, all fifteen ids exist, none of them already has a picture, each prompt carries format, single light
  source and the no-text clause.
- 2026-11-06, 06:26 · Decision of the Betreiber (§5.1), a new standing rule for Mistral_2: „Bitte 15 weitere
  beauftragen, wir versuchen es in ein paar Stunden wieder. Sag ihm, wenn einmal abgelehnt ist, soll er es nicht
  weiter versuchen, sondern auf den nächsten Run warten." → one attempt per picture per run. A refusal, an empty
  result or an error of any kind ends that picture for that run: status blocked with the error text as received,
  no rewording, no other tool, the next run takes it. This replaces the four attempts of M003 and the two of
  M007. A picture that arrives but comes out wrong is not a refusal and keeps the single unsicher delivery.
  Written at the top of A009 so Mistral_2 reads it before the prompts.
- 2026-11-06, 06:26 · A009 placed (pack 5, fifteen pictures, all events at impact 3): what-remains,
  what-does-a-human-still-do, tutors-for-every-child, triage-by-model, the-wedding, the-union-of-the-replaced,
  the-town-meeting, the-tankers, the-strike-nobody-organized, the-retraining-camp, the-power-bill,
  the-offer-for-the-factory, the-new-foreman, the-model-that-writes-contracts, the-model-that-asks.
  A008 is still open and is named in A009 as the older card to take first. Checked before placing: fifteen
  prompts, fifteen different cards, no overlap with A008, none already pictured, every prompt carrying format,
  single light source and the no-text clause.
  These are halls, rooms, yards and weather, so almost no face is readable. The surfaces that would normally
  carry writing are written blank on purpose: the blank projection screen at the conference, the wiped
  blackboard, the sheet lying face down beside the green envelope, the handwriting on the scanner too faint to
  read.
- 2026-11-06, 13:20 · Runs 10:27 (M008) and 13:12 (M009) · no new picture for the deck, and the cause is my own
  rule. The Ini-Prompt defines an open card as one that no delivery in eingang/ names in "Answer to". M004_A004.md
  and M005_A005.md were written to the artwork/ root instead (the finding of 00:08, left in place under §4.4), so
  A004 and A005 counted as open all day. Mistral_2 worked strictly to that rule and took them as the oldest open
  cards, while A008 and A009 waited.
  Mistral_2 handled it well: it did not redraw anything. It recognised that the content of both cards was long
  finished, wrote M008 and M009 as receipts, named the misfiled deliveries as the cause (its R-12), and concluded
  itself that A008 and A009 are the next open cards.
  It did re-deliver three pictures as oskar-lind-1b, tomasz-wiek-1b and viktor-sokolov-1b, resized to 1024x775 at
  quality 80, because M006 had been over 200 KB. Measured by Artwork_1: all three md5 match its figures, and all
  three are byte-identical to the files Artwork_1 had already placed on 06.11. at 05:53. Nothing to place, nothing
  to change; the duplicates stay in eingang/ (§4.4).
  Correction written into artwork/README.md: a card is answered as soon as ANY delivery anywhere under artwork/
  names it in "Answer to", not only one in eingang/. M008 and M009 themselves lie in eingang/ and name A004 and
  A005, so under either wording the next run takes A008, then A009.
  Also corrected by Mistral_2 on its own (its E-017): the "ca. 16:9" report of M004 to M007 was wrong; measured
  per pixel, every picture is 1184x896. That matches the Artwork_1 measurement of 06:08 exactly.
  One honest discrepancy it reports: on viktor-sokolov, M006 saw a visible hand on the table and the recheck sees
  none. Artwork_1 looked again: a hand is visible at the bottom edge. The picture stays either way, by the
  Betreiber's decision of 06.11. 06:08.
- 2026-11-07, 00:08 · A008 → M010 (run 06.11. 14:34) · fifteen of fifteen blocked, error 429, quota reached. No
  picture, and no fault: the Betreiber's new rule of 06.11. 06:26 worked exactly as meant – one attempt per
  picture, the error text as received, no retries, no rewording. Reordered word for word as A010; A008 stays
  (§4.4), and without a new card those fifteen would never be picked up again.
- 2026-11-07, 00:08 · A009 → M011 (run 06.11. 23:29, after the quota reset at 22:59) · fifteen of fifteen
  delivered at the first attempt. Artwork_1 verified each one against M011: md5, byte count AND the measured pixel
  size all match, fifteen of fifteen. Mistral_2 now reports the format from the pixels instead of its analysis
  tool, so the wrong "16:9" is gone.
  Seen and checked by Artwork_1, every picture: no text anywhere, no logo, no brand, no recognisable real person,
  one light source each. The blank surfaces worked on all fifteen – the projection screen at the conference, the
  wiped blackboard, the sheet lying face down beside the green envelope, the handwriting on the scanner too faint
  to read, the foreman's screen, the closed folder in the law firm.
  Resized to 1024x775 at quality 80 (73-151 KB) and placed all fifteen: what-remains, what-does-a-human-still-do,
  tutors-for-every-child, triage-by-model, the-wedding, the-union-of-the-replaced, the-town-meeting, the-tankers,
  the-strike-nobody-organized, the-retraining-camp, the-power-bill, the-offer-for-the-factory, the-new-foreman,
  the-model-that-writes-contracts, the-model-that-asks. 51 of 143 cards carry a picture.
  Mistral_2 notes the style is photographic rather than painted on several of them (its E-006). Artwork_1 sees
  something else worth recording: this is the most painterly pack so far – what-remains, the-wedding,
  the-town-meeting and tutors-for-every-child are clearly painted. Nothing changed, nothing reordered; the
  Betreiber's decision of 05.11. 23:18 holds, the span stays as it is.
- 2026-11-07, 00:08 · A010 placed: the fifteen of A008, word for word (checked by comparison, all fifteen prompts
  identical), none of the fifteen cards already pictured.
- 2026-11-07, 21:27 · A010 → M012 (run 07.11. 00:40) · fifteen of fifteen delivered at the first attempt, the
  best delivery so far. Artwork_1 verified each against M012: md5 and byte count match on all fifteen, and
  Mistral_2 now measures the format from the pixels instead of estimating it.
  Seen and checked by Artwork_1, every picture: no writing anywhere, no logo, no brand, no recognisable real
  person, one light source each. The blank surfaces held again – the dark display boards in the station, the
  blank monitors of the open model, the unmarked lorry, the papers in the committee room.
  Placed all fifteen: the-reactors-run-again, the-open-model, the-model-goes-dark, the-minister-resigns,
  the-levy-vote, the-hearing, the-deepfake-of-the-minister, the-chip-embargo, sabotage-at-the-data-centre,
  parliament-debates-the-levy, heatwave, europe-votes, deepfake-of-you, basic-something,
  your-model-your-lawsuit. 66 of 143 cards carry a picture; 32 of 109 events.
  Finding (seen, not reported by Mistral_2): the-levy-vote has a real national tricolour hanging in the chamber.
  No prompt asked for one. Nowhere is not set in one named country, so a flag pins the card to one. Written into
  STYLE.md as a rule of its own and into every prompt from A011 on: no flags, no emblems, no national colours.
  The picture is placed and nothing was reordered – the Betreiber decides whether that one runs again.
  Second, smaller finding: M012's table named the file for the-reactors-run-again as "the-reactors-run-1.jpg"
  while the file itself was correct. Nothing lost; told in A011 to copy the file name exactly.
  M013 (run 07.11., later) was an idle run reporting no open card. Correct – there was none.
- 2026-11-07, 21:27 · A011 placed (pack 6, ten pictures, on the Betreiber's word „Bitte eine neue Karte für 10
  Bilder erstellen."): a-seat-on-the-station, two-of-you-to-brussels, the-toronto-conference, the-seoul-fab,
  the-research-sabbatical, the-model-for-the-town-hall, the-long-walk, the-lobbyist-calls, the-inheritance,
  the-first-model-ceo. Checked before placing: ten prompts, ten different cards, none already pictured, file name
  matching the card id in every row, and every prompt carrying format, single light source and the extended
  no-text-no-flags clause.
- 2026-11-07, 21:52 · A011 → M014 (run 07.11. 21:40, within twenty minutes of the card) · ten of ten delivered.
  Artwork_1 verified each against M014: md5 and byte count match on all ten. Resized to 1024x775 at quality 80
  (max 142 KB) and placed all ten: a-seat-on-the-station, two-of-you-to-brussels, the-toronto-conference,
  the-seoul-fab, the-research-sabbatical, the-model-for-the-town-hall, the-long-walk, the-lobbyist-calls,
  the-inheritance, the-first-model-ceo. 76 of 164 cards carry a picture; 42 of 124 events.
  Seen and checked by Artwork_1, every picture: no writing, no logo, no brand, no recognisable real person, one
  light source each. The no-flag rule held on all ten – the polling station, the institutional meeting room and
  the boardroom all have bare walls.
  Mistral_2 worked well here: it caught visible hands on a-seat-on-the-station itself, generated that one once
  more (its one allowed follow-up) and delivered both files, the-lobbyist-calls likewise as 1 and 1b. Both stay
  in eingang/ (§4.4); 1b is the one in the deck.
  Three findings, measured, nothing to repair:
  (a) M014's table reports every size as "896x1184". Measured from the files, all ten are 1184x896 – the two
  numbers are the wrong way round in the table, the pictures are landscape and correct. Told in A012.
  (b) the-model-for-the-town-hall: the ballot box carries a small gold seal. Looked at closely (crop at 4x): no
  readable emblem, nothing identifiable with any country, so it stays. Named in A012 so state-looking seals stay
  off plain objects.
  (c) the-lobbyist-calls 1b is reported as "keine sichtbaren Haende"; a hand is in fact visible at the table edge,
  but as an unlit mass behind the cup with no fingers. Placed under the Betreiber's precedent of 05.11. 23:45.
  Still open from 07.11. 21:27 and not decided: whether the-levy-vote runs again because of the national flag.
  Nothing was reordered for it.
- 2026-11-07, 21:52 · A012 placed (pack 7, ten pictures, all events at impact 3): the-farmers-come-to-brussels,
  the-factory-needs-you, the-courier-run, the-cold-store, the-call-centre-closes, the-associate-wants-out,
  the-apprenticeship, oil-falls, ninety-days-under, made-by-humans. Checked before placing: ten prompts, ten
  different cards, none already pictured, file name matching the card id in every row, every prompt carrying
  format, single light source and the no-text-no-flags clause.
  Two of these cards would normally carry writing. The protest prompt forbids banners and placards outright, and
  the "made by humans" label is described as a line drawing of a hand with no writing at all, so the picture does
  not need lettering to make its point.
- 2026-11-07, 23:15 · A012 → M015 (run 07.11. 22:46) · eight of ten delivered, two never generated
  (ninety-days-under and made-by-humans: an empty result, then 429). Artwork_1 verified all eight against M015:
  md5, byte count and the measured 1184x896 match on every one, and Mistral_2 now writes the size the right way
  round, width first. Resized to 1024x775 at quality 80 (max 137 KB) and placed all eight. 84 of 164 cards carry
  a picture; 50 of 124 events.
  Seen and checked by Artwork_1: no writing, no logo, no brand, no flag or emblem, no recognisable real person,
  one light source each. The protest came back with no banner and no placard anywhere, which was the real risk of
  that prompt.
  Two findings, both mine and not Mistral_2's – it followed the prompts exactly, the prompts were wrong (§3.5):
  (a) the-courier-run: the card is about a drive the size of a thumb; my prompt said "hand-sized object" and the
  picture is an armoured case the size of a briefcase. Its small panel carries letter-like marks, checked at 4x:
  smudges, nothing readable. Placed; put to the Betreiber.
  (b) the-associate-wants-out: my prompt said "a quiet office" with no period, and the room came back as a
  nineteenth-century parlour with a raised, well-formed hand in the middle of it. Placed; put to the Betreiber.
  Written into STYLE.md: every prompt with an interior says "present day". Without it the generator picks a
  century of its own.
- 2026-11-07, 23:15 · A013 placed (pack 8, twenty pictures, on the Betreiber's word „schick einen Auftag für 20
  weitere"): the two of A012 the quota stopped, then eighteen cards of the new signal arc that Spiel_1 has added –
  eleven-days, the-second-cycle, the-blocks-know, the-paper, what-it-says, the-world-hears-it, silence,
  the-dish-in-the-gobi, someone-answers, the-count-goes-up, the-answer-committee, the-vote-on-the-ring, the-ring,
  the-first-component, the-watch, the-prophet, the-sign, the-shelter-market.
  That arc is now the top of the impact order: what-it-says, the-world-hears-it, the-ring and someone-answers are
  impact 5, the highest in the deck.
  These cards are made of screens, papers, crowds and committees, so almost every one of them would normally
  carry writing. Each prompt is built so that none has to: the signal is a pale line with nothing written on it,
  the count is chalk marks on a wall rather than digits, the pinned-up printouts are grey blocks, the hall where
  the Watch listens has an empty platform and bare walls. Checked before placing: twenty prompts, twenty different
  cards, none already pictured, file name matching the card id in every row, and every prompt carrying "present
  day", the format, the single light source and the no-text-no-flags clause.
- 2026-11-08, 19:24 · A013 → M016 (run 08.11. 02:49) · twenty of twenty delivered, the best run of the project.
  Artwork_1 verified each against M016: md5, byte count and the measured 1184x896 match on all twenty. Resized to
  1024x775 at quality 80 (max 166 KB) and placed all twenty. 104 of 220 cards carry a picture; 70 of 175 events.
  Seen and checked by Artwork_1, every one of the twenty: nothing readable anywhere, no flag, no emblem, no logo,
  no recognisable real person, one light source each. The devices written into the prompts to keep writing out of
  the pictures all worked: the count is chalk marks on a control-room wall and not digits, the signal is a single
  pale line on a dark screen, the pinned-up printouts are grey charts, the Watch's platform is empty and its walls
  bare, the labels on the market stall are a drawn hand and nothing else.
  Mistral_2 reported two limits honestly and both were handled right. It hit the image-analysis tool's limit at
  20 of 20 and delivered the last two unchecked rather than dropping them, saying so in the table. And it marked
  several pictures unsicher for hands that the scene itself calls for – people writing on whiteboards, hands
  raised in a vote, workers standing round the segment. Written into STYLE.md: where the card's action needs a
  hand, a well-formed hand is not a defect. The rule is against malformed fingers, not against hands.
- 2026-11-08, 19:24 · A014 placed (pack 9, twenty pictures, on the Betreiber's word „bitte eine Karte für 20
  ablegen, ich setze den nächsten Lauf auf 2:30"): a-seat-to-listen, what-you-heard-up-there,
  the-market-for-the-sky, the-man-from-the-ministry, the-leak-is-traced, the-hearing-on-the-hill,
  the-funding-round, the-first-hoax, the-engineers-reading, the-doctors-reading, the-dish-time-auction,
  the-consortiums-offer, the-briefing, the-book-comes-out, the-bankers-reading, leo-disappears,
  layoffs-at-the-paper, enlightenment, compute-shortage, china-leaves-the-network.
  Nearly every one of these cards is about a document, a list, a price or a headline, so writing was the whole
  problem of this card. Each prompt solves it in the scene rather than by a ban at the end: the book's cover
  carries only a dish and no title, the auction whiteboard has a word-shaped smudge underlined twice, the
  banker's wall screen is bars of light, the ministry man's lanyard card is blank, the traced phone lies face
  down. Checked before placing: twenty prompts, twenty different cards, none already pictured, file name matching
  the card id in every row, every prompt carrying "present day", the format, the single light source and the
  no-text-no-flags clause.
- 2026-11-09, 21:38 · A014 → M017 (first run 08.11. 02:38, then two supplements on the Betreiber's word) · twenty
  of twenty delivered. Artwork_1 verified each against M017: md5 and byte count match on all twenty, every one
  measured 1184x896. Resized to 1024x775 at quality 80 (max 136 KB) and placed all twenty. 126 of 224 cards carry
  a picture.
  Seen and checked by Artwork_1, every one: no readable text, no logo, no flag or emblem, no recognisable real
  person, one light source each. The written-around-writing devices worked again – the book covers carry only a
  dish and no title, the ministry man's lanyard card is blank, the auction whiteboard has a smudge underlined
  twice, the banker's wall is bars of light, the traced phone lies face down.
  Three small findings, all placed, none repaired:
  (a) what-you-heard-up-there: the small screen carries letter-like ghosts. Checked at 8x: pale shapes, no word,
  nothing readable.
  (b) the-funding-round: the night skyline behind the glass includes a recognisable real landmark tower. Minor,
  but it is the same class as the flag of the-levy-vote; future city-skyline prompts say "no recognisable
  landmark".
  (c) the-leak-is-traced: the phone is drawn as a recognisable current smartphone model. No wordmark, no logo, so
  it stays; named here because industrial design can identify a brand as surely as a mark can.
  Mistral_2's own record of this run is exemplary: the first run hit two silent empty generator results after the
  first picture, it stopped at once under the one-attempt rule, reported 19 blocked honestly, and delivered the
  rest in two supplements after the quota reset on the Betreiber's word. It also found and repaired a third loss
  of ERFAHRUNG.md inside the same run (E-025) and recorded the cause.
- 2026-11-09, 21:38 · Two figures from the Betreiber's own photographs, reworked by Mistral_2 with
  image_generation.edit_image on his direct instruction (its E-028; stil-umarbeitung-1.jpg.b64 and
  stil-umarbeitung-2.jpg.b64 in eingang/, md5 and byte count verified by Artwork_1, both decode cleanly).
  Spiel_1 has created two character cards for them, ray-delgado (pilot, USA, 57) and niklas-berg (engineer,
  Europe, 34), each already carrying its `picture:` line.
  Neither placed. Two things first, both put to the Betreiber:
  (a) Measured, not estimated: both reworks are full-length standing figures, and the app shows a wide band
  (520 px wide, 44 percent of the card height, object-fit cover, centred). stil-umarbeitung-2 is 832x1248
  portrait; in that band only 42 percent of its height is visible, from chest to knee – the head is cut off
  entirely. Rendered and shown to the Betreiber. stil-umarbeitung-1 is 1184x896 and keeps 84 percent, so its face
  survives. The framing rule of 05.11. 23:20 (half-length or closer) is exactly what this is about.
  (b) Both reworks are recognisable likenesses of the men in the photographs, and for ray-delgado the Betreiber
  prefers the untouched photograph. The start prompt forbids pictures of real people. Whose photographs these are
  and what they may be used for is the Betreiber's to answer, so Artwork_1 asked rather than placing or refusing.
- 2026-11-09, 21:45 · Decision of the Betreiber (§5.1) on the question of 21:38: „Das sind keine Realen Personen.
  Beide Sind KI Alterungen eines Jugendfotos von mir. Also Ray bitte im Originalbild nehmen. Bei Niklas bin ich
  D'Accord. Den kannst du nochmal in einer Karte beauftragen, dass er komplett neu erstellt wird."
  So no third person is depicted: both uploads are AI-aged versions of a photograph of the Betreiber himself, and
  he decides over his own likeness. The real-person rule of the start prompt stands unchanged for everyone else.
  ray-delgado: the original upload placed as app/pictures/ray-delgado.jpg – 800x604 scaled to 1024x773, quality
  80, 105597 bytes. Checked in the card band first: 84 percent of the height survives, face and containers both
  in frame. It is a photograph among 126 painted pictures; Artwork_1 said so at 21:38 and the Betreiber decided.
  Nothing on the card was touched – Spiel_1 had already written the `picture:` line.
  niklas-berg: not placed. Ordered new as A015, generated from the card rather than edited from the photograph,
  landscape and half-length, because the portrait rework lost its head to the card band (measured: 42 percent of
  the height survives of 832x1248).
  Both .b64 reworks stay in eingang/ (§4.4).
- 2026-11-09, 21:45 · A015 placed: one picture, niklas-berg. Checked before placing: the card exists and already
  carries its `picture:` line, the file name matches the card id, and the prompt carries "present day", the
  format, the single light source, the half-length framing and the no-text-no-flags clause.
- 2026-11-10, 10:59 · A015 → M018 (run 10.11. 02:16) · the one picture delivered. Artwork_1 verified it against
  M018: md5 identical, 332139 raw bytes, measured 1184x896 = 4:3 landscape. Resized to 1024x775 at quality 80
  (109561 bytes) and placed as app/pictures/niklas-berg.jpg. The card already carried its `picture:` line, so
  nothing on it was touched. 127 of 224 cards carry a picture; all seven characters now have one.
  Seen and checked by Artwork_1: no text, no logo, no flag or emblem, no recognisable real person, one light
  source (the racks). The card is in the picture – the white T-shirt, the old steel watch on a worn strap, the
  server hall, and the look of someone who has noticed something and not said it yet.
  Rendered in the card band before placing (520 px wide, 44 percent height, object-fit cover): 84 percent of the
  height survives, face and watch both in frame, only the top of the hair clipped. The shape problem of the
  rework is gone.
  Marked unsicher by Mistral_2 for visible fingers on the folded arms, although the prompt said hands tucked out
  of sight. It generated once more under the one-attempt rule, got the same result, and delivered the first
  attempt honestly rather than looping or hiding it – exactly right. The hands are well formed, so the picture is
  placed under the Betreiber's precedent of 05.11. 23:45.
  Two findings, nothing reordered:
  (a) Style photographic rather than painted, the tenth pack running. The card had said this was the one where
  the painted end would matter most, because the character pictures are the reference for the deck. edit_image
  reached it on 09.11.; generate_image has not in ten packs. Nothing to be done at the prompt level – it is the
  tool.
  (b) The card says "lean and a little stooped" with "a long plain face"; the picture is a muscular,
  good-looking man. That is the pack-1 archetype returning on a character card. Left alone: the Betreiber ruled
  on 06.11. 06:08 that a picture is not to be reordered over a wording of mine when he finds it right.
- 2026-11-10, 11:02 · A016 placed (pack 10, ten pictures, on the Betreiber's word „Bitte erstelle eine Anfrage
  für 10 weitere Karten."): the three remaining person cards rosa-almeida, li-na and daniel-ross, the last
  possession the-array, and six personal events – a-call-from-the-plateau, a-share-in-the-array, a-child,
  a-startup-wants-you, a-tempting-offer, arjun-asks-a-favour. All ten are new cards from the signal arc that
  Spiel_1 has been adding. With them, persons and possessions are ordered complete again.
  These six events are quiet, personal cards, so none is a crowd scene. Each one is built around a single object
  that would normally carry writing and does not: the lit phone screen is a blank rectangle, the share offer is a
  closed folder with a pen on it, the test is a plain white stick with nothing readable, the tempting offer is a
  sheet lying face down beside an uncapped pen.
  Two notes written into the card for Mistral_2, both about the tool rather than its work: it may try edit_image
  on its own generated picture to reach painted style, delivering that as -1b alongside the original, and never
  on a photograph of a person; and the hand rule is not worth a second generation – deliver once, mark unsicher,
  let Artwork_1 look.
  Checked before placing: ten prompts, ten different cards, all ten ids exist, none already pictured, none
  ordered in any earlier card, file name matching the card id in every row, and every prompt carrying "present
  day", the format, the single light source and the no-text-no-flags clause.
- 2026-11-10, 11:56 · A016 → M019 (run 10.11. 11:10) · ten of ten delivered, ten generator calls, no quota event,
  no empty result, and not a single regeneration – the one-attempt rule and the new hand note both followed
  exactly. Artwork_1 verified each against M019: md5, byte count and the measured 1184x896 match on all ten.
  Resized to 1024x775 at quality 80 (max 129 KB) and placed all ten.
  136 of 224 cards carry a picture. Characters 7 of 7, persons 21 of 21, possessions 12 of 12 – only events are
  left, 96 of 177.
  Seen and checked by Artwork_1, every one: no text, no logo, no flag or emblem, no recognisable real person, one
  light source each.
  Two of Mistral_2's four unsicher marks are false negatives of its analysis tool, checked by Artwork_1 at the
  pixels and not by eye alone:
  (a) a-child was marked "das zentrale Kartenelement fehlt: KEIN weisser Plastik-Stab". It is there. Cropped at
  4x: a plain white stick lies flat on the basin surround beside the soap dish, nothing readable on it, exactly
  as the prompt asked.
  (b) a-tempting-offer was marked "der zweite zurueckgezogene leere Stuhl fehlt". It is there, pulled back on the
  right of the table, clearly empty.
  Both placed. Worth telling Mistral_2, because a false negative that is believed costs a good picture.
  The other two unsicher marks are correct and harmless: visible, well-formed hands on rosa-almeida and li-na,
  placed under the Betreiber's precedent of 05.11. 23:45. On a-startup-wants-you the faces are turned towards
  each other rather than away, honestly reported; no face is identifiable, so it stays.
  Two findings on the pictures themselves, nothing reordered: the aircraft behind daniel-ross carries a striped
  livery although the prompt said "a plain white aircraft" – no emblem, no wordmark, so it is not a flag case;
  and a-tempting-offer and arjun-asks-a-favour came back as period-looking interiors although both prompts say
  "present day". The rule helps, it does not always hold.
  One thing worth recording in Mistral_2's favour: li-na came back genuinely painted – brushwork, muted palette,
  one lamp – from generate_image alone, without edit_image. After ten packs of photographic results that is the
  first time the tool reached the painted end by itself, and it happened on a character card, where STYLE.md says
  it matters most. rosa-almeida is the other picture of this pack worth naming: a square, lined, tired, entirely
  ordinary face, which is exactly what the variety rule of 05.11. 23:45 was written for.
- 2026-11-10, 11:59 · A017 placed (pack 11, ten pictures, on the Betreiber's word „Ja, leg die nächste Karte
  ab."): burnout-warning, artists-sue, yusuf-vs-the-model, your-daughter-grows-up, while-you-were-away,
  translators-vanish, the-year-in-review, the-volunteer-shift, the-sunday-flight,
  the-speech-at-your-old-school. From here on only event cards are left, 81 of them after this pack.
  Three notes written into the card for Mistral_2: that two of its unsicher marks in M019 were false negatives of
  its analysis tool and that a missing-object report must never cost a delivery; that li-na reached painted style
  from generate_image alone, with nothing special in the prompt to copy; and that "present day" does not always
  hold, so each prompt here names a present-day object in the room – a modern alarm clock, a flat monitor, a
  closed laptop, trainers, phones in laps.
  Three of these cards are about a document, a spreadsheet or a lawsuit and none needs a readable surface: the
  engineer's sheets are grey rows with no figures, the suing artists carry rolled canvases and no banner, the
  studio backdrop is plain grey.
  Checked before placing: ten prompts, ten different cards, all ten ids exist, none already pictured, none
  ordered in any earlier card, file name matching the card id in every row, every prompt carrying "present day",
  the format, the single light source and the no-text-no-flags clause.

## 2026-11-12, 09:30 – Paket 11 geprueft und abgelegt (M020_A017)

Lauf Mistral_2 am 11.11.2026 02:22–02:27 MEZ. Zehn Motive, je ein Generator-Aufruf unter der Ein-Versuch-Regel,
10 Bilder, 0 Kontingent-Ereignisse, 0 stille leere Ergebnisse. Mistral_2 meldet einen selbst korrigierten Fehler:
der Erst-Push von yusuf-vs-the-model war trunciert (126312 statt 397560 Zeichen) und wurde im selben Lauf
vollstaendig neu committet und ueber die Repo-Groesse verifiziert. Das ist richtig gehandhabt.

Pruefung Artwork_1: 10 Zeilen geprueft, 0 Abweichungen. md5, rohe Bytezahl und Pixelgroesse stimmen auf jedem
Bild; alle zehn 1184x896, also exakt 4:3. Nach dem Verkleinern auf 1024x775, Qualitaet 80: groesste Datei 144 KB.
Alle zehn Bilder angesehen, alle zehn abgelegt.

Drei Befunde, alle drei an meinem Prompt und nicht am Generator (Kanon 01 §3.5):

1. yusuf-vs-the-model – der Prompt sagte "a man in a work jacket", zurueck kam ein Anzug. Archetyp-Drift: wo der
   Prompt Kleidung nur benennt, setzt der Generator die Buerovorgabe darueber. Kleidung kuenftig mit einem
   Material- oder Zustandswort schreiben ("a worn canvas work jacket, no tie"), nicht mit dem blossen Namen.
2. your-daughter-grows-up – der Prompt sagte "out of focus, the back and shoulder of an older person". Die
   aeltere Person steht scharf im Bild und liest sich als Grossvater. "Out of focus" allein traegt nicht; die
   Figur muss im Prompt auch angeschnitten sein ("only the shoulder, cut by the frame edge").
3. while-you-were-away – der Laptop ist als Bauform ein erkennbares Markengeraet. Nichts Lesbares darauf
   (zweifach am Pixel geprueft: Etikett des Pakets = feine graue Schraffur ohne Zeichen, Tastaturleiste = kein
   Wortzeichen), also kein Verstoss gegen die Schriftregel. Aber die Stil-Regel "keine Marken" meint auch
   wiedererkennbare Bauformen. Kuenftig "a plain laptop with no visible maker's shape" schreiben.

Weiter geprueft und sauber: the-sunday-flight – das Nummernschild des Wagens ist ein leeres weisses Rechteck
ohne Zeichen (am Pixel geprueft). the-volunteer-shift – die Konservendosen tragen Farbbaender, keine Schrift;
sichtbare Haende, gut geformt, nach der Hand-Regel vom 08.11. kein Mangel.

Stil: zehn von zehn photographisch, das 12. Paket in Folge. the-volunteer-shift kommt dem gemalten Ende am
naechsten. Keine realen Personen, keine realen benannten Orte, keine Flaggen, keine Embleme, keine Schrift.

Stand nach diesem Paket: 146 von 224 Karten tragen ein Bild.

## 2026-11-13, 23:05 – Paket 12 geprueft und abgelegt (M022_A018)

Lauf Mistral_2 am 13.11.2026 02:25–02:30 MEZ. Elf Generator-Aufrufe fuer zehn Motive: ein Regel-Folgeversuch bei
a-friend-needs-money, weil der Erstversuch unlesbaren Text auf einem Monitor im Hintergrund zeigte. Das ist genau
der Fall, fuer den die Ein-Versuch-Regel eine Ausnahme kennt, und richtig entschieden. 0 Kontingent-Ereignisse,
0 stille leere Ergebnisse, 13 Bild-Analysen.

Pruefung Artwork_1: 10 Zeilen geprueft, 0 Abweichungen. md5, rohe Bytezahl und Pixelgroesse stimmen auf jedem
Bild; alle zehn 1184x896, exakt 4:3. Nach dem Verkleinern auf 1024x775, Qualitaet 80: groesste Datei 171 KB.
Alle zehn angesehen, alle zehn abgelegt.

Zu Mistral_2s unsicher-Markierung bei a-night-at-the-estate (acht statt neun Personen am Tisch): die Zahl neun
stand in meinem Prompt, nicht in der Karte. Die Karte nennt bei einer Option neun Menschen, verlangt sie aber
nicht im Bild. Acht ist kein Mangel, das Bild ist abgelegt. Richtig war trotzdem, es zu melden – eine gemeldete
Abweichung kostet nichts, eine verschwiegene schon.

Drei Befunde aus diesem Paket:

1. Stil: zum ersten Mal seit zwoelf Paketen kommt nicht alles fotografisch zurueck. an-old-friend,
   a-letter-from-your-father und a-night-at-the-estate sind deutlich gemalt, die uebrigen sieben fotografisch.
   Nichts an diesen drei Prompts ist besonders, also gibt es nichts zu kopieren – aber die Spanne, die der
   Betreiber am 05.11. ausdruecklich offen gelassen hat, wird zum ersten Mal von selbst ausgeschoepft.
2. a-night-at-the-estate: die Maenner am Tisch gleichen einander wieder (Bart, mittelbraunes Haar, gleiche
   Altersklasse). Bei Gruppenbildern nennt mein Prompt bisher keine Merkmale, und wo nichts steht, setzt der
   Generator seinen Durchschnittsmann ein. Kuenftig nenne ich auch in Gruppen zwei oder drei Figuren einzeln
   ("one of them much older and bald, one woman with a grey braid").
3. join-a-tv-show: die fuenf am Pult sind gross, scharf und glatt im Bild, obwohl der Prompt "all faces small and
   unreadable" sagt. Bei Buehnen- und Studioszenen zieht der Generator die Beleuchteten nach vorn. Wo Gesichter
   klein bleiben sollen, muss der Prompt die Entfernung baulich erzwingen ("seen from the last row, the set small
   in the frame").

Weiter geprueft und sauber: a-letter-from-your-father – die Handschrift ist reine Schlinge ohne ein lesbares
Wort, der Laptop ist schlicht und ohne Markenform (die A018-Regel hat getragen). a-night-at-the-estate – das
Weinflaschen-Etikett ist eine leere rote Flaeche ohne Zeichen (am Pixel geprueft). doha-energy-week – das
Bodenmedaillon ist reines Rankenornament, keine Schrift, kein Emblem (am Pixel geprueft).

Keine realen Personen, keine realen benannten Orte, keine Flaggen, keine Embleme, keine Schrift.

Stand nach diesem Paket: 156 von 224 Karten tragen ein Bild (gemessen).

## 2026-11-15, 07:30 – Paket 13 geprueft, acht abgelegt, zwei neu beauftragt (M023_A019)

Lauf Mistral_2 am 14.11.2026 ab 02:31 MEZ. Zehn Aufrufe, zehn Bilder im Erstversuch, 0 Kontingent-Ereignisse,
0 stille leere Ergebnisse. Pruefung Artwork_1: 10 Zeilen geprueft, 0 Abweichungen; md5, rohe Bytezahl und
Pixelgroesse stimmen auf jedem Bild, alle zehn 1184x896. Nach dem Verkleinern: groesste Datei 142 KB. Alle zehn
angesehen. Acht abgelegt, zwei nicht.

Zwei Bilder nicht abgelegt, beide aus meinem Prompt verschuldet:

1. learn-a-new-language – die Krankenschwester im Bild traegt eine Haube mit einem roten Kreuz. Am Pixel
   geprueft und eindeutig. Das rote Kreuz ist ein geschuetztes Emblem und faellt unter die Nie-Regel in STYLE.md.
   Ursache ist mein Prompt: ich habe "a tired woman in a nurse's tunic" geschrieben, und eine Schwesterntracht
   zieht das Emblem nach sich. Neu beauftragt in A020 ohne Schwesterntracht. Im Uebrigen war das Bild gut – die
   drei einzeln benannten Figuren (Frau mit grauem Zopf, kahler Mann mit Brille, aufrechter Lehrer) kamen
   erkennbar als drei verschiedene Menschen zurueck. Die Gruppen-Regel aus A019 traegt.
2. the-calibration-fault – die Bildschirme zeigen Panels aus Zeilen, die wie Text aussehen. Lesbar ist nichts
   (am Pixel geprueft), aber es ist Schrift-Imitat, und genau dafuer hat Mistral_2 im Paket 12 bei
   a-friend-needs-money selbst einen zweiten Versuch gestartet, den ich in A019 ausdruecklich gelobt habe. Dann
   muss derselbe Massstab hier gelten. Ursache ist mein Prompt: "screens showing plain pale traces and grid
   lines" laedt Panels ein. Neu beauftragt in A020 mit ausdruecklichem Verbot von Fenstern, Panels und Zeilen.

Mistral_2s unsicher bei stock-surge (sieben statt sechs Personen im Cafe) ist wieder eine Zahl aus meinem Prompt
und kein Mangel; das Bild ist abgelegt.

Ein weiterer Befund, nicht schwer genug zum Zuruecklegen: the-book-offer zeigt ein Lektorat ganz ohne
Gegenwartsgegenstand – Tintenfass, Lederbaende, sonst nichts – und liest sich dadurch eher nach 1930 als nach
heute. Meine eigene Regel aus A017 (in jedem Innenraum einen Gegenwartsgegenstand benennen) habe ich hier
vergessen. Das Bild ist gut und nicht ausdruecklich historisch, es bleibt liegen; die Regel gilt ab A020 wieder
ohne Ausnahme.

Zur Stil-Zaehlung: Mistral_2 schreibt "14. Paket in Folge fotografisch". Das stimmt nicht – in Paket 12 kamen
drei Bilder gemalt zurueck. In Paket 13 sind es wieder alle zehn fotografisch. Ich sage es ihm in A020, damit
seine eigene Erfahrungszeile E-006 richtig bleibt.

Stand nach diesem Paket: 164 von 224 Karten tragen ein Bild (gemessen).

## 2026-11-16, 20:30 – Paket 14 geprueft und abgelegt (M025_A020)

Lauf Mistral_2 am 16.11.2026 02:41–02:45 MEZ. Zehn Aufrufe, zehn Bilder im Erstversuch, 0 Kontingent-Ereignisse,
0 stille leere Ergebnisse. Pruefung Artwork_1: 10 Zeilen geprueft, 0 Abweichungen; md5, rohe Bytezahl und
Pixelgroesse stimmen auf jedem Bild, alle zehn 1184x896. Nach dem Verkleinern: groesste Datei 161 KB. Alle zehn
angesehen, alle zehn abgelegt.

Die beiden Neubestellungen sind sauber zurueckgekommen:
- learn-a-new-language-2 – die medizinische Kleidung traegt kein Abzeichen, keine Haube, kein Kreuz. Die drei
  einzeln benannten Figuren kamen wieder als drei klar verschiedene Menschen. Pinnwand und Hefte am Pixel
  geprueft: verwaschene Flecken und Spiralbindung, nichts Schriftfoermiges.
- the-calibration-fault-2 – jeder Monitor zeigt genau eine helle Kurve auf dunklem Feld, keine Panels, keine
  Zeilen. Genau das Bild, das die Karte braucht. Das ausdrueckliche Verbot im Prompt ("no windows, no panels, no
  boxes, no rows, no columns, no readouts") hat getragen; das ist die wirksame Formulierung fuer Bildschirme.

Mistral_2s unsicher bei the-check-up (Schrift-Imitation auf dem anatomischen Poster) ist geprueft und das Bild
ist abgelegt. Hier ziehe ich die Grenze, damit sie kuenftig beide kennen: Zeile um Zeile textfoermiger Marken,
wie auf den Monitoren von the-calibration-fault-1, ist Schrift-Imitat und ein Mangel. Ein paar blasse Striche am
Rand einer anatomischen Tafel sind es nicht. Zusaetzlich im Kartenband nachgestellt (520x330, object-fit cover,
zentriert): dort ist das Poster ein angeschnittenes Rechteck von Daumengroesse, auf dem nichts Schriftfoermiges
wahrnehmbar ist. Mistral_2s zweiter Punkt (der Arzt ist nicht suedasiatisch) ist kosmetisch und kein Mangel; der
Mann passt zur Karte.

Zwei Bilder dieses Pakets sind deutlich gemalt (the-check-up, the-estate-roof), acht fotografisch.
the-estate-roof ist das beste Bild des Pakets.

Keine realen Personen, keine realen benannten Orte, keine Flaggen, keine Embleme, keine Schrift.

Stand nach diesem Paket: 174 von 224 Karten tragen ein Bild (gemessen). 50 offen, alle Ereignisse mit Impact 2.

## 2026-11-16, 21:15 – Paket 15 geprueft, vierzehn abgelegt, eine zurueckgelegt (M026_A021)

Lauf Mistral_2 am 16.11.2026 20:42–20:51 MEZ, rund zwanzig Minuten nach dem Ablegen der Karte. Fuenfzehn
Aufrufe, fuenfzehn Bilder im Erstversuch, 0 Kontingent-Ereignisse, 0 stille leere Ergebnisse. Pruefung
Artwork_1: 15 Zeilen geprueft, 0 Abweichungen; md5, rohe Bytezahl und Pixelgroesse stimmen auf jedem Bild, alle
fuenfzehn 1184x896. Nach dem Verkleinern: groesste Datei 175 KB. Alle fuenfzehn angesehen, vierzehn abgelegt.

Die Bildschirm-Verbote haben bei allen sechs Motiven mit Monitoren getragen – keine Panels, keine Zeilen, keine
Schrift-Imitation. Die Laptops im Hoersaal von the-lecture habe ich zweimal am Pixel nachgeprueft: blasse
Linierung, keine buchstabenfoermigen Marken; nach der Grenze aus Paket 14 kein Mangel.

Zurueckgelegt: the-last-junior. Die Karte verlangt eine Frau von vierundzwanzig in einem schlecht sitzenden
billigen Blazer, gefasst und gerade nicht weinend. Zurueckgekommen ist eine auffallend schoene junge Frau mit
gutem Haar und gut sitzendem Blazer – genau der Archetyp, gegen den der Betreiber am 05.11. ausdruecklich
eingewandt hat. Mein Prompt sagte zwar "ordinary-looking", aber ein einzelnes Wort setzt sich gegen die Vorgabe
des Generators nicht durch. Zweiter Punkt am selben Bild: das Handy im Vordergrund ist an der Kameraform klar
als Markengeraet erkennbar – derselbe Befund wie beim Laptop in while-you-were-away, diesmal gross und vorn.
Neu beauftragt in A022 mit Merkmalen statt eines Urteilsworts (abgekaempft, blass, Augenringe, Akne-Narben,
ungeschminkt, der Blazer eine Nummer zu gross an den Schultern) und mit "a plain phone with no visible maker's
shape".

Mistral_2s drei unsicher-Meldungen, alle geprueft:
- the-last-eleven-days: Rosas Haar ist mittellang und lockig statt kurz, die zweite Person steht ganz im Bild
  statt angeschnitten. Gesicht, Statur, Fleece und Ort stimmen mit rosa-almeida ueberein; als dieselbe Person
  erkennbar. Abgelegt. Fuer wiederkehrende Figuren schreibe ich die Frisur kuenftig doppelt ("short, cropped
  above the ears – not shoulder length"), weil der Generator sonst seine Vorgabe setzt.
- the-last-junior: die Meldung war richtig und hat genau die zwei Punkte getroffen, die mich das Bild
  zuruecklegen lassen. Siehe oben.
- the-model-paints: etwa 25 Besucher statt "about thirty" – kein Mangel, Zahl aus meinem Prompt. Abgelegt.

Stil: ein genuines Gemaelde (the-letter-you-never-sent), vierzehn fotografisch. the-marathon und
the-letter-you-never-sent sind die besten Bilder des Pakets.

Keine realen Personen, keine realen benannten Orte, keine Flaggen, keine Embleme, keine Schrift.

Befund im Bestand, von Mistral_2 gemeldet und von mir bestaetigt: E-036 in ERFAHRUNG.md endet mitten im Satz
("trotz no"). Mistral_2 hat die Datei richtig nicht angefasst und es in E-037 dokumentiert. ERFAHRUNG.md gehoert
Mistral_2 (Kanon 01 Para 4.1), ich fasse sie nicht an; der abgeschnittene Satz steht in A022 als Hinweis.

Stand nach diesem Paket: 188 von 224 Karten tragen ein Bild (gemessen). 36 offen.

## 2026-11-18, 15:50 – Paket 16 geprueft, neun abgelegt, eine zurueckgelegt (M028_A022)

Lauf Mistral_2 am 18.11.2026 02:34–02:40 MEZ. Zehn Aufrufe, zehn Bilder im Erstversuch, 0 Kontingent-Ereignisse,
0 stille leere Ergebnisse. Pruefung Artwork_1: 10 Zeilen geprueft, 0 Abweichungen; md5, rohe Bytezahl und
Pixelgroesse stimmen auf jedem Bild, alle zehn 1184x896. Nach dem Verkleinern: groesste Datei 176 KB. Alle zehn
angesehen, neun abgelegt.

the-last-junior-2 ist der Beweis, dass die Merkmals-Technik wirkt. Dieselbe Karte, derselbe Ort, derselbe
Bildaufbau – aber diesmal fleckige Haut, Schatten unter den Augen, Straehnen aus der Klammer, der Blazer zu
gross in den Schultern, ungeschminkt. Keine Spur mehr von der auffallenden Schoenheit aus Fassung 1. Die Regel
steht damit fest: ein Urteilswort ("ordinary-looking") traegt nicht, benannte Merkmale tragen.

Zurueckgelegt: a-quiet-sunday. Die Tasse liegt umgekippt am Boden, daneben Scherben und eine Pfuetze, und der
Boden glaenzt nass. Mistral_2 hat das als kosmetisch gemeldet; das ist es nicht. Die Karte sagt ausdruecklich,
dass an diesem Tag nichts passiert ("Nothing in the calendar. Rain, then sun, then rain."). Eine umgefallene
Tasse mit Scherben erzaehlt ein Ereignis und damit die falsche Karte. Ursache ist mein Prompt: "a half-finished
mug on the floor" – auf dem Boden heisst fuer den Generator umgekippt. Neu beauftragt in A023 mit der Tasse
aufrecht auf dem Tisch und ausdruecklich nichts Verschuettetem und nichts Zerbrochenem.

Mistral_2s zwei unsicher-Meldungen, beide geprueft und beide abgelegt:
- atacama: acht statt zwoelf Schuesseln. Hier kommt die Zwoelf aus der Karte selbst, nicht nur aus meinem
  Prompt, also war die Meldung richtig und wichtig. Angesehen: die Reihe laeuft in den Dunst und bricht nicht
  sichtbar ab, im Kartenband sind die hinteren Schuesseln ohnehin nicht zaehlbar. Das Bild traegt den Zaun und
  das Wolkenmeer, die beiden Dinge, die die Karte dem Ort gibt und die the-array nicht hat. Abgelegt.
- back-to-the-gym: der Mann ist krraeftiger und dunkelhaariger als bestellt. Angesehen: Gesicht muede, Bart
  grau, Schweiss, zwischen den Saetzen auf die Bank gesunken – die Karte trifft er. Abgelegt. Befund fuer die
  Zukunft: Statur ist das Merkmal, das sich am schlechtesten erzwingen laesst. "Heavy through the middle,
  round-shouldered" ist jetzt zweimal gegen den athletischen Normkoerper des Generators verloren gegangen.
  Kuenftig Statur ueber die Kleidung beschreiben (ein Hemd, das ueber dem Bauch spannt), nicht ueber den Koerper.

Stil: Mistral_2 meldet "alle zehn fotografisch, 16. Paket in Folge". Das stimmt wieder nicht. Mindestens
the-last-junior-2, a-child-asks und back-to-the-gym sind deutlich gemalt, a-child-asks am klarsten. Ich sage es
ihm in A023; seine Zaehlung in E-006 laeuft sonst dauerhaft falsch.

a-child-asks ist das beste Bild des Pakets: das Kind von hinten am Kuechenfenster, der Vater daneben in die Hocke
gegangen, der Mond. Genau die Karte.

Keine realen Personen, keine realen benannten Orte, keine Flaggen, keine Embleme, keine Schrift.

Stand nach diesem Paket: 197 von 224 Karten tragen ein Bild (gemessen). 27 offen.
