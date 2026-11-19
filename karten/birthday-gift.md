---
id: birthday-gift
kind: event
title: Your birthday
picture: birthday-gift.jpg
stack: personal
takes: 0
costs: 0
requires: []
reach: personal
impact: 1
options:
  - text: "Open it."
    origin: always
    cost: {draws: 1}
    effects: [money:+1]
  - text: "Throw a party instead."
    origin: trait:gregarious
    cost: {draws: 1, money: 1}
    effects: [influence:+1]
  - text: "Give the gift to someone who needs it more."
    origin: always
    cost: {draws: 1}
    effects: [trait:+generous]
---
A parcel, a card, a voice message from someone who still calls. The gift is useful, which at your age is the
nicest thing a gift can be.

- *Open it* – it is worth something. Small, real.
- *A party* – you spend a little and people remember you had one.
- *Give it away* – the look on their face is the better present.
