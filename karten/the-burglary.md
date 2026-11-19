---
id: the-burglary
kind: event
title: Someone was in the flat
picture: the-burglary.jpg
stack: personal
requires: []
reach: personal
impact: 2
options:
  - text: "Change the locks, add a camera."
    origin: always
    cost: {draws: 1, money: 1}
    effects: [trait:+preserver]
  - text: "Find out who. You have ways."
    origin: skill:investigation
    cost: {draws: 1}
    effects: [money:+1, trait:+brave]
  - text: "Let it go. It was only things."
    origin: always
    cost: {draws: 1}
    effects: [money:-1, trait:+calm]
---
The door is fine. The window is not. A laptop, a watch from your father, the spare cash in the tea tin. The police
officer is kind and types the report into a model that says the case has a four per cent chance.

- *Locks* – you sleep better. You check the camera at night, which is not sleeping.
- *Who* – a seventeen-year-old two streets away. You get the watch back and do not press charges.
- *Let it go* – the watch is the only thing you miss. You miss it for years.
