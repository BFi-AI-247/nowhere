---
id: the-funding-round
kind: event
title: The funding round
picture: the-funding-round.jpg
stack: the-signal
thread: [the-consortium]
part: closes
after: [{card: the-consortiums-offer, options: [1]}, {card: a-share-in-the-array, options: [1]}]
wait: [16, 30]
who: self
place: usa
takes: 1
costs: 1
expires: 3
requires: [flag:invested, month:10]
reach: personal
impact: 3
options:
  - text: "Sell half your stake at the round. The consortium is worth a country."
    origin: always
    cost: {draws: 1}
    effects: [money:+3, trait:+content]
    check: {skill: finance, difficulty: 3, trait: patient}
    partial: [money:+2]
    failure: [money:+1, trait:+impatient]
  - text: "Hold. Whatever the ring is, it will be worth more when it opens."
    origin: trait:brave
    cost: {draws: 1}
    effects: [money:+1, flag:ring-funded, trait:+ambitious]
  - text: "Sell everything. You have seen what the count does."
    origin: flag:read-ledger
    cost: {draws: 1}
    effects: [money:+3, trait:+suspicious]
---
Daniel's consortium raises more money in a morning than the plateau has cost in forty years. You were in early.
Daniel, who is never right about people, is right about this: the paper on the table is your share, and it is
worth what you want it to be.

- *Sell half* – you are richer than you have ever been and still in the room.
- *Hold* – the ring opens in a year or two. The share is a ticket.
- *Sell all* – the count has gone up again. You do not want to be counted.
