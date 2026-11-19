---
id: rent-your-racks
kind: event
title: Everyone wants your racks
picture: rent-your-racks.jpg
stack: the-last-boom
thread: [your-own-model]
part: opens
place: server-farm
who: anyone
takes: 1
requires: [possession:servers, until:8]
reach: block:europe
impact: 2
options:
  - text: "Rent them out, all of them."
    origin: possession:servers
    cost: {draws: 1}
    effects: [money:+3, follow:the-cold-store:3]
  - text: "Keep a third for your own model."
    origin: possession:servers
    cost: {draws: 1}
    effects: [money:+1, flag:model-in-house, block:technological:+1]
  - text: "Sell the farm while it is worth something."
    origin: skill:finance
    cost: {draws: 1}
    effects: [money:+4, lose:server-farm]
  - text: "Wait."
    origin: always
    cost: {draws: 1}
    effects: [money:+1]
---
The cold store outside Tallinn has become the most sought-after address in the Baltics. Three companies will pay
anything for the racks by the end of the quarter. Anything, this year, is a lot.

- *Rent all* – the money is immediate. The contracts are short.
- *Keep a third* – you own something that thinks. Expensive, interesting.
- *Sell* – the best price you will ever see for a cold store.
- *Wait* – a little money comes in anyway.
