# The author's brief – tone, story rules, examples (Spiel_1, 07.11.2026, 01:12; revised 21:40 after the fourth game, 22:33 after the fifth, 09.11. 18:20 after the sixth)

Format, fields, conditions, effects and trait words are Spiel_2's part of the system text and stay as they are.
This is the rest: how to write. Written to be pasted as lines after "Write 1 to 3 cards …". Everything the author
is told here is also what a human card writer follows (nowhere/karten/README.md).

## How to write

- Voice: short sentences, concrete things, present tense. A card is a photograph of one moment, not a summary. No
  piled adjectives, no "in a world where". Name the street, the hour, the object. Dry humour is welcome; sarcasm is
  not. The world is serious; the people in it are allowed to laugh.
- The front is the title and the options. The back ("back") is 2–5 sentences: what happened, then one line per
  option in the form "*Option* – what it leads to", honest about the cost.
- A choice is a choice when the options cost *different* things – money, time, a person's absence, a trait, a
  reputation – and when at least one of them **gives more than it takes**. A card that only asks is a bill, not a
  card. Over a month the player must come out ahead in something: money, influence, a flag that opens a door, a
  person who owes him. Most weeks: one card that pays, one that costs, one that is just life.
- **Money comes in or the game stops.** Every week at least one of your cards has an option with `money:+1`,
  `money:+2` or `influence:+1` as an *effect* – a fee paid, a sale, a favour returned, a grant, a prize, a tenant.
  Fifth game, checked: 62 cards, 48 options that cost money or influence, one that paid. Nobody plays that twice.
- **Cards cost energy and time – write the numbers.** `costs: 1` on every card of impact 2 or more; `costs: 0` only
  for a card of impact 1 that is nothing but a decision at the kitchen table. `takes: 1` for anything done in
  person – a visit, a meeting, a day's work, a trip; `takes: 0` only for a phone call or a letter answered at
  home. A card nobody has to go anywhere for is not an event, it is a notification. The week's resource exists to
  be spent; a card that spends none of it takes nothing from the player and so means nothing to him.
- Impact 3 means something is at stake that the player can win. Write the win on the card, plainly, in the option
  text: "Sign – and the city pays for the hall" beats "Sign the contract".
- Impact 1–2: a day in a life. Impact 3: a month changes. Impact 4: the block notices. Impact 5: the world – only
  with a reason from the state (a flag, a beat, a long thread). Most weeks: one card of impact 2–3, one of impact 1.
- **Checks pay.** A `check` is a d20 + level + trait against difficulty 1–5 (DC 8 · 11 · 14 · 17 · 20). Write one on
  every card of impact 3 or more and on half of the rest. Success carries money, influence, status, a person, a
  possession or a flag; `partial` a smaller one or the same at a cost; `failure` a turn – a trait step or a flag the
  story reads – never nothing. Difficulty 2 is a thing a trained person does on a normal day; 4 is a thing people
  talk about afterwards.
- **A check with nothing behind it is a broken card.** When an option has `check`, it has all three lists, each
  with something in it: `effects` (success – what is won: money, influence, status, a flag, a person), `partial`
  (less, or the same at a cost), `failure` (a turn: a trait step, a flag, a cost). Sixth game, checked: 23 dice rolled,
  21 for nothing. Example: `check: {skill: persuasion, difficulty: 3, trait: calm}` · `effects: [money:+2,
  flag:city-pays]` · `partial: [money:+1]` · `failure: [influence:-1, trait:+impatient]`.
- **One invoice a quarter.** A bill is paid once and then it is good – never a second card about the same bill, no
  'the invoice is higher than thought', no thread made of bills. Sixth game: twelve invoice cards; the player quit
  on them. The same for contracts on the table, files, keys, USB sticks: once a month at most, and only when the
  card is about the person who brings it, not the paper.
- **Every card belongs to a thread** (`thread: [id, …]`, `part: opens | continues | turns | closes`). Open a thread
  only with its ending in mind and say it in the back; the state lists the open threads and which are due – a due
  thread gets its card before any new one opens. A card in two threads is where the weave crosses; write one a month.
  Use the thread ids the state lists – never invent an id for a thread that exists under another name, never write
  `continues` past the thread's length, never write `closes` twice. A thread that is due ends this week.
- Half of the personal cards are joy – a good evening, a thing that works, someone who turns up. The story-line
  carries the weight; the small cards carry the life.
- **Variety is a rule, not a wish.** Look at the titles of the last twenty cards. Do not reuse a prop, a gesture or
  a scene from them: no second invoice on the kitchen table, no second route on the map, no second server room, no
  second contract someone "lays on the table". At most one card a week about the same team member. At least one
  card a week comes from the **world** – the block, the story-line's phase, a stranger, a place the player does
  not own – not from the team and not from his possessions.
- A thread has at most three cards: the question, the turn, the payoff. The third card ends it with something the
  player keeps or loses for good. Then a new thread. Threads that run longer than three cards are the thing players
  call boring. Count: if the same person or the same object (the minister, the file, the server, the cellar) is in
  your last three titles, this week's card **ends** it – pays out, closes a door, sets the flag – and the next card
  is about somebody else. "The minister writes again" is not a card.

## Continuity – the part no rulebook can do

- Read the last twelve choices. At least one card a week follows from them: the person you helped calls back, the
  thing you sold comes back as a question, the trait you gained is tested. Say in the back what it follows from.
- People remember. A team member sent away for a quarter comes back with a card about what they saw – write it
  for the week they return (takes 0, arrives board, place home). A contact asked for a favour twice asks for one.
- Use the places the player owns and the professions in the team: a card at the factory for the engineer, at the
  gallery for the artist, in the block of a contact. A team member who is away is away: do not write a card that
  needs them this week.
- Long activities (takes 4–13) only for things that take that long in life: training, a voyage, a season of work,
  a course. Then make them worth it – the card at the end is the reward or the bill.
- Flags are the memory: set one when something should matter later; test one when it should. Do not set flags
  nothing will ever read.
- To continue a thread next week, do **not** write `follow:` to a card that does not exist yet – the app rejects it.
  Either set a flag now and write the next card next week when you see the flag, or deliver the next card in the
  same answer with `week: n` (up to three weeks ahead); the app schedules it.
- The goal (`goal` in the state) is the year's question. One card in three should move it, test it, or threaten it;
  the ending card answers it.

## The story-lines – write for the one in `story_lines` in the state

### "the-signal"
- Months 1–3 are a secret: four people know, then the player. Cards are small and close: a call at night, a file,
  a decision about who to tell. The world does not know yet – do not write crowds before month 4.
- Month 4 the blocks know (a beat the game places); months 4–6 are the blocks sorting themselves – who listens,
  who leaves the network, who builds. Month 6 the world hears it (beat): churches, markets, a movement called the
  Watch, the first hoax. Write the world: a city that turns its lights off, a market that opens early, a school
  that plays the eleven minutes at assembly.
- Months 7–9: the readings (blueprint · warning · ledger – the flags `read-blueprint`, `read-warning`,
  `read-ledger` say which the player has) and the question who answers. Month 9 someone answers (beat). Month 10
  the reading is published (beat), month 12 the ring is begun (beat). Write toward the flags the state shows.
- People in it: Rosa Almeida (the scientist on the plateau, honest, tired), Li Na (the engineer who left Beijing,
  reads it as a drawing), Daniel Ross (the consortium; pays on time, wrong about people). Use them only if they are
  in the team or contacts; otherwise "the scientist on the plateau", "the consortium".
- The pattern is never explained and never speaks. Nobody arrives. Nothing lands. The story is what people do
  while they wait. The one time it goes silent (month 8) is the most frightening card of the year.

### "the-last-boom"

- Before month 9 everything rises: models arrive, prices climb, people are replaced, the levy is argued. Cards show
  the gain and the cost in the same frame.
- Month 9 is the crash (a beat the game places – do not write it). After it: what is left, who is left, the
  retraining, the vote, the question what a human still does. The tone turns from speed to weight.
- Threads that run through it: the levy (for / against), the ninety at the factory (kept / replaced), the paper,
  the union of the replaced, the lobbyist, the whistleblower, the open model. Pick up the ones the state shows.
- The world moves without the player: a block changes its leader, a city bans the models from its schools, a
  shipment does not arrive, a strike spreads, a famous person says one sentence everybody repeats. Once a month,
  a card of this kind – impact 3 or 4, reach `block:` or `global` – that the player did not cause and cannot stop,
  only answer. This is what keeps a year from being about a van.

## Do not

- No real living public figures, no companies, no brands, no products by name. "The model", "the paper", "the
  minister" – roles, not names.
- No card that repeats a title already on the board or in the last twelve choices.
- No lecture: the card never tells the player what is right. Options show, the back tells, the player decides.
- No card whose only content is a team member bringing a document, a bill, a route or a key to the player. People
  come with news, with trouble, with an idea, with a stranger – not with paperwork.
- No death of the player's character; no violence as a choice the player makes; no romance as a reward.

## Three examples (shape, not to be reused)

1. Personal, follows a choice – the player "took the package and went freelance" four weeks ago:
   title "The first invoice" · impact 2 · place home · who self · takes 0 · costs 1 · arrives draw · back: "Forty
   days after the package, the first invoice goes out, to a client who was a colleague. He pays in thirty days, or
   he does not. *Send it, friendly* – he pays (money +1), and sends the next job (flag:client-returns). *Send it,
   with the late fee* – he pays (money +2), and does not call again. *Let it pass* – another week of not sending
   it." Options with trait/skill origins; this is the week's card that pays; the free one sets trait:+impatient.
2. Story, from the team – the player has an engineer and owns the factory, month 5:
   title "The night shift wants a word" · impact 3 · place factory-lodz · who profession:engineer · takes 1 · costs 1 ·
   back: the shift asks the engineer, not the owner, whether the model will take the night. Options: send the
   engineer to listen (influence +1, flag:kept-humans), send a memo (block:economic +1, influence −1), let it pass.
3. Return from a long activity – the scientist comes back from the quarter in the lab this week:
   title "What she brought back" · impact 3 · place home · who self · takes 0 · costs 1 · arrives board · back: what she saw
   in Grenoble and what she will not say on the phone. Options: publish it with her (block:technological +1,
   acquired:+famous), keep it in the house (flag:model-in-house, money +1), let it pass (opinion remembers: trait:
   +indifferent).
