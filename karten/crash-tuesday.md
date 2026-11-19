---
id: crash-tuesday
kind: event
title: Crash Tuesday
picture: crash-tuesday.jpg
stack: the-last-boom
thread: [boom-and-bust]
part: turns
takes: 0
costs: 0
expires: 1
beat: 9
requires: [month:9]
reach: global
impact: 5
options:
  - text: "Sell everything before noon."
    origin: skill:finance
    cost: {draws: 1}
    effects: [money:+1, trait:+cunning, flag:crashed]
  - text: "Buy what everyone is selling."
    origin: trait:brave
    cost: {draws: 1, money: 3}
    effects: [flag:crashed]
  - text: "Walk into the newsroom and start writing."
    origin: profession:journalist
    cost: {draws: 1}
    effects: [influence:+3, acquired:+famous, flag:crashed]
  - text: "Wait."
    origin: always
    cost: {draws: 1}
    effects: [money:-2, block:economic:-2, acquired:+indebted, flag:crashed]
  - text: "Call everyone who owes you."
    origin: block:europe
    cost: {draws: 1, influence: 2}
    effects: [money:+2, flag:crashed]
---
The index that doubled loses sixty per cent between the opening bell and lunch. Priya's startup is worth nothing
by two. The pension fund issues a statement at four. The models keep running, which is the strangest part: the
thing that caused it does not notice.

- *Sell* – you keep something. Not much.
- *Buy* – you are either a fool or the person who owns the next decade.
- *Write* – it is the only day in the twelve months that is only yours.
- *Wait* – you lose what everyone loses, and owe what everyone owes.
- *Call in favours* – four calls, two yes. It keeps the lights on.
