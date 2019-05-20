Feature: Vem vinner när smart möter dum.

    Background:
        Given att spelet är laddat
        And att spelare 1 är bot 
        And att spelare 2 är dum bot
        Then spelet startas

    Scenario: Vinner smart över dum
        When när spelet är klart
        Then då är det oavgjort eller finns en vinnare