---
id: the-farmers-come-to-brussels
kind: event
title: The tractors come to Brussels
picture: the-farmers-come-to-brussels.jpg
stack: the-last-boom
thread: [the-levy]
part: continues
after: [{card: parliament-debates-the-levy, options: [0, 1, 2]}]
wait: [2, 5]
who: anyone
place: europe
takes: 1
requires: []
reach: block:europe
impact: 3
options:
  - text: "Walk with them for a day."
    origin: block:europe
    cost: {draws: 1}
    effects: [influence:+1, block:cultural:+1, trait:+patriot]
  - text: "Broker a meeting between them and the committee."
    origin: status:europe:5
    cost: {draws: 1, influence: 1}
    effects: [status:europe:+2, trait:+just]
  - text: "Explain why the model is right about the fields."
    origin: skill:science
    cost: {draws: 1}
    effects: [influence:+1, status:europe:-1, block:technological:+1]
  - text: "Avoid the centre that week."
    origin: always
    cost: {draws: 1}
    effects: []
---
The subsidy model has redrawn the map of what should grow where, and it is right, and a quarter of the farms in
Europe are on the wrong side of the line. Four thousand tractors on the ring road. Manure on the steps of the
Berlaymont. A seventy-year-old from Picardy on every front page, holding a sign that says: Ask me, not it.

- *Walk* – twelve kilometres, a sandwich from a stranger, sore feet.
- *Broker* – they meet. Nothing is agreed. Everyone says it went well.
- *Explain* – you are right. Being right in front of four thousand tractors is a skill you do not have.
- *Avoid* – the trams are cancelled anyway.
