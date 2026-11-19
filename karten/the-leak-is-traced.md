---
id: the-leak-is-traced
kind: event
title: The leak is traced
picture: the-leak-is-traced.jpg
stack: the-signal
thread: [the-secret]
part: turns
after: [{card: the-second-cycle, options: [2, 3]}]
wait: [6, 10]
who: self
place: home
takes: 0
costs: 1
expires: 2
requires: [flag:leaked, month:5, until:7]
reach: block:europe
impact: 3
options:
  - text: "Own it. You told the world because the world had a right to know."
    origin: always
    cost: {draws: 1}
    effects: [influence:+2, acquired:+famous, status:europe:-1, trait:+brave]
    check: {skill: persuasion, difficulty: 3, trait: brave}
    partial: [influence:+1, acquired:+famous, status:europe:-1]
    failure: [status:europe:-2, acquired:+infamous]
  - text: "Let a lawyer you know take the call."
    origin: contact:lawyer
    cost: {draws: 1, money: 1}
    effects: [influence:+1]
  - text: "Let your lawyer take the call."
    origin: associate:lawyer
    cost: {draws: 1}
    effects: [influence:+1, trait:+calm]
  - text: "Say nothing. Let them prove it."
    origin: always
    cost: {draws: 1}
    effects: [trait:+suspicious, status:europe:-1]
---
The journalist you trusted protected her source. Her phone did not. A committee in Brussels has your name and
the date, and a journalist who did not get the story has both as well.

- *Own it* – a day of headlines, a week of letters, half of them grateful. You are the one who told us.
- *Your lawyer* – it goes away. Slowly, and at a price.
- *Nothing* – they cannot prove it. They do not need to.
