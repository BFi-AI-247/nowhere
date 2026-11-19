---
id: the-rumour
kind: event
title: The rumour
picture:
stack: the-signal
thread: [the-secret]
part: opens
who: self
place: home
takes: 0
costs: 1
expires: 3
requires: [until:3]
reach: global
impact: 2
options:
  - text: "Chase it. Three calls, one of them to Chile."
    origin: skill:investigation
    cost: {draws: 1}
    effects: [flag:heard-first, influence:+1]
  - text: "Chase it. Three calls, one of them to Chile."
    origin: profession:journalist
    cost: {draws: 1}
    effects: [flag:heard-first, influence:+1]
  - text: "Ask a scientist you know whether there is anything in it."
    origin: contact:scientist
    cost: {draws: 1, influence: 1}
    effects: [flag:heard-first]
  - text: "Buy a little of the company that makes receivers. Just in case."
    origin: skill:finance
    cost: {draws: 1, money: 1}
    effects: [flag:bought-the-sky]
  - text: "Rumours. There is always one."
    origin: always
    cost: {draws: 1}
    effects: []
---
A forum post from someone who says his sister works on a plateau in Chile. A deleted post. A screenshot of the
deleted post. Three thousand replies, most of them jokes. One of them is not.

- *Chase it* – the third call is picked up by a woman who has not slept. She does not deny it.
- *Your scientist* – "Do not repeat this. Yes."
- *Receivers* – the stock is flat. In April it will not be.
- *Rumours* – there is always one. This one is true.
