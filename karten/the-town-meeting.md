---
id: the-town-meeting
kind: event
title: The town meeting
picture: the-town-meeting.jpg
stack: the-last-boom
thread: [the-ninety]
part: closes
after: [{card: the-offer-for-the-factory, options: [0, 1, 2]}]
wait: [3, 8]
place: factory-lodz
takes: 1
requires: [flag:sold-factory]
reach: personal
impact: 3
options:
  - text: "Go. Stand at the front. Take it."
    origin: trait:brave
    cost: {draws: 1}
    effects: [influence:+1, status:europe:+1, acquired:+infamous]
  - text: "Fund the retraining yourself."
    origin: skill:finance
    cost: {draws: 1, money: 3}
    effects: [influence:+2, status:europe:+1, trait:+generous]
  - text: "Send a letter."
    origin: always
    cost: {draws: 1}
    effects: [influence:-2, trait:+craven]
  - text: "Go. Sit at the back. Listen."
    origin: always
    cost: {draws: 1}
    effects: [trait:+compassionate, influence:+1]
---
The hall is full. Ninety people and their families, the mayor, a camera. The new owner is not there. You are
the last person who was.

- *Go* – they shout. Some of them, afterwards, shake your hand.
- *Fund it* – it costs what the factory was worth to them, which is less than it was worth to the fund.
- *A letter* – it is read aloud. The silence after it is yours.
- *Listen* – you say nothing all evening. On the way out, two people thank you for coming.
