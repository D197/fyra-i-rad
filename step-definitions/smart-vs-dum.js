let { $, sleep } = require('./funcs');

const fs = require('fs');

let timeOut5Min = 5 * 60 * 1000
let timeOut60Min = 60 * 60 * 1000

let statistik = {
    smart: 0,
    dum: 0,
    oavgjort: 0
}

module.exports = function () {

    this.Given(/^att spelet är laddat$/, { timeout: timeOut5Min }, async function () {
        // Ladda spel sida
        await helpers.loadPage('localhost:3000/game');

    });

    this.Given(/^att spelare 1 är bot$/, { timeout: timeOut5Min }, async function () {
        let inputFields = await $('input[placeholder="Namn (2-10 tecken)"]');
        await inputFields[0].sendKeys('Smart');

        // Sätt typ spelare 1 o 2 till Dum Bot
        let typeChoiceButtons = await $('.type-choice-btn');
        let typeChoiceButton = typeChoiceButtons[0]
        await typeChoiceButton.click();
        let choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
        for (let choice of choices) {
            let text = await choice.getText();
            if (text === 'Bot') {
                await choice.click();
                break;
            }
        }
    });

    this.Given(/^att spelare 2 är dum bot$/, { timeout: timeOut5Min }, async function () {
        // Sätt namn spelare 2 till DUM2
        let inputFields = await $('input[placeholder="Namn (2-10 tecken)"]');
        await inputFields[1].sendKeys('Dum');

        let typeChoiceButtons = await $('.type-choice-btn');
        let typeChoiceButton = typeChoiceButtons[1]
        await typeChoiceButton.click();
        let choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
        for (let choice of choices) {
            let text = await choice.getText();
            if (text === 'Dum bot') {
                await choice.click();
                break;
            }
        }
    });

    this.Then(/^spelet startas$/, { timeout: timeOut5Min }, async function () {
        let beginButton = await $('.begin-btn');
        beginButton.click();
    });

    this.When(/^när spelet är klart$/, { timeout: timeOut5Min }, async function () {
        // Vänta på att spelet är slut
        await driver.wait(until.elementLocated(By.css(".again-btn")), timeOut5Min);
    });

    this.Then(/^då är det smart som är en vinnare$/, { timeout: timeOut5Min }, async function () {
        let gameInfo = await $('.game-info h3');
        await sleep(1000);
        let result = await gameInfo.getText();

        assert.isTrue(result.includes('Smart vann'));
        trace("Spelet slutade i: " + result)
    });


    this.When(/^när (\d+) spel har spelats$/, { timeout: timeOut60Min }, async function (antal) {
        // Vänta på att spelet är slut
        await driver.wait(until.elementLocated(By.css(".again-btn")), timeOut60Min);

        // spara undan resultat
        let gameInfo = await $('.game-info h3');
        let resultat = await gameInfo.getText();

        if (resultat.includes('oavgjort')) {
            statistik.oavgjort = statistik.oavgjort + 1;
        } else if (resultat.includes('Smart vann')) {
            statistik.smart = statistik.smart + 1;
        } else {
            statistik.dum = statistik.dum + 1;
        }

        // spela resten
        for (i = 1; i < antal; i++) {
            // klicka spela igen
            let againButton = await $(".again-btn")
            againButton.click();

            let beginButton = await $('.begin-btn');
            beginButton.click();

            // Vänta på att spelet är slut
            await driver.wait(until.elementLocated(By.css(".again-btn")), timeOut60Min);

            // spara undan resultat
            let gameInfo = await $('.game-info h3');
            let resultat = await gameInfo.getText();

            if (resultat.includes('oavgjort')) {
                statistik.oavgjort = statistik.oavgjort + 1;
            } else if (resultat.includes('Smart vann')) {
                statistik.smart = statistik.smart + 1;
            } else {
                statistik.dum = statistik.dum + 1;
            }

        }

    });

    this.Then(/^ska det finnas statistik och en vinnare$/, { timeout: timeOut60Min }, async function () {
        let statistikText = "Smart: " + statistik.smart + "\n" +  "Dum: " + statistik.dum + "\n" + "Oavgjort: " + statistik.oavgjort + "\n";

        fs.appendFileSync("Statistik.txt", statistikText, "UTF-8",  {'flags': 'a+'}, (err) => {
            if (err) throw err;
        })

        trace(statistikText);
    });
}
