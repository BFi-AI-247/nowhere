---
id: arjun-asks-a-favour
kind: event
title: Arjun asks a favour
picture: arjun-asks-a-favour.jpg
stack: the-last-boom
thread: [the-minister]
part: opens
takes: 0
costs: 0
expires: 2
requires: []
reach: personal
impact: 3
options:
  - text: "Tell him which factories are closing."
    origin: skill:finance
    cost: {draws: 1}
    effects: [money:+2, status:europe:-1, trait:+cunning]
  - text: "Tell him, and tell Hanna you did."
    origin: flag:minister-contact
    cost: {draws: 1}
    effects: [influence:+1, status:europe:+1]
  - text: "Refuse. Keep the friendship."
    origin: trait:loyal
    cost: {draws: 1}
    effects: [influence:+1]
  - text: "Wait."
    origin: always
    cost: {draws: 1}
    effects: [associate-to-contact:arjun-nair:6]
  - text: "Tell him what everyone already knows."
    origin: block:europe
    cost: {draws: 1}
    effects: [influence:+1]
  - text: "Ask a spy you know what he is really after."
    origin: contact:spy
    cost: {draws: 1, influence: 1}
    effects: [trait:+wise]
---
Dinner, his treat. Somewhere between the fish and the coffee he asks, lightly, which European factories will
close before Christmas. India would like to buy the machines. He is not asking you to spy. He is asking you to
be helpful.

- *Tell him* – he pays well and your block finds out slowly.
- *Tell him and tell Hanna* – you are now a channel, which is a kind of safety.
- *Refuse* – he smiles. The friendship holds.
- *Wait* – he stops calling. He becomes someone you used to know.
- *What everyone knows* – he smiles; he knew it too. The friendship holds, for now.
- *A spy you know* – he laughs. 'Exactly what he said. That is the clever part.'
