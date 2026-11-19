---
id: lost-wallet
kind: event
title: The wallet
picture:
stack: personal
takes: 0
costs: 0
requires: []
reach: personal
impact: 1
options:
  - text: "Cancel everything. Start again."
    origin: always
    cost: {draws: 1}
    effects: [money:-1]
  - text: "It comes back in the post, with everything in it."
    origin: trait:trusting
    cost: {draws: 1}
    effects: [trait:+trusting]
  - text: "Ask the taxi company, politely."
    origin: always
    cost: {draws: 1}
    effects: [trait:+patient]
---
A taxi, a pocket, gone. Cards, cash, the photo you do not admit you carry.

- *Cancel* – an afternoon of phone calls with models that are very sorry.
- *It comes back* – a stranger, a stamp, no note. You think about them for a week.
- *The taxi company* – a model answers, then a man named Rui, who finds it under a seat.
