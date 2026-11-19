---
id: the-prophet
kind: event
title: The prophet
picture: the-prophet.jpg
stack: the-signal
thread: [while-we-wait]
part: turns
after: [{card: the-watch, options: [0]}]
wait: [4, 8]
who: self
place: europe
takes: 1
costs: 1
expires: 3
requires: [flag:joined-the-watch, month:7]
reach: block:europe
impact: 3
options:
  - text: "Meet him. Ask him the one question: what if it never says anything?"
    origin: skill:insight
    cost: {draws: 1}
    effects: [influence:+2, trait:+wise, block:cultural:+1]
    check: {skill: insight, difficulty: 3, trait: calm}
    partial: [influence:+1]
    failure: [trait:+faithful, flag:joined-the-watch]
  - text: "Write what you saw in the field: forty thousand people and one microphone."
    origin: profession:journalist
    cost: {draws: 1}
    effects: [influence:+2, flag:left-the-watch, trait:+honest]
  - text: "Stay. Whatever it is, it is the only place where people wait together."
    origin: always
    cost: {draws: 1}
    effects: [trait:+faithful, block:cultural:+1]
  - text: "Leave quietly. Take your team member with you."
    origin: always
    cost: {draws: 1}
    effects: [flag:left-the-watch, trait:+loyal]
---
The Watch has a leader now, which it said it would never have. He has a voice, a following and, since the
silence, a date. He says the pattern will speak plainly on the first of November and the ones who were watching
will be answered. He has asked to meet you. You were there first; he wants that on his stage.

- *The question* – he has no answer. He is honest enough to say so. Nobody else in the tent hears it.
- *Write it* – the piece ends the Watch for some and makes it for others. You are out.
- *Stay* – the first of November is in three months. You will be in the field.
- *Leave* – your team member comes. Quietly, and not all the way.
