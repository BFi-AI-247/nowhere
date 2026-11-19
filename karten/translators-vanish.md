---
id: translators-vanish
kind: event
title: Nobody hires translators any more
picture: translators-vanish.jpg
stack: the-last-boom
thread: [a-world-of-models]
part: continues
after: [{card: the-model-that-writes-contracts, options: [0, 1, 2]}]
wait: [6, 12]
who: anyone
requires: []
reach: global
impact: 2
options:
  - text: "Hire one anyway, for the things that matter."
    origin: skill:languages
    cost: {draws: 1, money: 1}
    effects: [influence:+1, trait:+loyal]
  - text: "Use the model for everything. It is good."
    origin: block:europe
    cost: {draws: 1}
    effects: [money:+1, trait:+indifferent]
  - text: "Write about the word the model got wrong."
    origin: profession:journalist
    cost: {draws: 1}
    effects: [influence:+2, block:cultural:+1]
  - text: "Shrug."
    origin: always
    cost: {draws: 1}
    effects: []
---
In Brussels, which ran on translators, the interpreting booths are quiet. The model does twenty-four languages at
once, in real time, with an accent you can choose. Somewhere in the minutes of a trade negotiation a Portuguese
word for "until further notice" becomes "forever". It takes a month to find.

- *Hire one* – expensive, slow, human. You hear what was meant, not only what was said.
- *The model* – it is cheaper and almost always right.
- *The word* – one word, one month, one story people forward.
- *Shrug* – you only speak two languages anyway.
