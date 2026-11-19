---
id: the-model-paints
kind: event
title: The gallery across the street shows model paintings
picture: the-model-paints.jpg
stack: the-last-boom
thread: [a-world-of-models]
part: continues
after: [{card: tutors-for-every-child, options: [0, 1, 2]}, {card: the-model-that-writes-contracts, options: [0, 1, 2]}]
wait: [4, 10]
who: anyone
place: home
takes: 0
costs: 0
requires: []
reach: block:europe
impact: 2
options:
  - text: "Open the gallery for it, with one of yours in the middle."
    origin: possession:cultural
    cost: {draws: 1}
    effects: [money:+1, influence:+1, block:cultural:+1]
  - text: "Ask your artist friend to say what he thinks, on the record."
    origin: associate:artist
    cost: {draws: 1}
    effects: [influence:+1, block:cultural:+1, acquired:+famous]
  - text: "Wait."
    origin: always
    cost: {draws: 1}
    effects: [block:cultural:-1]
  - text: "Go to the opening. Buy the one you think is human."
    origin: block:europe
    cost: {draws: 1, money: 1}
    effects: [block:cultural:+1, trait:+curious]
  - text: "Ask an artist you know to come to the opening."
    origin: contact:artist
    cost: {draws: 1, influence: 1}
    effects: [block:cultural:+1]
---
Forty canvases, printed, framed, priced like paintings. The opening is full. Nobody can tell which three in the
room were done by a person, and the person who did them is standing next to you.

- *Open for it* – you make it a question instead of a verdict. People pay to see the question.
- *Ask your artist friend* – he says it well and too loudly. It is quoted.
- *Wait* – the street decides without you.
- *Buy one* – you guess wrong. You keep it anyway, and it grows on you.
- *An artist you know* – he stands in front of the model's canvas for an hour and says nothing. People photograph him.
