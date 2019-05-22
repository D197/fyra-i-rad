Feature: Vilken bot vinner oftast

   Feature Description

Scenario: Start four-with-bot
Given that I go to the game page
When I choose to play as one human and one bot
And I enter a name
And press the start button
Then the game should start

Scenario: Start Connect 4 Solver
Given that I go to the home page
When I choose to play as one bot and one human
Then the game should Start

Scenario: Vs
When they have played until someone wins
Then one should win
