---
id: the-paper
kind: event
title: The paper
picture: the-paper.jpg
stack: the-signal
thread: [the-plateau]
part: turns
after: [{card: the-second-cycle, options: [0, 1, 2, 3, 4]}]
wait: [10, 18]
who: self
place: home
takes: 1
costs: 1
expires: 4
requires: [month:7, until:11]
reach: global
impact: 3
options:
  - text: "Write the section Rosa asked you for. Eleven names; yours is one."
    origin: flag:heard-first
    cost: {draws: 1}
    effects: [flag:on-the-paper, influence:+2]
    check: {skill: science, difficulty: 2, trait: honest}
    partial: [flag:on-the-paper]
    failure: [influence:-1, trait:+impatient]
  - text: "Write the section Rosa asked you for. Eleven names; yours is one."
    origin: associate:scientist
    cost: {draws: 1}
    effects: [flag:on-the-paper, influence:+2]
  - text: "Pay for the open-access fee so the whole world can read it on the day."
    origin: always
    cost: {draws: 1, money: 1}
    effects: [influence:+1, block:cultural:+1, trait:+generous]
  - text: "Let the scientists write their paper."
    origin: always
    cost: {draws: 1}
    effects: []
---
Rosa is writing it: the detection, the eleven days, the silence, the fourth click if anyone heard it. The journal
has promised a cover. There are eleven authors and she has left a line for a twelfth. She says you earned it in
January. She says it in one sentence and does not say it again.

- *Write it* – two pages, no adjectives, your name under hers for two hundred years.
- *Pay the fee* – your name is in the acknowledgements. Everyone on earth reads it free.
- *Let them* – the paper is published in September. It is very good. You are not in it.
