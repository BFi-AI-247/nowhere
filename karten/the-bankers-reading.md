---
id: the-bankers-reading
kind: event
title: The banker's reading
picture: the-bankers-reading.jpg
stack: the-signal
thread: [the-consortium, the-readings]
part: opens
after: [{card: the-consortiums-offer, options: [1, 2]}, {card: the-market-for-the-sky, options: [0, 1, 2]}]
wait: [8, 16]
who: self
place: home
takes: 1
costs: 1
expires: 4
requires: [month:6, until:10]
reach: personal
impact: 3
options:
  - text: "Look at the count the way you look at a balance sheet."
    origin: skill:finance
    cost: {draws: 1}
    effects: [flag:read-ledger, money:+1, trait:+suspicious]
    check: {skill: finance, difficulty: 3}
    partial: [flag:read-ledger]
    failure: [trait:+cynical]
  - text: "Ask the consortium's analysts. They have been counting since February."
    origin: associate:businessperson
    cost: {draws: 1}
    effects: [flag:read-ledger, money:+1]
  - text: "Ask a businessperson you know what her analysts count."
    origin: contact:businessperson
    cost: {draws: 1, influence: 1}
    effects: [flag:read-ledger]
  - text: "A week with the numbers and a spreadsheet."
    origin: always
    cost: {draws: 1}
    effects: [flag:read-ledger, trait:+suspicious]
    check: {skill: finance, difficulty: 4}
    partial: [trait:+suspicious]
    failure: [trait:+cynical]
  - text: "Leave the decoding to the blocks."
    origin: always
    cost: {draws: 1}
    effects: []
---
Daniel's people think the pattern is a tally. Not a message: a ledger. How many, how often, where. And they have
noticed that one number in the eleven days has gone up twice since the dish in the Gobi transmitted.

- *The balance sheet* – you see it. The number is a count, and the count has changed since we started talking.
- *The analysts* – they show you the chart. Then they ask you not to show anyone else.
- *Leave it* – the market reads it anyway. Markets always do.
