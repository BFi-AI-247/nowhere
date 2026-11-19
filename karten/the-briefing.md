---
id: the-briefing
kind: event
title: The briefing
picture: the-briefing.jpg
stack: the-signal
thread: [the-secret, europe-at-the-table]
part: closes
after: [{card: the-second-cycle, options: [1]}, {card: the-blocks-know, options: [0, 1, 2]}]
wait: [1, 4]
who: self
place: europe
takes: 1
costs: 1
expires: 3
requires: [month:4, until:8]
reach: block:europe
impact: 3
options:
  - text: "Brief the cabinet. Say what is known and stop there."
    origin: flag:told-europe
    cost: {draws: 1}
    effects: [status:europe:+2, influence:+1, trait:+honest]
  - text: "Brief the cabinet. Say what is known and stop there."
    origin: flag:heard-first
    cost: {draws: 1}
    effects: [status:europe:+2, influence:+1]
  - text: "Brief them and ask for the chair of the committee that does not exist yet."
    origin: skill:persuasion
    cost: {draws: 1, influence: 1}
    effects: [status:europe:+2, flag:committee-seat, trait:+ambitious]
    check: {skill: persuasion, difficulty: 3, trait: ambitious}
    partial: [status:europe:+1]
    failure: [status:europe:-1, trait:+wrathful]
  - text: "Send a politician you know in your place."
    origin: contact:politician
    cost: {draws: 1, influence: 1}
    effects: [status:europe:+1]
  - text: "Decline. You do not brief governments."
    origin: always
    cost: {draws: 1}
    effects: [trait:+shy]
---
A room in Brussels with no windows, fourteen ministers and a projector that does not work. They have the five
statements, a translation of the Chinese one and no idea what the pattern is. They have been told you do.

- *Say what is known* – twenty minutes, no adjectives. They have never heard anyone do that. They remember.
- *Ask for the chair* – there will be a committee by June. You are on it, or you run it.
- *Send your politician* – she does well. It is her name they remember.
- *Decline* – a man from a think tank briefs them instead. He uses the word "paradigm".
