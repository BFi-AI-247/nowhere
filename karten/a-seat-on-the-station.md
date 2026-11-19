---
id: a-seat-on-the-station
kind: event
title: A seat on the station
picture: a-seat-on-the-station.jpg
stack: the-last-boom
thread: [far-away]
part: continues
after: [{card: ninety-days-under, options: [0, 1, 2]}, {card: the-seoul-fab, options: [0, 1, 2]}]
wait: [8, 16]
place: the-space-station
who: self
takes: 13
costs: 1
expires: 6
arrives: board
requires: []
reach: personal
impact: 4
options:
  - text: "Go. Three months of training, two weeks up there."
    origin: skill:science
    cost: {draws: 1, money: 2}
    effects: [acquired:+famous, influence:+3, trait:+wise, trait:+brave]
  - text: "Go as the journalist. Write it from orbit."
    origin: profession:journalist
    cost: {draws: 1, money: 1}
    effects: [acquired:+famous, influence:+3, block:cultural:+1]
  - text: "Go, and send the data to Europe, not the sponsor."
    origin: block:europe
    cost: {draws: 1, money: 2}
    effects: [status:europe:+2, block:technological:+1, influence:+1]
  - text: "Let it pass. The year is too full."
    origin: always
    cost: {draws: 1}
    effects: [trait:+content]
---
A sponsor wants a civilian on the station for two weeks – someone who can speak, write, or explain. The training
is three months in Cologne and Houston. You will miss a quarter of the year. Everything you own and everyone you
know will manage without you, which is the part that frightens you.

- *Go* – you come back changed. Everyone says so. You are not sure yet.
- *The journalist* – the piece is read by more people than anything you have written.
- *For Europe* – the sponsor is annoyed. The block is grateful. It remembers.
- *Let it pass* – the seat goes to someone else. You watch the launch on a screen.
