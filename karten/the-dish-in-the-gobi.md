---
id: the-dish-in-the-gobi
kind: event
title: The dish in the Gobi
picture: the-dish-in-the-gobi.jpg
stack: the-signal
thread: [the-drawing]
part: turns
after: [{card: china-leaves-the-network, options: [0, 1, 2, 3]}]
wait: [8, 14]
who: anyone
place: home
takes: 0
costs: 1
expires: 3
requires: [month:7, until:10]
reach: global
impact: 4
options:
  - text: "Publish what your spy told you: it is a transmitter, and it is finished."
    origin: flag:knows-the-gobi
    cost: {draws: 1}
    effects: [influence:+3, block:military:+1, acquired:+famous]
    check: {skill: investigation, difficulty: 3, trait: brave}
    partial: [influence:+2, block:military:+1]
    failure: [acquired:+wanted, influence:+1]
  - text: "Ask the engineer who built arrays for Beijing what it can do."
    origin: associate:engineer
    cost: {draws: 1}
    effects: [influence:+2, block:technological:+1]
  - text: "Point your own array at the Gobi. If they transmit, you will hear it first."
    origin: possession:observatory
    cost: {draws: 1}
    effects: [influence:+2, flag:heard-the-gobi]
  - text: "Watch the satellite picture on the news: a circle in the sand."
    origin: always
    cost: {draws: 1}
    effects: [block:military:+2, block:cultural:-1]
---
A satellite photo, two hundred metres of dish in a desert that had nothing in it in March. China says it is a
receiver. Receivers do not need a cooling plant the size of a town. The committee adjourns. The market drops.
Everybody who argued for silence has lost the argument without a word being sent.

- *Publish* – the world learns on a Tuesday that someone is about to answer. Your name is on the story.
- *Ask Li Na* – "It can send. It is meant to. And they will."
- *Point your array* – you will know within the hour. Knowing within the hour is what the array is for.
- *The news* – a circle in the sand, a voice-over, a general. Fear is on sale and everyone buys.
