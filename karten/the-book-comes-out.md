---
id: the-book-comes-out
kind: event
title: The book comes out
picture: the-book-comes-out.jpg
stack: the-signal
thread: [the-word]
part: continues
after: [{card: the-book-offer, options: [0, 1, 2]}]
wait: [10, 14]
who: self
place: europe
takes: 1
costs: 1
expires: 3
requires: [flag:writing-the-book]
reach: personal
impact: 3
options:
  - text: "Do the tour. Twelve cities, one suitcase."
    origin: always
    cost: {draws: 1}
    effects: [money:+3, influence:+2, acquired:+famous]
    check: {skill: performance, difficulty: 3, trait: gregarious}
    partial: [money:+2, influence:+1]
    failure: [money:+1, acquired:+burned-out]
  - text: "Sign in one bookshop and go home."
    origin: always
    cost: {draws: 1}
    effects: [money:+2, trait:+content]
---
It is in every airport. The cover has a dish on it that is not yours. Chapter nine is the one people quote.

- *The tour* – you are tired and recognised and paid. All three at once.
- *One bookshop* – the money comes anyway. Less of it, and you sleep in your own bed.
