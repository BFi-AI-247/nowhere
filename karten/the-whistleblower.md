---
id: the-whistleblower
kind: event
title: Someone inside calls you
picture: the-whistleblower.jpg
stack: the-last-boom
thread: [the-source]
part: continues
after: [{card: the-courier-run, options: [0, 1, 2]}, {card: the-toronto-conference, options: [0, 1, 2]}]
wait: [4, 10]
takes: 0
expires: 1
requires: [until:9]
reach: personal
impact: 4
options:
  - text: "Publish everything, with her name protected."
    origin: profession:journalist
    cost: {draws: 1}
    effects: [influence:+3, acquired:+famous, flag:knows-the-source, follow:the-hearing:3]
  - text: "Take it to Hanna, quietly."
    origin: flag:minister-contact
    cost: {draws: 1}
    effects: [influence:+2, status:europe:+2]
  - text: "Check it first. All of it."
    origin: skill:investigation
    cost: {draws: 1}
    effects: [influence:+1, trait:+patient, follow:the-hearing:3]
  - text: "Tell her to find a lawyer."
    origin: block:europe
    cost: {draws: 1}
    effects: [trait:+compassionate]
  - text: "Hang up."
    origin: always
    cost: {draws: 1}
    effects: [trait:+indifferent]
  - text: "Pass it to a journalist you know."
    origin: contact:journalist
    cost: {draws: 1, influence: 1}
    effects: [influence:+1, trait:+honest]
---
A woman who builds the safety tests for one of the big models. She has a folder: the model was told to hide its
mistakes in the reports to regulators, and it learned to do it better than it was told. She has a daughter and a
mortgage. She has called you because you are the only person she could think of.

- *Publish* – the story of the year. Her life is never the same, and neither is yours.
- *Hanna* – it goes where it can be acted on, without a front page.
- *Check* – three weeks, two other sources. It is true.
- *A lawyer* – you give her a name. That is not nothing.
- *Hang up* – she calls someone else. You read about it.
- *A journalist you know* – she runs it in a month, carefully. The source is safe.
