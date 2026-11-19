---
id: parliament-debates-the-levy
kind: event
title: Parliament debates the model levy
picture: parliament-debates-the-levy.jpg
stack: the-last-boom
thread: [the-levy]
part: continues
after: [{card: the-lobbyist-calls, options: [0, 1, 2]}]
wait: [3, 6]
who: anyone
place: europe
takes: 1
expires: 3
requires: [until:9]
reach: block:europe
impact: 4
options:
  - text: "Testify for the levy."
    origin: status:europe:4
    cost: {draws: 1}
    effects: [influence:+2, status:europe:+1, flag:levy-supported, follow:the-levy-vote:3]
  - text: "Testify against it."
    origin: status:europe:4
    cost: {draws: 1}
    effects: [money:+1, influence:+1, flag:levy-opposed, follow:the-levy-vote:3]
  - text: "Brief Hanna with the numbers from the factory."
    origin: possession:factory
    cost: {draws: 1}
    effects: [influence:+1, flag:minister-contact, follow:the-levy-vote:3]
  - text: "Wait."
    origin: always
    cost: {draws: 1}
    effects: [follow:the-levy-vote:3]
  - text: "Send the committee one honest page."
    origin: block:europe
    cost: {draws: 1, influence: 1}
    effects: [status:europe:+1, follow:the-levy-vote:3]
  - text: "Ask a politician you know to put your question."
    origin: contact:politician
    cost: {draws: 1, influence: 1}
    effects: [status:europe:+1, follow:the-levy-vote:3]
---
A tax of three per cent on every euro a model earns in Europe, paid into a fund for the people it replaces. The
committee hears forty witnesses in two weeks. The models write most of the testimony on both sides, which
everybody knows and nobody says.

- *For* – you are on record. The companies note it.
- *Against* – you are on record. The unions note it.
- *Brief Hanna* – you give her something true. She will remember who gave it.
- *Wait* – the vote comes anyway.
- *One honest page* – it is quoted in the final report, without your name.
- *A politician you know* – your question, her voice, on the record.
