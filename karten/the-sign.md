---
id: the-sign
kind: event
title: The sign
picture: the-sign.jpg
stack: the-signal
thread: [while-we-wait]
part: opens
who: anyone
place: europe
takes: 1
costs: 1
expires: 3
requires: [month:4, until:9]
reach: block:europe
impact: 3
options:
  - text: "Preach on it: a voice in the dark is a voice. Listen."
    origin: profession:cleric
    cost: {draws: 1}
    effects: [influence:+2, block:cultural:+1, trait:+faithful]
    check: {skill: religion, difficulty: 2, trait: faithful}
    partial: [influence:+1, block:cultural:+1]
    failure: [influence:-1, trait:+wrathful]
  - text: "Ask a cleric you know what his people are saying."
    origin: contact:cleric
    cost: {draws: 1}
    effects: [influence:+1, block:cultural:+1]
  - text: "Stand up in the town meeting and say what it is: numbers from very far away."
    origin: skill:science
    cost: {draws: 1}
    effects: [influence:+1, block:technological:+1, trait:+honest]
  - text: "Say nothing. People will believe what they need to."
    origin: always
    cost: {draws: 1}
    effects: [block:cultural:+1]
---
The churches are full for the first time in a generation; so are the mosques, the temples and a hall in Lyon
where a man in a white jacket plays the eleven minutes on a loop. Everyone who speaks to a crowd has been asked
what it means. Most of them have answered.

- *Preach* – a congregation that came for an answer gets a better question. They come back next week.
- *Your cleric* – his people are frightened and he is tired. He is grateful to be asked.
- *Numbers from far away* – some are relieved. Some are angry. All of them heard you.
- *Nothing* – belief does not wait for you.
