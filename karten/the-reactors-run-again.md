---
id: the-reactors-run-again
kind: event
title: The reactors run again
picture: the-reactors-run-again.jpg
stack: the-last-boom
thread: [the-power]
part: closes
after: [{card: sabotage-at-the-data-centre, options: [0, 1, 2]}, {card: heatwave, options: [0, 1, 2]}]
wait: [8, 16]
who: anyone
requires: []
reach: block:europe
impact: 4
options:
  - text: "Testify for it: Europe needs the power."
    origin: status:europe:4
    cost: {draws: 1}
    effects: [status:europe:+1, block:technological:+1, trait:+innovator]
  - text: "Testify against it: not for the machines."
    origin: status:europe:4
    cost: {draws: 1}
    effects: [status:europe:+1, block:cultural:+1, trait:+preserver]
  - text: "Ask your engineer what he would do."
    origin: associate:engineer
    cost: {draws: 1}
    effects: [influence:+1, trait:+wise]
  - text: "Sign the petition, either one."
    origin: block:europe
    cost: {draws: 1}
    effects: [influence:+1]
  - text: "Let others argue."
    origin: always
    cost: {draws: 1}
    effects: [block:technological:+1]
  - text: "Ask an engineer you know what she would do."
    origin: contact:engineer
    cost: {draws: 1, influence: 1}
    effects: [trait:+wise]
---
Three reactors that were meant to close in 2025 will run until 2040, because the data centres need them. The
plan is announced on a Friday afternoon. By Monday there are two petitions, each with a million names, and a
fifty-year-old argument has a new reason in it.

- *For* – the lights stay on and the models with them.
- *Against* – you say no to the machines, not to the atom. Some people hear the difference.
- *Your engineer* – he has worked next to a reactor. His answer is shorter than you expect.
- *Petition* – your name among two million.
- *Others* – the reactors run.
- *An engineer you know* – her answer is one sentence. You quote it for years.
