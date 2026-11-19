---
id: a-call-from-the-plateau
kind: event
title: A call from the plateau
picture: a-call-from-the-plateau.jpg
stack: the-signal
thread: [the-plateau]
part: opens
who: self
place: home
takes: 0
costs: 1
expires: 3
requires: [flag:heard-first, until:3]
reach: personal
impact: 3
options:
  - text: "Fly out. Two weeks at five thousand metres."
    origin: always
    cost: {draws: 1, money: 1}
    effects: [gain:rosa-almeida, flag:been-to-the-plateau, trait:+curious, follow:the-second-cycle:2]
    check: {skill: science, difficulty: 2, trait: curious}
    partial: [gain:rosa-almeida, follow:the-second-cycle:2]
    failure: [trait:+impatient, follow:the-second-cycle:2]
  - text: "Send your scientist. She speaks the language."
    origin: associate:scientist
    cost: {draws: 1}
    effects: [gain:rosa-almeida, follow:the-second-cycle:2]
  - text: "Ask her to send the files and stay where you are."
    origin: skill:science
    cost: {draws: 1}
    effects: [influence:+1, follow:the-second-cycle:2]
  - text: "Thank her. Say you will think about it."
    origin: always
    cost: {draws: 1}
    effects: [trait:+indifferent]
---
A number you do not know, a voice that has not slept. Rosa Almeida read your name on a list of people who had
asked for the data and she wants one person outside the funding chain to have seen it before the press office
decides what it is. She says: come, or send someone who can read a spectrum.

- *Fly out* – the plateau, the container, the screen. You see the eleven days with your own eyes and she stays in
  your life.
- *Send your scientist* – she comes back with Rosa's trust and Rosa's number.
- *The files* – you have them. Having them is not the same as having been there.
- *Think about it* – she does not call again.
