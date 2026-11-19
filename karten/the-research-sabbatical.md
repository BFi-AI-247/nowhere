---
id: the-research-sabbatical
kind: event
title: A quarter in the lab
picture: the-research-sabbatical.jpg
stack: the-last-boom
thread: [your-own-model]
part: continues
after: [{card: the-open-model, options: [0, 1, 2]}]
wait: [4, 10]
place: europe
who: profession:scientist
takes: 13
costs: 1
expires: 6
arrives: board
requires: []
reach: personal
impact: 3
options:
  - text: "Let her go. A quarter, fully paid, on the open model."
    origin: profession:scientist
    cost: {draws: 1}
    effects: [block:technological:+2, influence:+1, flag:model-in-house]
  - text: "Let her go, on condition she brings the results home."
    origin: profession:scientist
    cost: {draws: 1}
    effects: [block:technological:+1, money:+2]
  - text: "Ask her to stay. You need her this year."
    origin: always
    cost: {draws: 1}
    effects: [influence:+1, trait:+loyal]
---
The open model needs people who understand what to forget, and your scientist is one of about forty in the world.
Grenoble offers her a quarter: no teaching, no panels, a room with a window and the weights. She would go. She asks
you first, which is the kind of person she is.

- *Let her go* – three months without her. What comes back is in the model everyone uses.
- *With a condition* – she agrees. The results come home. So does a little resentment.
- *Ask her to stay* – she stays. She does not forget that you asked.
