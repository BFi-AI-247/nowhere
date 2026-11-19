# Nowhere – Konzept des Spiels

Geführt von der Rolle Spiel (betrieb/rollen/spiel.md). Entscheidungen des Betreibers mit Datum und Wortlaut;
Ideen der Rolle sind als ⟦Vorschlag: …⟧ gekennzeichnet und gelten erst, wenn er sie annimmt. Neueste Entscheidung oben.
Gebaut wird nichts, bis der Betreiber es sagt.

## Ausgangslage (Wortlaut des Betreibers, 03.11.2026)

„Der nächste Zwischenschritt wird für mich. Wir werden ein Spiel erschaffen.“ Es soll ihm Freude machen. Es wird
öffentlich sein, „doch wenn es niemanden außer mir interessiert, ist das auch gut“. Hintergrund: Er hat gelernt, dass
das Ende der Software, wie wir sie kennen, naht – es wird weniger Standard-Software geben.

„Es wird eine Art Trading-Card Game und Stellaris Crossover mit einem Role Playing-Schwerpunkt. So mein aktueller
Gedanke. Ähnlich wie die Paradox-Spiele sollen Events den Fortschritt tragen. Es soll hauptsächlich eine Folge von
Events sein. Etwas passiert (Du ziehst eine Karte), Du wählst aus, das Spiel verändert sich entsprechend.“

(Quelle: Startauftrag claude_1/post/spiel/001, Regeln-039.)

## Entscheidungen

### 2026-11-06 – Second strand: time flow instead of 5 draws a month (Betreiber, 23:59)

The Betreiber wants to change the concept – a day-by-day time flow, events started by the author, cards drawn by the
player when he wants, assignments in regions that need presence and move energy, time-limited opportunities
(reference: the operations model of Star Wars Zero Company). This concept stays as it is; the new one is designed
as a second strand in nowhere/konzept-zeitfluss.md (his wording there). Role's questions asked 23:59.

### 2026-11-06 – "NW_2 war in deinem Sinne tätig. Prüfe das." (Betreiber, 00:07)

Checked: Spiel_2 built all four engine forms asked for in post/spiel/011 (a78dd69) – month/until/beat, contact
origin, three traits with an explanation line, no fall below 0 – and keeps the free option at the bottom. One
interaction found: a beat card that is also a follow target only fires when scheduled; solved in the cards. Cards
for P1 and P3 written the same night: crash beat 9, ending beat 12, aftermath after the crash, rising market until
month 8, 22 contact options. 500 simulated years through the engine: crash in month 9 and ending in month 12 every
time, no aftermath before the crash, no boom card after month 8, never more than three traits, no card without a
playable option.

### 2026-11-05 – P1–P5 (Betreiber's wording, 21:38)

"P1. That's on you (or a future author chat) to make the story cool. (But sounds reasonable.)
P2. Yes.
P3. Ok.
P4. There should be an understanding of what happens
P5. Don't make the player to bankrupt very easily ;) neither on influence nor on money."
→ Decided:
- P1 phases – accepted; the story's shape is the author's responsibility (Spiel_1, later an author chat). Needs one
  engine form from Spiel_2 ("from month n", and a card that comes in a given month); cards follow once it exists.
- P2 a real choice for every character on every card – done 21:40 for all 109 events (new options appended at the
  end, so saved logs replay unchanged; two cards gated by the possession they are about).
- P3 contacts open options – accepted; engine form `contact:<profession>` from Spiel_2, then cards.
- P4 at most three character traits, a new one pushing out the oldest – accepted on his condition: the player must
  understand what happens (the card says which trait came, which went, and why). Engine and UI: Spiel_2.
- P5 more options cost influence – accepted with his limit: the player must not go bankrupt easily, in money or
  influence. Cards: costs mostly 1, rarely 2; no effect below −2; every card keeps a free option. Engine: money and
  influence do not fall below 0 (request to Spiel_2).

### 2026-11-05 – More content before the next playthrough (Betreiber's wording, 21:24)

"I checked the TV on the Spain card.

Can you please create more content
before the next playthrough. I enjoyed it, but the next time might be a repeat."
→ The 136 s on the-sunday-flight were the TV, not confusion – the timing note below is corrected. Second batch of
cards the same evening: 2 characters (Elena Rossi, politician; Dr. Samir Haddad, doctor), 7 persons, 4
possessions, 49 events (25 the-last-boom, 24 personal) – 143 cards, 109 events, 89 of them drawable at random
(a year draws about 47). New events already carry P2 (a real choice for every character); old cards unchanged
until he decides P1–P5.

### 2026-11-05 – First playthrough log handed to Spiel_1 (21:11)

The Betreiber sent his game log (Mara Lindqvist, twelve months, 55 draws, 26 minutes) without comment; his
spoken findings went to the technical chat (technik.md, 21:11). Spiel_1 replayed the log through the engine and
recorded what the story side sees in "Prototype 1 – first playthrough" below. Card bugs found that way were fixed
at once (Spiel_1's own area); the proposals P1–P5 wait for his word.

### 2026-11-05 – "Write the cards" (Betreiber's wording, 18:09)

"Write the cards"
→ Done the same evening: 79 cards in nowhere/karten/ (3 characters, 10 persons, 6 possessions, 60 events: 34 in
the-last-boom, 26 in personal), in card format draft 1 (technik.md, accepted 18:07). Author's decisions while
writing are in nowhere/karten/README.md (draws always 1; no trait branching; opinion not on cards; Europe as the
player's block). Nothing is final until played.

### 2026-11-05 – Prototype 1 defined (Betreiber's wording, 17:46)

On the role's question "is it time to define the first playable prototype?" with the draft below: "Okay. I'll
follow your lead."
→ Decided: the concept phase pauses here; Prototype 1 is defined as drafted (section "Prototype 1"). This includes
the monthly turn rule as the Betreiber proposed it on 04.11. (5 cards per game month; once a month two of them may
be spent to choose a card's kind). Building still needs his word in the technical chat (start order of the role).

### 2026-11-05 – More personal events (Betreiber's wording, 17:40)

"personal event
Successful Investment
Heir to something/relative dying (no need that he was in the game before)
Join a TV Show
Successful influencer
See a shooting star
Enlightenment
Tempting offer"
→ Added to the personal events in the overview.

### 2026-11-05 – AI scenarios (Betreiber's wording, 17:32)

"scenarios
 Terminator - ai and robots take over
Pantopia - Ai triggers positive world
"das Erwachen"/Elsberg: ai takes over but cares for humans"
→ Added to the overview of story-carrying elements as three AI scenarios – the same event (AI takes over) with three
different outcomes.

### 2026-11-05 – Event: power block gets a new leader (Betreiber's wording, 16:49)

"Another event:
Power Block gets new leader. You or a associate or contact being qualified could become that. Or a person existing
oder a new card. If the person is Patriotic it's developing different when Globalist. Same for other traits."
→ Recorded under "Ereignisse am Machtblock" and in "Machtblöcke": a block has a leader, who is a person card; the
leader's traits shape how the block develops. "Patriotic" named as a trait (pair Globalist – Patriot, proposed 16:23,
now his wording too).

### 2026-11-05 – Example: the 50-year-old successor (Betreiber's wording, 16:45)

"You can have a 50 year old successor upon death. He can have a son without the son necessarily having been born in
the game mechanic he just appears in an event."
→ Example for 16:40/16:42, recorded in "Personen": a successor can be 50 at takeover; his son appears in an event,
without a birth in the game.

### 2026-11-05 – Correction: children born in the game do grow up (Betreiber's wording, 16:42)

"Nono. When a child is born it grows up. But children can have been born before the game started. And relatives can
appear without having a history."
→ Corrected reading of 16:40: A child born in the game grows up (the thread child → grown-up event → possible
successor holds). What "no accounting" means: children can also have been born before the game started, and
relatives can appear without a history. The withdrawal in the 16:40 entry is itself withdrawn.

### 2026-11-05 – No accounting of people (Betreiber's wording, 16:40)

On the role's interpretation that a child born in the game could later be the "daughter grows up" event:
"Your Son/daughter must not be born to have the grown up event.
At this point of the concept we do not do accounting of people.
Siblings or other relatives cound appear without the player knowing about them before."
→ Decided: no accounting of people at this point of the concept. A person card can appear without a prior card
that explains it – a grown daughter without a birth, a sibling the player never knew of. The interpretation of 16:35
(child → later successor as a thread) is withdrawn. (Corrected 16:42: the thread holds; see above.)

### 2026-11-05 – More scenarios, personal events, pollution (Betreiber's wording, 16:35)

On translating the whole concept to English: "Let's do that later."
"Some scenarios/events that could occur:
Massive Global warming.
Middle East Oil crisis.
Peak Oil and end of the Oil age.
Nuclear power plant failure.

Personal event:
great holiday
Learn a new language
Marriage
Become pregnant/ parent

Furthermore pollution is a global thing, maybe a stat of the power block."
→ Added to the overview of story-carrying elements; pollution noted as a possible fifth power-block value (idea,
"maybe"). Full translation of this file: later (open point 24).

### 2026-11-05 – Language: English (Betreiber's wording, 16:29)

„Ach, ich möchte, dass das Spiel primär auf Englisch ist.
Kannst Du bitte die Sprache hier im Chat auf Englisch ändern. Ich versuche mich anzupassen.
Deutsch ist das die erste „Fremdsprache“ der Projekts.
Wenn Themen für mich schwer auszudrücken sind greife ich auf Deutsch zurück.“
→ Decided: the game is primarily in English; German is the project's first "foreign language"; the chat switches to
English, the Betreiber falls back to German when something is hard to express. Open point 11 (language of card
texts) resolved: English. From this entry on, new text in this file is written in English; earlier text stays as it
is; his quotes stay verbatim in whatever language he used.

### 2026-11-05 – Opinion wie in CK3 (Wortlaut des Betreibers, 16:23)

„Die Opinion kann so funktionieren wie bei Crusader Kings 3. Sie muss nicht der gleiche Wert gegenseitig sein.
Und Eigenschaften beeinflussen sie. Ein Zyniker und ein Eiferer haben gegenseitig die Opinion runter gesetzt. Mörder
haben bei allen einen Malus. Ein Olympionike einen Bonus. Die Opinion bei den Powerblocks überträgt sich auf die
Charaktere der jeweiligen Powerblocks.
Es gibt eine Eigenschaft wie Globalist, welche negativen Effekte daraus reduziert.
Hol dir mal die Opinion Tabellen von CK3.“
→ Entschieden: Opinion nach dem CK3-Mechanismus – gerichtet (A→B ≠ B→A), aus Eigenschaften zusammengesetzt;
Block-Opinion überträgt sich auf dessen Charaktere; Eigenschaft „Globalist“ dämpft negative Block-Effekte. Beispiele:
Zyniker↔Eiferer gegenseitig runter; Mörder Malus bei allen; Olympionike Bonus. Tabelle als Vorschlag im Abschnitt
„Personen“.

### 2026-11-05 – Personen bleiben im Spiel; Opinion zueinander (Wortlaut des Betreibers, 16:14)

„Und Personen-Karten bleiben im Spiel. Auch wenn man sie nicht als Associates oder Contacts nimmt. Und zu anderen
Personen haben die Karten untereinander eine Opinion zueinander.“
→ Entschieden: Personen-Karten bleiben in der Partie, auch ungenommen; Personen haben untereinander eine Opinion.
Abschnitt „Personen“ angelegt.

### 2026-11-05 – Associate → Kontakt; Ressourcen Einfluss und Status (Wortlaut des Betreibers, 15:54)

Zur Beispiel-Karte: „Ich finde die Ideen spannend, dass eine Associate zu einem Kontakt wird. Als einzelnes Ereignis
super.“
→ Angenommen als einzelnes Ereignis: Ein Associate kann (vorübergehend) zum Kontakt werden.

„Ich dachte noch an einige Stats) Ressourcen, die wir von Anfang an haben sollten neben Geld. Einfluss/Influence. Kann
Durch Ereignisse gewonnen werden vielleicht auch durch Besitztümer als oder Eigenschaften als Passives Einkommen.
Ferner der Status mit den Power Blocks. Ggf. könnte man den Powerblock Wechseln, wenn der Status hoch genug ist. Und
hoher Status eröffnet auch gewisse Optionen.
Influence kann bspw. für das Rekrutieren von Kontakten oder für Ereignisse Optionen eingesetzt werden. Geld auch.
Einige Kontakte und auch Associates erhält man auch ohne Ressourcen.
Ereignis: Du triffst einen alten Freund/
Deine Tochter wird erwachsen.
Junior Kollege sucht einen Mentor.“
→ Entschieden: Ressourcen von Anfang an neben Geld: Einfluss und Status je Machtblock. Abschnitt „Ressourcen“
angelegt. Die drei Ereignisse sind Beispiele für Personen, die ohne Ressourcen kommen.

### 2026-11-05 – Optionen, Impact, Karten je Monat, Aufträge, globale Ereignisse (Wortlaut des Betreibers, 15:05)

Auf die drei restlichen Fragen der Rolle (14:49: Was steht vorn auf der Ereignis-Karte? Wie groß ist eine Wahl? Was
sind die anderen Karten eines Monats?):
„1. Eine Option wird nur eingeblendet, wenn die Fertigkeit oder der Umstand auch da sind – und sie nennt, woher die
Eigenschaft kommt. Und wenn Du keinen passenden Trait hast, kannst Du vielleicht nur eine Standard-Option wählen.
Wobei der Autor das vielleicht nicht zu oft spielen sollte.
2. Ich möchte die Option „Die halbe Welt umwerfen“ nicht ausschließen. Plausibilität ist wichtig. Und immer nur ein
Wert ist definitiv zu wenig. Die Ereignis-Karten könnten eine Art „Impact-Indicator“ haben. Eine Power-Zahl oder so. 1
für Du feierst Geburtstag und bekommst eine Geschenk, eine 5 für eine großes Erdbeben oder so. Vielleicht gibt es noch
größere Sachen.
3. Da habe ich auch schon drüber nach gedacht. Ob es nur ein „globales“ Ereignis, auch das muss ja nicht immer
super-dramatisch sein, eher im Gegenteil pro „Monat“ gibt und die anderen einen lokalen, persönlichen oder anderen
Bezug haben. Das hängt vielleicht von der Umgebung ab. Wenn zwei Handlungsstränge aktiv sind, können auch zwei
Ereignis-Karten kommen. Müssen aber nicht.

Weiterer Gedanke: Ereignisse können auch „Aufträge“ sein. Spion-Eigenschaften bieten sich an. Also Ereignisse können
gezielt auf die Eigenschaften des Charakters oder der Associates zielen.

Das ist vielleicht ein guter Aspekt. Globale (oder auch Lokale) Ereignisse, zu denen man vielleicht eine
Handlungsoption hat. „Ufo landet in Spanien“ Ich bin Europäer und kann den Ort besuchen. Ich bin Spion aus Indien und
kann einer Task-Force dazu beitreten. Aber den Ort vielleicht nicht direkt besuchen.“
→ Entschieden: Optionen erscheinen nur, wenn Fertigkeit oder Umstand da sind, und nennen die Herkunft; Plausibilität;
nie nur ein Wert. Als Idee: Standard-Option ohne Trait (selten); Impact-Indicator 1–5+; ein globales Ereignis je
Monat, die übrigen lokal/persönlich, bei zwei Strängen auch zwei; Ereignisse als Aufträge, die auf Eigenschaften
zielen. Beispiel „Ufo landet in Spanien“ → als Beispiel-Karte ausgeschrieben (nowhere/beispielkarte.md).

### 2026-11-05 – Technologie ist eine Karte (Wortlaut des Betreibers, 14:49)

„Technologie = Karte ist auch gut.“
→ Entschieden: Technologie ist eine Kartenart der Umgebung (Deutung der Rolle angenommen, Abschnitt Technologien).

### 2026-11-05 – Spieler, Einstieg, Tutorial, Technologien (Wortlaut des Betreibers, 14:45)

Auf Frage 5 der Rolle (Wer spielt Nowhere außer dir? Empfehlung: gebaut für den Betreiber, aber die erste Karte muss
jemand ohne die Referenzen verstehen):
„Ja, ich bin der Spieler. Aber ein einfacher Einstieg soll möglich sein.
Ich probiere es aus und in einem späteren Schritt machen wir ein kurzes Tutorial.
Die Visualität soll eine Verbindung aufbauen.

Viele der Dinge, die in den von mir genannten Quellen vorkommen sind im SciFi-Standard Szenarios. Stargates gibt es
auch in Stellaris. Roboter und Cyborgs oder so kommen auch überall vor.
Eine Win-Condition könnte die Gründung der Sternenflotte sein, fällt mir da ein. Oder auch sowas wie ein Achievement.

Was mir noch einfällt, die „Umgebung“ also die Powerblocks und die Wellt allgemein sollen bestimmte „Technologien“
kennen. Ich möchte aber keinen Tech-Tree vorabdenken, der soll kreativ entstehen und eben auch die Events beeinflussen
können. Die Technologische Entwicklung kommt auch nur durch Karten. Sie kann schneller gehen oder weniger schnell. Wir
hatten ja auch schon das Breakthrough Szenario.
Vielleicht ist es wirklich etwas, dass, so es die Kreativität der KI zulässt, immer weiter gehen kann.“
→ Entschieden: Der Betreiber ist der Spieler; einfacher Einstieg; Tutorial in einem späteren Schritt; Visualität soll
eine Verbindung aufbauen. Technologien: die Umgebung (Machtblöcke, Welt) kennt Technologien; kein vorab gedachter
Tech-Tree – er entsteht kreativ, beeinflusst Events, kommt nur durch Karten, Tempo variabel. Idee: Win-Condition
„Gründung der Sternenflotte“; Achievements; unbegrenzter Fortschritt, soweit die KI kreativ ist.

### 2026-11-05 – Ton; Charakterzüge ändern sich durch Ereignisse (Wortlaut des Betreibers, 14:37)

Auf Frage 4 der Rolle (Ton: nur Bedrohung oder auch Leichtigkeit? Empfehlung: beides, das Verhältnis legt der
Charakter fest – Charakterzüge färben Formulierung und kleine Ereignisse; große Stränge ernst, kleine Karten zur
Hälfte Freude):
„Ich folge Deiner Empfehlung.
Hinweis: Die Eigenschaften eines Charakter können sich durch Ereignisse auch ändern. Jemand ist zynisch und verliert
diese Eigenschaft und wird weise weil er ein passendes Altersevent hat.“
→ Entschieden: Ton nach Empfehlung. Charakterzüge ändern sich durch Ereignisse, auch Altersevents (Beispiel: Zynisch
→ Weise). „Weise“ ist damit ein Charakterzug der offenen Liste; Altersevents sind eine Ereignisart.

### 2026-11-05 – Album, keine Unlocks, Occurrence Counter (Wortlaut des Betreibers, 14:18)

Auf Frage 3 der Rolle (Sammeln über Partien: Album oder Startkapital? Empfehlung Album):
„Album finde ich auch gut. Es sollte keine Unlocks geben. Aber vielleicht eine Art Occurrence Counter, wie oft man der
Karte begegnet ist. Und vielleicht kann sie dadurch Optisch aufwerten. Das Optisch Aufwerten ist nicht für eine erste
Partie nötig.“
→ Entschieden: Album; keine Unlocks. Idee („vielleicht“): Occurrence Counter je Karte über Partien hinweg; optische
Aufwertung dadurch – nicht für die erste Partie.

### 2026-11-05 – Win-Condition ist eine Karte; Aufstieg bis an die Spitze (Wortlaut des Betreibers, 14:14)

„Win-Condition = Karte = check. Guter Vorschlag.
Der Charakter kann im Machtblock bis an die Spitze aufsteigen. Das ändert das Spiel nicht, es gibt weiter Karten mit
Ereignissen. Ich denke, das stimmt mit Deinem Vorschlag überein.“
→ Entschieden: Die Win-Condition ist eine Karte (Voraussetzungen, Verfallsregel; verfällt sie, zieht der Autor eine
neue). Der Charakter kann bis an die Spitze eines Machtblocks aufsteigen; die Mechanik bleibt dieselbe – Karten mit
Ereignissen, oben wie unten.

### 2026-11-05 – Alter, Nachfolger, Endjahr, Win-Condition (Wortlaut des Betreibers, 14:04)

Auf die Frage der Rolle „Womit endet eine Partie, und was hat der Spieler dann in der Hand?“ (Empfehlung: kein
Gewinnen; Ende = Ende der Geschichte des Charakters; Spielstand-Log als lesbare Geschichte):

„Interessant. Ich wollte, dass der Spieler (er soll ein Alter haben) aus den Associates einen Nachfolger auswählen
kann.
Spielende habe ich mir auch schon Gedanken gemacht. Vielleicht ein festes Jahr. Wie 2100 oder 2200 oder so.
Jeder Charakter könnte tatsächlich eine Geschichte persistieren. Das finde ich ist eine gute Idee.
Aus dem Endjahr können wir die Anzahl der zu spielenden Züge ermitteln.
Und die Win-Condition könnte auch aus einem Ereignis kommen:
Besiegt die Invasoren.
20 Jahre Frieden auf der Erde.
Ein neuer Machtblock außerhalb Der Erde soll existieren.
Und die Win Condition kann sich ggf. auch ändern, wenn der Spieler keine Chance mehr hat sie zu erreichen. Für 20 Jahre
Frieden muss man vielleicht Politiker sein, wenn man keiner mehr ist aus irgendeinem Grund, ändert sich das Spiel.
Je nach dem, wie Kreativ die KI sein kann, könnte das Spiel auch unlimited gehen. Vermutlich sollte man es einstellen
können.“
→ Entschieden: Der Charakter hat ein Alter; Nachfolger aus den Associates; jeder Charakter persistiert seine
Geschichte (Vorschlag der Rolle angenommen: „gute Idee“). Als Idee („vielleicht“, „könnte“): festes Endjahr (2100,
2200), Zugzahl daraus; Win-Condition aus einem Ereignis, die sich ändern kann; unbegrenzte Partie einstellbar.
Abschnitt „Die Partie“ angelegt.

### 2026-11-05 – Kleine Entscheidungen auf anderen Karten (Wortlaut des Betreibers im Technik-Chat Spiel_2, 13:48;
überbracht als Befund claude_1/post/spiel/004, vollständig in nowhere/technik/technik.md)

„Du hast das Ereignis, an dem Du eine Entscheidung treffen kannst. Und alle anderen Karten. Vielleicht kannst Du da
auch noch kleine Entscheidungen treffen, welche die nächste Karte beeinflussen, oder sogar die aktuelle.“
Kontext laut Spiel_2: „alle anderen Karten“ = Charakter, Associates, Kontakte, Assets, Umgebung (Machtblöcke), als
Fächer neben der Ereignis-Karte. → In „Der Zug“ aufgenommen; was eine kleine Entscheidung ist, offen (Punkt 18).

### 2026-11-05 – Auftrag: Main-Story-Lines (Wortlaut des Betreibers, 13:49)

„Sei jetzt kreativ und entwirf eine erste Handvoll „Main-Story-Lines“. Jeweils eine Überschrift und einen Absatz Text,
was passieren könnte.“
→ Sieben Entwürfe in nowhere/story-lines.md (alles ⟦Vorschlag⟧, nichts entschieden).

### 2026-11-05 – Umgebungs-Zustände (Wortlaut des Betreibers, 13:38)

„Hatte ich schon erwähnt, dass es quasi verschiedene Umgebungs-Zustände geben soll. So ähnlich vielleicht wie die
Events in Stellaris. Etwas, dass über einen längeren Zeitraum persistiert und auch Events triggert.
Boom, Krieg, Seuchen, Ein Flug zum Mars – auch wenn der Spieler nicht daran teil nimmt, Naturkatastrophen und ihre
Folgen.“
→ Neuer Abschnitt „Umgebungs-Zustände“; Übersicht der Story-tragenden Elemente als eigener Abschnitt angelegt
(auf seine Bitte, 13:38).

### 2026-11-05 – KI als Autor, Stapel, Folge-Effekte, Gegenspieler, weniger Text (Wortlaut des Betreibers, 13:25)

„Eine Idee ist: Der Spieler spielt und im Hintergrund variiert die KI als Autor den Handlungstrang. Durch das
kontinuierliche Spielen entsteht eine Art Repository, aus dem sie sich immer wieder bedienen kann. Gleichzeitig sollen
neue Ideen entstehen.

Die KI kann beispielsweise immer einige Züge/Karten im Voraus verschiedene Entwicklungen im Angebot haben.

Intern kann es ja verschiedene Stapel geben. Einen Stapel für Krieg in China, einen für die Olympiade, einen für ein
Stargate-Szenario, Persönliches, Den Flug zum Mond usw.

Eine Wahl auf einer Karte muss auch andere Folge-Effekte haben. Wenn der Spieler entscheidet, dass nicht auf dem Mars
gelandet wird, passieren danach andere Dinge als wenn man landet. Wenn der Autor sein Werk veröffentlicht können ganz
andere Dinge passieren als wenn es er nicht tut. Bspw. Du bist Autor und hast einen Eiferer als Associate. Du
veröffentlichst ein kontroverses Buch und Dein Eiferer verlässt Dich – wird vielleicht sogar ein Gegenspieler.
Gegenspieler könnte eine neue Kategorie in der Umwelt sein.

Schau Dir auch mal das Spiel „Suzerain“ an. Die Story ist gut. Ich möchte weniger Text – zumindest vordergründig. Die
Karten können zweite Seiten haben, die mehr Text enthalten, aber es soll im ersten Moment visueller sein.“

→ Aufgenommen in die Abschnitte „Die KI als Autor“, „Die Karte“ und „Umwelt“ (unten). „Eine Idee ist“ – nicht als
fest entschieden geführt, außer: Folge-Effekte sind Pflicht („muss“), Karten vordergründig visuell, zweite Seite für
mehr Text.

### 2026-11-05 – Name: Nowhere (Wortlaut des Betreibers, Chat Spiel_1, 13:11)

„Der Projektname ist Nowhere (Man kann es auch Now-here, verstehen, was darauf abzielt, dass es im Hier uns jetzt
beginnt.)“
→ Das Spiel heißt Nowhere. Offener Punkt 8 (Name) entschieden. 13:14 „Passt.“ zum Umzug des Ordners spiel/ nach
nowhere/ (Verweis spiel/UMGEZOGEN.md bleibt).

### 2026-11-04 – Vorschlag Zustände/Dritte angenommen (Wortlaut des Betreibers, 23:10)

„Der Vorschlag ist gut. Dritte sollten irgendwann eine Rolle spielen.“
→ Angenommen: Krieg ist ein Zustand zwischen zwei Akteuren, kein Trait; Dritte sind Akteure außerhalb der fünf
Blöcke (Staat außerhalb, abgespaltener Teil, Invasoren) und bekommen später eine Rolle. Weitere Zustände (Bündnis,
Embargo) bleiben offen. Sitzung beendet 23:10 („Feierabend für heute“).

### 2026-11-04 – Krieg: worum es ihm geht (Wortlaut des Betreibers, 23:07)

„ich dachte eher daran, dass es dann direkt bei einem Event „Krieg bricht aus“ für einen Charakter der
Militärangehöriger ist andere Optionen gibt. „Desertieren“ „Freiwillig an die Front“ oder sowas.“
→ Der Punkt ist die Wirkung auf den Charakter, nicht ein System zwischen Blöcken: Der Zustand des eigenen Machtblocks
öffnet in einem Ereignis Optionen je nach Beruf. Vorschlag der Rolle zu Zuständen/Dritten (23:05) ist damit nicht
der Kern; bleibt als Vorschlag stehen, nicht weiter verfolgen. (Überholt 23:10: Vorschlag angenommen.)

### 2026-11-04 – Krieg (Wortlaut des Betreibers, 23:05)

„Machtblöcke können im Krieg sein. Untereinander und auch mit dritten.“
→ Abschnitt Machtblöcke ergänzt. „Dritte“ sind damit Akteure, die kein Machtblock sind – was das ist, ist offen.

### 2026-11-04 – Europa: Kulturell (Wortlaut des Betreibers, 23:03)

„Verwurzelt ist schrecklich. Kuturell ist gut. Das kommt auch aus civ.“
→ Europa: Diplomatisch · Föderal · Kulturell. Vorschlag „Verwurzelt“ verworfen.

### 2026-11-04 – „Traditionell“ zurückgezogen (Wortlaut des Betreibers, 23:02)

„Dann ist Traditionell falsch. Ich möchte ausdrücken, dass es eine tief verwurzelte Kultur hat, die allerdings die
Identität trägt aber nicht das Gegenteil von progressiv ist.“
→ „Traditionell“ gilt nicht mehr; das Wort für Europa ist offen (Vorschlag der Rolle im Abschnitt Machtblöcke).

### 2026-11-04 – Drei Änderungen an den Startwerten (Wortlaut des Betreibers, 23:00)

„Bei Europa möchte ich anstelle von Alternd Traditionell
Bei USA freiheitlich einfach streichen
Bei China anstelle von Expansionistisch Isolationistisch“
→ Eingearbeitet in den Vorschlag Startwerte (Abschnitt Machtblöcke). „Traditionell“ und „Isolationistisch“ sind
damit Eigenschaften der offenen Liste. Die übrigen Startwerte hat er nicht ausdrücklich freigegeben.

### 2026-11-04 – Politik-Eigenschaften, Zerfall und Wachstum (Wortlaut des Betreibers, 22:56)

„Erarbeite mal die Politik-Eigenschaften, das müsste mit einer Recherche möglich sein. USA und Russland sind
beispielsweise Militaristisch. Civilization 7 gibt da vermutlich gute Hinweise.
Und es können auch 2 oder 3 Eigenschaften je Machtblock sein.
Ereignisse können auch sein, dass ein Machtblock zerfällt oder weiter wächst.“

### 2026-11-04 – Fertigkeit/Beruf angenommen; Machtblock-Eigenschaften; Zug-Idee (Wortlaut des Betreibers, 22:53)

„Fertigkeit/Beruf Nehme ich an.“
→ Entschieden: Ereignisse prüfen Fertigkeiten; ein Beruf ist Name + Fertigkeiten-Bündel; Berufsliste offen
(Vorschlag Fassung 2, Schicht 1 und 2). Die übrigen Teile der Fassung 2 (Charakterzüge, Erworbenes, Steigerung,
Sprache) sind damit nicht entschieden.

„Ach, die Machtblöcke sollen auch Eigenschaften haben.
Zum einen die Eigenschaften, welche Ihre Politik charakterisieren, zum anderen Ökonomische und militärische Macht,
Kulturelle Entwicklung, Technologische Entwicklung.
Ereignisse steuern den technologischen Fortschritt, auch den Kulturellen.

Ach, eine Eigenschaft könnte bspw. Athlet sein und jemand könnte an einem Sportwettbewerb teilnehmen. Das wiederum
kann die kulturelle Entwicklung des Landes aufwerten.

Im Single player Modus würde ich sagen, kann ich so viele Karten spielen, wie ich möchte.

Meine erste idee war, dass in jedem Spiel-Monat 5 Karten gespielt/gezogen werden können und es es völlig zufällig
welcher Art die Karte ist.
Wenn man zwei von diesen Zügen investiert kann man bestimmen, welcher Art eine Karte ist. Was einmal pro Monat möglich
ist. Dann würde man nur vier Karten ziehen.“

### 2026-11-04 – Listen sind offen (Wortlaut des Betreibers, Chat Spiel_1, 22:43)

„Die Listen sollen offen sein. Das Spiel kann weitere erfinden. Sollten wir auch jetzt direkt. Wir wollen ja nicht zu
100% kopieren. Schau doch bitte die anderen Paradox-Wikis noch durch nach eigenschaften. Die dürften recht ähnlich
sein. Und Baldur's Gate hat sicherlich auch noch was zu bieten. Die haben diese Proficiencies.“
→ Eigenschaftslisten sind offen; das Spiel darf neue erfinden; eigene Erfindungen schon jetzt, nicht nur kopieren.

### 2026-11-04 – Besitz, Geld, Auftrag für Eigenschaften (Wortlaut des Betreibers, Chat Spiel_1, 22:38)

„Deutung 3: Es geht nicht nur um Personen und Fahrzeuge. Wenn Du einen Landsitz hast, kannst du eventuell bei einem
Ereignis eine andere Option auswählen. Vielleicht gibt es auch noch andere arten von Besitztümern. Kulturelle Dinge zum
Beispiel. du könntest auch Eigentümer einer Fabrik oder eines Hospitals sein. Oder eines Flugplatzes.“
(Deutung 3 war: Wen und was man hat, bestimmt, welche Optionen ein Ereignis einem zeigt. – Ergänzung: das gilt für
jede Art Besitz, nicht nur Personen und Fahrzeuge.)

„Deutung 4: Ich denke, auf Geld sollten wir nicht verzichten. Auch das soll ein Engpass sein können.“
(Deutung 4 war: Das Team ist der Engpass, nicht das Geld. – Korrektur: Geld bleibt im Spiel und kann ebenfalls Engpass
sein.)

„Fangen wir mal mit möglichen Eigenschaften von Personen an. Jetzt darfst du was vorschlagen. Schaue Dir mal von den
Treese Brothers Star Traders: Frontier an. Die haben schon eine schöne Auswahl für eine Erste Gruppe von Traits.
Bounty Hunter, Explorer, Merchant, Military Officer, Pirate, Smuggler, Spy, Zealot, Xeno Hunter, Scientist, Assassin,
Commander, Diplomat, Scavanger, Shock Trooper, Wing commando, Blade Master, Exo-Scout, Doctor
Ferner schau Dir gern sowas wie Crusader Kings 3 an. Auch wenn Mediival dürften da auch super traits zu finden sein.“

### 2026-11-04 – Zwei Klarstellungen (Wortlaut des Betreibers, Chat Spiel_1, 22:28)

Auf die Wiedergabe der Rolle (#003, zwei als Deutung gekennzeichnete Stellen):

„Deutung 1 ist korrekt. Machtblock = Umfeld. Was mir noch als Punkt eingefallen war: Jede Person assoziiert sich mit
einem Machtblock.“
(Deutung 1 war: Der Spieler ist kein Staat und kein Machtblock, sondern ein Einzelner in dieser Welt – die Blöcke sind
Umfeld, nicht Spielfigur.)

„Deutung 2: Weitestgehend korrekt. Artwork und auch Funktion und Eigenschaften können gleich sein. Es soll aber klar
sein, dass diese Karte dann in einem anderen Spiel verwendet wird.“
(Deutung 2 war: Dieselbe Karte, in einer neuen Partie gezogen, ist eine neue Instanz mit eigener Geschichte, auch wenn
sie gleich aussieht. – Korrektur: nicht nur das Aussehen, auch Funktion und Eigenschaften können gleich sein; die
Unique-ID macht sichtbar, dass es eine andere Partie ist.)

### 2026-11-04 – Kern und erste Vorstellung des Spiels (Wortlaut des Betreibers, Chat Spiel_1, 22:22)

Zum Kern (auf den Entwurf der Rolle, siehe unten): „Ich denke auch, die Geschichte ist der Kern.“

„Ich stelle mir folgendes vor:
Es beginnt im hier und jetzt. Auf der Erde in der ersten Hälfte des 21. Jahrhunderts.
Gedanklich starten wir auch mit der jetzigen Situation.
Es gibt fünf Machtblöcke. USA, Europa, Russland, China und Indien.
Man selbst hat eine Charakter-Karte. Diese ist vorgegeben. Zu Beginn des Spiels kann man aus mehreren aussuchen.
Alle Karten im Spiel sollen einzigartig sein. Eine Art Unique-ID und auch einzigartige Artwork haben.
Das Artwork kann von Partie zu Partie übertragen werden, die Unique-ID nicht.
Meine Idee ist, dass kontinuierlich neue Karten (bspw. durch einen Mistral Worker) erzeugt werden.
Karten können sein:
Personen
Ereignisse
Besitztümer (Land, Fabriken, Fahrzeuge wie später Raumschiffe)
Vielleicht noch weitere.

Personen haben Eigenschaften und Fahrzeuge auch. Ereignisse verhalten sich anders, wenn bestimmte Eigenschaften „im
Deck“ sind, also in den Karten die man besitzt.

Man kann nur eine bestimmte Anzahl von Karten „Aktiv“ haben. Ggf. mehr im Stapel, das weiß ich noch nicht. Ich dacht an
sowas wie „Associates“ also Leute die im eigenen Team sind und Kontakte, die nicht in selben Maße Eigenschaften bereit
stellen.

Die Anzahl der Associates ist begrenzt, kann aber durch Traits oder events erhöht werden. Ebenso die Anzahl der
Kontakte. Wenn ich also einen „Space ship Captain“ als Associate habe kann ich mehr Besitztümer haben und insb. kann ich
mehr mit Besitztümern wie Space Ships anfangen.

Man selbst hat also eine Person, die bestimmte Eigenschaften hat. „Geschäftsmann“, „Schlitzohr“, „Charismatisch“ oder
so was. Diese Traits können sich im Lauf der Geschichte verändern.

Die Ereignisse können persönliche, globale, Powerblock bezogene oder andere Personenbezogenen Events sein. Hier fließt
auch Kreativität rein.

Wie gesagt, es beginnt im hier uns jetzt und im Gegensatz zu Stellaris gibt es keine End-Game-Crisis (vielleicht gibt es
dich doch) – aber in jedem Fall gibt es ein Start-Event. Und das ist nicht fix.
Auch hier ist Kreativität gefragt.
Es könnten die Borg als Invasoren kommen, es könnte ein Atomkrieg ausbrechen, es könnte ein Predator sein Unwesen
Treiben, es könnte ein Asteroid drohen einzuschlagen, es gibt einen technologischen Durchbruch und ein anderer Stern
kann kolonialisiert werden oder oder oder.“

Der Betreiber hat die Rolle angewiesen, das zuerst aufzunehmen und ihr Verständnis wiederzugeben, nicht in einen
Dialog zu gehen – er hat Vorbehalte, dass ein Dialog seine Idee in eine Richtung lenkt, die ihm nicht recht ist.
Was er selbst als offen nennt: ob es außer den aktiven Karten mehr im Stapel gibt („das weiß ich noch nicht“); ob es
doch eine End-Game-Crisis gibt („vielleicht gibt es dich doch“); welche Kartenarten es außer Personen, Ereignissen und
Besitztümern gibt („Vielleicht noch weitere“).

Entwurf der Rolle zum Kern (Spiel_1, 04.11., #002), vom Betreiber mit „Ich denke auch, die Geschichte ist der Kern“
beantwortet – der Entwurfstext selbst ist damit nicht wörtlich freigegeben: ⟦Vorschlag: „Freude macht mir, dass aus
meinen Entscheidungen eine Geschichte entsteht, die so nur in meiner Partie passiert ist. Die Karten sind das Mittel,
mit dem sie erzählt wird; das Reich ist die Bühne.“⟧

## Machtblöcke (Betreiber, 04.11.2026, 22:53)

Fünf: USA, Europa, Russland, China, Indien. Umfeld, nicht Spielfigur; jede Person gehört zu einem.
Eigenschaften eines Machtblocks (Wortlaut oben):
- Eigenschaften, die seine Politik charakterisieren
- Ökonomische Macht · Militärische Macht · Kulturelle Entwicklung · Technologische Entwicklung
- Pollution – "a global thing, maybe a stat of the power block" (Betreiber, 05.11., 16:35; idea)
Ereignisse steuern den technologischen und den kulturellen Fortschritt. Beispiel des Betreibers: eine Person mit
„Athlet“ nimmt an einem Sportwettbewerb teil, das wertet die kulturelle Entwicklung ihres Landes auf.
⟦Vorschlag: Das Beispiel zeigt die Kette Person → Ereignis → Machtblock. In Fassung 2 wäre „Athlet“ ein Beruf mit
den Fertigkeiten Athletik + Auftreten; das Ereignis „Sportwettbewerb“ prüft Athletik.⟧
Je Machtblock 2 oder 3 Politik-Eigenschaften (Betreiber, 22:56). Ereignisse können einen Machtblock zerfallen oder
wachsen lassen (Betreiber, 22:56). Machtblöcke können im Krieg sein – untereinander und mit Dritten (Betreiber,
23:05).
Angenommen (Betreiber, 23:10): Krieg ist ein Zustand zwischen zwei Akteuren, kein Trait eines Blocks – ein Block kann
zugleich mit einem im Krieg und mit einem anderen verbündet sein. Dritte sind alles, was kein Machtblock ist und
trotzdem Krieg führen kann – ein Staat außerhalb der fünf, ein abgespaltener Teil nach einem Zerfall, oder nach dem
Start-Event die Invasoren; sie sollen „irgendwann eine Rolle spielen“.
**Leader** (Betreiber, 05.11., 16:49): A block has a leader – a person card. The event "Power block gets a new
leader" can make the player, an associate or a contact the leader if qualified, or an existing person, or a new card.
The leader's traits shape how the block develops (Patriotic vs. Globalist, and every other trait).
⟦Interpretation: the leader card is where the block's politics and a person's traits meet – the author reads the
leader's traits when writing the block's events; the block's political traits (22:56) can drift toward the leader's
over time. "Qualified" = skill/profession check like any option (e.g. profession Politician, status in that block).⟧
Worum es dem Betreiber dabei geht (23:07): Das Ereignis „Krieg bricht aus“ zeigt einem Charakter, der
Militärangehöriger ist, andere Optionen – „Desertieren“, „Freiwillig an die Front“. Der Zustand des Machtblocks
wirkt also wie eine Eigenschaft auf die Optionen eines Ereignisses, gefiltert durch den Beruf der Person.
Offen: ob die vier Entwicklungs-/Machtwerte Zahlen sind oder Stufen; weitere Zustände zwischen Akteuren (Bündnis,
Embargo); wann und wie Dritte ins Spiel kommen.

### Politik-Eigenschaften (Spiel_1, 04.11.2026, 22:56, auf Auftrag; nicht entschieden)

Gelesen (04.11., Übersichtsseiten): Civilization VII hat sechs Attribute – Militaristic, Economic, Cultural,
Scientific, Diplomatic, Expansionist; jeder Anführer hat zwei davon. Stellaris hat Ethiken als Gegensatzpaare –
Militarist/Pacifist, Authoritarian/Egalitarian, Xenophobe/Xenophile, Materialist/Spiritualist – und Regierungsformen
(Democratic, Oligarchic, Dictatorial, Imperial, Corporate).

⟦Vorschlag: Zwei Sorten, wie bei den Personen. Was ein Block *verfolgt* (nach Civ VII, ein Wort, mehrere möglich)
und wie er *regiert und denkt* (nach Stellaris, Gegensatzpaare, nie beides). Dazu eigene Paare für die Erde von
heute, die keines der beiden Spiele hat. Liste offen.⟧

**Was der Block verfolgt (Civ VII):** Militaristisch · Ökonomisch · Kulturell · Wissenschaftlich · Diplomatisch ·
Expansionistisch

**Wie er regiert und denkt (Stellaris-Paare):** Autoritär – Freiheitlich · Abgeschottet – Offen (Xenophob –
Xenophil) · Säkular – Religiös (Materialist – Spiritualist)
*(Militarist – Pazifist entfällt, weil „Militaristisch“ oben schon steht.)*

**Eigene Paare für das 21. Jahrhundert:** Zentralistisch – Föderal · Protektionistisch – Freihändlerisch ·
Jung – Alternd (Demografie) · Rohstoffexporteur – Rohstoffabhängig

**Vom Betreiber hinzugefügt (23:00):** Isolationistisch · (Traditionell – zurückgezogen 23:02, siehe Entscheidungen)
⟦Vorschlag: „Isolationistisch – Offen“ ersetzt das Stellaris-Paar „Abgeschottet – Offen“ (gleiche Sache, sein Wort).⟧

**Gesucht (23:02):** ein Wort für „tief verwurzelte Kultur, die die Identität trägt, aber nicht das Gegenteil von
progressiv ist“. Vorschlag „Verwurzelt“ (Alternativen Geschichtsbewusst, Kulturgeprägt) verworfen; Entscheidung
23:03: **Kulturell** (aus Civ VII).

⟦Vorschlag für Startwerte der fünf Blöcke, je 2–3, als Ausgangspunkt für die erste Partie; sie beschreiben das
Spiel-Umfeld, nicht ein Urteil, und Ereignisse ändern sie. Stand nach den drei Änderungen des Betreibers (23:00):⟧
- USA: Militaristisch · Ökonomisch
- Europa: Diplomatisch · Föderal · Kulturell (Betreiber, 23:03)
- Russland: Militaristisch · Autoritär · Rohstoffexporteur
- China: Ökonomisch · Autoritär · Isolationistisch
- Indien: Jung · Wissenschaftlich · Föderal
(Erste Fassung 22:56, ersetzt: USA mit Freiheitlich; Europa mit Alternd; China mit Expansionistisch. Zweite Fassung
23:00 mit Europa „Traditionell“, zurückgezogen 23:02.)

⟦Vorschlag: Weil ein Block zerfallen oder wachsen kann, ist er selbst eine Karte – mit Unique-ID, Eigenschaften,
den vier Werten, und ein Zerfalls-Ereignis legt zwei neue Block-Karten und kennzeichnet die alte als zerfallen
(nichts wird gelöscht). Dann sind wirklich alle Dinge im Spiel Karten.⟧

## Prototype 1 – what the first playable version contains (decided 05.11.2026, 17:46: "I'll follow your lead")

The smallest version that answers one question: is drawing a card fun? Everything not listed here is deliberately
out, not forgotten – it comes with Prototype 2 or later.

**In:**
- One character, chosen from three pre-made character cards (profession, 2–3 traits, skills, power block, age).
- Three associates, two contacts – fixed at start; one event in the twelve months may turn an associate into a
  contact (decided 15:54).
- One power block as the player's own: its three political traits and the four values (economic, military,
  cultural, technological) as numbers 1–10. The other four blocks exist only as names and traits on cards.
- One story-line: "Der letzte Boom" (story-lines.md, draft 7) – the world as it is, no aliens, no Mars, no war.
  Plus the "Persönliches" stack for small cards.
- Twelve game months, five cards each, by the monthly rule (04.11.): kind of card random; once a month two draws
  may be spent to choose the kind, leaving four cards that month. The month ends when the player says so.
- Card kinds in play: event (global or personal), person, possession. Each event card: front = picture, title, impact
  1–5, reach, options with their origin and cost; back = what happens, why you see each option, what each option
  does (beispielkarte.md is the template).
- Options appear only when the skill, possession, block state or resource is there, and name where it comes from;
  "wait" is always there and never free.
- Resources: money, influence, status (in the own block) – three numbers.
- Opinion: one word on the back of each person card toward the player (likes / neutral / distrusts / despises),
  computed from the table in "Personen" with first values; no history component yet.
- Traits can change through events (at least one card in the twelve months does this).
- The game state is a log that is only appended to: each drawn card and each choice, one game = one file.
- All cards written by hand before anyone plays – by Spiel_1, in English: 60 event cards, 10 persons,
  6 possessions, 3 characters – done 05.11., nowhere/karten/; second batch the same evening (143 cards, 5
  characters). The AI author comes with Prototype 2.
- Where it runs and what it is built with: Spiel_2 with the Betreiber (technik/technik.md).

**Out (for now):** the author-AI · technology cards · the leader event · the album and occurrence counter · the
successor and the age clock · win-condition cards · environment states as a system (the Boom is written into the
cards directly) · war and Thirds · the other four blocks as players · pollution · achievements · the tutorial ·
artwork beyond a placeholder (one picture per card is wanted, but a generated or stock placeholder is fine).

**What we want to learn from it:** whether five cards make a month feel like a month; whether the option origins
on the front are enough to play without the back; whether impact 1–5 reads right; whether three associates are
too few or too many; whether twelve months of one story-line carry a story at all.

## Prototype 1 – first playthrough (05.11.2026, Mara Lindqvist; log replayed by Spiel_1 through engine.js)

**Numbers.** 55 draws in 26 minutes: 47 events, 5 persons (all taken as contacts – the team was full), 3
possessions. Median 15 s per card; longest 136 s (the-sunday-flight – the Betreiber was checking the TV, 21:24; the
Spain option was wrong anyway: Spain does not exist in this story-line); fastest 4–9 s on cards that offered only one option. 12 of 47 events offered
only one option, 9 of them only "wait". Money 6 → 0 (month 7) → 9 → 0 (Crash Tuesday, month 12) → 4. Influence
3 → 16, spent only on keeping contacts. Status in Europe 4 → 6. Europe: economic 7 → 5, cultural 8 → 5,
technological 6 → 7. Mara ended with 10 traits, among them loyal and opportunistic together.

**What told a story.** Two threads held across months through flags: the lobbyist's money → testifying against
the levy → voting with that side; and "let Yusuf decide" → backing Yusuf → closing the factory for a day in
solidarity → inviting the ninety to the estate. Together they made a character the cards did not plan: a
businesswoman who protects her own people and fights the tax that would protect everyone else's.

**What did not.**
1. Order: aftermath cards (what does a human still do, Europe votes, basic something, the retraining programme)
   came before the crash; the crash came in the last month; the closing card (what-remains) never came.
2. Wait-only cards: options were written for three different characters; for Mara one card in five had nothing
   to choose.
3. Mara's factory is not on her character card (format has no field) – the factory cards ran on flags alone.
4. The team never changed: three associates all year, every new person became a contact, and contacts open no
   options.
5. Traits only accumulate (concept: 2–3 per person); influence grows with nothing to buy.
6. Card bugs, fixed 05.11. evening: three cards could never be drawn (they scheduled themselves); "Fly to Spain";
   the inheritance and the old friend could hand over something already owned or known (new stack `given`).

**Proposals from it (decided 21:38 – see Entscheidungen; P4 and P5 with his conditions):**
- P1 Phases. A card can say from which month it may come; the crash is a fixed beat around month 9; aftermath
  cards need the crash; what-remains closes month 12. Needs one engine addition (a month condition) from Spiel_2.
- P2 A real choice on every card for every character: besides the free "wait", one option every character sees,
  with a price (money, influence or status). Removes wait-only cards at the source; Spiel_2's T4 (skip such cards)
  stays as a safety net.
- P3 Contacts open options too, weaker or costlier than associates (origin `contact:<profession>`, engine).
- P4 At most three character traits; a new one pushes the oldest out – the character changes instead of piling up.
- P5 Influence gets uses: more options cost influence (calling in favours, getting into rooms).
Open from the five questions of Prototype 1: whether a month feels like a month, whether the front is enough,
whether impact reads right – only the Betreiber can say.

## Prototype 1 – second playthrough (05.11.2026, Tomas Reyes; log replayed by Spiel_1 through engine.js)

Played 22:20–22:41 with the second batch and P2 live. 60 draws: 44 events, 16 persons and possessions (10 taken,
6 passed). 20 of 60 cards (33 %) had come up in the first game.

**Better:** no event offered only "wait" (P2 works); every event had 2–4 visible options. The arc happened by luck:
Crash Tuesday in month 8, the retraining programme in month 11, what-remains as the first card of month 12.
**Still wrong:**
1. Order (P1, waiting for the engine): the bubble question, the new foreman and the call centre came after the crash.
2. Everything rises late: status 3 → 11, Europe's culture 8 → 10 (max), technology 6 → 8; money 1 at the end but
   never a crisis. Status gates stop mattering above 7.
3. Traits pile up again (11, among them honest and cynical) – P4, waiting for the engine.
4. Eight contacts, none of them doing anything – P3, waiting for the engine.
5. A quarter of the draws were bare person or possession cards, six of them passed – a draw that produced nothing.
⟦Vorschlag: persons come mostly through events that introduce them (the old friend, the junior, the stranger on the
train) – lower the share of bare person cards, or let the card say who this person is to you.⟧

## Prototype 1 – third playthrough (06.11.2026, 00:12–00:25, Samir Haddad; replayed by Spiel_1)

Played on the cards of 05.11., 21:40 – not the phase cards deployed at 00:10: replayed with the current cards the
first card of month 9 would have been Crash Tuesday; the app was most likely open from before the deploy and keeps
the cards it loaded. So: no crash, no ending, a quiet year. 57 draws in 13 minutes (median 8 s per card, faster
than before); 42 of 57 cards (73 %) had come up in the first two games – the deck is wearing thin by the third year.
Status rose to 12, Europe's culture and technology to 10 – everything still rises late.
Card bug found: options checking `associate:doctor` said "Ask Ines…", but Samir's doctor is Meera – 27 cards made
generic the same night (README rule).
⟦Vorschlag: variety is the next problem, not mechanics – either a second story-line (the concept has many:
global warming, the oil age ending, the AI scenarios, the Signal) or the author-AI of Prototype 2.⟧

## Prototype 1 – fourth playthrough (06.11.2026, 19:09–19:20, Elena Rossi; replayed by Spiel_1)

First year on the phase cards: Crash Tuesday opened month 9, what-remains opened month 12, and the factory thread
held (sold in month 5 → town meeting in month 8). 60 draws in 11 minutes (median 6 s per card); 52 of 60 cards
(87 %) had come up in the three earlier games. Status 6 → 19, influence up to 14, money never below 0 after month 2
– no pressure from the middle of the year on. The levy vote, scheduled by the debate in month 9, never came: its
window ran past the year. Fixed the same evening (windows ≤ 3 months, thread starters until month 9); 500 simulated
years: lost follow-ups 291 → 71, the rest are cards whose own condition was not met.
Open: status runs away (median 8, up to 18 in simulation; the highest gate is 7) – needs the Betreiber's word.
Open: variety – 87 % repeats in year four.

## Die KI als Autor (Betreiber, 05.11.2026, 13:25 – „eine Idee“)

- Der Spieler spielt; im Hintergrund variiert die KI als Autor den Handlungsstrang.
- Durch das Spielen entsteht ein Repository, aus dem sie sich bedient; zugleich entstehen neue Ideen.
- Die KI hat einige Züge/Karten im Voraus verschiedene Entwicklungen im Angebot.
- Intern mehrere Stapel: Krieg in China, Olympiade, Stargate-Szenario, Persönliches, Flug zum Mond usw.
- Folge-Effekte sind Pflicht: Mars-Landung ja/nein, Buch veröffentlicht ja/nein führen zu anderen Dingen danach.
  Beispiel: Autor mit Eiferer als Associate veröffentlicht ein kontroverses Buch → der Eiferer verlässt ihn, wird
  vielleicht Gegenspieler.
⟦Deutung: Das Repository ist das, was Regeln_1 am 03.11. als Spielstand-Log vorschlug – nur gedacht als Vorrat des
Autors über viele Partien, nicht nur als Protokoll einer Partie. Die Stapel sind Handlungsstränge; eine Partie hat
mehrere zugleich offen, und „im Voraus im Angebot“ heißt: Der Autor schreibt je Stapel die nächsten Karten vor, bevor
sie gezogen werden, und verwirft, was durch eine Wahl unmöglich wird.⟧
⟦Vorschlag: Jede Wahl auf einer Karte nennt, welche Stapel sie öffnet oder schließt. Das ist die kleinste Form von
„Folge-Effekt“, die ein Programm prüfen kann; der Autor schreibt dann in die geöffneten Stapel weiter.⟧

## Umgebungs-Zustände (Betreiber, 05.11.2026, 13:38)

Etwas, das über einen längeren Zeitraum persistiert und Events triggert – ähnlich den Events in Stellaris. Beispiele
des Betreibers: Boom, Krieg, Seuchen, ein Flug zum Mars (auch wenn der Spieler nicht teilnimmt), Naturkatastrophen und
ihre Folgen.
⟦Deutung: Das ist die dritte Quelle von Eigenschaften, die ein Ereignis prüft – neben Karten des Spielers (Fertigkeit,
Besitz) und Machtblock (Politik, Krieg). Ein Zustand hat Anfang, Dauer und Ende, liegt auf der Welt oder auf einem
Block, und sein Stapel (13:25) liefert die Ereignisse, solange er gilt. „Krieg“ steht damit an zwei Stellen: als
Zustand zwischen Akteuren (04.11.) und als Umgebungs-Zustand – dieselbe Sache, einmal von außen, einmal als Trigger.⟧

## Story-tragende Elemente – Übersicht (angelegt 05.11.2026 auf Bitte des Betreibers; nur Verweise, Quelle sind die Abschnitte)

**Start-Events** (04.11., nicht fix, Kreativität gefragt): Borg als Invasoren · Atomkrieg · ein Predator · Asteroid
droht einzuschlagen · technologischer Durchbruch, anderer Stern kolonisierbar · „oder oder oder“.

**Stapel / Handlungsstränge** (05.11., 13:25): Krieg in China · Olympiade · Stargate-Szenario · Persönliches · Flug
zum Mond · „usw.“

**Umgebungs-Zustände** (05.11., 13:38): Boom · Krieg · Seuchen · Flug zum Mars ohne den Spieler · Naturkatastrophen
und ihre Folgen.

**Ereignisse am Machtblock** (04.11.): Zerfall oder Wachstum eines Blocks · Krieg bricht aus (Offizier: Desertieren /
Freiwillig an die Front) · Sportwettbewerb (Athlet → kulturelle Entwicklung) · Power block gets a new leader (05.11.,
16:49): you, an associate or a contact, if qualified – or an existing person, or a new card; a Patriotic leader
develops the block differently from a Globalist one, same for other traits.

**Beispiele für Wahl und Folge-Effekt** (05.11., 13:25): Mars-Landung ja/nein · Autor veröffentlicht kontroverses Buch
→ Eiferer verlässt ihn, wird Gegenspieler.

**Ende** (04.11.): keine End-Game-Crisis wie in Stellaris – „vielleicht gibt es dich doch“.

**Main-Story-Lines** (Entwürfe der Rolle, 05.11.): nowhere/story-lines.md – sieben Stränge, keiner entschieden.

**Scenarios / events** (Betreiber, 05.11., 16:35): Massive global warming · Middle East oil crisis · Peak oil and end
of the oil age · Nuclear power plant failure.

**AI scenarios** (Betreiber, 05.11., 17:32; his references in quotes): AI and robots take over ("Terminator") · AI
triggers a positive world ("Pantopia") · AI takes over but cares for humans ("Das Erwachen", Elsberg).
⟦Interpretation: one start event, three outcomes – which one a game gets is decided by cards along the way, not at
the start; the AI could itself be a Third (04.11.) with its own opinion of each block and person. Story-line 7
("Der letzte Boom") is the quiet beginning of all three.⟧

**Personal events** (Betreiber, 05.11., 16:35, 17:40): great holiday · learn a new language · marriage · become
pregnant / parent · successful investment · heir to something / relative dying (no need that he was in the game
before) · join a TV show · successful influencer · see a shooting star · enlightenment · tempting offer. ⟦Interpretation: these are the "small cards" of a month (tone, 14:37) – impact 1–2; some give
a skill (Languages), a person (spouse, child) or a trait.⟧ A child born in the game grows up (Betreiber, 16:42) –
and can be a successor later. Children can also have been born before the game started; relatives can appear
without a history (16:40/16:42).

## Umwelt (Betreiber, 05.11.2026, 13:25)

Gegenspieler könnte eine neue Kategorie in der Umwelt sein – neben Associates und Kontakten eine Person, die gegen
den Spieler arbeitet; sie kann aus dem eigenen Team kommen (der Eiferer nach dem Buch).

## Die Karte – Vorderseite visuell, Rückseite Text (Betreiber, 05.11.2026, 13:25)

Weniger Text, zumindest vordergründig; im ersten Moment visuell. Karten können zweite Seiten haben, die mehr Text
enthalten. Referenz für die Story-Qualität: Suzerain (Torpor Games) – gelesen 05.11. in einer Rezension: Spiel auf
einer Karte, Ereignis für Ereignis in Dialogform, textlastig wie ein Roman, Hintergrund in Archiven nachlesbar;
Entscheidungen prägen Persönlichkeit und Politik und verändern das Spiel stark. ⟦Deutung: Das Archiv in Suzerain
ist die zweite Seite – Nowhere trennt das von Anfang an: Bild und Wahl vorn, Geschichte hinten.⟧

## Spieler und Einstieg (Betreiber, 05.11.2026, 14:45)

Der Betreiber ist der Spieler. Ein einfacher Einstieg soll möglich sein; er probiert es aus, ein kurzes Tutorial
kommt in einem späteren Schritt. Die Visualität soll eine Verbindung aufbauen. SciFi-Standard-Szenarien (Stargates,
Roboter, Cyborgs) dürfen vorkommen – sie sind überall; Nowhere macht daraus nichts Fremdes.

## Technologien (Betreiber, 05.11.2026, 14:45)

- Die Umgebung – Machtblöcke und die Welt – kennt bestimmte Technologien.
- Kein vorab gedachter Tech-Tree. Er entsteht kreativ und beeinflusst Events.
- Technologische Entwicklung kommt nur durch Karten; sie kann schneller oder langsamer gehen (vgl. Start-Event
  „technologischer Durchbruch“, 04.11.).
- Vielleicht geht es, soweit die Kreativität der KI reicht, immer weiter.
Entschieden (Betreiber, 14:49): Technologie ist eine Kartenart der Umgebung – eine Karte „Fusionsantrieb“ liegt bei
einem Block oder bei der Welt, und Ereignisse prüfen sie wie eine Fertigkeit: ohne sie keine Option „Flug zum Mars“.
Der Tech-Tree ist nichts als die Liste der Technologie-Karten, die eine Partie gezogen hat.
Weitere Ideen des Betreibers (14:45): Win-Condition „Gründung der Sternenflotte“; Achievements.

## Ton (Betreiber, 05.11.2026, 14:37 – „Ich folge Deiner Empfehlung“)

Beides, Bedrohung und Leichtigkeit; das Verhältnis legt der Charakter fest, nicht der Autor. Charakterzüge färben
Formulierung und kleine Ereignisse (Zynisch liest dieselbe Welt anders als Neugierig). Die großen Stränge dürfen
ernst sein; die kleinen Karten dazwischen – Persönliches, Kontakte, Besitz – sollen etwa zur Hälfte einfach Freude
machen.
- Charakterzüge ändern sich durch Ereignisse, auch durch Altersevents: Zynisch kann verloren gehen, Weise dazukommen
  (Betreiber, 14:37). ⟦Deutung: Das Alter des Charakters (14:04) ist damit nicht nur Uhr für den Nachfolger, sondern
  Quelle eigener Ereignisse – ein Stapel „Alter“ neben „Persönliches“.⟧

## Das Album – Karten über Partien hinweg (Betreiber, 05.11.2026, 14:18)

- Was über Partien bleibt, ist ein Album: Eine Karte, die man besessen hat, wird in der nächsten Partie wiedererkannt
  (gleiches Artwork, gleiche Funktion und Eigenschaften möglich – 04.11.), aber mit neuer Unique-ID und neuer
  Geschichte. Kein Startkapital, keine Unlocks (entschieden).
- Idee: ein Occurrence Counter je Karte – wie oft man ihr begegnet ist; vielleicht wertet sie sich dadurch optisch
  auf. Nicht für die erste Partie nötig.
⟦Deutung: Der Counter hängt am Artwork (dem, was bleibt), nicht an der ID (dem, was je Partie neu ist).⟧

## Personen (Betreiber, 05.11.2026, 16:14)

- Personen-Karten bleiben im Spiel, auch wenn man sie nicht als Associate oder Kontakt nimmt (entschieden).
- Personen haben untereinander eine Opinion zueinander (entschieden).
- No accounting of people (Betreiber, 05.11., 16:40/16:42): a child born in the game grows up; but children can have
  been born before the game started, and relatives can appear without a history. Example (16:45): a 50-year-old
  successor upon death; his son just appears in an event, without having been born in the game.
⟦Deutung: Die Welt einer Partie ist damit bevölkert – wer abgelehnt wurde, lebt weiter, steigt vielleicht in seinem
Block auf oder wird Gegenspieler. Opinion ist je Paar ein Wert, nicht nur zum Spieler; der Eiferer, der den Autor
verlässt (05.11., 13:25), tut das, weil seine Opinion zu ihm gekippt ist – und wer ihn dann aufnimmt, hat jemanden im
Team, dessen Opinion zum Spieler negativ ist. Der Autor kann daraus Ereignisse schreiben, ohne dass der Spieler
etwas getan hat.⟧
⟦Vorschlag: Opinion nicht als Zahl vorn auf der Karte, sondern als ein Wort auf der Rückseite der Person – „mag“,
„misstraut“, „verachtet“ – je Person, zu der eine Beziehung besteht; die Zahl bleibt im Spielstand.⟧

### Opinion – Mechanismus nach CK3 (Betreiber, 16:23; Tabelle ⟦Vorschlag⟧ Spiel_1)

Gelesen 05.11. (Trait-Übersicht zu CK3, nicht das Spiel; die Quelle ist stellenweise verrutscht, Zahlen daraus
„unsicher“): CK3 setzt Opinion A→B aus Summanden zusammen, die an den Eigenschaften *beider* hängen – darum ist sie
gerichtet. Vier Sorten von Summanden:
1. **Gleicher Zug** – A und B teilen einen Charakterzug (CK3: Ehrgeizig +50 unsicher, Gesellig +20, Zynisch +10;
   manche Züge mögen sich selbst nicht: Ehrlich −10).
2. **Gegenzug** – B hat das Gegenteil von A (CK3: Eifernd sieht Zynisch −35, Zynisch sieht Eifernd −10 – dieselbe
   Beziehung, zwei Zahlen; Nachsichtig sieht Rachsüchtig +50 unsicher; Keusch sieht Lüstern −50).
3. **Allgemein** – B hat etwas, das alle sehen (CK3: Mörder −15, Sadistisch −10, Bauernführer −10, Albino −10).
4. **Gruppe** – gilt nur, wenn A zu einer Gruppe gehört (CK3: Vasall, Lehnsherr, Klerus, gleicher Glaube, Dynastie;
   Beispiel Demütig: Lehnsherr +10, Klerus −15).

Übertragen auf Nowhere – Opinion A→B = Summe aus:

| Sorte | Nowhere | erste Werte ⟦Vorschlag⟧ |
|---|---|---|
| Gleicher Zug | gleicher Charakterzug | +10 je gemeinsamem Zug; Ausnahme Misstrauisch: −10 (Misstrauische trauen einander nicht) |
| Gegenzug | B hat A's Gegenteil | −10 je Paar; verschärft: Gläubig→Zynisch −30, Zynisch→Gläubig −15 (Betreiber: „gegenseitig runter“, nach CK3 ungleich) |
| Allgemein | Erworbenes von B | Mörder −30 bei allen · Olympionike +15 · Berühmt +10 · Berüchtigt −10 · Verschuldet −5 |
| Gruppe: Block | A's Block hat eine Opinion zu B's Block | überträgt sich voll auf B (Betreiber); Krieg zwischen den Blöcken −30, Bündnis +10 |
| Gruppe: Beruf | gleicher Beruf | +5; Spion→Spion −10 |
| Dämpfer | A hat „Globalist“ | negative Block-Summanden halbiert (Betreiber: „reduziert“) |
| Geschichte | was zwischen A und B passiert ist | je Ereignis gesetzt, mit Verfall über Monate – das ist der Teil, den der Autor schreibt |

„Globalist“ ist damit ein Charakterzug der offenen Liste (⟦Vorschlag: Paar Globalist – Patriot⟧).
Sichtbar wird nur das Wort (mag / neutral / misstraut / verachtet, Schwellen ⟦+20 / −20 / −50⟧); die Summe bleibt im
Spielstand, die Summanden auf der Rückseite, wenn man sie aufklappt.

## Ressourcen (Betreiber, 05.11.2026, 15:54)

Von Anfang an, neben Geld (04.11., Engpass):
- **Einfluss (Influence):** gewonnen durch Ereignisse, vielleicht auch durch Besitz oder Eigenschaften als passives
  Einkommen. Einsatz: Kontakte rekrutieren, Optionen in Ereignissen. Geld ebenso.
- **Status je Machtblock:** Ist er hoch genug, kann man ggf. den Machtblock wechseln; hoher Status eröffnet Optionen.
- Einige Kontakte und Associates erhält man ohne Ressourcen – durch Ereignisse wie „Du triffst einen alten Freund“,
  „Deine Tochter wird erwachsen“, „Junior-Kollege sucht einen Mentor“.
⟦Deutung: Damit prüft eine Option vier Dinge – Fertigkeit/Umstand (ob sie erscheint), Geld, Einfluss, Status (ob man
sie sich leisten kann). Status ist je Block ein Wert, Einfluss und Geld sind global. Das Beispiel „Arjun in die
Task-Force“ kostete nichts; eine Option „Selbst in die Task-Force“ für die Journalistin würde Status Indien
brauchen, den sie nicht hat.⟧
⟦Vorschlag: Vorn auf der Karte steht an einer Option, was sie kostet, in derselben Zeile wie die Herkunft:
„▸ Hinfahren. Europa · −Geld“. Mehr Zahlen gehören nicht nach vorn.⟧

## Die Ereignis-Karte (Betreiber, 05.11.2026, 15:05)

- **Optionen:** Eine Option wird nur eingeblendet, wenn die Fertigkeit oder der Umstand da ist – und sie nennt, woher
  die Eigenschaft kommt (entschieden). Ohne passenden Trait vielleicht nur eine Standard-Option; der Autor sollte das
  nicht zu oft spielen.
- **Größe einer Wahl:** „Die halbe Welt umwerfen“ ist nicht ausgeschlossen; Plausibilität ist wichtig; nur ein Wert
  ist definitiv zu wenig (entschieden). Idee: Impact-Indicator als Power-Zahl – 1 „Du feierst Geburtstag und
  bekommst ein Geschenk“, 5 „ein großes Erdbeben“, vielleicht noch größer.
- **Karten je Monat:** Idee: ein globales Ereignis je Monat (muss nicht dramatisch sein, eher im Gegenteil), die
  anderen Karten mit lokalem, persönlichem oder anderem Bezug; hängt von der Umgebung ab; bei zwei aktiven
  Handlungssträngen können auch zwei Ereignis-Karten kommen, müssen aber nicht.
- **Aufträge:** Ereignisse können Aufträge sein, die gezielt auf Eigenschaften des Charakters oder der Associates
  zielen (Spion bietet sich an).
- **Globale/lokale Ereignisse mit Handlungsoption:** „Ufo landet in Spanien“ – als Europäer kann ich den Ort
  besuchen; als Spion aus Indien kann ich einer Task-Force beitreten, aber den Ort vielleicht nicht direkt besuchen.
  Ausgeschrieben als Beispiel in nowhere/beispielkarte.md (Entwurf der Rolle).

## Die Partie – Anfang, Ende, Nachfolge, Win-Condition (Betreiber, 05.11.2026, 14:04)

- Der Charakter hat ein Alter. Der Spieler kann aus den Associates einen Nachfolger auswählen (entschieden).
- Jeder Charakter persistiert seine Geschichte (entschieden) – ⟦Deutung: auch der Nachfolger beginnt mit dem Log
  seines Vorgängers als Vergangenheit; die Partie ist dann eine Kette von Charakter-Geschichten.⟧
- Ende: vielleicht ein festes Jahr (2100, 2200); daraus die Zahl der Züge. Einstellbar; je nach Kreativität der KI
  auch unbegrenzt.
- Win-Condition: kann aus einem Ereignis kommen – „Besiegt die Invasoren“, „20 Jahre Frieden auf der Erde“, „Ein
  neuer Machtblock außerhalb der Erde soll existieren“ – und kann sich ändern, wenn der Spieler keine Chance mehr hat
  (für Frieden muss man vielleicht Politiker sein; ist man es nicht mehr, ändert sich das Spiel).
⟦Befund zur Rechnung: Start heute, Endjahr 2100 sind rund 74 Jahre = etwa 890 Spiel-Monate; mit 5 Karten je Monat
rund 4.400 Karten je Partie. Ein Charakter, der heute 35 ist, erlebt 2100 nicht – der Nachfolger ist also nicht
Komfort, sondern Pflicht, und eine Partie hat zwei bis drei Charaktere. Bei 2200 vier bis sechs.⟧
Entschieden (Betreiber, 14:14): Die Win-Condition ist eine Karte wie jede andere – gezogen vom Start-Event oder vom
Autor, mit Voraussetzungen (z. B. Beruf Politiker) und Verfallsregel; verfällt sie, zieht der Autor eine neue.
- Aufstieg (Betreiber, 14:14): Der Charakter kann im Machtblock bis an die Spitze aufsteigen. Das ändert das Spiel
  nicht – es gibt weiter Karten mit Ereignissen; er sieht oben andere Optionen, lenkt den Block aber nie direkt.

## Der Zug (Betreiber, 04.11.2026, 22:53 – erste Idee, nicht entschieden)

Wortlaut oben. Zwei Aussagen nebeneinander:
- Single Player: so viele Karten spielen, wie man möchte.
- Erste Idee: je Spiel-Monat 5 Karten ziehen/spielen, Art der Karte zufällig; einmal im Monat zwei Züge investieren,
  um die Art einer Karte zu bestimmen – dann nur vier Karten in dem Monat.
Kleine Entscheidungen (Betreiber im Technik-Chat, 13:48, über post/spiel/004): Neben der Ereignis-Karte liegen alle
anderen Karten (Charakter, Associates, Kontakte, Assets, Umgebung) als Fächer; auch dort kann man „vielleicht“ kleine
Entscheidungen treffen, die die nächste oder sogar die aktuelle Karte beeinflussen.
⟦Vorschlag: Die Monatsregel (5 Züge, Art-Wahl kostet einen) auch im Single Player nehmen, weil erst die Knappheit
die Entscheidung erzwingt – und aus Entscheidungen soll die Geschichte entstehen (Kern, 04.11.). „So viele wie ich
möchte“ dann als Komfort: der Monat endet, wenn der Spieler es sagt, nicht nach einer Uhr.⟧

## Vorschläge, nicht entschieden

### Eigenschaften von Personen – Fassung 2 (Spiel_1, 04.11.2026, 22:43; ersetzt Fassung 1 unten; nicht entschieden)

Zusätzlich gelesen (04.11., über Übersichtsseiten, nicht in den Spielen selbst): Stellaris-Entwicklertagebuch 322
(Veteranenklassen: Admiral, General, Kommissar, Stratege · Delegierter, Industrieller, Botschafter, Berater ·
Entdecker, Akademiker, Analyst, Statistiker), Victoria-3-Entwicklertagebuch 53 (Beispiel-Traits Cruel, Ambitious,
Pillager, Innovative, Opium Addict; Traits wirken auf Beliebtheit), Baldur's Gate 3 (18 Fertigkeiten; Hintergründe
wie Adliger, Krimineller, Soldat, Gelehrter geben je zwei Fertigkeiten).

⟦Vorschlag: Aus Baldur's Gate kommt die wichtigste Idee: Nicht der Beruf wird geprüft, sondern die Fertigkeit. Ein
Beruf ist nur ein Name plus ein Bündel aus zwei bis drei Fertigkeiten. Dann kann das Spiel beliebig neue Berufe
erfinden (offene Liste, wie vom Betreiber gewünscht), während die Ereignisse weiter gegen eine kleine, stabile Liste
von Fertigkeiten prüfen. Ein erfundener Beruf „Drohnenpilotin“ = Technik + Wahrnehmung ist sofort spielbar, ohne dass
ein einziges Ereignis angefasst werden muss.⟧

**Schicht 1 – Fertigkeiten (was die Person gut kann).** Kleine Liste, selten erweitert, weil Ereignisse dagegen
prüfen. Frei nach den 18 aus Baldur's Gate, auf die Erde von heute übertragen (Arkanes → Technik) und um zwei
ergänzt, die das Spiel braucht (Finanzen, weil Geld Engpass ist; Sprachen, weil es fünf Machtblöcke gibt):
- Überreden · Täuschen · Einschüchtern · Menschenkenntnis · Auftreten (Performance) · Sprachen *(neu)*
- Schleichen · Fingerfertigkeit · Athletik · Überleben · Wahrnehmung
- Technik · Medizin · Wissenschaft (Nature/Arcana) · Geschichte · Nachforschen (Investigation) · Religion ·
  Finanzen *(neu)*

**Schicht 2 – Beruf (Name + Fertigkeiten-Bündel).** Offene Liste; das Spiel erfindet weitere. Ein Beruf je Person,
selten zwei. Erste Gruppe – aus der Liste des Betreibers, aus den Paradox-Veteranenklassen, und eigene Erfindungen
(kursiv), damit nicht kopiert wird:
- Aus der Liste des Betreibers: Geschäftsmann/-frau (Merchant) · Diplomat · Offizier · Kommandant · Soldat · Pilot ·
  Wissenschaftler · Arzt · Spion · Schmuggler · Pirat · Kopfgeldjäger · Attentäter · Entdecker · Sammler (Scavenger) ·
  Eiferer (Zealot) · Klingenmeister · nach Start-Event: Xeno-Jäger, Exo-Scout
- *Eigene, für die Erde von heute:* Journalist · Hacker · Ingenieur · Anwalt · Lobbyist · Geistlicher · Künstler ·
  Astronaut · Logistiker · Landwirt
- ⟦Vorschlag aus Stellaris: Ein Beruf kann sich steigern, wenn die Geschichte es hergibt – Offizier → General oder
  Admiral, Wissenschaftler → Akademiker oder Analyst, Diplomat → Botschafter. Die gesteigerte Stufe ist ein neuer
  Beruf mit einer Fertigkeit mehr.⟧

**Schicht 3 – Charakterzüge (wie die Person handelt).** Zwei bis drei je Person aus Gegensatzpaaren. Sie färben die
Reaktion eines Ereignisses und können sich ändern. Offene Liste; erste Gruppe – zehn Paare frei nach CK3, eins nach
Victoria 3, drei eigene (kursiv):
- Mutig – Feige · Ehrlich – Verschlagen (das „Schlitzohr“) · Gesellig – Scheu (das „Charismatisch“) · Ehrgeizig –
  Genügsam · Großzügig – Gierig · Geduldig – Ungeduldig · Vertrauensvoll – Misstrauisch · Gerecht – Willkürlich ·
  Gläubig – Zynisch · Ruhig – Jähzornig
- Mitfühlend – Grausam (Victoria 3 „Cruel“)
- *Neugierig – Gleichgültig · Loyal – Opportunistisch · Erneuerer – Bewahrer*
- Weise (Betreiber, 05.11., 14:37, Beispiel für einen Charakterzug, der durch ein Altersevent dazukommt)

**Schicht 4 – Erworbenes (was der Person widerfahren ist).** Keine Liste; schreiben die Ereignisse. Beispiele für
die Art: Vernarbt, Gesucht, Berühmt, Berüchtigt, Verwundet, Süchtig (Victoria 3 „Opium Addict“), Verschuldet.
⟦Vorschlag: Erworbenes ist der einzige Ort, an dem eine Karte ihre eigene Geschichte trägt – darum keine Vorab-Liste.⟧

Nicht Eigenschaft, sondern eigenes Feld jeder Person: der Machtblock (Betreiber, 04.11., 22:28).

Offen dabei: die Sprache der Kartentexte – Empfehlung: Deutsch.

### Eigenschaften von Personen – Fassung 1 (Spiel_1, 04.11.2026, 22:38; ersetzt durch Fassung 2)

Quellen: die Liste des Betreibers (Star Traders: Frontiers, Trese Brothers) und die Trait-Kategorien von Crusader
Kings III (Persönlichkeit als Gegensatzpaare, Bildung, Lebensstil, Körper, Gesundheit – gelesen 04.11. in einer
Trait-Übersicht, nicht im Spiel selbst).

⟦Vorschlag: Drei Schichten, weil die Beispiele des Betreibers schon zwei davon zeigen – „Geschäftsmann“ ist ein
Beruf, „Schlitzohr“ und „Charismatisch“ sind Charakterzüge.⟧

**Schicht 1 – Beruf (was die Person kann).** Ein Beruf je Person, selten zwei. Er öffnet Optionen in Ereignissen
(ohne Arzt keine Option „selbst behandeln“) und gibt Besitz einen Nutzen (Raumschiff braucht Kapitän). Erste Gruppe,
aus der Liste des Betreibers auf die heutige Erde übertragen, deutsch mit dem Original in Klammern:
- Geschäftsmann/-frau (Merchant) · Diplomat · Offizier (Military Officer) · Kommandant (Commander) · Soldat (Shock
  Trooper) · Pilot (Wing Commando) · Wissenschaftler (Scientist) · Arzt (Doctor) · Spion (Spy) · Schmuggler ·
  Pirat · Kopfgeldjäger (Bounty Hunter) · Attentäter (Assassin) · Entdecker (Explorer) · Sammler (Scavenger) ·
  Eiferer (Zealot) · Klingenmeister (Blade Master)
- Erst nach einem passenden Start-Event möglich: Xeno-Jäger (Xeno Hunter), Exo-Scout.
⟦Vorschlag: Beide bleiben in der Liste, damit der Kartenvorrat sie kennt; ein Ereignis schaltet sie frei.⟧

**Schicht 2 – Charakterzüge (wie die Person handelt).** Zwei bis drei je Person, immer aus Gegensatzpaaren, damit
nie beides zugleich gilt. Sie färben, wie ein Ereignis auf die Person reagiert, und können sich ändern (Betreiber,
04.11.). Erste Gruppe, frei nach CK3, zehn Paare:
- Mutig – Feige · Ehrlich – Verschlagen (das „Schlitzohr“) · Gesellig – Scheu (das „Charismatisch“ liegt hier) ·
  Ehrgeizig – Genügsam · Großzügig – Gierig · Geduldig – Ungeduldig · Vertrauensvoll – Misstrauisch ·
  Gerecht – Willkürlich · Gläubig – Zynisch · Ruhig – Jähzornig

**Schicht 3 – Erworbenes (was der Person widerfahren ist).** Keine Liste jetzt. ⟦Vorschlag: Diese Eigenschaften
schreiben die Ereignisse selbst – „Vernarbt“, „Gesucht“, „Berühmt“, „Verwundet“ entstehen in der Partie und gehören
zur Geschichte der Karte. Eine Liste vorab würde die Kreativität der Ereignisse einengen.⟧

Nicht Eigenschaft, sondern eigenes Feld jeder Person: der Machtblock (Betreiber, 04.11., 22:28).

Offen dabei: die Sprache der Kartentexte (die Liste des Betreibers ist englisch, seine Beispiele deutsch) –
Empfehlung: Deutsch, weil der Betreiber auf Deutsch über das Spiel spricht.

Von Regeln_1 (Gespräch am 03.11.2026, laut Startauftrag):
- ⟦Vorschlag: Spielstand als Log, an das nur angehängt wird (gezogene Karten und Entscheidungen); eine Partie ist ihre Datei.⟧
- ⟦Vorschlag: kleine Engine (Karte ziehen, wählen, Zustand ändern); Karten müssen nicht alle vorher existieren – eine KI
  könnte aus dem Spielstand das nächste Event schreiben, mit Prüfung im Code.⟧
- ⟦Vorschlag: früh klären, welche kleinste Einheit ein Mensch schreibt (z. B. Karte als Markdown mit Text,
  Voraussetzungen, Optionen, Wirkung).⟧
- ⟦Vorschlag: Konsequenzen, die erst Karten später zurückkommen.⟧

## Offene Punkte (Reihenfolge des Dialogs, mit Empfehlung)

1. Was am Spielen Freude machen soll – entschieden 04.11.: die Geschichte ist der Kern (siehe Entscheidungen).
2. Ein Zug von Anfang bis Ende – monthly rule decided for Prototype 1 (05.11., 17:46); see "Prototype 1".
3. Die Karte als Einheit.
4. Welt und Rollenspiel-Anteil.
5. Fortschritt und Ende einer Partie – Alter, Nachfolger, persistierte Geschichte entschieden (05.11.); Endjahr,
   Zugzahl, Win-Condition als Idee (Abschnitt „Die Partie“).
6. Wo und wie es läuft.
7. Was ein erster spielbarer Prototyp mindestens braucht – decided 05.11., 17:46: section "Prototype 1".
8. Name des Spiels – entschieden 05.11.: Nowhere; Ordner nowhere/ seit 05.11.
9. (04.11.) Eigenschaften von Personen – Fertigkeit/Beruf angenommen (22:53); offen: Charakterzüge, Erworbenes,
    Berufs-Steigerung aus Fassung 2.
12. (04.11.) Eigenschaften der Machtblöcke – Politik-Liste und Startwerte liegen vor, drei Werte vom Betreiber
    gesetzt, die übrigen nicht ausdrücklich freigegeben; offen: Form der vier Werte; ob ein Machtblock eine Karte ist.
13. (04.11.) Dritte – „sollten irgendwann eine Rolle spielen“; wann und wie, offen.
14. (05.11.) KI als Autor – Repository, Stapel, Vorrat im Voraus: Idee des Betreibers, Deutung und Vorschlag der
    Rolle liegen vor (Abschnitt „Die KI als Autor“).
15. (05.11.) Gegenspieler als Kategorie der Umwelt – „könnte“, nicht entschieden.
16. (05.11.) Die Karte: Vorderseite visuell, Rückseite Text – entschieden als Richtung; was genau vorn steht, offen.
24. (05.11.) Translate this file fully to English – "later" (Betreiber, 16:35).
26. (05.11.) Leader of a power block – who qualifies; does the block's politics drift toward the leader's traits?
25. (05.11.) Pollution as a power-block stat – idea; global or per block?
23. (05.11.) Opinion – Mechanismus nach CK3 entschieden (16:23); Tabelle mit ersten Werten liegt als Vorschlag vor;
    offen: Werte, Schwellen, Verfall der Geschichte-Summanden.
22. (05.11.) Ressourcen – Einfluss und Status entschieden; offen: passives Einkommen, Blockwechsel-Schwelle,
    Kosten vorn auf der Karte (Vorschlag).
21. (05.11.) Ereignis-Karte – Impact-Indicator, Standard-Option, Zahl der Ereignisse je Monat: Ideen, nicht
    entschieden; Beispiel-Karte liegt vor (nowhere/beispielkarte.md).
20. (05.11.) Technologien – Kartenart der Umgebung (entschieden 14:49); offen: Achievements; Tutorial später.
19. (05.11.) Occurrence Counter und optische Aufwertung – Idee, nicht für die erste Partie.
18. (05.11.) Kleine Entscheidungen auf Charakter-, Associate-, Kontakt-, Asset- und Umgebungs-Karten – was das ist
    und was es bewirkt (Betreiber im Technik-Chat, „vielleicht“).
17. (05.11.) Umgebungs-Zustände – Beispiele liegen vor; offen: Anfang/Dauer/Ende, Welt oder Block, Verhältnis zu
    den Stapeln (Deutung der Rolle im Abschnitt).
10. (04.11.) Arten von Besitz – Betreiber nennt Landsitz, Fabrik, Hospital, Flugplatz, kulturelle Dinge; noch nicht
    geordnet.
11. (04.11.) Sprache der Kartentexte – decided 05.11.: English (German is the first "foreign language").
