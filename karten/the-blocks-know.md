---
id: the-blocks-know
kind: event
title: The blocks know
picture: the-blocks-know.jpg
stack: the-signal
thread: [the-spine]
part: continues
who: anyone
place: home
takes: 0
costs: 0
expires: 1
beat: 4
requires: [month:4]
reach: global
impact: 4
options:
  - text: "Brief your block before the others brief theirs."
    origin: flag:heard-first
    cost: {draws: 1}
    effects: [status:europe:+2, flag:told-europe, block:technological:+1]
    check: {skill: persuasion, difficulty: 2}
    partial: [status:europe:+1, flag:told-europe]
    failure: [flag:told-europe, trait:+impatient]
  - text: "Brief your block before the others brief theirs."
    origin: profession:politician
    cost: {draws: 1, influence: 1}
    effects: [status:europe:+2, flag:told-europe]
  - text: "Ask a politician you know what the cabinet was told."
    origin: contact:politician
    cost: {draws: 1, influence: 1}
    effects: [flag:told-europe, influence:+1]
  - text: "Buy antenna makers. Quietly."
    origin: skill:finance
    cost: {draws: 1, money: 2}
    effects: [flag:bought-the-sky, trait:+cunning]
  - text: "Watch the five statements. They say the same thing in five ways."
    origin: always
    cost: {draws: 1}
    effects: [block:cultural:+1]
---
Someone in the observatory's funding chain tells someone in a ministry. Within a week five governments know and
three of them have called it a hoax in public and a priority in private. China pulls its two dishes out of the
shared network. The United States asks for the raw data and gets a copy that is eleven days short.

- *Brief your block* – Europe hears it from you. That is remembered when the committee is formed.
- *Ask your politician* – the cabinet was told it is real and told not to say so.
- *Buy antenna makers* – everyone will want a dish. You own the people who make them.
- *Watch* – the blocks begin to sort themselves: those who want to hear more and those who want it to stop.
