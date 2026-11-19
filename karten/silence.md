---
id: silence
kind: event
title: Silence
picture: silence.jpg
stack: the-signal
thread: [the-market, while-we-wait]
part: turns
after: [{card: the-market-for-the-sky, options: [0, 1, 2, 3]}, {card: the-watch, options: [0, 1, 2, 3]}]
wait: [8, 16]
who: anyone
place: home
takes: 0
costs: 1
expires: 2
requires: [month:8, until:11]
reach: global
impact: 4
options:
  - text: "Say it in public: a gap is data. Wait eleven days before you grieve."
    origin: flag:heard-first
    cost: {draws: 1}
    effects: [influence:+2, block:cultural:+1, trait:+calm]
  - text: "Say it in public: a gap is data. Wait eleven days before you grieve."
    origin: skill:science
    cost: {draws: 1}
    effects: [influence:+2, trait:+calm]
  - text: "Open your doors. The Watch has nowhere to go tonight."
    origin: flag:joined-the-watch
    cost: {draws: 1}
    effects: [influence:+2, trait:+compassionate]
  - text: "Buy. Everything. The fear is pricing the end of the story; the story is not over."
    origin: skill:finance
    cost: {draws: 1, money: 2}
    effects: [money:+3, trait:+brave]
    check: {skill: finance, difficulty: 3, trait: brave}
    partial: [money:+1]
    failure: [money:-2, trait:+craven]
  - text: "Sit with it. Eleven days is a long time."
    origin: always
    cost: {draws: 1}
    effects: [trait:+patient]
---
At 03:12 on the day it should come, it does not. Rosa checks the receiver, the clock, the sky. Nothing. For the
first time since January the world does not know what it is waiting for. The Watch's leader says it has left us.
The markets agree. Eleven days later it is back, exactly as before, as if nothing happened. Something happened.

- *A gap is data* – you said "wait". People remember who said wait on the night everyone said over.
- *Open your doors* – forty people in your front room, in silence, until morning.
- *Buy* – it comes back. So does the market. You were there a week early.
- *Sit with it* – eleven days of not knowing. Most people cannot. You can.
