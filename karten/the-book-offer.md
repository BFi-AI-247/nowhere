---
id: the-book-offer
kind: event
title: The book offer
picture: the-book-offer.jpg
stack: the-signal
thread: [the-word]
part: continues
after: [{card: the-lecture, options: [0, 1, 2, 3]}, {card: the-old-article, options: [0, 1, 2]}]
wait: [4, 8]
who: self
place: home
takes: 0
costs: 1
expires: 4
requires: [month:3, until:7]
reach: personal
impact: 2
options:
  - text: "Sign. Advance now, the rest when it is out."
    origin: skill:languages
    cost: {draws: 1}
    effects: [money:+1, flag:writing-the-book, follow:the-book-comes-out:3]
  - text: "Sign. Advance now, the rest when it is out."
    origin: profession:journalist
    cost: {draws: 1}
    effects: [money:+1, flag:writing-the-book, follow:the-book-comes-out:3]
  - text: "Sign. Advance now, the rest when it is out."
    origin: flag:heard-first
    cost: {draws: 1}
    effects: [money:+1, flag:writing-the-book, follow:the-book-comes-out:3]
  - text: "Say no. You have a day job."
    origin: always
    cost: {draws: 1}
    effects: []
---
An editor in London, a deadline in autumn, a title you hate: "Eleven Days". She wants the inside of the year from
someone who was inside it. The advance is small; the rest is not.

- *Sign* – evenings and weekends for a season. In autumn, a book with your name on it, in every airport.
- *Say no* – somebody else writes it. Worse.
