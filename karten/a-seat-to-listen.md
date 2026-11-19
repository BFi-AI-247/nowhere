---
id: a-seat-to-listen
kind: event
title: A seat to listen
picture: a-seat-to-listen.jpg
stack: the-signal
thread: [orbit]
part: opens
who: self
place: the-space-station
takes: 8
costs: 1
expires: 3
requires: [month:6, until:9]
reach: global
impact: 4
options:
  - text: "Take the seat. Eight weeks up there with the receiver."
    origin: skill:athletics
    cost: {draws: 1, money: 2}
    effects: [flag:listened-from-orbit, influence:+2, trait:+brave, acquired:+famous]
    check: {skill: athletics, difficulty: 3, trait: brave}
    partial: [flag:listened-from-orbit, influence:+1]
    failure: [money:-1, trait:+craven]
  - text: "Take the seat. Eight weeks up there with the receiver."
    origin: profession:pilot
    cost: {draws: 1, money: 1}
    effects: [flag:listened-from-orbit, influence:+2, acquired:+famous]
  - text: "Buy the seat for your scientist. She comes back with the cleanest data on earth."
    origin: associate:scientist
    cost: {draws: 1, money: 3}
    effects: [flag:listened-from-orbit, influence:+1, block:technological:+2]
  - text: "Stay on the ground. The ground has dishes too."
    origin: always
    cost: {draws: 1}
    effects: []
---
The station is putting a receiver on its outside and wants someone inside it who is not a block. The foundation
has a seat and a bill. Eight weeks, sixteen sunrises a day, the eleven days with nothing in between you and them
but vacuum.

- *Take it* – you are gone for two months. When you come back everyone wants to know what it sounded like up there.
- *Your scientist* – she comes down in October with data nobody can argue with, and a look you cannot describe.
- *Stay* – the seat goes to a general.
