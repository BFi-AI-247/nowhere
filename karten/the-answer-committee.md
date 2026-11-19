---
id: the-answer-committee
kind: event
title: The answer committee
picture: the-answer-committee.jpg
stack: the-signal
thread: [europe-at-the-table]
part: turns
after: [{card: the-briefing, options: [0, 1, 2, 3]}]
wait: [8, 14]
who: anyone
place: europe
takes: 1
costs: 1
expires: 3
requires: [month:7, until:10]
reach: block:europe
impact: 4
options:
  - text: "Take the chair. Write Europe's position yourself."
    origin: flag:committee-seat
    cost: {draws: 1}
    effects: [status:europe:+3, influence:+1, trait:+ambitious]
    check: {skill: persuasion, difficulty: 3, trait: ambitious}
    partial: [status:europe:+2]
    failure: [status:europe:-1, trait:+wrathful]
  - text: "Sit on it. Argue for the open reply: say who we are, all of us."
    origin: status:europe:4
    cost: {draws: 1, influence: 1}
    effects: [status:europe:+2, block:cultural:+1, trait:+globalist]
  - text: "Sit on it. Argue for silence until we know what it says."
    origin: status:europe:4
    cost: {draws: 1, influence: 1}
    effects: [status:europe:+2, flag:argued-silence, trait:+patient]
  - text: "Send a politician you know. Give her your notes."
    origin: contact:politician
    cost: {draws: 1, influence: 1}
    effects: [status:europe:+1]
  - text: "Read the minutes when they leak."
    origin: always
    cost: {draws: 1}
    effects: []
---
Europe's committee on the reply meets in a building with a view of the sea and a mandate to decide whether, how
and in whose name to answer. Eleven members. Two have read the paper. One has read the eleven days.

- *The chair* – you are the person who decides what Europe says to the sky. The sentence is yours.
- *The open reply* – a list of everything we are. It is long and it is honest and half the room hates it.
- *Silence* – the quiet argument. You win the room and lose the world, which is answering anyway.
- *Your politician* – your notes are in her speech. Her name is in the minutes.
- *The minutes* – they leak on Thursday. You read them with everyone else.
