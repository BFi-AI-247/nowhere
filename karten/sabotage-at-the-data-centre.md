---
id: sabotage-at-the-data-centre
kind: event
title: Someone cuts the cables
picture: sabotage-at-the-data-centre.jpg
stack: the-last-boom
thread: [the-power]
part: turns
after: [{card: heatwave, options: [0, 1, 2]}, {card: the-chip-embargo, options: [0, 1]}]
wait: [6, 12]
who: anyone
requires: []
reach: block:europe
impact: 4
options:
  - text: "Condemn it, clearly, in public."
    origin: status:europe:4
    cost: {draws: 1}
    effects: [status:europe:+1, influence:+1]
  - text: "Find out who they are and why."
    origin: skill:investigation
    cost: {draws: 1}
    effects: [influence:+2, trait:+curious]
  - text: "Say you understand them."
    origin: trait:cynical
    cost: {draws: 1}
    effects: [influence:+1, acquired:+infamous, status:europe:-1]
  - text: "Check that yours are safe."
    origin: block:europe
    cost: {draws: 1, money: 1}
    effects: [trait:+preserver]
  - text: "Watch the news."
    origin: always
    cost: {draws: 1}
    effects: [block:technological:-1]
---
At three in the morning, in a field outside Frankfurt, someone cuts the fibre into Europe's second-largest data
centre with an angle grinder and leaves a note: "We were here first." The models are down for six hours across
the continent. A group nobody has heard of claims it. Their website is very well written.

- *Condemn* – it is the right thing. It sounds like the wrong side.
- *Who* – a former network engineer, a nurse, two students. None of them have records.
- *Understand* – you do. Saying it costs you.
- *Yours* – a security firm, a fence, a camera that watches the camera.
- *News* – six hours. Then everything again.
