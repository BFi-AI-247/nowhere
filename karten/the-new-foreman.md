---
id: the-new-foreman
kind: event
title: The new foreman is software
picture: the-new-foreman.jpg
stack: the-last-boom
thread: [the-ninety]
part: continues
after: [{card: the-factory-needs-you, options: [0, 1, 2]}]
wait: [3, 6]
who: anyone
place: factory-lodz
takes: 1
requires: [until:8]
reach: block:europe
impact: 3
options:
  - text: "Run the line with the model."
    origin: possession:factory
    cost: {draws: 1, money: 1}
    effects: [block:economic:+1, flag:model-in-house, follow:yusuf-vs-the-model:3]
  - text: "Keep the people, pay for it."
    origin: possession:factory
    cost: {draws: 1, money: 2}
    effects: [influence:+1, flag:kept-humans]
  - text: "Let your engineer decide."
    origin: associate:engineer
    cost: {draws: 1}
    effects: [flag:kept-humans, follow:yusuf-vs-the-model:2]
  - text: "Wait."
    origin: always
    cost: {draws: 1}
    effects: [block:economic:+1]
  - text: "Visit a factory that said yes."
    origin: block:europe
    cost: {draws: 1}
    effects: [trait:+curious]
  - text: "Ask an engineer you know what the model gets wrong."
    origin: contact:engineer
    cost: {draws: 1, influence: 1}
    effects: [trait:+curious, flag:kept-humans]
---
The vendor's pitch takes eleven minutes: the model watches the line, orders parts, schedules shifts, and does not
sleep. Across Europe, factories that say yes report eight per cent more output in the first quarter. The ones
that say no report the same output and a worse mood.

- *Run it* – the numbers come. So does the question of what the ninety people are for.
- *Keep the people* – it costs you, every month. They know you did it.
- *Let your engineer decide* – he keeps the people and tests the model on one shift. He will have an opinion by spring.
- *Wait* – Europe's economy grows a little without you.
- *Visit* – you see the eight per cent, and you see the canteen.
- *An engineer you know* – he lists three failure modes. You keep a person on each of them.
