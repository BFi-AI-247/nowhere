---
id: the-model-for-the-town-hall
kind: event
title: The town votes on the model
picture: the-model-for-the-town-hall.jpg
stack: the-last-boom
thread: [the-union]
part: continues
after: [{card: the-call-centre-closes, options: [0, 1, 2]}]
wait: [4, 8]
who: anyone
requires: []
reach: block:europe
impact: 3
options:
  - text: "Campaign for a human at the counter."
    origin: flag:town-ally
    cost: {draws: 1}
    effects: [influence:+2, status:europe:+1, block:cultural:+1]
  - text: "Campaign for the model: shorter queues."
    origin: trait:innovator
    cost: {draws: 1}
    effects: [influence:+1, block:technological:+1]
  - text: "Ask Marta what she needs."
    origin: block:europe
    cost: {draws: 1, influence: 1}
    effects: [flag:town-ally, trait:+loyal]
  - text: "Vote, and go home."
    origin: always
    cost: {draws: 1}
    effects: []
---
Marta's town holds a referendum: should the council use a model for permits, benefits and complaints? It would
save six posts and two weeks of waiting. The posts are held by people everyone knows. The waiting is endured by
people everyone knows. Turnout is the highest since 1990.

- *A human* – the counter stays. The queue stays. So does Mrs. Nowak, who knows your name.
- *The model* – permits in a day. Mrs. Nowak retires early.
- *Marta* – she needs a hall, a printer and someone from outside who will say it on television.
- *Vote* – it is close. It is decided without you.
