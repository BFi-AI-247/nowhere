---
id: the-dish-time
kind: event
title: Dish time
picture: the-dish-time.jpg
stack: the-signal
thread: [the-consortium]
part: continues
after: [{card: a-share-in-the-array, options: [0, 1, 2]}]
wait: [2, 4]
who: self
place: the-array
takes: 1
costs: 1
expires: 4
requires: [possession:observatory, until:11]
reach: personal
impact: 2
options:
  - text: "Rent the nights to a block. They pay by the hour."
    origin: always
    cost: {draws: 1}
    effects: [money:+2, block:technological:+1]
  - text: "Rent the nights to the consortium. He pays more and asks less."
    origin: associate:businessperson
    cost: {draws: 1}
    effects: [money:+3, trait:+greedy]
  - text: "Keep the nights. Point it where Rosa says."
    origin: always
    cost: {draws: 1}
    effects: [influence:+1, trait:+curious, block:technological:+1]
---
Twelve dishes, three hundred and sixty-five nights, and everyone on earth wants an hour. The board meets by video
and looks at you. The bills are on the table; so are the offers.

- *A block* – steady money, and a ministry that thinks it owns your calendar.
- *The consortium* – better money, and Daniel's name on the data you collect.
- *Keep them* – Rosa points it at the source every night. You pay for that. You also see things first.
