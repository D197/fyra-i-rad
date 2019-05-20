let { $, sleep } = require('./funcs');

let timeOut5Min = 5 * 60 * 1000

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

    this.Then(/^då är det oavgjort eller finns en vinnare$/, { timeout: timeOut5Min }, async function () {
        let gameInfo = await $('.game-info h3');
        await sleep(1000);
        let result = await gameInfo.getText();

        assert.isTrue(result.includes('oavgjort') || result.includes('vann'));
        trace("Spelet slutade i: " + result)
    });

}
