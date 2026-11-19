---
id: the-check-up
kind: event
title: The check-up
picture: the-check-up.jpg
stack: personal
takes: 0
costs: 0
requires: []
reach: personal
impact: 2
options:
  - text: "Do what the doctor says. All of it."
    origin: trait:patient
    cost: {draws: 1}
    effects: [trait:+calm, trait:-impatient]
  - text: "Ask your doctor what really matters."
    origin: associate:doctor
    cost: {draws: 1}
    effects: [trait:+wise]
  - text: "Walk to work for a month."
    origin: always
    cost: {draws: 1}
    effects: [trait:+calm]
  - text: "Nod. Change nothing."
    origin: always
    cost: {draws: 1}
    effects: [trait:+impatient]
  - text: "Ask a doctor you know what really matters."
    origin: contact:doctor
    cost: {draws: 1, influence: 1}
    effects: [trait:+calm]
---
Nothing wrong. Nothing right either: the numbers are all a little higher than last time, the way the year was a
little heavier. The doctor reads the model's summary aloud and then puts it down and says, in her own words: slow
down.

- *All of it* – less coffee, more walking, earlier nights. It is boring. It works.
- *Your doctor* – she says three things matter and the rest is noise. You can do three things.
- *Walk* – forty minutes each way. You start noticing the trees on the route.
- *Nod* – the next check-up is in a year. You will think about it then.
- *A doctor you know* – over dinner, not in the surgery. Two things. You do one of them.
