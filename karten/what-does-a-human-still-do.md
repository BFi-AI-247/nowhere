---
id: what-does-a-human-still-do
kind: event
title: What does a human still do
picture: what-does-a-human-still-do.jpg
stack: the-last-boom
thread: [boom-and-bust]
part: continues
after: [{card: crash-tuesday, options: [0, 1, 2, 3, 4]}]
wait: [3, 8]
who: anyone
requires: [flag:crashed]
reach: block:europe
impact: 3
options:
  - text: "Answer it with a painting."
    origin: associate:artist
    cost: {draws: 1}
    effects: [block:cultural:+2, influence:+1]
  - text: "Answer it with a sermon."
    origin: associate:cleric
    cost: {draws: 1}
    effects: [block:cultural:+1, trait:+faithful]
  - text: "Answer it with a number."
    origin: skill:science
    cost: {draws: 1}
    effects: [block:technological:+1, trait:+wise]
  - text: "Wait."
    origin: always
    cost: {draws: 1}
    effects: [block:cultural:-1]
  - text: "Write your own answer and post it."
    origin: block:europe
    cost: {draws: 1}
    effects: [influence:+1, block:cultural:+1]
  - text: "Ask a cleric you know to answer it."
    origin: contact:cleric
    cost: {draws: 1, influence: 1}
    effects: [block:cultural:+1]
---
The question is on the cover of the magazine that still prints, in the parliament, on the wall of the gallery,
in Oskar's parish newsletter. Europe, being Europe, holds a conference about it. The conference is well
attended. Nobody at it has a job that a model could not do, and they all know it.

- *A painting* – David makes one. It is not good. It is the right answer.
- *A sermon* – Oskar says the models are a test. For once, people listen.
- *A number* – you say what the models cannot do, precisely. It is a short list and a true one.
- *Wait* – the question stays on the cover.
- *Your answer* – two sentences. Somebody prints them on a T-shirt.
- *A cleric you know* – one sermon, printed in a paper that does not usually print sermons.
