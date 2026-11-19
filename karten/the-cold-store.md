---
id: the-cold-store
kind: event
title: The racks are empty
picture: the-cold-store.jpg
stack: the-last-boom
thread: [your-own-model]
part: closes
after: [{card: rent-your-racks, options: [0, 1, 2]}, {card: the-model-goes-dark, options: [0, 1, 2]}]
wait: [12, 24]
place: server-farm
who: anyone
takes: 2
requires: [possession:servers, flag:crashed]
reach: personal
impact: 3
options:
  - text: "Offer it to Aisha's lab for nothing."
    origin: trait:generous
    cost: {draws: 1}
    effects: [influence:+2, status:europe:+1, block:technological:+1]
  - text: "Run your own model on it, now that compute is cheap."
    origin: skill:technology
    cost: {draws: 1, money: 1}
    effects: [flag:model-in-house, block:technological:+1]
  - text: "Sell it as a cold store."
    origin: always
    cost: {draws: 1}
    effects: [money:+1, lose:server-farm]
  - text: "Lend it to the town as a winter shelter."
    origin: always
    cost: {draws: 1}
    effects: [influence:+2, flag:town-ally]
---
The three companies that would pay anything have paid nothing since Tuesday. Four hundred racks, a power
contract, and silence. It is, again, a building outside Tallinn that is cold.

- *Give it away* – the lab does something with it that nobody will sell.
- *Your own model* – cheap compute, no customers, a strange freedom.
- *Sell* – it was always a cold store.
- *A shelter* – four hundred racks out, two hundred beds in. Marta cuts a ribbon.
