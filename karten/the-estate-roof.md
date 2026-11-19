---
id: the-estate-roof
kind: event
title: The roof came in
picture: the-estate-roof.jpg
stack: personal
place: estate-eifel
who: anyone
takes: 2
costs: 1
expires: 3
arrives: board
requires: [possession:estate]
reach: personal
impact: 2
options:
  - text: "Go and fix it with the neighbours."
    origin: possession:estate
    cost: {draws: 1, money: 1}
    effects: [influence:+1, trait:+patient, trait:+generous]
  - text: "Send your pilot. He is handy and bored."
    origin: profession:pilot
    cost: {draws: 1, money: 1}
    effects: [influence:+1]
  - text: "Pay a firm. Stay where you are."
    origin: always
    cost: {draws: 1, money: 2}
    effects: []
  - text: "Tarpaulin. Deal with it in spring."
    origin: always
    cost: {draws: 1}
    effects: [trait:+impatient]
---
The barn roof, under a metre of wet snow. Eleven hectares, no signal, and a building that is now open to the sky.
Two weeks of work for anyone who goes.

- *Yourself* – two weeks of hammering with people who have known the house longer than you.
- *Your pilot* – he enjoys it more than flying, he says.
- *A firm* – it costs. It is done. You were not there.
- *Tarpaulin* – it holds, mostly. Spring is a long way off.
