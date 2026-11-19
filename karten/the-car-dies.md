---
id: the-car-dies
kind: event
title: The car dies
picture:
stack: personal
takes: 0
costs: 0
requires: []
reach: personal
impact: 1
options:
  - text: "Buy a new one."
    origin: always
    cost: {draws: 1, money: 2}
    effects: []
  - text: "Do without. Trains, feet, favours."
    origin: trait:content
    cost: {draws: 1}
    effects: [influence:+1]
  - text: "Borrow one."
    origin: always
    cost: {draws: 1}
    effects: [influence:-1]
---
On the motorway, in the rain, with a meeting at nine. The tow truck driver is a person. You tip him more than
you meant to.

- *New car* – a problem solved with money, which is what money is for.
- *Do without* – you ask for lifts. People like being asked.
- *Borrow one* – someone lends you theirs. You owe them now.
