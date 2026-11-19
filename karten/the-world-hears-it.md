---
id: the-world-hears-it
kind: event
title: The world hears it
picture: the-world-hears-it.jpg
stack: the-signal
thread: [the-spine]
part: turns
who: anyone
place: home
takes: 0
costs: 0
expires: 1
beat: 6
requires: [month:6]
reach: global
impact: 5
options:
  - text: "Go on the evening programme and say what it is – and what it is not."
    origin: flag:heard-first
    cost: {draws: 1}
    effects: [influence:+3, acquired:+famous, flag:on-the-paper, block:cultural:+1]
    check: {skill: performance, difficulty: 3, trait: calm}
    partial: [influence:+2, flag:on-the-paper]
    failure: [influence:+1, acquired:+infamous, trait:+wrathful]
  - text: "Sell the antenna makers at the top."
    origin: flag:bought-the-sky
    cost: {draws: 1}
    effects: [money:+3, block:economic:+1]
  - text: "Open the hospital's doors for the night. People will come who are not ill."
    origin: profession:doctor
    cost: {draws: 1}
    effects: [influence:+2, trait:+compassionate]
  - text: "Preach on it. Everyone will come."
    origin: profession:cleric
    cost: {draws: 1}
    effects: [influence:+2, block:cultural:+2, trait:+faithful]
  - text: "Stand in the street with everyone else and look up."
    origin: always
    cost: {draws: 1}
    effects: [trait:+curious, block:cultural:+1]
---
A student in Pune puts the eleven days on the net as sound. By midnight it is the most played file on earth: a
rising tone, a gap, three clicks, a fall. In Lagos the churches fill; in Seoul the market opens early and closes
in an hour; in Moscow the evening news does not mention it, which tells Moscow everything.

- *Evening programme* – you were there first and you say so, calmly. Tomorrow strangers know your face.
- *Sell* – the dish makers are worth twelve times what you paid in April. Tonight. Not next week.
- *Open the doors* – nobody is hurt. Everybody is afraid. That is also medicine.
- *Preach* – the oldest trade on earth has a new text.
- *Look up* – you cannot see it. Nobody can. Everybody looks anyway.
