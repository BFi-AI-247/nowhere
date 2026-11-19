---
id: leo-disappears
kind: event
title: Leo stops answering
picture: leo-disappears.jpg
stack: the-last-boom
thread: [the-source]
part: closes
after: [{card: the-deepfake-of-the-minister, options: [0, 1, 2]}, {card: deepfake-of-you, options: [0, 1, 2]}]
wait: [6, 12]
takes: 2
who: anyone
expires: 2
requires: []
reach: personal
impact: 3
options:
  - text: "Find him."
    origin: skill:investigation
    cost: {draws: 1}
    effects: [influence:-1, associate-to-contact:leo-brandt:3, acquired:+wanted]
  - text: "Ask your friend in intelligence. He knows people who know."
    origin: associate:spy
    cost: {draws: 1}
    effects: [influence:-1, associate-to-contact:leo-brandt:6]
  - text: "Wait."
    origin: always
    cost: {draws: 1}
    effects: [lose:leo-brandt]
  - text: "Report him missing. Keep calling."
    origin: block:europe
    cost: {draws: 1, influence: 1}
    effects: [associate-to-contact:leo-brandt:5]
---
Four days, no messages. His flat is tidy, which it never is. The last thing he traced was a server, and the server
belonged to a ministry, and the ministry belonged to a block that is not yours.

- *Find him* – you do. He is fine, and now the people who have him know your name.
- *Your friend in intelligence* – he makes a call. Leo turns up in six months with a story he will not tell.
- *Wait* – Leo does not come back.
- *Keep calling* – five months later, a message: I'm fine. Don't ask. Then he is back.
