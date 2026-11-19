---
id: the-flu
kind: event
title: The flu
picture:
stack: personal
takes: 0
costs: 0
requires: []
reach: personal
impact: 1
options:
  - text: "Stay in bed."
    origin: always
    cost: {draws: 1}
    effects: [money:-1]
  - text: "Ask your doctor, and do what she says."
    origin: associate:doctor
    cost: {draws: 1}
    effects: []
  - text: "Work from bed."
    origin: always
    cost: {draws: 1}
    effects: [trait:+impatient]
---
A week in bed in the middle of everything. The model does not get the flu, which you think about at three in
the morning.

- *Bed* – a week lost. It costs a little.
- *Your doctor* – three days. She was right, as usual.
- *From bed* – you get things done and get better slower.
