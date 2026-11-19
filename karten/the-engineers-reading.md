---
id: the-engineers-reading
kind: event
title: The engineer's reading
picture: the-engineers-reading.jpg
stack: the-signal
thread: [the-drawing, the-readings]
part: opens
after: [{card: china-leaves-the-network, options: [0, 1]}, {card: the-dish-in-the-gobi, options: [1]}]
wait: [4, 10]
who: self
place: home
takes: 2
costs: 1
expires: 4
requires: [month:6, until:10]
reach: personal
impact: 3
options:
  - text: "Two weeks with the numbers and a drawing board. It is a shape."
    origin: skill:technology
    cost: {draws: 1}
    effects: [flag:read-blueprint, influence:+1, block:technological:+1]
    check: {skill: technology, difficulty: 3, trait: innovator}
    partial: [flag:read-blueprint]
    failure: [trait:+impatient]
  - text: "Give the numbers to the engineer who left Beijing. She has already started."
    origin: associate:engineer
    cost: {draws: 1}
    effects: [flag:read-blueprint, influence:+1]
  - text: "Ask an engineer you know to read it as a drawing."
    origin: contact:engineer
    cost: {draws: 1, influence: 1}
    effects: [flag:read-blueprint]
  - text: "Two weeks with the numbers, no training, a lot of paper."
    origin: always
    cost: {draws: 1}
    effects: [flag:read-blueprint, trait:+curious]
    check: {skill: technology, difficulty: 4}
    partial: [trait:+curious]
    failure: [trait:+impatient]
  - text: "Leave the decoding to the blocks."
    origin: always
    cost: {draws: 1}
    effects: []
---
The pattern is numbers. The engineers in your life have started to see dimensions in them: a ratio that is a
circle, a repeat that is a material, a count that is a tolerance. Li Na says it is a ring and that she could
build it. Nobody has asked her to.

- *Two weeks* – at the end there is a drawing on your wall and you cannot stop looking at it.
- *Give it to her* – she comes back with the drawing in three days. She has not slept.
- *Leave it* – the blocks decode it too. Later, and they do not tell you.
