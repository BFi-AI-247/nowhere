---
id: join-a-tv-show
kind: event
title: They want you on the show
picture: join-a-tv-show.jpg
stack: personal
once: true
takes: 1
place: europe
requires: []
reach: personal
impact: 2
options:
  - text: "Go on. Say what you think."
    origin: skill:performance
    cost: {draws: 1}
    effects: [influence:+2, acquired:+famous]
  - text: "Go on. Say what they want."
    origin: trait:cunning
    cost: {draws: 1}
    effects: [money:+2, influence:+1]
  - text: "Decline."
    origin: trait:shy
    cost: {draws: 1}
    effects: [trait:+calm]
  - text: "Let it ring."
    origin: always
    cost: {draws: 1}
    effects: []
  - text: "Go on, and tell someone else's story."
    origin: always
    cost: {draws: 1}
    effects: [influence:+1, trait:+compassionate]
---
A panel show about the Boom, Thursday nights, two million viewers and a presenter who interrupts. They want a
person who *lived it*. That is you now.

- *Say what you think* – you are quoted, clipped, and known.
- *Say what they want* – you are invited back. It pays.
- *Decline* – a quiet Thursday.
- *Let it ring* – they find someone else who lived it.
- *Someone else's story* – a woman from the call centre, in your words. People call the station.
