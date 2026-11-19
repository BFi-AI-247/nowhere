---
id: the-consortiums-offer
kind: event
title: The consortium's offer
picture: the-consortiums-offer.jpg
stack: the-signal
thread: [the-consortium]
part: opens
who: self
place: home
takes: 0
costs: 1
expires: 3
requires: [month:2, until:9]
reach: personal
impact: 3
options:
  - text: "Sell him the eleven days. Cash, today."
    origin: flag:heard-first
    cost: {draws: 1}
    effects: [money:+3, flag:sold-data, trait:+greedy, gain:daniel-ross]
  - text: "Take his money as a partner, not a seller."
    origin: skill:finance
    cost: {draws: 1}
    effects: [money:+2, flag:invested, gain:daniel-ross]
    check: {skill: finance, difficulty: 3, trait: patient}
    partial: [money:+1, flag:invested, gain:daniel-ross]
    failure: [flag:sold-data, money:+1, trait:+greedy]
  - text: "Take the meeting. Take nothing else."
    origin: always
    cost: {draws: 1}
    effects: [influence:+1, gain:daniel-ross]
  - text: "Do not answer the email."
    origin: always
    cost: {draws: 1}
    effects: []
---
Daniel Ross has a consortium, a jet and a theory: whoever owns the data owns the market, and the market is the
sky. He wants the raw files, or your name on his board, or at least an hour. He pays for the hour either way.

- *Sell* – three months of money for eleven days of numbers. Rosa will find out.
- *Partner* – less money now, a share of what comes. Daniel keeps his word about money.
- *The meeting* – a man who knows everyone now knows you.
- *Do not answer* – he buys the data from someone else.
