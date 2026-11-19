---
id: the-documentary
kind: event
title: The documentary
picture: the-documentary.jpg
stack: the-signal
thread: [the-word]
part: continues
after: [{card: the-book-offer, options: [0, 1, 2]}, {card: the-hearing-on-the-hill, options: [0, 1, 2, 3]}]
wait: [4, 10]
who: self
place: home
takes: 2
costs: 1
expires: 4
requires: [month:5, until:10]
reach: personal
impact: 2
options:
  - text: "Give them two weeks and your face."
    origin: flag:heard-first
    cost: {draws: 1}
    effects: [money:+2, influence:+2, acquired:+famous]
  - text: "Give them two weeks and your face."
    origin: possession:observatory
    cost: {draws: 1}
    effects: [money:+2, influence:+1]
  - text: "Give them two weeks and your face."
    origin: skill:performance
    cost: {draws: 1}
    effects: [money:+2, influence:+1]
  - text: "Advise, off camera, for a fee."
    origin: always
    cost: {draws: 1}
    effects: [money:+1]
  - text: "No cameras."
    origin: always
    cost: {draws: 1}
    effects: [trait:+shy]
---
A crew from a streaming service, a director who has made two good films and one bad one, a budget that would run
the plateau for a year. They want the year of the signal from someone who lived it. Two weeks, your kitchen,
your face.

- *Two weeks* – the film is good. Strangers in airports know your kitchen.
- *Off camera* – the fee is smaller and so is everything else.
- *No cameras* – the film is made without you, and about you.
