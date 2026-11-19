---
id: europe-votes
kind: event
title: Europe votes
picture: europe-votes.jpg
stack: the-last-boom
thread: [boom-and-bust]
part: continues
after: [{card: crash-tuesday, options: [0, 1, 2, 3]}]
wait: [4, 8]
who: anyone
requires: [flag:crashed]
reach: block:europe
impact: 4
options:
  - text: "Campaign for the ones who want to slow it down."
    origin: trait:preserver
    cost: {draws: 1}
    effects: [block:technological:-1, block:cultural:+1, status:europe:+1]
  - text: "Campaign for the ones who want to own it."
    origin: trait:innovator
    cost: {draws: 1}
    effects: [block:technological:+2, block:economic:+1, status:europe:+1]
  - text: "Run."
    origin: status:europe:7
    cost: {draws: 1, influence: 3}
    effects: [status:europe:+3, acquired:+famous]
  - text: "Wait."
    origin: always
    cost: {draws: 1}
    effects: []
  - text: "Volunteer at a polling station."
    origin: block:europe
    cost: {draws: 1}
    effects: [status:europe:+1, influence:+1]
---
The first election after the Boom. One side wants to slow the models until the people catch up. The other wants
Europe to build its own before the other blocks own everything. Both are right. The turnout is the highest in
forty years.

- *Slow down* – Europe becomes a place people live.
- *Own it* – Europe becomes a place things are built.
- *Run* – you are on a list, and the list is on a wall.
- *Wait* – it is close.
- *Polling station* – fourteen hours, a school hall, a thousand neighbours you never met.
