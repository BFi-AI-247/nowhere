---
id: compute-shortage
kind: event
title: There is not enough compute
picture: compute-shortage.jpg
stack: the-last-boom
thread: [the-power]
part: continues
after: [{card: the-power-bill, options: [0, 1, 2]}, {card: the-chip-embargo, options: [0, 1, 2, 3]}]
wait: [2, 6]
who: anyone
requires: [until:8]
reach: global
impact: 3
options:
  - text: "Sell capacity to the highest bidder."
    origin: possession:servers
    cost: {draws: 1}
    effects: [money:+4, influence:-1]
  - text: "Sell it to Europe at cost."
    origin: possession:servers
    cost: {draws: 1}
    effects: [money:+1, status:europe:+2, block:technological:+1]
  - text: "Get your hacker to find out who is hoarding."
    origin: associate:hacker
    cost: {draws: 1}
    effects: [influence:+1, follow:the-deepfake-of-the-minister:3]
  - text: "Wait."
    origin: always
    cost: {draws: 1}
    effects: [block:technological:-1]
  - text: "Pay the new price. Keep working."
    origin: block:europe
    cost: {draws: 1, money: 1}
    effects: []
  - text: "Ask a hacker you know who is hoarding."
    origin: contact:hacker
    cost: {draws: 1, influence: 1}
    effects: [influence:+1]
---
Every model needs chips, every chip needs a factory, and the factories are in two places that do not like each
other. Prices triple. Europe, which makes the machines that make the chips and almost no chips, discovers what
that means.

- *Highest bidder* – it is not Europe.
- *At cost* – you are owed something by the block.
- *Your hacker* – he finds a name. The name is in a ministry.
- *Wait* – Europe falls behind a step.
- *Pay* – your work keeps running. It costs what it costs.
- *A hacker you know* – a name, by text, with no greeting. You do not ask how.
