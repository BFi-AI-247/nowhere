---
id: the-deepfake-of-the-minister
kind: event
title: The minister said something she did not say
picture: the-deepfake-of-the-minister.jpg
stack: the-last-boom
thread: [the-minister]
part: turns
after: [{card: two-of-you-to-brussels, options: [0, 1, 2]}, {card: compute-shortage, options: [0, 1, 2]}]
wait: [6, 12]
who: anyone
requires: [until:9]
reach: global
impact: 4
options:
  - text: "Prove it is fake, fast, in public."
    origin: skill:investigation
    cost: {draws: 1}
    effects: [influence:+2, acquired:+famous, flag:minister-contact]
  - text: "Have your hacker trace where it came from."
    origin: associate:hacker
    cost: {draws: 1}
    effects: [influence:+1, follow:leo-disappears:3]
  - text: "Say nothing. Watch what it does to the levy."
    origin: trait:cynical
    cost: {draws: 1}
    effects: [flag:levy-opposed, block:cultural:-1]
  - text: "Wait."
    origin: always
    cost: {draws: 1}
    effects: [block:cultural:-1]
  - text: "Share the correction, not the video."
    origin: block:europe
    cost: {draws: 1}
    effects: [influence:+1]
  - text: "Ask a hacker you know to check the file."
    origin: contact:hacker
    cost: {draws: 1, influence: 1}
    effects: [influence:+1, flag:minister-contact]
---
Forty seconds of video: the minister for digital affairs, in her own voice, calling the levy a mistake and the
unemployed lazy. It is perfect. It is false. By the time that is established, eleven million people have watched
it and the committee has postponed the vote.

- *Prove it* – you are the person who was right first. She knows your name now.
- *Your hacker* – he finds the server. The server finds him.
- *Say nothing* – the lie does your work for you. You notice that you let it.
- *Wait* – Europe trusts a little less.
- *The correction* – it travels a tenth as far. It is the tenth that matters.
- *A hacker you know* – the file has a fingerprint. You send it to the minister's office.
