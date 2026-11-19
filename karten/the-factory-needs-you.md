---
id: the-factory-needs-you
kind: event
title: The line stopped
picture: the-factory-needs-you.jpg
stack: the-last-boom
thread: [the-ninety]
part: opens
place: factory-lodz
who: anyone
takes: 1
costs: 1
expires: 2
arrives: board
requires: [possession:factory]
reach: personal
impact: 3
options:
  - text: "Go yourself. Stand on the floor until it runs."
    origin: possession:factory
    cost: {draws: 1}
    effects: [money:+1, influence:+2, flag:kept-humans]
  - text: "Send your engineer. He fixes lines."
    origin: profession:engineer
    cost: {draws: 1}
    effects: [money:+2, block:economic:+1]
  - text: "Phone the vendor. Wait for the patch."
    origin: always
    cost: {draws: 1}
    effects: [money:-1]
---
Tuesday, 06:40: the model that runs the line has stopped scheduling and nobody knows why. Ninety people are
standing in a hall with their hands in their pockets. Every hour costs. Somebody has to be there.

- *Yourself* – a week in a hall in Poland. The line runs by Thursday. The ninety saw you.
- *Your engineer* – two days. He does not say what it was. It does not happen again.
- *The vendor* – a patch on Friday. A week of wages for nothing.
