---
id: the-first-model-ceo
kind: event
title: A company names a model as its CEO
picture: the-first-model-ceo.jpg
stack: the-last-boom
thread: [the-offer]
part: turns
after: [{card: a-startup-wants-you, options: [0, 1, 2]}]
wait: [6, 12]
who: anyone
requires: [until:8]
reach: global
impact: 3
options:
  - text: "Buy shares. If it works, it works."
    origin: skill:finance
    cost: {draws: 1, money: 2}
    effects: [follow:the-model-ceo-reports:3]
  - text: "Ask your lawyer whether it is legal."
    origin: associate:lawyer
    cost: {draws: 1}
    effects: [influence:+2, status:europe:+1]
  - text: "Say on air what a CEO is for."
    origin: skill:persuasion
    cost: {draws: 1}
    effects: [influence:+1, acquired:+famous]
  - text: "Laugh, and send it to a friend."
    origin: block:europe
    cost: {draws: 1}
    effects: [trait:+cynical]
  - text: "Ignore it."
    origin: always
    cost: {draws: 1}
    effects: []
  - text: "Ask a lawyer you know whether it is legal."
    origin: contact:lawyer
    cost: {draws: 1, influence: 1}
    effects: [status:europe:+1]
---
A logistics firm in Rotterdam, two thousand employees, announces that its new chief executive is a model. A
human chair signs what the law requires a human to sign. The press release has a photograph of an empty chair.
The share price rises nine per cent before lunch.

- *Buy* – you will know in four months whether you were early or a fool.
- *Your lawyer* – she finds the paragraph that says a company must be led by a person. It is ambiguous.
- *On air* – you say a CEO is the person who is blamed. The clip travels.
- *Laugh* – it is funny, until it is not.
- *Ignore* – the chair stays empty.
- *A lawyer you know* – she finds the paragraph. It is ambiguous. So is she.
