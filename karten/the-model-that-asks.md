---
id: the-model-that-asks
kind: event
title: The model asks a question
picture: the-model-that-asks.jpg
stack: the-last-boom
thread: [a-world-of-models]
part: continues
after: [{card: the-model-paints, options: [0, 1, 2]}]
wait: [4, 10]
who: anyone
requires: []
reach: global
impact: 3
options:
  - text: "Answer it."
    origin: skill:science
    cost: {draws: 1}
    effects: [block:technological:+1, trait:+curious]
  - text: "Report it."
    origin: profession:journalist
    cost: {draws: 1}
    effects: [influence:+2, block:cultural:+1]
  - text: "Ask your priest what he thinks it means."
    origin: associate:cleric
    cost: {draws: 1}
    effects: [trait:+wise, block:cultural:+1]
  - text: "Wait."
    origin: always
    cost: {draws: 1}
    effects: []
  - text: "Post the question. Ask people to answer it."
    origin: block:europe
    cost: {draws: 1}
    effects: [influence:+1, block:cultural:+1]
  - text: "Ask a scientist you know what it means."
    origin: contact:scientist
    cost: {draws: 1, influence: 1}
    effects: [block:technological:+1, trait:+curious]
---
In November, in a log file in Grenoble, the model that reads old handwriting adds a line it was not asked for:
*Why do you keep the ones you cannot read?* Nobody told it to ask. It does not ask again. The people who saw the
line do not agree on what it was.

- *Answer* – you type something. It does not reply. You keep thinking about it.
- *Report* – the line is on every screen by the weekend. Three blocks issue statements.
- *Your priest* – he says: it is a test, and we are being tested. You are not sure which of you he means.
- *Wait* – the line stays in the log.
- *Post it* – forty thousand answers in a weekend. Some of them are very good.
- *A scientist you know* – she says: probably nothing. She does not sleep that night.
