---
id: someone-answers
kind: event
title: Someone answers
picture: someone-answers.jpg
stack: the-signal
thread: [the-spine, europe-at-the-table]
part: turns
who: anyone
place: home
takes: 0
costs: 0
expires: 1
beat: 9
requires: [month:9]
reach: global
impact: 5
options:
  - text: "Point the array at the source and send the eleven days back."
    origin: possession:observatory
    cost: {draws: 1, influence: 2}
    effects: [flag:you-answered, acquired:+famous, influence:+3, block:technological:+2, trait:+brave]
    check: {skill: technology, difficulty: 4, trait: brave}
    partial: [flag:you-answered, influence:+2, block:technological:+1]
    failure: [influence:-2, acquired:+infamous, flag:you-answered]
  - text: "Put Europe's name on the reply. You wrote half of it."
    origin: status:europe:6
    cost: {draws: 1}
    effects: [flag:europe-answered, status:europe:+3, block:cultural:+1]
  - text: "Put Europe's name on the reply. You wrote half of it."
    origin: flag:told-europe
    cost: {draws: 1, influence: 2}
    effects: [flag:europe-answered, status:europe:+2]
  - text: "Argue in every room you can reach that nobody should answer."
    origin: skill:persuasion
    cost: {draws: 1, influence: 1}
    effects: [flag:argued-silence, block:cultural:+1, trait:+patient]
  - text: "Let the blocks do what blocks do."
    origin: always
    cost: {draws: 1}
    effects: [block:military:+1]
---
The committee has met eleven times and agreed on nothing. Then, on a Tuesday, a dish in the Gobi transmits for
nine hours. China says it was a test. Nobody believes China. By Friday the Americans have transmitted too, and
Europe is writing a statement about the importance of coordination.

- *Answer yourself* – a private array, a private reply. Legal in no country and done in all of them.
- *Europe's name* – the reply that is actually sent carries the lines you argued for. It is a small thing and
  everyone in the room knows it.
- *Nobody should answer* – you lose. But the people who agreed with you remember you as the one who said it.
- *Let them* – three replies are on their way. Whatever is out there now knows there are at least three of us.
