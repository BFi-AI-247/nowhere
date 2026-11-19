---
id: a-friend-needs-money
kind: event
title: A friend needs money
picture: a-friend-needs-money.jpg
stack: personal
takes: 0
costs: 0
requires: []
reach: personal
impact: 2
options:
  - text: "Give it. Do not call it a loan."
    origin: trait:generous
    cost: {draws: 1, money: 3}
    effects: [influence:+1, trait:+loyal]
  - text: "Lend it, on paper."
    origin: skill:finance
    cost: {draws: 1, money: 2}
    effects: [money:+1]
  - text: "Help him find work instead."
    origin: always
    cost: {draws: 1, influence: 1}
    effects: [trait:+compassionate]
  - text: "Say you cannot right now."
    origin: always
    cost: {draws: 1}
    effects: [trait:+greedy]
---
He was a sound engineer for twenty years. The model mixes now. He asks on the phone, which is how you know how bad
it is, because he would never ask to your face. It is three months' rent. He says he will pay it back. He believes it.

- *Give it* – he does not pay it back. He does not need to. He is at your door when you need someone.
- *Lend it* – he pays it back in eleven instalments, the last one with a note.
- *Work* – you make three calls. The third one hires him.
- *Not now* – he says he understands. You both know what that means.
