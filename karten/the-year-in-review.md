---
id: the-year-in-review
kind: event
title: The year in review
picture: the-year-in-review.jpg
stack: the-signal
thread: [the-word]
part: closes
after: [{card: the-book-comes-out, options: [0, 1]}, {card: the-documentary, options: [0, 1, 2, 3]}, {card: the-paper, options: [0, 1, 2]}]
wait: [6, 16]
who: self
place: home
takes: 1
costs: 1
expires: 3
requires: [month:11]
reach: global
impact: 2
options:
  - text: "Give the interview everyone wants: the year, from January, in your words."
    origin: flag:heard-first
    cost: {draws: 1}
    effects: [money:+2, influence:+2]
  - text: "Write it yourself. Eleven thousand words."
    origin: profession:journalist
    cost: {draws: 1}
    effects: [money:+2, influence:+1]
  - text: "Write it yourself. Eleven thousand words."
    origin: flag:on-the-paper
    cost: {draws: 1}
    effects: [money:+2, influence:+1]
  - text: "Say one sentence to one paper and go for a walk."
    origin: always
    cost: {draws: 1}
    effects: [influence:+1, trait:+content]
---
Every outlet on earth is doing the year of the signal. They want someone who was there in January and is still
standing in December, which is a shorter list than it sounds.

- *The interview* – an hour, a fee, a photograph you will not like.
- *Eleven thousand words* – the long piece. It is quoted for years. So is the fee.
- *One sentence* – "It is still there." They print it. You walk.
