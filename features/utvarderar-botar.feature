Feature: Bedöma om bottarna spelar likadant varje gång mot varandra.

    Scenario: Jämföra två spelplaner om dom är lika eller olika för dumbot
        Given två matcher spelade med två dumbot
        When jag jämnför spelplanerna
        Then då ska de vara olika

   Scenario: Jämföra två spelplaner om dom är lika eller olika för bot
        Given två matcher spelade med två bot
        When jag jämnför spelplanerna
        Then då ska de vara olika


