Feature: Vilken av Bot och Dum bot vinner oftast?

Background:
  Given That I go to the game page
  When I choose to play as a Bot and a Dum bot
  And With two different names
  And Press the Börja spela-button
  Then The game should start

Scenario: 
  Given Ten matches played between Bot and Dum bot
  When Results are being compared
  Then Bot should have won ten times.