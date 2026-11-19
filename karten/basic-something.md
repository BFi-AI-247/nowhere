---
id: basic-something
kind: event
title: Basic something
picture: basic-something.jpg
stack: the-last-boom
thread: [boom-and-bust]
part: continues
after: [{card: crash-tuesday, options: [0, 1, 2, 3]}]
wait: [2, 6]
who: anyone
requires: [flag:crashed]
reach: block:europe
impact: 4
options:
  - text: "Argue for it, with the fund's money."
    origin: flag:levy-supported
    cost: {draws: 1}
    effects: [status:europe:+1, block:cultural:+1, block:economic:-1]
  - text: "Argue against it, with the crash's numbers."
    origin: skill:finance
    cost: {draws: 1}
    effects: [influence:+1, block:economic:+1, block:cultural:-1]
  - text: "Say what it would mean for ninety people."
    origin: flag:kept-humans
    cost: {draws: 1}
    effects: [influence:+2, status:europe:+1]
  - text: "Wait."
    origin: always
    cost: {draws: 1}
    effects: [block:cultural:+1]
  - text: "Write to your representative with your own story."
    origin: block:europe
    cost: {draws: 1, influence: 1}
    effects: [status:europe:+1, block:cultural:+1]
---
Nobody calls it a basic income because the word lost two referendums. It is called a transition payment, a
dividend, a citizen's share. Six hundred a month, no questions, for anyone the models made redundant, which by
now is a definition and not a list.

- *For* – Europe pays for its people. The numbers hate it.
- *Against* – Europe keeps its numbers. The people hate it.
- *Ninety people* – you make it specific. Specific wins votes.
- *Wait* – it passes in a weaker form.
- *Your own story* – one page, read aloud in committee by someone who never met you.
