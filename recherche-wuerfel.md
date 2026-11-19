# Research: skill and dice systems for Nowhere (Spiel_1, 08.11.2026, 19:15, on the Betreiber's „Recherchiere bitte mal typische skill und Würfel-Systeme, die für uns in Frage kommen. Ich bin ein Fan von W20 Würfen ala d&d.“)

What Nowhere needs from a check: it is resolved by the app in one click, by the player *or a team member*, against a
card's difficulty; it must use levels (skills 0–3, open list, professions with levels) and traits (axes, uncapped);
it must produce more than yes/no – a partial result is where stories turn; and the player should see his chance
before the click (the engine knows it; hiding it is just friction). Today (Prototype 3): level + d6 ± trait vs
difficulty × 2 → success / partial / failure.

## The systems, in short

| System | The roll | Degrees | Where traits/levels go | Feel | Fit |
|---|---|---|---|---|---|
| **D&D 5e / d20 System** | d20 + ability mod + proficiency vs DC (10 easy · 15 medium · 20 hard · 25 very hard); natural 20/1 | binary by the book; many tables use "miss by ≤4 = partial" (fail forward); advantage/disadvantage = roll twice, take better/worse | level → proficiency, traits → situational advantage | swingy, dramatic, everybody knows it; one die, one number | **very good** – the Betreiber's taste, easy to show as "roll 14+", levels and traits map cleanly |
| **Powered by the Apocalypse** (Apocalypse World, Dungeon World) | 2d6 + stat (−1..+3) | 6− miss · 7–9 partial ("yes, but") · 10+ hit; some moves 12+ | stat is the level; traits are the moves | partial is the default outcome – the story always moves | **very good for cards** – every option already has success/partial/failure; the maths is gentle (bell curve) |
| **Forged in the Dark** (Blades in the Dark) | pool of d6 = skill rating, take the highest | 1–3 bad · 4–5 partial · 6 success · two 6s critical; *position* (risk) and *effect* (how much) set per action | rating = level; traits/possessions add dice; "devil's bargain" = a cost for one more die | tense, consequences built in | **good** – pool = level + helpers is intuitive for a team (two people, two dice); position/effect are what impact and cost already express |
| **Fate** (Fate Core) | 4dF (−4..+4) + skill vs ladder | fail · tie · succeed · succeed with style (+3) | aspects (= traits) invoked for +2 or reroll; skills on a pyramid | narrative, flat distribution around the skill | medium – aspects are exactly our traits, but the ladder vocabulary is a second language |
| **Year Zero Engine** (Alien, Mutant Year Zero, Forbidden Lands) | pool of d6 = attribute + skill (+ gear), count 6s | 0 sixes fail · 1 success · extra 6s = stunts; *push* the roll once at a cost (stress, damage) | levels = dice; pushing = a trait-flavoured choice | pushing is the dramatic moment | good idea to borrow: **push** = retry for a price (energy, a trait step) |
| **Savage Worlds** | trait die (d4–d12) + wild d6, target 4, each +4 a raise; dice explode | fail · success · raise(s) | level = die size | pulpy, fast | medium – die sizes are hard to read on a card |
| **GURPS** | 3d6 roll *under* skill | by margin | skill = number | gritty, predictable | low – roll-under confuses casual players |
| **Call of Cthulhu 7e** | d100 roll under skill; hard = half, extreme = fifth; *push* once | fumble · fail · regular · hard · extreme · critical | skill % = level; traits absent | percentages are honest and legible | the **percent display** is worth borrowing; the rest is heavy |
| **Cyberpunk RED** | d10 + stat + skill vs DV (9 everyday … 29 legendary); 10 explodes up, 1 explodes down | by margin | stat + skill = two levels | d20 feel with less swing | good alternative to d20 if swing is too much |
| **Daggerheart** (2025) | 2d12: Hope die + Fear die, + modifier vs difficulty; the higher die says whether the success/failure comes "with Hope" or "with Fear"; doubles = critical | success/failure × hope/fear = four outcomes | traits as experiences (+2) | every roll changes the mood, not only the result | **worth borrowing**: the second axis – a success *with fear* is a success that costs a trait step or opens a bad thread; that is our "turn" |
| **Disco Elysium** (video game) | 2d6 + skill vs difficulty (6 trivial … 18 impossible); 2 always fails, 12 always succeeds; *white* checks retry when the skill or the situation changes, *red* checks once | binary, but failure is written as content | skills are 24 voices with levels; thoughts = traits that modify | failure is often the better scene | **very relevant** – the only one of these that is a single-player story game: shows the chance, hides nothing, and a failed check *is a card* |
| **Crusader Kings 3** | no dice shown: an event option's success chance from stats/traits, shown as %; outcome weighted random | success / failure, sometimes a third | traits add ±% | the player reads a percentage, not a die | relevant for **display**: "62 %" beside the option |
| **Sunless Sea / Fallen London** (Failbetter) | quality vs difficulty → chance shown (60 % at parity, broad/narrow curves); roll hidden | success / failure, failure gives a smaller reward | qualities = levels | legible, gentle | same lesson as CK3 |
| **Citizen Sleeper** (2022) | each cycle roll your dice (d6s, number = your condition); *assign* dice to actions; the die value sets the odds (6 → positive, 1 → negative) | negative · neutral · positive | levels shift the outcome table | the **dice are the week's resource** – you decide where to spend the good roll | **the one to think about for Nowhere's week**: it is exactly "one resource per person per week", only the resource has a face |
| **Star Traders: Frontiers** | skill total vs difficulty as dice pool of "strong/standard" dice, success count | by count | skills from crew *and* captain | the crew carries the roll | relevant: team members contribute to the captain's check |

## What to take from them (⟦Vorschlag⟧)

**A – the d20 check, as the Betreiber likes it, with degrees and a chance shown.**
- Roll: d20 + skill level (0–3, later more) + trait modifier (the axis value on the card's trait, uncapped, so a calm 4
  is +4) + 2 if a second team member with the skill helps, vs **DC** by the card's difficulty 1–5 → 8 · 11 · 14 · 17 · 20.
- Degrees: beat the DC by 5 or more → **strong success** (effects + a bonus the card names); meet it → **success**;
  miss by 1–4 → **partial** (the card's `partial`); miss by 5+ → **failure**; natural 20 = strong success, natural 1 =
  failure with a turn (the card's `failure` plus a trait step).
- **Advantage** (roll twice, take the better) from a possession the card names or a contact's help; disadvantage from
  a trait on the wrong side of the axis.
- **Shown before the click**: "d20 + 5 vs 14 · 60 %" – CK3 and Disco Elysium both show the chance, and both are
  better games for it. The roll itself is animated for a second; the die is the drama, the number is the honesty.
- **Push** (Year Zero): a failed check may be retried once for one energy of the week – a visible, costly choice.
- **With fear** (Daggerheart): on a success where the die shows ≤ 5, the card may add its `turn` – a flag or a trait
  step that opens the thread's dark branch. Optional field, not every card.
- Team members roll with *their* levels and traits (036/2); the card says who rolled.

**B – the week as dice (Citizen Sleeper), as a later experiment.** At the start of the week each free person rolls a
d6; the player assigns dice to cards; a high die makes the check easy, a low one hard, and a 1 still does something
(a bad outcome, not nothing). It turns the resource into a decision ("where do I spend my six?") without a single
word typed. Not for Prototype 4 – it changes the week – but it is the best answer I found to "five cards, one
resource".

**Yield rule for checks** (Betreiber 23:12 „then there needs to be yield“): every check's success carries money,
influence, status, a person, a possession or a door (flag); partial carries a smaller one or the same at a cost;
failure carries a *turn* – a trait step, a flag the story reads – never just nothing. Levels rise by use: a skill
used in a check goes up one on a strong success (already in Prototype 3 for skills; extend to professions and to
team members).

## Sources
Wikipedia and the SRDs of the systems; Daggerheart: [Wikipedia](https://en.wikipedia.org/wiki/Daggerheart),
[Hope & Fear in Daggerheart](https://dungeonmister.com/daggerheart/hope-fear-in-daggerheart/),
[ENWorld review](https://www.enworld.org/threads/daggerheart-review-the-duality-of-robust-combat-mechanics-and-freeform-narrative.713471/latest),
[Mein-MMO: Duality Dice statt W20](https://mein-mmo.de/daggerheart-vorstellung/2/); the rest from the role's own
knowledge of the rulebooks (D&D 5e SRD, Apocalypse World, Blades in the Dark SRD, Fate Core SRD, Year Zero Engine
SRD, Savage Worlds, GURPS, Call of Cthulhu 7e, Cyberpunk RED, Disco Elysium, CK3, Sunless Sea, Citizen Sleeper,
Star Traders: Frontiers).
