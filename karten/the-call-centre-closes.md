---
id: the-call-centre-closes
kind: event
title: The call centre closes
picture: the-call-centre-closes.jpg
stack: the-last-boom
thread: [the-union]
part: continues
after: [{card: the-union-of-the-replaced, options: [0, 1, 2, 3]}]
wait: [4, 8]
who: anyone
requires: []
reach: block:europe
impact: 3
options:
  - text: "Hire twenty of them, for anything."
    origin: possession:factory
    cost: {draws: 1, money: 2}
    effects: [influence:+2, flag:kept-humans]
  - text: "Help Marta keep the building for the town."
    origin: status:europe:4
    cost: {draws: 1, influence: 1}
    effects: [status:europe:+1, flag:town-ally]
  - text: "Run their stories in the paper."
    origin: possession:cultural
    cost: {draws: 1}
    effects: [influence:+1, block:cultural:+1]
  - text: "Give to the fund for the families."
    origin: block:europe
    cost: {draws: 1, money: 1}
    effects: [influence:+1]
  - text: "It was coming."
    origin: always
    cost: {draws: 1}
    effects: [trait:+cynical]
---
Four hundred people answered the phone for a bank, an airline and a telecom company. On the first of the month the
model answered instead, and nobody calling noticed. The building is on the edge of town, next to the bus station.
Marta, the mayor, stands in front of it with a microphone and no plan.

- *Hire twenty* – twenty is not four hundred. To twenty families it is everything.
- *The building* – the town gets a hall. What goes in it is the next question.
- *The paper* – four hundred names in eleven thousand homes.
- *The fund* – your money, quietly.
- *It was coming* – it was. That does not help.
