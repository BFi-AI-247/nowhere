---
id: the-neighbours-telescope
kind: event
title: The neighbour's telescope
picture:
stack: the-signal
thread: [the-sky-at-home]
part: continues
after: [{card: a-quiet-pattern, options: [0, 1]}]
wait: [6, 12]
who: self
place: home
takes: 0
costs: 0
expires: 3
requires: [month:4]
reach: personal
impact: 1
arrives: draw
options:
  - text: "Show him where the source is. He cannot see it. Nobody can."
    origin: always
    cost: {draws: 1}
    effects: [influence:+1, trait:+gregarious]
  - text: "Tell him the truth: it is a radio source. The telescope will show him Saturn."
    origin: always
    cost: {draws: 1}
    effects: [trait:+honest]
  - text: "Say you are busy."
    origin: always
    cost: {draws: 1}
    effects: [trait:+shy]
---
The man two doors down has bought a telescope and wants to see "it". He has set it up on the pavement. Half the
street is there.

- *Show him* – you point at a patch of nothing in the south. Everyone looks. It is a good evening.
- *The truth* – he is disappointed for a minute. Then Saturn.
- *Busy* – the street looks without you.
