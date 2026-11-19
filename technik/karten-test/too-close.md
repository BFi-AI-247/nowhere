---
id: too-close
kind: event
title: You are too close to this
picture:
stack: the-last-boom
requires: [flag:all-in]
reach: personal
impact: 3
options:
  - text: Admit it.
    origin: trait:honest
    cost: {}
    effects: [trait:-greedy, influence:+1]
  - text: Double down.
    origin: always
    cost: {}
    effects: [money:-2, trait:+greedy, follow:boom-ends:1]
---
TEST DATA. Everything you own is in one number. You check it hourly.
