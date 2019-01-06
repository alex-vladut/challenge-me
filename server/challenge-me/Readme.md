# Challenge-me

### Requirements

What I want is to build a very simple application that will give people the possibility to challenge others, the main flow will look something like this:
- A user creates a new challenge and selects an Opponent and a Referee
- The Opponent accepts the challenge
- The Referee accepts the challenge
- The Referee decides who is the winner

### Design and Domain Modeling

At this point is not clear at all what I want to accomplish, and even less how can I accomplish it. It feels to me that Event Storming  is ideal for understanding a well-established domain, but what can we do to understand not yet very well defined domains? Think about a user coming to you with an idea, they just want to accomplish a given business goal. They have absolutely no idea how this could be materialised, and even if they would come to you with an exact solution, it's your job to challenge this assumption in order to understand first what is that they want to accomplish. Maybe their solution is not feasible, or there might be a much simpler way to accomplish the same end goal.

Event Storming starts by first finding the events that take part to the process. But at this stage I have no idea what those events are. There is no pre-defined domain, I'm just building it right now! More than that, even though I would be able to come up with a list of events, it still feels there is a given trigger that I have in mind when listing those events, is not only the event in isolation.
