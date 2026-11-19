---
id: the-courier-run
kind: event
title: Something has to be carried by hand
picture: the-courier-run.jpg
stack: the-last-boom
thread: [the-source]
part: opens
place: india
who: anyone
takes: 2
costs: 1
expires: 3
arrives: board
requires: []
reach: global
impact: 3
options:
  - text: "Send your spy. It is his kind of errand."
    origin: profession:spy
    cost: {draws: 1}
    effects: [influence:+2, money:+2, flag:knows-the-source]
  - text: "Send your pilot. He asks no questions."
    origin: profession:pilot
    cost: {draws: 1}
    effects: [money:+2, influence:+1]
  - text: "Go yourself. Know what you are carrying."
    origin: trait:curious
    cost: {draws: 1}
    effects: [influence:+2, trait:+brave, acquired:+wanted]
  - text: "Decline. You are not a courier."
    origin: always
    cost: {draws: 1}
    effects: [trait:+just]
---
A drive, the size of a thumb, that cannot go over any network: the weights of something, or the evidence of
something, or both. It has to be in Bangalore in two weeks, in a hand that was in Europe when it left. The people
asking pay well and explain nothing.

- *Your spy* – he is back in two weeks with a tan and no comment.
- *Your pilot* – he flies it himself, in a plane with no transponder. Legal, he says. Mostly.
- *Yourself* – you open the drive on the plane. You wish you had not.
- *Decline* – someone else carries it. You read about it in the spring.
