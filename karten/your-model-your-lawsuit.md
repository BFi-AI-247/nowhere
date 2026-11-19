---
id: your-model-your-lawsuit
kind: event
title: Your model, your lawsuit
picture: your-model-your-lawsuit.jpg
stack: the-last-boom
thread: [your-own-model]
part: turns
after: [{card: the-open-model, options: [0, 1]}, {card: the-model-that-writes-contracts, options: [0, 1]}]
wait: [8, 14]
requires: [flag:model-in-house]
reach: personal
impact: 3
options:
  - text: "Settle, quietly."
    origin: skill:finance
    cost: {draws: 1, money: 2}
    effects: []
  - text: "Let your lawyer take it to court."
    origin: associate:lawyer
    cost: {draws: 1, money: 1}
    effects: [influence:+2, status:europe:+1]
  - text: "Blame the vendor, in public."
    origin: skill:persuasion
    cost: {draws: 1}
    effects: [influence:+1, acquired:+infamous]
  - text: "Wait."
    origin: always
    cost: {draws: 1}
    effects: [money:-2]
  - text: "Call the haulier and talk."
    origin: block:europe
    cost: {draws: 1, money: 1}
    effects: [trait:+honest]
---
The clause on page nine. The one the model wrote and nobody read. A haulier in Poland has read it now, and his
lawyer has read it twice. It says, in effect, that you owe him a lorry.

- *Settle* – the lorry costs less than the lawyer.
- *Your lawyer* – she wins, slowly, and the judgment is the first of its kind. Your name is on it.
- *Blame the vendor* – it is true and it sounds like an excuse.
- *Wait* – you owe him a lorry and the interest.
- *Call him* – two people on the phone, no lawyers. A cheaper lorry.
