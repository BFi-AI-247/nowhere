---
id: the-grant
kind: event
title: The grant
picture: the-grant.jpg
stack: the-signal
thread: [the-word]
part: continues
after: [{card: the-lecture, options: [0, 1, 2, 3]}, {card: the-night-shift-fee, options: [0, 1, 2]}]
wait: [2, 5]
who: self
place: europe
takes: 1
costs: 1
expires: 4
requires: [until:9]
reach: personal
impact: 2
options:
  - text: "Apply. 'Transient radio phenomena.' Do not say which one."
    origin: skill:science
    cost: {draws: 1}
    effects: [money:+2, influence:+1]
    check: {skill: science, difficulty: 2, trait: patient}
    partial: [money:+1]
    failure: [trait:+impatient]
  - text: "Apply with your block's name on it."
    origin: status:europe:4
    cost: {draws: 1}
    effects: [money:+2, status:europe:+1]
  - text: "Send your scientist to stand in front of the panel."
    origin: associate:scientist
    cost: {draws: 1}
    effects: [money:+2]
  - text: "Apply anyway. You have read the paper twice."
    origin: always
    cost: {draws: 1}
    effects: [money:+2]
    check: {skill: persuasion, difficulty: 3}
    partial: [money:+1]
    failure: [trait:+impatient]
  - text: "Skip it. Grants are paperwork."
    origin: always
    cost: {draws: 1}
    effects: []
---
Every science ministry on earth has discovered a sudden interest in radio astronomy. The money is real, the forms
are long and the panel sits in a week. Somebody has to go and stand in front of it.

- *Apply* – a year's funding for your dish time, your travel, your coffee. The panel does not ask what you
  are listening for. They know.
- *With the block's name* – the money comes faster, and so does the obligation.
- *Skip it* – the money goes to someone who filled in the form.
