---
id: the-hearing
kind: event
title: The hearing
picture: the-hearing.jpg
stack: the-last-boom
thread: [the-source]
part: turns
after: [{card: the-whistleblower, options: [0, 1, 2]}]
wait: [8, 12]
place: europe
takes: 1
who: self
requires: []
reach: block:europe
impact: 4
options:
  - text: "Tell the committee everything you know."
    origin: always
    cost: {draws: 1}
    effects: [status:europe:+2, influence:+1, trait:+honest]
  - text: "Protect your source, whatever they ask."
    origin: flag:knows-the-source
    cost: {draws: 1}
    effects: [influence:+2, trait:+loyal, acquired:+wanted]
  - text: "Bring your lawyer. Say only what she clears."
    origin: associate:lawyer
    cost: {draws: 1, money: 1}
    effects: [status:europe:+1]
  - text: "Ask for a closed session."
    origin: block:europe
    cost: {draws: 1, influence: 1}
    effects: [status:europe:+1]
---
Room 4Q2, nine members, a camera, a glass of water. The model company sends its chief scientist, who is very
calm. You are sworn in after him. The chair asks you, politely, how you know what you know.

- *Everything* – you answer every question. It takes four hours. It is on every channel.
- *Your source* – you do not say her name. They threaten you with contempt. You hold.
- *Your lawyer* – careful, correct, a little dull. Nothing you said can be used.
- *Closed session* – no camera, more truth. The minutes are published in thirty years.
