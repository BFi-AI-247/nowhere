---
id: a-night-at-the-estate
kind: event
title: A night at the estate
picture: a-night-at-the-estate.jpg
stack: personal
place: estate-eifel
takes: 1
costs: 0
requires: [possession:estate]
reach: personal
impact: 2
options:
  - text: "Invite Hanna and the lobbyist. Let them talk."
    origin: possession:estate
    cost: {draws: 1, money: 1}
    effects: [influence:+2, flag:minister-contact]
  - text: "Invite the ninety. All of them."
    origin: flag:kept-humans
    cost: {draws: 1, money: 2}
    effects: [influence:+2, status:europe:+1, trait:+loyal]
  - text: "Go alone."
    origin: always
    cost: {draws: 1}
    effects: [trait:+calm]
  - text: "Invite the people who helped you this year."
    origin: block:europe
    cost: {draws: 1, money: 1}
    effects: [influence:+2]
---
No signal, a fire, a long table. People say things here they would not say in a room with a screen in it.

- *Hanna and the lobbyist* – by midnight they have agreed on something. You were in the room.
- *The ninety* – a barn, a band, a night nobody in the town forgets.
- *Alone* – the fire, the dark, the quiet. Enough.
- *The people who helped* – a long table, a fire, nine people who did not expect to be thanked.
