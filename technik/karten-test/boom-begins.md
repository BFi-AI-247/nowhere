---
id: boom-begins
kind: event
title: The last boom begins
picture:
stack: the-last-boom
requires: []
reach: global
impact: 3
options:
  - text: Put your savings in.
    origin: skill:finance
    cost: {money: 2}
    effects: [flag:invested, follow:dividend:3, follow:market-wobble:5]
  - text: Write that it cannot last.
    origin: profession:journalist
    cost: {}
    effects: [acquired:+famous, influence:+1, flag:warned]
  - text: Ask Mei-Lin what she sees in the numbers.
    origin: associate:hacker
    cost: {influence: 1}
    effects: [flag:insider, follow:market-wobble:4]
  - text: Wait.
    origin: always
    cost: {}
    effects: [follow:boom-passes-you:2]
---
TEST DATA. Markets in all five blocks open green for the ninth week. Everyone you know is suddenly an investor.

**Why you see these options:** Finance lets you judge the numbers. A journalist can call it. A hacker associate reads
what the exchanges do not publish. Waiting is always there.

**What they do:** Investing sets a flag and brings a dividend in three months – and a wobble in five. Writing makes you
famous and a little influential. Asking Mei-Lin makes you an insider. Waiting means the boom passes you.
