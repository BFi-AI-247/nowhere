---
id: the-first-component
kind: event
title: The first component
picture: the-first-component.jpg
stack: the-signal
thread: [the-drawing, the-readings]
part: closes
after: [{card: the-engineers-reading, options: [0, 1, 2, 3]}]
wait: [8, 16]
who: profession:engineer
place: atacama
takes: 3
costs: 1
expires: 3
requires: [flag:blueprint-known, month:10]
reach: global
impact: 4
options:
  - text: "Build the first segment on the plateau. Three weeks. See if the numbers were right."
    origin: always
    cost: {draws: 1, money: 1}
    effects: [flag:ring-builder, block:technological:+2, influence:+2]
    check: {skill: technology, difficulty: 3, trait: innovator}
    partial: [block:technological:+1, influence:+1]
    failure: [money:-1, trait:+impatient]
  - text: "Sell the drawings to the consortium. Let them build it."
    origin: associate:businessperson
    cost: {draws: 1}
    effects: [money:+3, flag:ring-funded, trait:+greedy]
  - text: "Lock the drawings in a drawer."
    origin: always
    cost: {draws: 1}
    effects: [trait:+patient]
---
A segment of the ring, four metres of it, built to the pattern's dimensions out of the pattern's material – which
turns out to be something a foundry in Ostrava can make. Nobody knows what a segment does. Everybody wants to see
one.

- *Build it* – it fits. Every measurement. That is the moment the world stops arguing whether and starts
  arguing who.
- *Sell the drawings* – the consortium builds it in a month and puts a fence around it.
- *The drawer* – someone else builds it. In the Gobi.
