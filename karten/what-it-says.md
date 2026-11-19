---
id: what-it-says
kind: event
title: What it says
picture: what-it-says.jpg
stack: the-signal
thread: [the-spine, the-readings]
part: turns
who: anyone
place: home
takes: 0
costs: 0
expires: 1
beat: 10
requires: [month:10]
reach: global
impact: 5
options:
  - text: "Publish the reading: it is a set of instructions."
    origin: flag:read-blueprint
    cost: {draws: 1}
    effects: [flag:blueprint-known, influence:+2, block:technological:+2, acquired:+famous]
    check: {skill: science, difficulty: 3}
    partial: [flag:blueprint-known, influence:+1]
    failure: [flag:blueprint-known, acquired:+infamous]
  - text: "Publish the reading: it is a warning."
    origin: flag:read-warning
    cost: {draws: 1}
    effects: [flag:warning-known, influence:+2, block:military:+1, block:cultural:+1]
  - text: "Publish the reading: it is a ledger. Somebody is counting."
    origin: flag:read-ledger
    cost: {draws: 1}
    effects: [flag:ledger-known, influence:+2, block:economic:+1, trait:+suspicious]
  - text: "Lend your name to the instructions reading. You did not do the work; you believe it."
    origin: always
    cost: {draws: 1, influence: 2}
    effects: [flag:blueprint-known, block:technological:+1]
  - text: "Lend your name to the warning reading."
    origin: always
    cost: {draws: 1, influence: 2}
    effects: [flag:warning-known, block:military:+1]
  - text: "Stand behind the team that cracked it, whoever they are."
    origin: flag:on-the-paper
    cost: {draws: 1}
    effects: [influence:+1, status:europe:+1]
  - text: "Read the three readings. Believe the one that frightens you least."
    origin: always
    cost: {draws: 1}
    effects: [trait:+indifferent]
---
Three teams, three readings, one week. The pattern is numbers; everybody agrees on that. One team says the numbers
describe a shape – a ring, dimensions, a material. One says they describe a date and a place and a thing to avoid.
One says they are a tally: how many, how often, and that the count has gone up since Tuesday.

- *Instructions* – the ring can be built. Someone will start before the ink is dry.
- *Warning* – the generals read it before the public does.
- *Ledger* – the market reads it before anyone does, and the market does not like being counted.
- *Stand behind the team* – your name is on the paper. You do not have to pick a reading to be right.
- *Believe the least frightening* – that is what most people do.
