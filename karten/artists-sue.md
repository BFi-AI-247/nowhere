---
id: artists-sue
kind: event
title: Ten thousand artists sue
picture: artists-sue.jpg
stack: the-last-boom
thread: [a-world-of-models]
part: turns
after: [{card: the-model-paints, options: [0, 1, 2]}]
wait: [8, 14]
who: anyone
requires: []
reach: global
impact: 3
options:
  - text: "Sign the suit, with your artist friend."
    origin: associate:artist
    cost: {draws: 1}
    effects: [influence:+1, block:cultural:+1, trait:+loyal]
  - text: "Show the plaintiffs in the gallery."
    origin: possession:cultural
    cost: {draws: 1}
    effects: [money:+1, influence:+2, block:cultural:+1]
  - text: "Ask your lawyer to take a side."
    origin: associate:lawyer
    cost: {draws: 1, money: 1}
    effects: [influence:+2, status:europe:+1]
  - text: "Buy a print from one of them."
    origin: block:europe
    cost: {draws: 1, money: 1}
    effects: [trait:+generous]
  - text: "Wait for the ruling."
    origin: always
    cost: {draws: 1}
    effects: []
  - text: "Ask an artist you know whether to sign."
    origin: contact:artist
    cost: {draws: 1, influence: 1}
    effects: [block:cultural:+1, trait:+loyal]
---
Ten thousand painters, illustrators and photographers, one class action in Luxembourg: the models learned from
our work without asking, and now they sell it back to the people who used to hire us. The companies answer that
every artist learned from someone. Both statements are true. The court will take two years.

- *Sign* – your name next to your artist friend's. He buys you a drink, for once.
- *Show them* – forty plaintiffs, forty works, a room that is a verdict.
- *Your lawyer* – she chooses the artists. It is the case of her career.
- *A print* – a small picture of a harbour, made by a woman who used to illustrate schoolbooks.
- *Wait* – the ruling comes after the year ends.
- *An artist you know* – she says sign. You sign.
