---
id: the-market-for-the-sky
kind: event
title: The market for the sky
picture: the-market-for-the-sky.jpg
stack: the-signal
thread: [the-market]
part: opens
who: self
place: home
takes: 0
costs: 1
expires: 3
requires: [month:4, until:8]
reach: global
impact: 3
options:
  - text: "Go long on dishes, receivers, anything that listens."
    origin: skill:finance
    cost: {draws: 1, money: 2}
    effects: [money:+3, flag:bought-the-sky]
    check: {skill: finance, difficulty: 3}
    partial: [money:+2]
    failure: [trait:+wrathful]
  - text: "Ask a businessperson you know what she is buying."
    origin: contact:businessperson
    cost: {draws: 1, influence: 1}
    effects: [money:+2]
  - text: "Buy the one thing everyone needs in a panic: the boring stuff."
    origin: trait:patient
    cost: {draws: 1, money: 1}
    effects: [money:+2]
  - text: "Keep your money in the bank and your eyes on the sky."
    origin: always
    cost: {draws: 1}
    effects: []
---
Antenna makers up forty per cent in a week. A company that makes one kind of cryogenic receiver is worth more
than the airline that flies its engineers. Someone has started a fund called Eleven. Nobody knows what the
pattern says, so the market is pricing everything it might.

- *Go long* – if the world keeps listening, you are rich by June. If it gets bored, you are not.
- *Ask your businessperson* – she is buying the makers of the makers. So do you.
- *The boring stuff* – cable, concrete, generators. Every dish on earth needs them.
- *The bank* – you watch others get rich and poor. Both are instructive.
