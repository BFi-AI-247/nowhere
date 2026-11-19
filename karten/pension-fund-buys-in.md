---
id: pension-fund-buys-in
kind: event
title: The pension fund buys model stock
picture: pension-fund-buys-in.jpg
stack: the-last-boom
thread: [boom-and-bust]
part: continues
after: [{card: stock-surge, options: [0, 1]}]
wait: [3, 6]
who: anyone
requires: [until:8]
reach: block:europe
impact: 2
options:
  - text: "Write that the fund is betting pensions on a bubble."
    origin: skill:finance
    cost: {draws: 1}
    effects: [influence:+1, acquired:+infamous]
  - text: "Sell them yours at the top."
    origin: flag:went-public
    cost: {draws: 1}
    effects: [money:+3, trait:+greedy]
  - text: "Wait."
    origin: always
    cost: {draws: 1}
    effects: []
  - text: "Ask the fund, in writing, to explain."
    origin: block:europe
    cost: {draws: 1}
    effects: [influence:+1, trait:+curious]
---
The largest pension fund in the north puts four per cent of everything into the index that doubled. The press
release calls it *participation in the transformation*. Your mother's pension is in it. So is Yusuf's.

- *Write it* – you are right and unpopular, in that order.
- *Sell them yours* – a good price from people who cannot afford it.
- *Wait* – it is not your money. Yet.
- *Ask in writing* – the reply is eleven pages long and says nothing. You frame page six.
