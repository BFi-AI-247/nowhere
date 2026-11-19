---
id: the-night-shift-fee
kind: event
title: The night-shift fee
picture: the-night-shift-fee.jpg
stack: the-signal
thread: [the-word]
part: opens
who: self
place: home
takes: 1
costs: 1
expires: 3
requires: [until:3]
reach: personal
impact: 2
options:
  - text: "Take the data shift. Nights, a week, paid by the hour."
    origin: skill:science
    cost: {draws: 1}
    effects: [money:+2, flag:heard-first]
  - text: "Take the data shift. Nights, a week, paid by the hour."
    origin: skill:technology
    cost: {draws: 1}
    effects: [money:+2, flag:heard-first]
  - text: "Send your engineer. She can read a spectrum."
    origin: associate:engineer
    cost: {draws: 1}
    effects: [money:+2]
  - text: "Nights are for sleeping."
    origin: always
    cost: {draws: 1}
    effects: []
---
Every observatory on earth is suddenly re-checking a year of recordings for an eleven-day pattern and nobody has the
staff. A week of nights in front of a screen, paid properly, no questions. You will see what they are looking for.

- *Take the shift* – the money, and on the fourth night, the thing itself.
- *Your engineer* – she comes back paid and quiet.
- *Sleep* – someone else sees it.
