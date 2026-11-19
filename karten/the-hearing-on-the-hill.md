---
id: the-hearing-on-the-hill
kind: event
title: The hearing on the Hill
picture: the-hearing-on-the-hill.jpg
stack: the-signal
thread: [the-word]
part: continues
after: [{card: the-lecture, options: [0, 1]}, {card: the-blocks-know, options: [0, 1, 2, 3]}]
wait: [4, 10]
who: anyone
place: usa
takes: 1
costs: 1
expires: 3
requires: [month:5, until:9]
reach: global
impact: 3
options:
  - text: "Testify. Under oath, in plain words."
    origin: flag:heard-first
    cost: {draws: 1}
    effects: [influence:+2, flag:on-the-paper, acquired:+famous]
    check: {skill: persuasion, difficulty: 3, trait: honest}
    partial: [influence:+1, flag:on-the-paper]
    failure: [acquired:+infamous, influence:-1]
  - text: "Testify. Under oath, in plain words."
    origin: associate:scientist
    cost: {draws: 1}
    effects: [influence:+2]
  - text: "Sit behind the man who testifies and write what he gets wrong."
    origin: profession:journalist
    cost: {draws: 1}
    effects: [influence:+2, trait:+cynical]
  - text: "Brief a lawyer you know on what the senators should ask."
    origin: contact:lawyer
    cost: {draws: 1, influence: 1}
    effects: [influence:+1, block:cultural:+1]
  - text: "Watch it on the evening news like everybody else."
    origin: always
    cost: {draws: 1}
    effects: []
---
Washington wants to know who knew what, when, and why a Chilean observatory on American money told the Americans
last. Four hours, nine senators, one of whom has read the paper. The room is full.

- *Testify* – you say "we do not know" eleven times. It is the most quoted testimony of the year.
- *Behind him* – the director gets three things wrong. Your piece runs at midnight.
- *Your lawyer* – the senator asks the one question that matters: who has the transmitter.
- *Evening news* – four hours cut to forty seconds. You get the forty seconds.
