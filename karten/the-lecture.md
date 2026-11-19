---
id: the-lecture
kind: event
title: The lecture
picture: the-lecture.jpg
stack: the-signal
thread: [the-word]
part: opens
who: self
place: europe
takes: 1
costs: 1
expires: 4
requires: [until:12]
reach: personal
impact: 2
options:
  - text: "Take the fee. Tell them what you know."
    origin: flag:heard-first
    cost: {draws: 1}
    effects: [money:+2, influence:+1]
  - text: "Take the fee. Tell them what everyone knows, well."
    origin: skill:performance
    cost: {draws: 1}
    effects: [money:+2]
  - text: "Take the fee. Tell them what everyone knows, well."
    origin: skill:persuasion
    cost: {draws: 1}
    effects: [money:+2]
  - text: "Waive the fee for a hall full of students."
    origin: always
    cost: {draws: 1}
    effects: [influence:+2, trait:+generous]
  - text: "Decline. You are not a speaker."
    origin: always
    cost: {draws: 1}
    effects: [trait:+shy]
---
A university, a bank, a festival – everyone wants an evening about the eleven days and nobody who actually knows
anything will speak. You are on three lists. The fee is what a month costs.

- *What you know* – they came for this. They remember who told them.
- *What everyone knows, well* – the fee is the same; the applause is shorter.
- *Waive it* – two hundred students, one of whom will build something because of tonight.
- *Decline* – the fee goes to the man with the slides about Mars.
