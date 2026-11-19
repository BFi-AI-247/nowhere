---
id: china-leaves-the-network
kind: event
title: China leaves the network
picture: china-leaves-the-network.jpg
stack: the-signal
thread: [the-drawing]
part: opens
who: anyone
place: home
takes: 0
costs: 1
expires: 3
requires: [month:4, until:8]
reach: global
impact: 3
options:
  - text: "Call the engineer who wants out of Beijing. Offer her a desk."
    origin: skill:languages
    cost: {draws: 1, influence: 1}
    effects: [gain:li-na, block:technological:+1, trait:+brave]
    check: {skill: languages, difficulty: 3, trait: brave}
    partial: [gain:li-na]
    failure: [influence:-1, trait:+craven]
  - text: "Call the engineer who wants out of Beijing. Offer her a desk."
    origin: possession:observatory
    cost: {draws: 1, money: 1}
    effects: [gain:li-na, block:technological:+1]
  - text: "Ask a spy you know what Beijing is building instead."
    origin: contact:spy
    cost: {draws: 1, influence: 1}
    effects: [influence:+1, flag:knows-the-gobi]
  - text: "Write the piece: what it means when one of five stops listening together."
    origin: profession:journalist
    cost: {draws: 1}
    effects: [influence:+2, block:cultural:+1]
  - text: "Watch the two dishes go dark on the shared map."
    origin: always
    cost: {draws: 1}
    effects: [block:technological:-1, block:military:+1]
---
Two dishes in Xinjiang stop sharing data with the global network on a Monday. On Tuesday Beijing announces a
national programme. On Wednesday an engineer named Li Na is at a conference in Vienna with two suitcases and a
copy of the eleven days, and she is not going home.

- *Offer her a desk* – she reads the pattern as a drawing. Nobody else does. She joins you.
- *Your spy* – Beijing is building a transmitter. Not a receiver. A transmitter.
- *Write it* – the first article that says the obvious: five blocks will not stay five for long.
- *Watch* – the map has two holes in it. There will be more.
