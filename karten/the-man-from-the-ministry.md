---
id: the-man-from-the-ministry
kind: event
title: The man from the ministry
picture: the-man-from-the-ministry.jpg
stack: the-signal
thread: [the-secret]
part: turns
after: [{card: the-second-cycle, options: [4]}]
wait: [2, 5]
who: self
place: home
takes: 0
costs: 1
expires: 2
requires: [flag:kept-secret, month:3, until:5]
reach: block:europe
impact: 3
options:
  - text: "Give him the files and your reading of them. Ask for nothing."
    origin: always
    cost: {draws: 1}
    effects: [status:europe:+2, flag:told-europe, trait:+loyal]
  - text: "Give him the files. Name your price."
    origin: skill:persuasion
    cost: {draws: 1}
    effects: [money:+2, status:europe:+1, flag:told-europe, trait:+cunning]
  - text: "Tell him you have nothing he does not."
    origin: skill:deception
    cost: {draws: 1}
    effects: [trait:+cunning, influence:+1]
    check: {skill: deception, difficulty: 3}
    partial: []
    failure: [status:europe:-2, acquired:+wanted]
  - text: "Tell him the truth: you kept it because nobody asked."
    origin: always
    cost: {draws: 1}
    effects: [status:europe:-1, trait:+honest]
---
He is polite, he has a lanyard, and he knows that you have had the eleven days since February and told nobody.
He would like them now. He would also like to know why.

- *Give them, ask nothing* – he writes down that you are a person who can be relied on. In Brussels that is a
  career.
- *Name your price* – he pays. He also writes down that you have a price.
- *Nothing he does not have* – if he believes you, you keep your month. If he does not, you are on a list.
- *The truth* – he does not understand it. He writes it down anyway.
