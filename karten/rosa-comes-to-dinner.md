---
id: rosa-comes-to-dinner
kind: event
title: Rosa comes to dinner
picture:
stack: the-signal
thread: [the-plateau]
part: continues
after: [{card: a-call-from-the-plateau, options: [0]}]
wait: [6, 12]
who: self
place: home
takes: 0
costs: 0
expires: 3
requires: [flag:been-to-the-plateau, month:5]
reach: personal
impact: 1
arrives: draw
options:
  - text: "Cook. Do not talk about it until dessert."
    origin: always
    cost: {draws: 1}
    effects: [trait:+gregarious, influence:+1]
  - text: "Ask her the question you have not asked anyone: are you frightened?"
    origin: always
    cost: {draws: 1}
    effects: [trait:+compassionate, trait:+wise]
---
She is in Europe for a week of meetings she hates. She brings wine from the valley below the plateau and a
photograph of the dish at dawn, and for two hours nobody says the word "signal".

- *Cook* – at dessert she says: "It is still there. Every eleven days. I check, every time, as if it might not be."
- *Are you frightened* – "No," she says. "I am frightened of us."
