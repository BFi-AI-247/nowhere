---
id: the-offer-for-the-factory
kind: event
title: Someone wants to buy the factory
picture: the-offer-for-the-factory.jpg
stack: the-last-boom
thread: [the-ninety]
part: turns
after: [{card: the-factory-needs-you, options: [0, 1, 2]}]
wait: [10, 18]
who: anyone
place: home
takes: 0
expires: 4
requires: [possession:factory]
reach: block:europe
impact: 3
options:
  - text: "Sell. Take the money."
    origin: possession:factory
    cost: {draws: 1}
    effects: [money:+5, lose:factory-lodz, flag:sold-factory, follow:the-town-meeting:3]
  - text: "Sell half, keep the vote."
    origin: skill:finance
    cost: {draws: 1}
    effects: [money:+3, influence:+1, flag:went-public]
  - text: "Refuse, and say why to the people."
    origin: possession:factory
    cost: {draws: 1}
    effects: [influence:+2, status:europe:+1, flag:kept-humans, trait:+loyal]
  - text: "Wait."
    origin: always
    cost: {draws: 1}
    effects: []
---
A fund from nowhere in particular offers four times what the factory earned last year. They do not want the
line. They want the building, the power contract and the permits. The offer is open for a month.

- *Sell* – you are rich and the town is a building.
- *Sell half* – you keep a seat and lose the right to say you own it.
- *Refuse* – ninety people hear about it the same evening.
- *Wait* – the month runs out, and so does the offer.
