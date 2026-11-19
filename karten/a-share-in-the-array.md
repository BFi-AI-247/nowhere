---
id: a-share-in-the-array
kind: event
title: A share in the array
picture: a-share-in-the-array.jpg
stack: the-signal
thread: [the-consortium]
part: continues
after: [{card: the-consortiums-offer, options: [0, 1, 2]}, {card: a-call-from-the-plateau, options: [0, 1]}]
wait: [2, 5]
who: self
place: home
takes: 0
costs: 1
expires: 4
requires: [month:2, until:9]
reach: personal
impact: 3
options:
  - text: "Buy in. A seat on the board and a key to the control room."
    origin: always
    cost: {draws: 1, money: 3}
    effects: [gain:the-array, influence:+1]
  - text: "Buy in with the consortium's money. He wants the seat; you take the key."
    origin: flag:invested
    cost: {draws: 1, money: 1}
    effects: [gain:the-array]
  - text: "Ask the foundation for a seat instead of money. You have been there."
    origin: flag:been-to-the-plateau
    cost: {draws: 1, influence: 2}
    effects: [gain:the-array]
    check: {skill: persuasion, difficulty: 3}
    partial: [influence:+1]
    failure: [trait:+impatient]
  - text: "Let somebody else own a telescope."
    origin: always
    cost: {draws: 1}
    effects: []
---
The foundation that runs the plateau has forty years of debt and, since January, a line of people at the door.
It is selling shares: a board seat, a key, eleven days of data before anyone else, and your name on the bills.

- *Buy in* – you own the ear that heard it. From now on, when someone says "point it", they ask you.
- *With Daniel's money* – cheap, and Daniel owns half of what you point it at.
- *Ask for a seat* – Rosa speaks for you. The board remembers who came when it was a glitch.
- *Let someone else* – the share goes to a block. Guess which.
