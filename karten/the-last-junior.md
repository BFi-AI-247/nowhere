---
id: the-last-junior
kind: event
title: The last junior
picture: the-last-junior.jpg
stack: the-last-boom
thread: [the-paper-thread]
part: continues
after: [{card: the-model-that-writes-contracts, options: [0, 1]}, {card: layoffs-at-the-paper, options: [0, 1, 2]}]
wait: [4, 8]
who: anyone
requires: []
reach: block:europe
impact: 2
options:
  - text: "Take her on. Teach her the parts the model cannot do."
    origin: skill:insight
    cost: {draws: 1, money: 1}
    effects: [influence:+1, trait:+generous]
  - text: "Tell her the truth and give her a name to call."
    origin: trait:honest
    cost: {draws: 1}
    effects: [influence:+1]
  - text: "Wait."
    origin: always
    cost: {draws: 1}
    effects: [trait:+cynical]
  - text: "Buy her lunch and listen."
    origin: always
    cost: {draws: 1, money: 1}
    effects: [influence:+1, trait:+compassionate]
---
She is twenty-four, has two degrees, and has just been told that the job she trained for is now a prompt. She
asks you, because you are the only person she knows who still has the job. She does not cry. That is worse.

- *Take her on* – it costs you a salary and gives you someone who will remember it.
- *Tell her the truth* – she goes to the name you gave her. The name owes you one.
- *Wait* – you did not say anything, and you notice that about yourself.
- *Lunch* – an hour. She leaves with a plan. You leave with her number.
