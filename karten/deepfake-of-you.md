---
id: deepfake-of-you
kind: event
title: There is a video of you
picture: deepfake-of-you.jpg
stack: the-last-boom
thread: [the-source]
part: turns
after: [{card: the-hearing, options: [0, 1, 2]}, {card: the-whistleblower, options: [0, 1]}]
wait: [4, 8]
takes: 0
expires: 1
requires: []
reach: personal
impact: 4
options:
  - text: "Go on camera, live, and take it apart."
    origin: skill:performance
    cost: {draws: 1}
    effects: [influence:+2, acquired:+famous]
  - text: "Have your hacker find where it came from."
    origin: associate:hacker
    cost: {draws: 1}
    effects: [influence:+1, flag:knows-the-source]
  - text: "Sue the platform."
    origin: associate:lawyer
    cost: {draws: 1, money: 2}
    effects: [status:europe:+1]
  - text: "Post one line: it is not me."
    origin: block:europe
    cost: {draws: 1}
    effects: [influence:-1]
  - text: "Say nothing."
    origin: always
    cost: {draws: 1}
    effects: [acquired:+infamous]
  - text: "Ask a hacker you know where it came from."
    origin: contact:hacker
    cost: {draws: 1, influence: 1}
    effects: [flag:knows-the-source]
---
Thirty-four seconds. You, in a hotel bar you have never been to, saying what you think of the people who work for
you. The voice is yours. The face is yours. The words are things you have thought on bad days and never said. It
has been seen nine hundred thousand times by breakfast.

- *Live* – you show the frame where the light is wrong. People believe you, mostly.
- *Your hacker* – he finds a server, then a name. You know now. You do not know what to do with it.
- *Sue* – slow, expensive, on the record.
- *One line* – nobody reads a denial.
- *Nothing* – it becomes, for some people, who you are.
- *A hacker you know* – a server in a country you will not name. Now you know.
