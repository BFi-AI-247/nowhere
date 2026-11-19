---
id: the-lobbyist-calls
kind: event
title: The lobbyist calls
picture: the-lobbyist-calls.jpg
stack: the-last-boom
thread: [the-levy]
part: opens
who: anyone
requires: []
reach: block:europe
impact: 3
options:
  - text: "Take the meeting. Hear the number."
    origin: skill:persuasion
    cost: {draws: 1}
    effects: [money:+2, influence:-1, flag:levy-opposed]
  - text: "Take the meeting. Bring your politician friend."
    origin: associate:politician
    cost: {draws: 1}
    effects: [influence:+2, flag:minister-contact]
  - text: "Decline, and say so publicly."
    origin: trait:just
    cost: {draws: 1}
    effects: [influence:+1, status:europe:+1, flag:levy-supported, flag:burned-bridges]
  - text: "Wait."
    origin: always
    cost: {draws: 1}
    effects: []
  - text: "Take the meeting. Say nothing. Listen."
    origin: block:europe
    cost: {draws: 1}
    effects: [influence:+1, trait:+patient]
---
He represents four of the companies whose models are eating the continent, and he would like fifteen minutes of
your time about the levy. He is charming, well-briefed, and knows what you earn. The fifteen minutes come with a
consulting arrangement.

- *Hear the number* – it is a good number. People find out.
- *Bring your politician friend* – you are now the person who introduced the lobbyist to the committee chair. Useful. Remembered.
- *Decline publicly* – a small, clean, expensive thing to do.
- *Wait* – he calls someone else.
- *Listen* – you learn who else he has seen. He learns nothing about you.
