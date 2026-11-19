---
id: market-wobble
kind: event
title: The market wobbles
picture:
stack: the-last-boom
requires: [flag:invested]
reach: global
impact: 4
options:
  - text: Sell everything, now.
    origin: flag:insider
    cost: {}
    effects: [money:+3, block:economic:-1, flag:sold]
  - text: Hold.
    origin: always
    cost: {}
    effects: [money:-3, trait:+patient, follow:boom-ends:2]
  - text: Blame the regulators in print.
    origin: profession:journalist
    cost: {}
    effects: [acquired:+infamous, status:europe:-1]
---
TEST DATA. One bank in one block misses one payment. Everyone pretends not to look.
