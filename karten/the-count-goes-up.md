---
id: the-count-goes-up
kind: event
title: The count goes up
picture: the-count-goes-up.jpg
stack: the-signal
thread: [the-market, the-readings]
part: closes
after: [{card: the-bankers-reading, options: [0, 1, 2, 3]}, {card: what-it-says, options: [2]}]
wait: [2, 6]
who: anyone
place: home
takes: 0
costs: 1
expires: 3
requires: [flag:ledger-known, month:10]
reach: global
impact: 4
options:
  - text: "Say it plainly: we do not know what is counted. Stop guessing in public."
    origin: flag:on-the-paper
    cost: {draws: 1}
    effects: [influence:+2, block:cultural:+1, trait:+calm]
  - text: "Short everything the fear is selling."
    origin: skill:finance
    cost: {draws: 1, money: 2}
    effects: [money:+3, trait:+cynical]
    check: {skill: finance, difficulty: 3}
    partial: [money:+1]
    failure: [money:-2]
  - text: "Go to the plateau. Sit with Rosa and the number."
    origin: flag:been-to-the-plateau
    cost: {draws: 1, money: 1}
    effects: [influence:+1, trait:+wise]
  - text: "Watch the number with everyone else."
    origin: always
    cost: {draws: 1}
    effects: [block:economic:-1, block:military:+1]
---
Since the Gobi transmitted, the one number everyone now calls the count has gone up three times. Since the
Americans transmitted, twice more. Nobody has said what it counts. Everybody has decided.

- *Say it plainly* – it is the least satisfying thing anyone has said all year. It is also the only true one.
- *Short the fear* – the fear is overpriced. You were right by Friday.
- *The plateau* – Rosa shows you the number. "It went up when we talked," she says. "That is all we know."
- *Watch* – the markets fall, the generals rise. The count does not care.
