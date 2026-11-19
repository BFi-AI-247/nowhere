---
id: eleven-days
kind: event
title: Eleven days
picture: eleven-days.jpg
stack: the-signal
thread: [the-spine]
part: opens
who: anyone
place: home
takes: 0
costs: 0
expires: 1
beat: 1
requires: [month:1]
reach: global
impact: 4
options:
  - text: "Read the raw data before the press office does."
    origin: skill:science
    cost: {draws: 1}
    effects: [flag:heard-first, influence:+1, trait:+curious]
    check: {skill: science, difficulty: 2, trait: curious}
    partial: [flag:heard-first]
    failure: [trait:+impatient]
  - text: "Read the raw data before the press office does."
    origin: profession:scientist
    cost: {draws: 1}
    effects: [flag:heard-first, influence:+1]
  - text: "Call the night editor. Something is up in Chile."
    origin: profession:journalist
    cost: {draws: 1}
    effects: [flag:heard-first, influence:+1, trait:+impatient]
  - text: "Ask a scientist you know what the glitch was."
    origin: contact:scientist
    cost: {draws: 1, influence: 1}
    effects: [flag:heard-first]
  - text: "Read the short item about a fault at a Chilean observatory. Turn the page."
    origin: always
    cost: {draws: 1}
    effects: []
---
On the plateau at five thousand metres a dish records a pattern at 03:12 local time. It is eleven days long, it is
not a pulsar, and at 03:12 eleven days later it is there again. Four people know. One of them has not slept since.
The press office issues a line about a calibration fault.

- *Read the data* – you are the fifth person. From here on, everything you do about it happens before the world.
- *Call the editor* – the paper will not print it yet. But the desk knows who called first.
- *Ask a scientist you know* – she tells you more than she should.
- *Turn the page* – it will find you anyway. In about three months.
