---
id: oil-falls
kind: event
title: Oil falls and keeps falling
picture: oil-falls.jpg
stack: the-last-boom
thread: [far-away]
part: continues
after: [{card: doha-energy-week, options: [0, 1, 2]}]
wait: [4, 10]
who: anyone
requires: [until:9]
reach: global
impact: 3
options:
  - text: "Buy the cheap tankers and turn them into something."
    origin: skill:finance
    cost: {draws: 1, money: 2}
    effects: [flag:bought-tankers, follow:the-tankers:3]
  - text: "Write what it means for the Gulf."
    origin: skill:history
    cost: {draws: 1}
    effects: [influence:+2, trait:+wise]
  - text: "Fill the tank. Drive somewhere far."
    origin: block:europe
    cost: {draws: 1}
    effects: [trait:+calm, money:+1]
  - text: "Watch the number."
    origin: always
    cost: {draws: 1}
    effects: []
---
The models plan the routes, the routes are shorter, the lorries are electric, and the world needs eleven per cent
less oil than the year before. The price falls for nine months. In three countries in the Gulf, budgets written for
a hundred dollars a barrel meet a world that pays forty. Nobody in Europe notices, except at the pump.

- *Tankers* – forty ships for the price of one. Somebody will want them for something.
- *The Gulf* – you write the piece nobody else does: what happens to a country when the thing it sells ends.
- *Drive* – cheap petrol, an empty road, the last summer of it.
- *Watch* – the number goes down. Then it stops.
