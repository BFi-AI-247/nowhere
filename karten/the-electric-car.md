---
id: the-electric-car
kind: event
title: The new car
picture:
stack: personal
once: true
requires: []
reach: personal
impact: 1
options:
  - text: "Electric, and a wallbox at home."
    origin: always
    cost: {draws: 1, money: 2}
    effects: [trait:+innovator, trait:+content]
  - text: "Used, cheap, whatever runs."
    origin: always
    cost: {draws: 1, money: 1}
    effects: [trait:+preserver]
  - text: "Share one with the neighbours."
    origin: trait:generous
    cost: {draws: 1}
    effects: [influence:+1, money:+1]
  - text: "No car. Bicycle and trains."
    origin: always
    cost: {draws: 1}
    effects: [trait:+calm]
---
The old one failed its inspection with a list longer than the car. The dealer has a model that tells you which
car you want. It is not wrong, which is annoying.

- *Electric* – silent mornings, a cable in the drive, a strange pride at the first full charge.
- *Used* – it rattles. It is yours. It will run for ten years out of spite.
- *Share* – a spreadsheet on the fridge of the house next door. It works better than anyone thought.
- *Bicycle* – you are wetter and calmer.
