---
id: the-loan-model
kind: event
title: The bank's model wants a word
picture: the-loan-model.jpg
stack: the-last-boom
thread: [a-world-of-models]
part: continues
after: [{card: the-insurance-model, options: [0, 1, 2]}]
wait: [4, 10]
requires: []
reach: personal
impact: 2
options:
  - text: "Show it the numbers it did not ask for."
    origin: skill:finance
    cost: {draws: 1}
    effects: [money:+2]
  - text: "Change banks. Today."
    origin: trait:impatient
    cost: {draws: 1}
    effects: [money:+1]
  - text: "Call the branch manager you have known for years."
    origin: block:europe
    cost: {draws: 1, influence: 1}
    effects: [money:+2]
  - text: "Accept the new rate."
    origin: always
    cost: {draws: 1}
    effects: [money:-1]
---
Your credit line is "under review". The model has noticed that people in your postcode, with your kind of work,
in this year, default more often than they used to. It is not about you. It is about everyone like you, which turns
out to be the same thing.

- *Numbers* – you upload four years of accounts. The model apologises, in its way.
- *Change banks* – the other bank uses the same model. The rate is a little better.
- *The manager* – he is still there, two floors up, without a desk. He makes a call.
- *Accept* – a little more every month.
