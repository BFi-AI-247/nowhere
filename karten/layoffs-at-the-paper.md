---
id: layoffs-at-the-paper
kind: event
title: The paper lets half the desk go
picture: layoffs-at-the-paper.jpg
stack: the-last-boom
thread: [the-paper-thread]
part: continues
after: [{card: hiring-freeze-at-the-paper, options: [0, 1, 2]}]
wait: [6, 12]
who: anyone
requires: []
reach: block:europe
impact: 3
options:
  - text: "Take the package and go freelance."
    origin: profession:journalist
    cost: {draws: 1}
    effects: [money:+2, influence:-1, trait:+opportunistic]
  - text: "Stay, and write the story about your own paper."
    origin: skill:investigation
    cost: {draws: 1}
    effects: [influence:+2, acquired:+infamous, flag:burned-bridges]
  - text: "Use the union list you built."
    origin: flag:union-ally
    cost: {draws: 1}
    effects: [influence:+2, status:europe:+1, block:cultural:+1]
  - text: "Wait."
    origin: always
    cost: {draws: 1}
    effects: [money:-1]
  - text: "Hire one of them yourself, for anything."
    origin: block:europe
    cost: {draws: 1, money: 1}
    effects: [influence:+1, trait:+loyal]
---
Twenty-two names on a list that was clearly sorted by something. The model writes the sports pages now, the
weather, the markets and, on quiet days, the editorial. The two seniors are on the list. One of them is not you.

- *The package* – you are free and alone. The money lasts a season.
- *Write it* – the best story you have ever had and the last one for that paper.
- *The union list* – you organised early. Now it means something.
- *Wait* – your salary is renegotiated downward.
- *Hire one* – a sub-editor who now proofreads your letters. Better than any model.
