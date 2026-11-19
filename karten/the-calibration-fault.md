---
id: the-calibration-fault
kind: event
title: The calibration fault
picture: the-calibration-fault.jpg
stack: the-signal
thread: [the-secret]
part: opens
who: self
place: home
takes: 0
costs: 1
expires: 3
requires: [until:3]
reach: global
impact: 2
options:
  - text: "Pull the thread. Who signed the press line, and when."
    origin: skill:investigation
    cost: {draws: 1}
    effects: [flag:heard-first, influence:+1]
    check: {skill: investigation, difficulty: 2, trait: curious}
    partial: [influence:+1]
    failure: [trait:+impatient]
  - text: "Ask a hacker to look at the observatory's logs."
    origin: contact:hacker
    cost: {draws: 1, influence: 1}
    effects: [flag:heard-first]
  - text: "Ask your hacker to look at the observatory's logs."
    origin: associate:hacker
    cost: {draws: 1}
    effects: [flag:heard-first, trait:+cunning]
  - text: "Believe the press office. Most people do."
    origin: always
    cost: {draws: 1}
    effects: []
---
"A calibration fault affecting one receiver has been resolved." Fourteen words, no author, released on a Sunday.
The observatory's site has had four times its usual traffic since. Somebody in Chile is working very hard to
make nothing look like nothing.

- *Pull the thread* – the line was signed by the director and dictated by a ministry. Now you know what they know.
- *The logs* – 03:12, every eleven days. It is in the machine, whatever the press office says.
- *Believe them* – you find out in June with everyone else.
