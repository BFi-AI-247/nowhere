---
id: the-dish-time-auction
kind: event
title: The auction
picture: the-dish-time-auction.jpg
stack: the-signal
thread: [the-consortium]
part: turns
after: [{card: the-dish-time, options: [0, 1, 2]}]
wait: [4, 8]
who: self
place: the-array
takes: 1
costs: 1
expires: 3
requires: [possession:observatory, month:5, until:10]
reach: global
impact: 3
options:
  - text: "Auction the August nights to the highest block."
    origin: always
    cost: {draws: 1}
    effects: [money:+3, block:military:+1, trait:+greedy]
    check: {skill: finance, difficulty: 2}
    partial: [money:+2]
    failure: [money:+1, block:military:+1, trait:+greedy]
  - text: "Auction them, but keep the eleven days for Rosa."
    origin: associate:scientist
    cost: {draws: 1}
    effects: [money:+2, influence:+1]
  - text: "Give August to the open network. Everyone sees everything."
    origin: trait:globalist
    cost: {draws: 1}
    effects: [influence:+2, block:technological:+2, status:europe:+1]
  - text: "Keep the nights. The bills can wait a month."
    origin: always
    cost: {draws: 1}
    effects: [money:-1, trait:+patient]
---
Three blocks and the consortium want August. The board wants the roof fixed. Rosa wants the nights the pattern
arrives. The foundation's lawyer has written the word "auction" on a whiteboard and underlined it twice.

- *Highest block* – the roof, the road and a year of coffee. The block puts a soldier in the control room.
- *Keep the eleven days* – a little less money, and Rosa still sees it first.
- *Open network* – the plateau becomes the one place everyone trusts. That is worth more than August.
- *Wait* – the roof leaks. Rosa does not notice. The accountant does.
