---
id: the-night-everyone-looks-up
kind: event
title: The night everyone looks up
picture:
stack: the-signal
thread: [the-sky-at-home]
part: continues
after: [{card: the-neighbours-telescope, options: [0, 1, 2]}]
wait: [6, 10]
who: self
place: home
takes: 0
costs: 0
expires: 3
requires: [month:6, until:8]
reach: personal
impact: 1
arrives: draw
options:
  - text: "Go out with everyone else. Lie on the grass."
    origin: always
    cost: {draws: 1}
    effects: [trait:+content, influence:+1]
  - text: "Stay in. Open the window. Listen to the street."
    origin: always
    cost: {draws: 1}
    effects: [trait:+calm]
---
The city has turned its lights off for an hour, by vote. There is nothing to see where the source is – you would
need a dish – but the whole street is on the grass anyway, and nobody is looking at a phone.

- *Lie on the grass* – a neighbour you have never spoken to says: "I did not know there were so many."
- *The window* – quiet, then a child laughing, then quiet.
