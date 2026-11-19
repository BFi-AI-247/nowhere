---
id: the-levy-vote
kind: event
title: The levy comes to a vote
picture: the-levy-vote.jpg
stack: the-last-boom
thread: [the-levy]
part: turns
after: [{card: parliament-debates-the-levy, options: [0, 1, 2, 3]}]
wait: [8, 12]
who: anyone
place: europe
takes: 1
expires: 2
requires: []
reach: block:europe
impact: 4
options:
  - text: "Call in what Hanna owes you."
    origin: flag:minister-contact
    cost: {draws: 1, influence: 2}
    effects: [status:europe:+2, block:cultural:+1, block:economic:-1]
  - text: "Stand with the side you chose."
    origin: flag:levy-supported
    cost: {draws: 1}
    effects: [status:europe:+1, block:cultural:+1, block:economic:-1]
  - text: "Stand with the side you chose."
    origin: flag:levy-opposed
    cost: {draws: 1}
    effects: [money:+2, block:economic:+1, block:cultural:-1]
  - text: "Wait."
    origin: always
    cost: {draws: 1}
    effects: [block:economic:+1, block:cultural:-1]
  - text: "Phone your MEP the night before."
    origin: block:europe
    cost: {draws: 1, influence: 1}
    effects: [status:europe:+1, block:cultural:+1, block:economic:-1]
  - text: "Ask a politician you know how it will go."
    origin: contact:politician
    cost: {draws: 1, influence: 1}
    effects: [status:europe:+1]
---
The vote is on a Wednesday. The lobbyist has been in every office. The strike is three weeks old. The deepfake is
still the second result when you search the minister's name. It passes or it fails by eleven votes, and which
depends on what you did in spring.

- *Call in Hanna* – it passes. The money for the fund comes from somewhere, and somewhere notices.
- *Your side, for* – Europe chooses its people over its numbers.
- *Your side, against* – Europe chooses its numbers over its people.
- *Wait* – without you, it fails.
- *Phone your MEP* – one call among four thousand. Eleven votes is not many.
- *A politician you know* – she tells you eleven votes. She is right to the vote.
