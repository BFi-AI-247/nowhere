---
id: the-consultancy
kind: event
title: The consultancy
picture: the-consultancy.jpg
stack: the-signal
thread: [while-we-wait]
part: closes
after: [{card: the-watch, options: [0, 1, 2, 3]}, {card: the-paper, options: [0, 1, 2]}]
wait: [8, 16]
who: self
place: home
takes: 1
costs: 1
expires: 4
requires: [month:9]
reach: personal
impact: 2
options:
  - text: "Advise the consortium. Two days a month, a fee that is not small."
    origin: flag:on-the-paper
    cost: {draws: 1}
    effects: [money:+2, influence:+1]
  - text: "Advise a block. They pay less and ask more."
    origin: flag:told-europe
    cost: {draws: 1}
    effects: [money:+2, status:europe:+1]
  - text: "Advise anyone who asks. You have had a year of it."
    origin: skill:science
    cost: {draws: 1}
    effects: [money:+2]
  - text: "Advise anyone who asks. You have had a year of it."
    origin: skill:finance
    cost: {draws: 1}
    effects: [money:+2]
  - text: "Advise the Watch. For nothing."
    origin: flag:joined-the-watch
    cost: {draws: 1}
    effects: [influence:+2, trait:+generous]
  - text: "Nobody needs another consultant."
    origin: always
    cost: {draws: 1}
    effects: []
---
A year ago nobody knew what you knew. Now everyone wants to pay for it: the consortium, two ministries, a bank, a
film studio, a movement in a field. The work is the same – saying what is known and stopping there – and the
fee, for once, is not.

- *The consortium* – Daniel pays on the first of the month. He always has.
- *A block* – a smaller fee and a seat closer to the table.
- *Anyone* – it is honest work and it pays.
- *The Watch* – they cannot pay. They listen, which is rarer.
