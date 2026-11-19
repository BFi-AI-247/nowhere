---
id: the-power-bill
kind: event
title: The power bill doubles
picture: the-power-bill.jpg
stack: the-last-boom
thread: [the-power]
part: opens
who: anyone
requires: []
reach: block:europe
impact: 3
options:
  - text: "Sell the park's power to the data centres."
    origin: possession:energy
    cost: {draws: 1}
    effects: [money:+3, block:technological:+1]
  - text: "Sell it to the town at last year's price."
    origin: possession:energy
    cost: {draws: 1}
    effects: [money:+1, influence:+2, status:europe:+1]
  - text: "Lock in a price for two years."
    origin: skill:finance
    cost: {draws: 1}
    effects: [money:+1]
  - text: "Pay it."
    origin: block:europe
    cost: {draws: 1, money: 1}
    effects: []
  - text: "Turn the heating down."
    origin: always
    cost: {draws: 1}
    effects: [trait:+content]
---
Every model needs a data centre, every data centre needs a power station, and in the second winter of the Boom
there are not enough power stations. The bill arrives in a green envelope. It has doubled. The letter blames
"structural demand", which is a way of saying: the machines are warmer than you are.

- *Sell to the data centres* – the price is extraordinary. The town is cold.
- *Sell to the town* – you lose money and gain four thousand people.
- *Lock in* – boring, safe, right.
- *Pay it* – it costs what it costs.
- *Turn it down* – a jumper indoors. You get used to it.
