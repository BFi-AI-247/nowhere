---
id: the-union-of-the-replaced
kind: event
title: The union of the replaced
picture: the-union-of-the-replaced.jpg
stack: the-last-boom
thread: [the-union]
part: opens
who: anyone
requires: [until:9]
reach: block:europe
impact: 3
options:
  - text: "Join. Pay the dues. Go to the meetings."
    origin: block:europe
    cost: {draws: 1, money: 1}
    effects: [influence:+2, flag:union-ally]
  - text: "Speak at the founding congress."
    origin: skill:persuasion
    cost: {draws: 1}
    effects: [influence:+2, status:europe:+1, flag:union-ally, follow:the-strike-nobody-organized:3]
  - text: "Warn them it will be bought."
    origin: trait:cynical
    cost: {draws: 1}
    effects: [influence:+1]
  - text: "Not your fight."
    origin: always
    cost: {draws: 1}
    effects: []
---
It is founded in a sports hall in Dortmund by a call-centre worker, a translator, a junior lawyer and a truck
driver. Its members have one thing in common: a model does what they used to do. By the end of the month it has
two hundred thousand members and no idea what to demand.

- *Join* – a card, a number, a Tuesday evening in a school hall.
- *Speak* – they ask you what to demand. You tell them. They remember.
- *Warn them* – you are right that someone will try. You are wrong about how hard.
- *Not your fight* – not yet.
