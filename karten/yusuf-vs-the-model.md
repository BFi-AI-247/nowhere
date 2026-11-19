---
id: yusuf-vs-the-model
kind: event
title: Your engineer has an opinion
picture: yusuf-vs-the-model.jpg
stack: the-last-boom
thread: [the-ninety]
part: continues
after: [{card: the-new-foreman, options: [0, 1, 2]}]
wait: [2, 4]
place: factory-lodz
who: anyone
takes: 1
requires: []
reach: personal
impact: 2
options:
  - text: "Back your engineer. The line stays human where he says so."
    origin: associate:engineer
    cost: {draws: 1}
    effects: [influence:+1, flag:kept-humans, trait:+trusting]
  - text: "Back the model. Move your engineer to maintenance."
    origin: flag:model-in-house
    cost: {draws: 1}
    effects: [money:+1, associate-to-contact:yusuf-demir:4]
  - text: "Wait."
    origin: always
    cost: {draws: 1}
    effects: []
  - text: "Ask the line workers to vote."
    origin: block:europe
    cost: {draws: 1}
    effects: [influence:+1, flag:kept-humans]
---
Three months of the model on one shift. Your engineer has a spreadsheet. The model is faster, cheaper and wrong once a
week in a way that costs more than a month of being right. He puts it on your desk and does not sit down.

- *Back your engineer* – he is right this year. He may not be next year.
- *Back the model* – your engineer stays, in a smaller room, for a while.
- *Wait* – the spreadsheet stays on the desk.
- *A vote* – sixty-one to twenty-nine. They choose the model on one shift and people on the rest.
