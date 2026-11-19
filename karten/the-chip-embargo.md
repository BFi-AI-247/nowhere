---
id: the-chip-embargo
kind: event
title: The chip embargo
picture: the-chip-embargo.jpg
stack: the-last-boom
thread: [the-power]
part: turns
after: [{card: the-power-bill, options: [0, 1, 2]}]
wait: [6, 12]
who: anyone
requires: []
reach: global
impact: 4
options:
  - text: "Ask Viktor what the chips can really do."
    origin: skill:technology
    cost: {draws: 1}
    effects: [influence:+1, block:technological:+1]
  - text: "Buy what is left before the price moves."
    origin: skill:finance
    cost: {draws: 1, money: 2}
    effects: [money:+1, block:technological:+1, follow:compute-shortage:2]
  - text: "Back Europe building its own fab."
    origin: status:europe:5
    cost: {draws: 1, influence: 2}
    effects: [status:europe:+2, block:technological:+2, block:economic:-1]
  - text: "Write to your member of parliament."
    origin: block:europe
    cost: {draws: 1}
    effects: [influence:+1]
  - text: "It is far away."
    origin: always
    cost: {draws: 1}
    effects: [block:technological:-1]
---
Washington forbids the export of the newest chips to China; Beijing forbids the export of the metals the chips are
made of. Europe, which makes the machines that make the chips, is asked by both sides which side it is on. The
answer, by Friday, is "a working group".

- *Viktor* – he explains, over a bad line from Tbilisi, why the numbers in the papers are wrong.
- *Buy* – you own something scarce. Scarce things get noticed.
- *A fab* – ten billion euros and seven years. Someone has to say yes first.
- *Write* – you get a reply, signed by a model on the member's behalf.
- *Far away* – it does not stay far away.
