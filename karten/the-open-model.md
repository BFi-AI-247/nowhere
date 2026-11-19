---
id: the-open-model
kind: event
title: Somebody gives the model away
picture: the-open-model.jpg
stack: the-last-boom
thread: [your-own-model]
part: continues
after: [{card: rent-your-racks, options: [0, 1, 2]}]
wait: [4, 8]
who: anyone
requires: [until:8]
reach: global
impact: 4
options:
  - text: "Run it on your own racks tonight."
    origin: possession:servers
    cost: {draws: 1}
    effects: [flag:model-in-house, block:technological:+1, money:+1]
  - text: "Have your hacker set it up for the town."
    origin: associate:hacker
    cost: {draws: 1}
    effects: [influence:+2, flag:model-in-house, flag:town-ally]
  - text: "Sell your model shares before Monday."
    origin: skill:finance
    cost: {draws: 1}
    effects: [money:+2]
  - text: "Download it, just to have it."
    origin: block:europe
    cost: {draws: 1}
    effects: [trait:+curious]
  - text: "Read about it."
    origin: always
    cost: {draws: 1}
    effects: []
---
A lab in Paris publishes the weights of a model nearly as good as the paid ones, free, for anyone. By Sunday it runs
on a hundred thousand machines, including some it should not. The paid models cut their prices in half. Somewhere
an analyst writes the word "bubble" and does not delete it.

- *Your racks* – you have a model of your own now, for the cost of electricity.
- *The town* – your hacker builds Marta's council a model that answers the phone in Polish dialect.
- *Sell* – you are a little early. Early is a good place to be, once.
- *Download* – forty gigabytes of something nobody fully understands, on your desk.
- *Read* – the prices fall. That is the part you notice.
