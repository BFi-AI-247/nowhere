---
id: the-vote-on-the-ring
kind: event
title: The vote on the ring
picture: the-vote-on-the-ring.jpg
stack: the-signal
thread: [europe-at-the-table]
part: closes
after: [{card: the-answer-committee, options: [0, 1, 2, 3]}, {card: someone-answers, options: [1, 2, 3]}]
wait: [6, 14]
who: anyone
place: europe
takes: 1
costs: 1
expires: 2
requires: [month:11, until:12]
reach: block:europe
impact: 4
options:
  - text: "Speak for building it, with a treaty, in the open."
    origin: flag:blueprint-known
    cost: {draws: 1, influence: 1}
    effects: [status:europe:+2, block:technological:+1, flag:the-passage]
    check: {skill: persuasion, difficulty: 3}
    partial: [status:europe:+1, flag:the-passage]
    failure: [status:europe:-1, flag:the-passage, trait:+wrathful]
  - text: "Speak for building it, with a treaty, in the open."
    origin: flag:on-the-paper
    cost: {draws: 1, influence: 1}
    effects: [status:europe:+2, block:technological:+1, flag:the-passage]
  - text: "Speak against. The reading that frightened you is the one you believe."
    origin: flag:read-warning
    cost: {draws: 1, influence: 1}
    effects: [status:europe:+2, block:military:+1, flag:ring-stopped, trait:+patient]
  - text: "Ask a politician you know to carry your argument into the chamber."
    origin: contact:politician
    cost: {draws: 1, influence: 1}
    effects: [status:europe:+1]
  - text: "Watch the vote. It passes by nine."
    origin: always
    cost: {draws: 1}
    effects: [block:technological:+1]
---
Europe votes on whether to join the consortium, fund the ring and claim a seat at whatever is on the other side
of it. The Americans are in; the Chinese are building their own; India has asked for a month. The gallery is
full. The man from the Watch is in the third row.

- *For* – Europe joins. The treaty is thin, the money is real and your name is in the debate.
- *Against* – you lose by nine. The people who voted with you are the people who will say "we told you".
- *Your politician* – she is good. The vote goes the way you argued.
- *Watch* – nine votes. In the end it is always nine votes.
