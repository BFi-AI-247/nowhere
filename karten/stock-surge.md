---
id: stock-surge
kind: event
title: Everything that touches a model goes up
picture: stock-surge.jpg
stack: the-last-boom
thread: [boom-and-bust]
part: continues
after: [{card: the-bubble-question, options: [0, 1, 2]}]
wait: [2, 5]
who: anyone
requires: [until:8]
reach: global
impact: 2
options:
  - text: "Buy in."
    origin: skill:finance
    cost: {draws: 1, money: 2}
    effects: [follow:successful-investment:3]
  - text: "Sell what you have."
    origin: skill:finance
    cost: {draws: 1}
    effects: [money:+2]
  - text: "Ask your scientist friend which ones are real."
    origin: associate:scientist
    cost: {draws: 1}
    effects: [money:+1, influence:+1]
  - text: "Wait."
    origin: always
    cost: {draws: 1}
    effects: []
  - text: "Buy a little. Only what you can lose."
    origin: block:europe
    cost: {draws: 1, money: 1}
    effects: [follow:successful-investment:3]
  - text: "Ask a business contact for a tip."
    origin: contact:businessperson
    cost: {draws: 1, influence: 1}
    effects: [money:+1]
---
The index that tracks companies with the word *model* in their filings doubles in six weeks. Your neighbour's
cousin has made more than you did last year. The people who understand the models say it cannot last. The people
who do not understand them say the same thing and buy anyway.

- *Buy in* – you will be right for a while.
- *Sell* – you take the money and the regret.
- *Ask your scientist friend* – she names three that will survive. One of them is hers.
- *Wait* – nothing happens to you, which is a choice.
- *A little* – you are in, a bit. It feels sensible, which may be the danger.
- *A business contact* – he says get out by summer. You make a little and remember the sentence.
