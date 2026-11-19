---
id: ninety-days-under
kind: event
title: Ninety days under
picture: ninety-days-under.jpg
stack: the-last-boom
thread: [far-away]
part: continues
after: [{card: doha-energy-week, options: [0, 1, 2]}]
wait: [6, 12]
place: the-submarine
who: profession:engineer
takes: 13
costs: 1
expires: 4
arrives: board
requires: []
reach: personal
impact: 3
options:
  - text: "Send your engineer. The navy pays well."
    origin: profession:engineer
    cost: {draws: 1}
    effects: [money:+3, influence:+1, flag:navy-contact]
  - text: "Send your engineer, and ask for the report."
    origin: profession:engineer
    cost: {draws: 1}
    effects: [money:+2, block:technological:+1, flag:navy-contact]
  - text: "Not your people. Not for that long."
    origin: always
    cost: {draws: 1}
    effects: [trait:+loyal]
---
The navy needs a civilian engineer aboard for a patrol: a new reactor control system, and the manufacturer's
people are not cleared. Ninety days, no signal, no mail. It pays like a year. Your engineer is the only person you
know who qualifies, and he would go.

- *Send him* – three months without him. The money arrives before he does.
- *The report* – he comes back with a story about what the models cannot run. It is worth more than the money.
- *Not your people* – he hears about it anyway. He is not sure whether to be grateful.
