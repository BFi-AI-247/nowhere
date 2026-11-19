---
id: the-toronto-conference
kind: event
title: The Toronto conference
picture: the-toronto-conference.jpg
stack: the-last-boom
thread: [the-source]
part: opens
place: toronto
who: self+1
takes: 1
costs: 1
expires: 5
arrives: board
requires: []
reach: global
impact: 3
options:
  - text: "Go, and take your scientist. Speak together."
    origin: profession:scientist
    cost: {draws: 1, money: 1}
    effects: [influence:+3, status:europe:+1, block:technological:+1]
  - text: "Go, and take your lawyer. Listen to the fine print."
    origin: profession:lawyer
    cost: {draws: 1, money: 1}
    effects: [influence:+2, money:+1, flag:knows-the-source]
  - text: "Go alone. Shake hands."
    origin: block:europe
    cost: {draws: 1, money: 1}
    effects: [influence:+2]
  - text: "Watch the stream."
    origin: always
    cost: {draws: 1}
    effects: []
---
The people who built the models meet on the lake once a year. Europe sends a minister; the minister cancels; you
are asked instead, with one person of your choice. A week, with the flight. The panels are theatre. The corridors
are not.

- *Your scientist* – she is asked the question you cannot answer. She answers it. You are seen together.
- *Your lawyer* – she finds, in a side session, what they are about to sign. You know before Brussels does.
- *Alone* – forty handshakes, four that matter.
- *The stream* – it is well lit and says nothing.
