---
id: the-insurance-model
kind: event
title: The insurer's model says no
picture: the-insurance-model.jpg
stack: the-last-boom
thread: [a-world-of-models]
part: continues
after: [{card: translators-vanish, options: [0, 1, 2]}]
wait: [4, 10]
requires: []
reach: personal
impact: 2
options:
  - text: "Appeal, with every document you have."
    origin: trait:patient
    cost: {draws: 1}
    effects: [money:+2]
  - text: "Let your lawyer write one letter."
    origin: associate:lawyer
    cost: {draws: 1}
    effects: [money:+2, influence:+1]
  - text: "Find the clause and make it a story."
    origin: skill:investigation
    cost: {draws: 1}
    effects: [money:+1, influence:+2, acquired:+famous]
  - text: "Phone them and ask for a person."
    origin: block:europe
    cost: {draws: 1}
    effects: [money:+1, trait:+impatient]
  - text: "Pay it yourself."
    origin: always
    cost: {draws: 1}
    effects: [money:-2]
  - text: "Ask a lawyer you know for one sentence."
    origin: contact:lawyer
    cost: {draws: 1, influence: 1}
    effects: [money:+1]
---
The water pipe in the cellar, the claim, four photographs, the reply in nine seconds: rejected, "pre-existing
condition of the property". There is no name at the bottom. There is a link to a satisfaction survey.

- *Appeal* – forty pages, three weeks, and then, without explanation, yes.
- *Your lawyer* – one page. Yes by return.
- *The clause* – thirty thousand other people had the same nine-second answer.
- *A person* – after an hour of music, a woman in Porto who says: let me see what I can do.
- *Pay* – it is quicker. It is not cheaper.
- *A lawyer you know* – one sentence, in your own email. They pay half.
