---
id: the-first-hoax
kind: event
title: The first hoax
picture: the-first-hoax.jpg
stack: the-signal
thread: [the-market, the-word]
part: turns
after: [{card: the-market-for-the-sky, options: [0, 1, 2]}, {card: the-lecture, options: [0, 1, 2, 3]}]
wait: [3, 8]
who: self
place: home
takes: 0
costs: 1
expires: 2
requires: [month:5, until:10]
reach: global
impact: 3
options:
  - text: "Take it apart in public before the evening news runs it."
    origin: skill:investigation
    cost: {draws: 1}
    effects: [influence:+2, block:cultural:+1]
    check: {skill: investigation, difficulty: 3, trait: honest}
    partial: [influence:+1]
    failure: [acquired:+infamous, influence:-1]
  - text: "Ask your hacker where the file came from."
    origin: associate:hacker
    cost: {draws: 1}
    effects: [influence:+2, flag:knows-the-hoaxer]
  - text: "Check it against the real thing. You have the real thing."
    origin: possession:observatory
    cost: {draws: 1}
    effects: [influence:+2, block:technological:+1]
  - text: "Share it. Everybody is."
    origin: always
    cost: {draws: 1}
    effects: [acquired:+infamous, trait:+trusting]
---
A second signal, from a second source, fourteen days long, and it decodes – the file says – to a face. It is on
every screen by noon. It is a fake, built in a weekend by someone with a good ear and a better sense of what
people want. Half the world believes it. The other half believes the first one was fake too.

- *Take it apart* – you show the seams. Tonight you are the person who said no.
- *Your hacker* – a studio in Tallinn, a client in a block that would like the world to stop listening.
- *The real thing* – you lay them side by side on the screen. The fake has a heartbeat. The real one does not.
- *Share it* – the morning after, your name is in the list of people who did.
