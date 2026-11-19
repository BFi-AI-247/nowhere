---
id: the-apprenticeship
kind: event
title: Ten weeks on the line
picture: the-apprenticeship.jpg
stack: the-last-boom
thread: [the-ninety]
part: continues
after: [{card: the-new-foreman, options: [0, 1, 2]}, {card: yusuf-vs-the-model, options: [0, 1]}]
wait: [4, 8]
place: factory-lodz
who: self
takes: 10
costs: 1
expires: 6
arrives: board
requires: [possession:factory]
reach: personal
impact: 3
options:
  - text: "Do it. Learn the line from the people on it."
    origin: possession:factory
    cost: {draws: 1}
    effects: [influence:+3, flag:kept-humans, trait:+patient, trait:+honest]
  - text: "Do two weeks. Enough to know."
    origin: possession:factory
    takes: 2
    cost: {draws: 1}
    effects: [influence:+1]
  - text: "You own it. You do not need to work it."
    origin: always
    cost: {draws: 1}
    effects: [trait:+cynical]
---
Yusuf's idea, said half as a joke: ten weeks on the line, a shift like everyone else, before you decide anything
about the model. The ninety would see you at six in the morning. The world would run without you for a season.

- *Ten weeks* – you come back with hands that know the work. Nobody on the floor calls you by your surname again.
- *Two weeks* – a gesture. A good one. They know it was a gesture.
- *You own it* – true. It is the kind of true that costs.
