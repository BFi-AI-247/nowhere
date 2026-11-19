---
id: the-shelter-market
kind: event
title: The shelter market
picture: the-shelter-market.jpg
stack: the-signal
thread: [the-market, the-readings]
part: closes
after: [{card: the-doctors-reading, options: [0, 1, 2, 3]}, {card: what-it-says, options: [1]}]
wait: [2, 6]
who: self
place: home
takes: 0
costs: 1
expires: 3
requires: [flag:warning-known, month:10]
reach: global
impact: 3
options:
  - text: "Sell the estate to a man who wants a hill to hide under."
    origin: possession:estate
    cost: {draws: 1}
    effects: [money:+3, trait:+cunning]
    check: {skill: persuasion, difficulty: 2, trait: cunning}
    partial: [money:+2]
    failure: [money:+1, trait:+greedy]
  - text: "Write the piece: nobody knows what the warning is about, and the men selling bunkers know it least."
    origin: profession:journalist
    cost: {draws: 1}
    effects: [influence:+2, block:cultural:+1, trait:+honest]
  - text: "Open the hospital's plans. People want to know there is a plan."
    origin: profession:doctor
    cost: {draws: 1}
    effects: [influence:+2, trait:+compassionate]
  - text: "Buy nothing. Sell nothing. Sleep."
    origin: always
    cost: {draws: 1}
    effects: [trait:+calm]
---
Since the warning reading was published, land in valleys is worth twice what it was and a company in Zürich sells
a door for the price of a house. Nobody knows what the warning warns of. The shelter market does not need to.

- *Sell the hill* – a man pays for a cellar in the Eifel what a street in Lisbon costs.
- *Write it* – the bunker men hate you. Everyone else sleeps a little better.
- *The hospital's plans* – a plan for an unknown thing is still a plan. People hold on to it.
- *Sleep* – in the morning the price is higher. You slept.
