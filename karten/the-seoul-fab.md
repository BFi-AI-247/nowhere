---
id: the-seoul-fab
kind: event
title: Seoul offers a tour
picture: the-seoul-fab.jpg
stack: the-last-boom
thread: [the-power]
part: continues
after: [{card: the-chip-embargo, options: [0, 1, 2]}]
wait: [4, 8]
place: seoul
who: anyone
takes: 2
costs: 1
expires: 5
arrives: board
requires: []
reach: global
impact: 3
options:
  - text: "Go yourself. See the chips being made."
    origin: skill:technology
    cost: {draws: 1, money: 1}
    effects: [block:technological:+1, influence:+1, trait:+curious]
  - text: "Send your engineer. He will understand it."
    origin: profession:engineer
    cost: {draws: 1, money: 1}
    effects: [block:technological:+2, flag:seoul-contact]
  - text: "Send your journalist. Someone should write it down."
    origin: profession:journalist
    cost: {draws: 1, money: 1}
    effects: [influence:+2, block:cultural:+1, flag:seoul-contact]
  - text: "Decline, politely."
    origin: always
    cost: {draws: 1}
    effects: []
---
The fab south of Seoul makes the chips Europe cannot. They offer a delegation two weeks inside – clean rooms,
engineers, the canteen. The invitation is not charity: they want to know what Europe will do about the embargo.
Whoever goes will be asked.

- *Yourself* – you understand a tenth of it and it is the most important tenth.
- *Your engineer* – he comes back with drawings in his head and a card from someone's cousin.
- *Your journalist* – the piece runs in three languages. Seoul reads it before Brussels.
- *Decline* – the delegation goes without Europe. Europe notices later.
