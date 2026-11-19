---
id: the-second-cycle
kind: event
title: The second cycle
picture: the-second-cycle.jpg
stack: the-signal
thread: [the-plateau, the-secret]
part: turns
after: [{card: a-call-from-the-plateau, options: [0, 1, 2]}, {card: the-rumour, options: [0, 1, 2]}, {card: the-calibration-fault, options: [0, 1, 2]}]
wait: [2, 4]
who: self
place: home
takes: 0
costs: 1
expires: 3
requires: []
reach: personal
impact: 3
options:
  - text: "Write it up properly. Your name under hers."
    origin: skill:science
    cost: {draws: 1}
    effects: [flag:on-the-paper, influence:+1, trait:+honest]
    check: {skill: science, difficulty: 2}
    partial: [influence:+1]
    failure: [trait:+impatient]
  - text: "Tell your block's science ministry, before the Americans do."
    origin: always
    cost: {draws: 1, influence: 1}
    effects: [flag:told-europe, status:europe:+2]
  - text: "Tell a journalist you trust."
    origin: contact:journalist
    cost: {draws: 1}
    effects: [flag:leaked, influence:+2]
  - text: "Post it yourself, from an account with no name."
    origin: always
    cost: {draws: 1}
    effects: [flag:leaked, influence:+1, trait:+brave]
  - text: "Keep it. Eleven more days will not hurt anyone."
    origin: always
    cost: {draws: 1}
    effects: [flag:kept-secret, trait:+patient]
---
The third repetition arrives at 03:12 to the second. Rosa sends one line: "Still there." Now it is not a glitch,
and in a month it will not be a secret. The only question left is what you do with the month.

- *Write it up* – the paper that will be cited for two centuries starts as a draft on your kitchen table.
- *Your ministry* – Europe learns it from you. Someone in Brussels writes your name down.
- *A journalist* – the story is out a month early, and you chose who told it.
- *Post it yourself* – by morning it is everywhere and nobody knows it was you. Yet.
- *Keep it* – a month of knowing something nobody else knows. People pay for less.
