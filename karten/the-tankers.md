---
id: the-tankers
kind: event
title: What to do with forty tankers
picture: the-tankers.jpg
stack: the-last-boom
thread: [far-away]
part: closes
after: [{card: oil-falls, options: [0, 1]}]
wait: [8, 14]
place: europe
takes: 2
who: anyone
requires: [flag:bought-tankers]
reach: personal
impact: 3
options:
  - text: "Sell them for scrap. Take the loss."
    origin: always
    cost: {draws: 1}
    effects: [money:+1]
  - text: "Turn them into floating data centres."
    origin: skill:technology
    cost: {draws: 1, money: 1}
    effects: [money:+4, block:technological:+1]
  - text: "Give two to the Red Cross as hospital ships."
    origin: trait:generous
    cost: {draws: 1}
    effects: [money:+1, influence:+3, status:europe:+1]
  - text: "Hold them. Oil comes back."
    origin: trait:patient
    cost: {draws: 1}
    effects: [money:+2]
  - text: "Rent them out as storage."
    origin: always
    cost: {draws: 1}
    effects: [money:+2]
---
Forty hulls at anchor off Rotterdam, two crews, a mooring fee that arrives every Monday. You bought them because
something had to be done with them. Now something has to be done with them.

- *Scrap* – you get back a third.
- *Data centres* – sea water is cold and free. It works, almost.
- *Hospital ships* – a ceremony in Genoa. Your name painted small on the stern.
- *Hold* – it does come back, a little. You were right, slowly.
- *Storage* – grain, then cars, then nobody asks. The mooring fee is covered.
