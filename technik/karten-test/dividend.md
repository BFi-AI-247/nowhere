---
id: dividend
kind: event
title: Dividend
picture:
stack: the-last-boom
requires: [flag:invested]
reach: personal
impact: 1
options:
  - text: Take the money.
    origin: always
    cost: {}
    effects: [money:+4]
  - text: Reinvest.
    origin: skill:finance
    cost: {}
    effects: [flag:all-in, follow:market-wobble:2]
---
TEST DATA. The envelope is thicker than expected. You can stop here, or not.
