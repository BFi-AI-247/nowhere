---
id: two-of-you-to-brussels
kind: event
title: Two of you to Brussels
picture: two-of-you-to-brussels.jpg
stack: the-last-boom
thread: [the-minister]
part: continues
after: [{card: arjun-asks-a-favour, options: [0, 1, 2]}]
wait: [3, 8]
place: europe
who: self+1
takes: 1
costs: 1
expires: 3
arrives: board
requires: []
reach: block:europe
impact: 3
options:
  - text: "Take your lawyer. Read what they want you to sign."
    origin: profession:lawyer
    cost: {draws: 1}
    effects: [status:europe:+1, influence:+1, money:+1]
  - text: "Take your journalist. Make it public."
    origin: profession:journalist
    cost: {draws: 1}
    effects: [influence:+2, block:cultural:+1]
  - text: "Take your politician. Let her do the talking."
    origin: profession:politician
    cost: {draws: 1}
    effects: [status:europe:+2, flag:minister-contact]
  - text: "Send regrets."
    origin: always
    cost: {draws: 1}
    effects: []
---
The commission wants a working group on the models and the regions, and it wants you on it – with one person of
your choosing. A week of meetings in rooms with no windows. Who you bring decides what the week is about.

- *Your lawyer* – nothing is signed that she has not read twice.
- *Your journalist* – the working group is in the papers by Wednesday. The commission is not pleased.
- *Your politician* – she knows the corridors. By Friday she has a title.
- *Regrets* – the group meets without a seat from your region.
