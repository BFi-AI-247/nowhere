---
id: the-doctors-reading
kind: event
title: The doctor's reading
picture: the-doctors-reading.jpg
stack: the-signal
thread: [the-readings]
part: opens
who: self
place: home
takes: 2
costs: 1
expires: 4
requires: [month:6, until:10]
reach: personal
impact: 3
options:
  - text: "Two weeks with the numbers. They are not a shape. They are a sequence."
    origin: skill:medicine
    cost: {draws: 1}
    effects: [flag:read-warning, influence:+1, block:cultural:+1]
    check: {skill: medicine, difficulty: 3, trait: patient}
    partial: [flag:read-warning]
    failure: [trait:+wrathful]
  - text: "Ask a doctor you know to look at the repeat. It is a protein, she thinks."
    origin: contact:doctor
    cost: {draws: 1, influence: 1}
    effects: [flag:read-warning]
  - text: "Give the repeat to your doctor. She goes quiet for a week."
    origin: associate:doctor
    cost: {draws: 1}
    effects: [flag:read-warning, influence:+1]
  - text: "Two weeks with the numbers and a biology textbook."
    origin: always
    cost: {draws: 1}
    effects: [flag:read-warning, trait:+curious]
    check: {skill: medicine, difficulty: 4}
    partial: [trait:+curious]
    failure: [trait:+wrathful]
  - text: "Leave the decoding to the blocks."
    origin: always
    cost: {draws: 1}
    effects: []
---
A doctor in your life has looked at the repeat and gone quiet. The three clicks, she says, are not clicks; they
are a sequence, and sequences in threes are how life writes things down. If it is a sequence, it is a sequence
for something. If it is for something, someone is telling us to avoid it.

- *Two weeks* – you come out the other side certain it is a warning and unable to say of what.
- *Your doctor* – "I would not build it. Whatever it is."
- *Leave it* – the generals decode it. They do not tell anyone either.
