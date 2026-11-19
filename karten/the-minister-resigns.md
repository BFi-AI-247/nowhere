---
id: the-minister-resigns
kind: event
title: The minister resigns
picture: the-minister-resigns.jpg
stack: the-last-boom
thread: [the-levy, the-minister]
part: closes
after: [{card: the-levy-vote, options: [0, 1, 2]}, {card: triage-by-model, options: [0, 1, 2]}, {card: the-deepfake-of-the-minister, options: [0, 1, 2]}]
wait: [6, 12]
who: anyone
requires: [flag:minister-contact]
reach: block:europe
impact: 4
options:
  - text: "Put your politician friend forward."
    origin: associate:politician
    cost: {draws: 1, influence: 2}
    effects: [status:europe:+2, block:cultural:+1]
  - text: "Put yourself forward."
    origin: status:europe:6
    cost: {draws: 1, influence: 3}
    effects: [status:europe:+3, acquired:+famous]
  - text: "Stay out of it."
    origin: always
    cost: {draws: 1}
    effects: []
  - text: "Back a candidate in public."
    origin: block:europe
    cost: {draws: 1, influence: 1}
    effects: [status:europe:+1]
---
The two patients, the deepfake, the vote, the crash: one of them was enough and she had all four. She goes on a
Friday. The office is open on Monday, and the people who decide who fills it have your number.

- *Your politician friend* – she gets it. She owes you the thing she wanted most.
- *Yourself* – you get it, or you are the person who asked. Either way, everyone knows.
- *Stay out* – someone you have never heard of gets it.
- *Back a candidate* – she wins. She remembers who stood next to her early.
