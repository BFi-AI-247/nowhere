---
id: heatwave
kind: event
title: Forty-one degrees in Paris
picture: heatwave.jpg
stack: the-last-boom
thread: [the-power]
part: continues
after: [{card: compute-shortage, options: [0, 1, 2]}]
wait: [4, 10]
who: anyone
takes: 0
costs: 0
expires: 3
requires: []
reach: global
impact: 4
options:
  - text: "Ask your doctor what the hospitals need, and pay for it."
    origin: associate:doctor
    cost: {draws: 1, money: 2}
    effects: [influence:+2, status:europe:+1, trait:+compassionate]
  - text: "Report from the cooling halls."
    origin: profession:journalist
    cost: {draws: 1}
    effects: [influence:+2, block:cultural:+1]
  - text: "Switch your servers off for the week."
    origin: possession:servers
    cost: {draws: 1}
    effects: [money:-1, influence:+2, block:technological:-1]
  - text: "Open your doors to the neighbours."
    origin: block:europe
    cost: {draws: 1}
    effects: [influence:+1, trait:+generous]
  - text: "Stay inside."
    origin: always
    cost: {draws: 1}
    effects: []
  - text: "Ask a doctor you know which ward needs help."
    origin: contact:doctor
    cost: {draws: 1, influence: 1}
    effects: [influence:+1, trait:+compassionate]
---
Three weeks above thirty-eight. The Seine is warm enough to bathe in and nobody is allowed to. The data centres
north of the city run their cooling at full power and the grid browns out twice in the 18th. In the care homes
the staff count the night. The models predicted all of it, precisely, a year ago.

- *Your doctor* – she knows which ward runs out of fans first. You buy the fans.
- *Report* – people read it in the shade. It changes nothing and everything.
- *Servers off* – a week of lost rent, and one less hum in the heat.
- *Neighbours* – your flat has the north window. Six people sleep on your floor.
- *Inside* – you are fine. You notice that you are fine.
- *A doctor you know* – she names a care home. You take fans there yourself.
