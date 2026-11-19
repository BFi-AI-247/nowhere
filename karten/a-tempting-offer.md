---
id: a-tempting-offer
kind: event
title: A tempting offer
picture: a-tempting-offer.jpg
stack: personal
requires: []
reach: personal
impact: 3
options:
  - text: "Take it."
    origin: always
    cost: {draws: 1}
    effects: [money:+4, influence:-2, trait:+opportunistic, flag:took-the-offer]
  - text: "Take it, and tell everyone you did."
    origin: trait:honest
    cost: {draws: 1}
    effects: [money:+3, trait:+brave]
  - text: "Turn it down."
    origin: trait:just
    cost: {draws: 1}
    effects: [influence:+2, status:europe:+1, trait:+loyal]
  - text: "Ask for a week to think."
    origin: always
    cost: {draws: 1}
    effects: [trait:+patient]
---
A lot of money for a small thing: a name on a board, a signature, a silence. The small thing is legal. It is
the kind of legal that people describe afterwards with a pause.

- *Take it* – you are richer and a little less yours.
- *Take it openly* – you lose the silence, which was half the price. People respect it. Some.
- *Turn it down* – nothing changes except that you know you did.
- *A week* – the offer shrinks a little. So does the temptation.
