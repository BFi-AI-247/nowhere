---
id: boom-ends
kind: event
title: The boom ends
picture:
stack: the-last-boom
requires: [flag:invested]
reach: global
impact: 5
options:
  - text: Lose what is left.
    origin: always
    cost: {}
    effects: [money:-2, block:economic:-2, close:the-last-boom]
  - text: Buy the workshop from the receiver.
    origin: skill:finance
    cost: {money: 3}
    effects: [gain:drone-workshop, close:the-last-boom]
---
TEST DATA. It ends on a Tuesday. By Friday the hall with the drones is for sale.
