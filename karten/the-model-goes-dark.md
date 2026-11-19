---
id: the-model-goes-dark
kind: event
title: The model goes dark for three days
picture: the-model-goes-dark.jpg
stack: the-last-boom
thread: [your-own-model]
part: turns
after: [{card: the-open-model, options: [0, 1, 2]}, {card: the-power-bill, options: [0, 1, 2]}]
wait: [8, 16]
who: anyone
takes: 0
costs: 0
expires: 1
requires: []
reach: global
impact: 4
options:
  - text: "Switch to your own model."
    origin: flag:model-in-house
    cost: {draws: 1}
    effects: [money:+2, influence:+2, block:technological:+1]
  - text: "Run the line by hand, like before."
    origin: flag:kept-humans
    cost: {draws: 1}
    effects: [money:+1, influence:+2, status:europe:+1]
  - text: "Report from inside the outage."
    origin: profession:journalist
    cost: {draws: 1}
    effects: [influence:+2, acquired:+famous]
  - text: "Wait."
    origin: always
    cost: {draws: 1}
    effects: [money:-1, block:economic:-1]
  - text: "Help the neighbours who depend on it."
    origin: block:europe
    cost: {draws: 1}
    effects: [influence:+2, trait:+compassionate]
---
Thursday 03:10. The model that runs the contracts, the triage, the sports pages and a third of Europe's factories
stops answering. No explanation. Trains run on timetables printed in 2024. Hospitals find the doctors. Three
days later it is back and nobody says why.

- *Your own model* – it ran. You are the only one who did not stop.
- *By hand* – ninety people show you what they were for.
- *Report* – the story of the decade, for three days.
- *Wait* – you lose what everyone loses.
- *The neighbours* – the old man whose pills come by drone, the woman whose door is a model. Three days of knocking.
