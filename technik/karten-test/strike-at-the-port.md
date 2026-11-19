---
id: strike-at-the-port
kind: event
title: Strike at the port
picture:
stack: the-last-boom
requires: []
reach: block:europe
impact: 3
options:
  - text: Negotiate between them.
    origin: skill:persuasion
    cost: {}
    effects: [influence:+2, status:europe:+1]
  - text: Have June file the injunction.
    origin: associate:lawyer
    cost: {influence: 1}
    effects: [status:europe:+1, block:economic:+1, acquired:+infamous]
  - text: Join the picket line.
    origin: trait:brave
    cost: {}
    effects: [influence:+1, status:europe:-1, trait:+just]
  - text: Wait.
    origin: always
    cost: {}
    effects: [block:economic:-1]
---
TEST DATA. Nothing moves. The boom needs the port; the port wants a share.
