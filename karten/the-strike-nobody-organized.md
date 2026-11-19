---
id: the-strike-nobody-organized
kind: event
title: The strike nobody organised
picture: the-strike-nobody-organized.jpg
stack: the-last-boom
thread: [the-paper-thread, the-union]
part: turns
after: [{card: layoffs-at-the-paper, options: [0, 1, 2]}, {card: the-union-of-the-replaced, options: [0, 1, 2]}]
wait: [4, 10]
who: anyone
takes: 1
expires: 1
requires: []
reach: block:europe
impact: 3
options:
  - text: "Stand in front of it and give it a name."
    origin: skill:persuasion
    cost: {draws: 1}
    effects: [influence:+3, status:europe:+1, flag:union-ally, acquired:+famous]
  - text: "Keep the factory running through it."
    origin: possession:factory
    cost: {draws: 1}
    effects: [money:+1, influence:-2, flag:burned-bridges]
  - text: "Close the factory for the day, in solidarity."
    origin: flag:kept-humans
    cost: {draws: 1}
    effects: [money:-1, influence:+2, status:europe:+1]
  - text: "Wait."
    origin: always
    cost: {draws: 1}
    effects: [block:economic:-1]
  - text: "Stay home in solidarity."
    origin: block:europe
    cost: {draws: 1}
    effects: [influence:+1, flag:union-ally]
---
On a Monday in May, three hundred thousand people in six countries do not go to work, and nobody called it. No
union, no leader, one message that went around on Sunday night. The models keep running. The trains do not.

- *Give it a name* – you are now the face of something that did not have one.
- *Keep running* – the line does not stop. The town remembers that the line did not stop.
- *Close for the day* – you lose a day and gain ninety people.
- *Wait* – Europe loses a little.
- *Stay home* – one of three hundred thousand. Your street is quiet all day.
