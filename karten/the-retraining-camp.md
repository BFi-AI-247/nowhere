---
id: the-retraining-camp
kind: event
title: The retraining programme
picture: the-retraining-camp.jpg
stack: the-last-boom
thread: [the-union]
part: closes
after: [{card: the-strike-nobody-organized, options: [0, 1, 2]}, {card: the-call-centre-closes, options: [0, 1, 2]}]
wait: [8, 16]
takes: 4
who: anyone
expires: 8
requires: [flag:crashed]
reach: block:europe
impact: 3
options:
  - text: "Teach a course. The one thing the model cannot."
    origin: skill:insight
    cost: {draws: 1}
    effects: [influence:+2, status:europe:+1, block:cultural:+1]
  - text: "Hire from it, before anyone else does."
    origin: possession:factory
    cost: {draws: 1}
    effects: [money:+1, influence:+1, block:economic:+1]
  - text: "Write that it is theatre."
    origin: trait:cynical
    cost: {draws: 1}
    effects: [influence:+1, acquired:+infamous, block:cultural:-1]
  - text: "Wait."
    origin: always
    cost: {draws: 1}
    effects: []
  - text: "Visit a centre and ask the students."
    origin: block:europe
    cost: {draws: 1}
    effects: [influence:+1, trait:+curious]
---
The fund from the levy, or the budget line that replaced it, opens forty centres. The courses are called things
like *Human Skills for the Model Economy*. The instructors are models. The students are the people the models
replaced. Some of it works.

- *Teach* – a room of people who were told they are obsolete, and you, saying something true.
- *Hire* – they are good, cheap, and grateful. Grateful does not last.
- *Theatre* – it is partly theatre. The part that is not reads your piece.
- *Wait* – Europe does what it does.
- *Ask the students* – they want two things: the truth, and a reason to get up at seven.
