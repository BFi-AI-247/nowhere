---
id: the-ring
kind: event
title: The ring
picture: the-ring.jpg
stack: the-signal
thread: [the-spine, the-drawing]
part: closes
who: anyone
place: home
takes: 0
costs: 0
expires: 1
beat: 12
requires: [month:12]
reach: global
impact: 5
options:
  - text: "Put your money in the consortium that is building it."
    origin: flag:blueprint-known
    cost: {draws: 1, money: 3}
    effects: [flag:the-passage, flag:ring-funded, block:technological:+2, acquired:+famous]
  - text: "Go to the site and work on it. A year, maybe more."
    origin: skill:technology
    cost: {draws: 1}
    effects: [flag:the-passage, flag:ring-builder, influence:+2, trait:+brave]
    check: {skill: technology, difficulty: 3, trait: brave}
    partial: [flag:the-passage, influence:+1]
    failure: [flag:the-passage, money:-1, acquired:+scarred]
  - text: "Stop it. Not now, not here, not without the treaty."
    origin: flag:warning-known
    cost: {draws: 1, influence: 2}
    effects: [flag:ring-stopped, status:europe:+2, block:military:+1, trait:+patient]
  - text: "Stop it. Not now, not here, not without the treaty."
    origin: profession:politician
    cost: {draws: 1, influence: 2}
    effects: [flag:ring-stopped, status:europe:+1]
  - text: "Watch the first truck drive onto the plateau."
    origin: always
    cost: {draws: 1}
    effects: [flag:the-passage, block:technological:+1]
---
In the Atacama, where the dish stands, a consortium of two blocks and eleven companies breaks ground on a circle
four hundred metres across. Nobody has agreed what it is for. Everyone has agreed who pays. The eleven days are
still arriving, the same as in January; the count, if it is a count, has gone up twice more.

- *Fund it* – when it opens, your name is on the plaque and your share is in the thing beyond it.
- *Build it* – a year of your life on a plateau. The people who build it will be the first to walk through.
- *Stop it* – you win a delay. Delays are what politics is for. The year ends with the ring half built and a treaty
  half written.
- *Watch* – the first truck, the first fence, the first guard. This is how every age begins: with a fence.
