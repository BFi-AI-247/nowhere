---
id: the-sunday-flight
kind: event
title: The Sunday flight
picture: the-sunday-flight.jpg
stack: personal
place: airfield-vosges
takes: 1
costs: 0
requires: [possession:airfield]
reach: personal
impact: 2
options:
  - text: "Fly to Brussels for the vote. Be there first."
    origin: possession:airfield
    cost: {draws: 1, money: 1}
    effects: [influence:+2, acquired:+famous]
  - text: "Teach Tomasz's kid to fly."
    origin: associate:pilot
    cost: {draws: 1}
    effects: [influence:+1, trait:+generous]
  - text: "Just fly."
    origin: always
    cost: {draws: 1}
    effects: [trait:+calm, trait:+brave]
  - text: "Take a neighbour up."
    origin: always
    cost: {draws: 1}
    effects: [influence:+1, trait:+generous]
  - text: "Ask a pilot you know to take you up."
    origin: contact:pilot
    cost: {draws: 1, influence: 1}
    effects: [trait:+brave]
---
The grass strip, the old plane, a Sunday with weather. The airfield nobody wanted is the only way to be
somewhere before everyone else, and this Sunday there is a somewhere.

- *Brussels* – you land before the committee sits. You are the person who was there.
- *The kid* – an afternoon that becomes a life.
- *Just fly* – an hour above the Vosges. Nothing to decide.
- *A neighbour* – he has lived under this sky for seventy years and never seen it from above.
- *A pilot you know* – he lets you hold the stick for four minutes. You do not breathe for three.
