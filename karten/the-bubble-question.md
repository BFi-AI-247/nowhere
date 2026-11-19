---
id: the-bubble-question
kind: event
title: Someone asks whether it is a bubble
picture: the-bubble-question.jpg
stack: the-last-boom
thread: [boom-and-bust]
part: opens
who: anyone
requires: [until:8]
reach: global
impact: 2
options:
  - text: "Say yes, on television."
    origin: trait:honest
    cost: {draws: 1}
    effects: [influence:+1, money:-1, acquired:+famous]
  - text: "Say no, and mean it."
    origin: trait:ambitious
    cost: {draws: 1}
    effects: [money:+1, influence:+1]
  - text: "Say it depends, and explain on what."
    origin: skill:science
    cost: {draws: 1}
    effects: [influence:+2, trait:+wise]
  - text: "Wait."
    origin: always
    cost: {draws: 1}
    effects: []
  - text: "Answer with a story from your own year."
    origin: block:europe
    cost: {draws: 1}
    effects: [influence:+1, trait:+honest]
---
It is asked on a Sunday evening programme by a presenter who wants a yes or a no. Everyone who says yes has been
wrong for eighteen months. Everyone who says no has been right and is rich. You are asked.

- *Yes* – you lose a little money and gain a sentence people will quote later.
- *No* – the market agrees with you, for now.
- *It depends* – nobody quotes it. It is the only true answer.
- *Wait* – someone else answers.
- *Your own year* – not yes or no. A story. It is the clip that travels.
