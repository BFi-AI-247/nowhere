---
id: made-by-humans
kind: event
title: "Made by humans"
picture: made-by-humans.jpg
stack: the-last-boom
thread: [the-ninety]
part: continues
after: [{card: the-apprenticeship, options: [0, 1]}, {card: the-factory-needs-you, options: [0]}]
wait: [4, 10]
who: anyone
requires: []
reach: block:europe
impact: 3
options:
  - text: "Put the label on everything you make."
    origin: possession:factory
    cost: {draws: 1}
    effects: [money:+2, flag:kept-humans, block:cultural:+1]
  - text: "Sell the label. It is a market now."
    origin: skill:finance
    cost: {draws: 1}
    effects: [money:+3, trait:+greedy]
  - text: "Hang it in the gallery as the work itself."
    origin: possession:cultural
    cost: {draws: 1}
    effects: [influence:+2, block:cultural:+1]
  - text: "Buy only things that carry it, for a month."
    origin: block:europe
    cost: {draws: 1, money: 1}
    effects: [trait:+preserver, block:cultural:+1]
  - text: "Notice it in shops."
    origin: always
    cost: {draws: 1}
    effects: []
---
A small blue label, a hand drawn in one line: made by humans. It started on cheese in the Jura. By spring it is on
furniture, bread, tax returns and one airline. It is worth eleven per cent more at the till. Nobody checks it.

- *Everything* – your housings carry a hand now. Customers pay for it, which surprises you.
- *Sell it* – you license it. Within a year it is on things a model made.
- *The gallery* – one label, framed, alone on a white wall. People queue.
- *A month* – things are more expensive and you like them more.
- *Notice* – you start looking for it without meaning to.
