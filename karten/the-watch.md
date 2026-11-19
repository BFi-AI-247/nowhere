---
id: the-watch
kind: event
title: The Watch
picture: the-watch.jpg
stack: the-signal
thread: [while-we-wait]
part: continues
after: [{card: the-sign, options: [0, 1, 2, 3]}]
wait: [4, 8]
who: self+1
place: home
takes: 1
costs: 1
expires: 3
requires: [month:6, until:10]
reach: block:europe
impact: 3
options:
  - text: "Go with them to the gathering. See what it is."
    origin: trait:curious
    cost: {draws: 1}
    effects: [flag:joined-the-watch, influence:+1, block:cultural:+1]
  - text: "Ask your cleric what he makes of a man who promises an answer."
    origin: associate:cleric
    cost: {draws: 1}
    effects: [influence:+1, trait:+wise]
  - text: "Say no, and say why: nobody knows, and the man who says he does is selling something."
    origin: skill:insight
    cost: {draws: 1}
    effects: [trait:+honest, block:cultural:+1]
    check: {skill: insight, difficulty: 2, trait: honest}
    partial: [trait:+honest]
    failure: [flag:joined-the-watch, trait:+cynical]
  - text: "Let them go alone."
    origin: always
    cost: {draws: 1}
    effects: [trait:+indifferent]
---
They call themselves the Watch: a movement, not a church, their leader says, though the gatherings are on
Sundays. They listen to the eleven minutes together and wait. Someone in your team has been three times and
wants you to come.

- *Go* – forty thousand people in a field in silence. You understand it. That is the dangerous part.
- *Your cleric* – "He is not lying. That is worse."
- *Say no* – your team member goes anyway. But they heard you.
- *Let them* – they come back quieter each week.
