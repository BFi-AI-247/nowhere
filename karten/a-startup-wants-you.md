---
id: a-startup-wants-you
kind: event
title: Priya's startup wants you
picture: a-startup-wants-you.jpg
stack: the-last-boom
thread: [the-offer]
part: continues
after: [{card: the-recruiter, options: [0, 1]}]
wait: [3, 8]
requires: [until:8]
reach: personal
impact: 3
options:
  - text: "Join. Take the shares."
    origin: skill:science
    cost: {draws: 1}
    effects: [money:-1, influence:+1, flag:took-the-offer]
  - text: "Advise, take the fee, keep your name off it."
    origin: skill:technology
    cost: {draws: 1}
    effects: [money:+2]
  - text: "Say no, and tell Priya why."
    origin: trait:preserver
    cost: {draws: 1}
    effects: [influence:+1, trait:+content]
  - text: "Wait."
    origin: always
    cost: {draws: 1}
    effects: []
  - text: "Put a little money in, as a friend."
    origin: block:europe
    cost: {draws: 1, money: 1}
    effects: [influence:+1]
---
Priya calls from an office with no chairs. They have a model that forgets on purpose, a term sheet, and a slot
for someone with your name. Shares, not salary. The shares are worth either nothing or everything, and everyone
in the office has decided which.

- *Join* – you are in. Whatever happens next happens to you too.
- *Advise* – you are paid and clean.
- *Say no* – Priya listens. It is not what she wanted to hear.
- *Wait* – the slot goes to someone who did not.
- *A little money* – enough to be a friend, not enough to be ruined.
