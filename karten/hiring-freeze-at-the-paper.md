---
id: hiring-freeze-at-the-paper
kind: event
title: The paper stops hiring
picture: hiring-freeze-at-the-paper.jpg
stack: the-last-boom
thread: [the-paper-thread]
part: opens
who: anyone
requires: [until:9]
reach: block:europe
impact: 2
options:
  - text: "Offer to train the model on your archive."
    origin: profession:journalist
    cost: {draws: 1}
    effects: [money:+1, influence:-1, flag:model-in-house]
  - text: "Organise the newsroom."
    origin: skill:persuasion
    cost: {draws: 1}
    effects: [influence:+1, flag:union-ally, follow:the-strike-nobody-organized:3]
  - text: "Wait."
    origin: always
    cost: {draws: 1}
    effects: [follow:layoffs-at-the-paper:3]
  - text: "Write to the editor, as a reader."
    origin: block:europe
    cost: {draws: 1}
    effects: [influence:+1]
---
The editor says it in a sentence that was clearly written for her: no new positions this year, the desk will
*evaluate tools*. The three juniors look at the two seniors. The two seniors look at the window.

- *Train the model* – you keep your job by teaching your replacement. It pays.
- *Organise* – you become the person management does not invite to lunch.
- *Wait* – in four months the freeze has a different name.
- *As a reader* – your letter runs on page twelve. Three hundred people write the same week.
