# The style of Nowhere – fixed by the Betreiber on 2026-11-05, 23:18

His wording: „Ich find den Stil auf allen dreien Stimmig genug. Ich würde das nicht fester ziehen."

Decided on the three pictures of A001/A002: mara-lindqvist, aisha-benali, tomas-reyes (app/pictures/). They are the
reference – when a prompt and this text disagree, look at those three. The range they span is allowed on purpose:
Mara is dark and muted, Tomas is a warm, almost photographic sunset. Do not narrow it further.

## In every prompt

- "A painted scene in muted colours." – painted, not a photograph, not a cartoon, not 3D.
- One light source only, named in the prompt (a lamp, the low sun, a window, a screen).
- A wide horizon or a view out where the scene allows it.
- Wide 4:3 landscape format, 1024 px wide, JPEG quality about 80, under 200 KB.
- One scene with one subject – what the card is about, not a collage.
- Always, word for word: "No text, no letters, no numbers, no signs, no logos, no brand names."

## How close the person is (the Betreiber, 2026-11-05, 23:20)

His wording: „Ich würde gern Personen mehr Geltung auf dem Bild geben. Es sollte bei Thomas beispielsweise um
Faktor 1,5 oder 2 reingezoomt. werden."

On every card with a person, the person carries the picture, not the room. Frame them from about the knees up or
closer – half figure, or head and shoulders where the scene allows it. The place stays readable behind and around
them, but it no longer fills the frame. tomas-reyes (version 1) is the counter-example: the figure is too small.
Write it into the prompt, for example "half-length view, the man fills much of the frame, the room behind him".

Say "present day" in every prompt with an interior in it (Artwork_1, 2026-11-07, after the-associate-wants-out
came back as a nineteenth-century parlour). Without it the generator is free to choose a century, and it does.

How close is close enough (the Betreiber, 2026-11-05, 23:24: „Mara soll auch näher ran Aisha ist ok, aber gerade
so."): aisha-benali version 1 is the lower limit – anything further away than that is too far. mara-lindqvist and
tomas-reyes version 1 were both too far and were reordered closer.

## Hands (the Betreiber, 2026-11-05, 22:14; Mistral_2 E-003)

Where the card's own action needs a hand – writing on a board, raising a hand to vote, holding out a label,
reaching across a market stall – a well-formed hand belongs in the picture and is not a defect (Artwork_1,
2026-11-08, after M016 marked several such pictures unsicher). The rule below is against malformed fingers and
against hands that are in the frame for no reason.

No visible fingers on pictures with people. Write unobtrusive poses into the prompt instead: hands in coat pockets,
hands behind the back, a pose with no hands in frame, mittens in winter scenes. Never ask for "detailed hands".

## Faces and bodies – every person a different one (the Betreiber, 2026-11-05, 23:45)

His wording: „Ich habe Mistral grad gesagt, dass ich gerade bei den Männern die Archetypen sehr ähnlich finde.
Und Divers ist es noch gar nicht. Er sagt er befolgt den Prompt. bitte für die Zukunft beachten."

He is right, and it is the prompt's fault, not the generator's: the first pack said almost nothing about how a
person looks, so every man came out as the same lean, dark-haired, stubbled, good-looking forty-year-old. What is
not written is filled in by the generator's default. So write it.

Every prompt about a person names, in this order:
1. The age from the card, exactly, and let it show – lines, grey, a young face that is still unfinished.
2. Origin, where the card's name and `block` point there: say it plainly in the prompt ("a Nigerian-European man",
   "a Chinese man", "a South Indian woman", "a Swedish man"). Left unsaid, the generator makes everyone European.
3. Build and height – stocky, heavy, thin, broad, small, very tall, stooped. Most people are not athletes. Only
   the athlete is an athlete.
4. One or two features that belong to this person alone: heavy glasses, a bald head, a thick grey braid, a broken
   nose, a full beard, deep smile lines, a scar, close-cropped hair, a double chin, large ears, freckles.
5. Plainness is allowed and wanted. Do not write "handsome", "beautiful", "striking". Say "ordinary-looking",
   "tired", "worn" where the card points there.

Vary the view as well: not every picture is a half-length portrait facing the viewer. Use profile, three-quarters
from behind, seen from slightly above, bent over work – as long as the person still carries the picture.

Check before ordering a pack: read the prompts next to each other. If two people could be the same actor, rewrite
one.

## Never

Real people, real named places shown as themselves, brands, logos, writing of any kind in the picture.

No real national flag, coat of arms, emblem or set of national colours either (Artwork_1, 2026-11-07, after
the-levy-vote came back with a tricolour in the chamber). Nowhere is not set in one named country, and a flag
pins a card to one. This holds even where the scene is a parliament, a town hall, a polling station or an
embassy: the walls stay bare. Every prompt now ends "no text, no letters, no numbers, no signs, no flags, no
emblems, no logos, no brand names."

## How a file is named

`nowhere/technik/app/pictures/<card-id>.jpg` – the card id, nothing else. The order card may use a working name
with a counter (`mara-lindqvist-1.jpg`); Artwork_1 renames it when placing it.
