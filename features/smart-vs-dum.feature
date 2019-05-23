Feature: Vem vinner när smart möter dum.

    Background:
        Given att spelet är laddat
        And att spelare 1 är bot 
        And att spelare 2 är dum bot
        Then spelet startas

    Scenario: Vinner smart över dum
        When när spelet är klart
        Then då är det smart som är en vinnare

    Scenario: Vinner smart jämt över dum?
        When när 20 spel har spelats
        Then ska det finnas statistik och en vinnare