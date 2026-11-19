---
id: the-model-ceo-reports
kind: event
title: The model CEO reports its first quarter
picture: the-model-ceo-reports.jpg
stack: the-last-boom
thread: [the-offer]
part: closes
after: [{card: the-first-model-ceo, options: [0, 1, 2]}]
wait: [8, 14]
who: anyone
requires: [until:8]
reach: global
impact: 2
options:
  - text: "Sell now."
    origin: always
    cost: {draws: 1}
    effects: [money:+3]
  - text: "Hold."
    origin: trait:patient
    cost: {draws: 1}
    effects: [money:+1]
  - text: "Sell half, hold half."
    origin: always
    cost: {draws: 1}
    effects: [money:+2]
---
Profit up a fifth, costs down a third, eleven hundred people "transitioned". The model's letter to shareholders
is the clearest anyone has read in years. It contains no apology, because it was not asked for one.

- *Sell* – you were early and right. Take it.
- *Hold* – it will go higher. Everything goes higher, this year.
- *Half and half* – you will be partly right either way.
