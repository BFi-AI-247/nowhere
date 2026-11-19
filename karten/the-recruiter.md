---
id: the-recruiter
kind: event
title: A recruiter calls
picture: the-recruiter.jpg
stack: the-last-boom
thread: [the-offer]
part: opens
requires: []
reach: personal
impact: 2
options:
  - text: "Hear the offer. Use it to raise your price."
    origin: trait:ambitious
    cost: {draws: 1}
    effects: [money:+2]
  - text: "Take the job at the model company."
    origin: block:europe
    cost: {draws: 1}
    effects: [money:+3, influence:-1, flag:took-the-offer, trait:+ambitious]
  - text: "Ask her who else she has called."
    origin: skill:insight
    cost: {draws: 1}
    effects: [influence:+1]
  - text: "Not interested."
    origin: always
    cost: {draws: 1}
    effects: [trait:+loyal]
---
Her voice is warm and her information is perfect. The company makes the model that is replacing people like the
people you know. They need someone who "understands the human side". The salary is twice yours. The title has the
word "trust" in it.

- *Raise your price* – you mention the call at the right moment. It works.
- *Take it* – a lanyard, a glass building, a very good canteen.
- *Who else* – she laughs and tells you. It is a useful list.
- *Not interested* – she says she will call again in six months. She will.
