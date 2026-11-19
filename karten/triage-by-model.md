---
id: triage-by-model
kind: event
title: The hospital switches triage to the model
picture: triage-by-model.jpg
stack: the-last-boom
thread: [the-minister]
part: continues
after: [{card: two-of-you-to-brussels, options: [0, 1, 2]}, {card: arjun-asks-a-favour, options: [0, 1]}]
wait: [8, 14]
who: anyone
requires: [until:9]
reach: block:europe
impact: 3
options:
  - text: "Ask your doctor to keep count, and publish it."
    origin: associate:doctor
    cost: {draws: 1}
    effects: [influence:+2, block:cultural:+1, follow:the-minister-resigns:3]
  - text: "Sit on the board and vote for it."
    origin: status:europe:5
    cost: {draws: 1}
    effects: [block:technological:+1, status:europe:+1, flag:model-in-house]
  - text: "Wait."
    origin: always
    cost: {draws: 1}
    effects: [block:technological:+1]
  - text: "Ask your own doctor what she thinks."
    origin: block:europe
    cost: {draws: 1}
    effects: [trait:+curious]
  - text: "Ask a doctor you know for the real numbers."
    origin: contact:doctor
    cost: {draws: 1, influence: 1}
    effects: [influence:+1]
---
The model sorts the emergency room now: who waits, who goes first, who goes home. Waiting times drop by a third.
Two patients in the first month go home who should not have. The board calls it a rollout. Your doctor calls it Tuesday.

- *Keep count* – the numbers become public. Someone has to answer for them.
- *Vote for it* – it is, on balance, better. You will be asked about the two.
- *Wait* – Europe gets a little faster.
- *Your doctor* – she says it is better at sorting and worse at doubting.
- *A doctor you know* – the numbers are better than feared and worse than published.
