---
id: the-associate-wants-out
kind: event
title: Someone wants to go home
picture: the-associate-wants-out.jpg
stack: personal
place: home
who: self
takes: 0
costs: 0
expires: 2
arrives: board
requires: []
reach: personal
impact: 3
options:
  - text: "Let them go, with thanks. Keep in touch."
    origin: always
    cost: {draws: 1}
    effects: [influence:+2, trait:+generous]
  - text: "Ask them to stay three more months."
    origin: skill:persuasion
    cost: {draws: 1, influence: 1}
    effects: [trait:+loyal]
  - text: "Offer more money."
    origin: always
    cost: {draws: 1, money: 2}
    effects: [trait:+greedy]
---
It is the one you sent away the most. Toronto, Seoul, the factory, the roof. They come back from the last one and
say, carefully, that they would like a year at home. Not a complaint. A request.

- *Let them go* – a contact now, a friend still. The team is one smaller and the story is one longer.
- *Three months* – they stay. They count the days, politely.
- *More money* – they take it. Something between you is now a transaction.
