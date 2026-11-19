---
id: the-wedding
kind: event
title: The wedding
picture: the-wedding.jpg
stack: personal
once: true
requires: [not:acquired:married]
reach: personal
impact: 3
options:
  - text: "Say yes."
    origin: always
    cost: {draws: 1, money: 2}
    effects: [acquired:+married, trait:+content, influence:+1]
  - text: "Say not yet."
    origin: trait:ambitious
    cost: {draws: 1}
    effects: [trait:+impatient]
  - text: "Say no, kindly."
    origin: trait:honest
    cost: {draws: 1}
    effects: [trait:+calm]
  - text: "Say yes. No party, no guests."
    origin: always
    cost: {draws: 1}
    effects: [acquired:+married, trait:+content]
---
It is asked on a Thursday, in a kitchen, by someone who has watched you through the whole Boom and is still
there. There is no model in the room.

- *Yes* – it costs a wedding and gives you a person who is on your side on every card from now on.
- *Not yet* – the year is too full. It stays too full.
- *No* – you are kind about it. It does not help.
- *Yes, quietly* – a town hall, two witnesses, lunch. It is still a wedding.
