---
id: the-hit-song
kind: event
title: The number one is not a person
picture: the-hit-song.jpg
stack: the-last-boom
thread: [a-world-of-models]
part: continues
after: [{card: artists-sue, options: [0, 1, 2]}]
wait: [4, 10]
who: anyone
requires: []
reach: global
impact: 2
options:
  - text: "Ask your artist friend to answer it with a live show."
    origin: associate:artist
    cost: {draws: 1, money: 1}
    effects: [block:cultural:+2, influence:+1]
  - text: "Sing along. It is good."
    origin: block:europe
    cost: {draws: 1}
    effects: [trait:+content]
  - text: "Find the person who wrote the prompt."
    origin: skill:investigation
    cost: {draws: 1}
    effects: [influence:+2]
  - text: "Change the station."
    origin: always
    cost: {draws: 1}
    effects: []
---
For six weeks the most played song in Europe is sung by a voice that does not exist, about a summer nobody had. It
is very good. Children know all the words. A musician in Glasgow says it is the first song in history with no one
to thank, and that turns out to be wrong: a seventeen-year-old in Lyon typed the idea.

- *A live show* – a cellar in Berlin, three hundred people, a band that sweats. Nobody films it, for once.
- *Sing along* – it is catchy. You are allowed to like it.
- *The prompt* – she is shy and very surprised and owns nothing.
- *Change the station* – it is on that one too.
