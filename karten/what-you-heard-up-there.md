---
id: what-you-heard-up-there
kind: event
title: What you heard up there
picture: what-you-heard-up-there.jpg
stack: the-signal
thread: [orbit]
part: closes
after: [{card: a-seat-to-listen, options: [0, 1, 2]}]
wait: [8, 9]
who: self
place: home
takes: 0
costs: 1
expires: 3
requires: [flag:listened-from-orbit, month:9]
reach: global
impact: 3
options:
  - text: "Tell it plainly, to everyone: the same eleven days, cleaner, and one thing nobody on the ground had seen."
    origin: always
    cost: {draws: 1}
    effects: [influence:+3, flag:on-the-paper, block:technological:+1]
    check: {skill: performance, difficulty: 2, trait: honest}
    partial: [influence:+2, flag:on-the-paper]
    failure: [influence:+1, flag:on-the-paper, trait:+shy]
  - text: "Give the data to the open network and say nothing yourself."
    origin: trait:globalist
    cost: {draws: 1}
    effects: [influence:+1, block:technological:+2, trait:+generous]
  - text: "Sell the first look to the consortium."
    origin: associate:businessperson
    cost: {draws: 1}
    effects: [money:+3, trait:+greedy]
---
Two months of the cleanest signal anyone has recorded, and in the gap between the three clicks and the fall, a
thing the atmosphere had been hiding: a fourth click, faint, in a different rhythm. The ground never heard it.

- *Tell it* – the fourth click is yours. It is on the paper under your name.
- *Open network* – everyone has it by morning. Nobody knows it was you. You know.
- *Sell it* – Daniel pays what he promised. The fourth click is announced by a company.
