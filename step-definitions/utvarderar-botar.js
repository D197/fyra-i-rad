
let { $, sleep } = require('./funcs');

async function spelplanTillArray() {
    let spelplanArray = [];
    let slots = await $('.slot'); // 42 slots

    for (let slot of slots) {
        let cssClass = await slot.getAttribute('class');
        let color = 'empty';
        if (cssClass.includes('red')) { color = 'red'; }
        if (cssClass.includes('yellow')) { color = 'yellow'; }
        spelplanArray.push(color);
    }
    return spelplanArray;
}

let timeOut = 5 * 60 * 1000


module.exports = function () {

    var spelplan1
    var spelplan2


    this.Given(/^två matcher spelade med två dumbot$/, { timeout: timeOut }, async function () {
        // Ladda spel sida
        await helpers.loadPage('http' + '://localhost:3000/game');

        // Sätt namn spelare 1 till DUM1
        // Sätt namn spelare 2 till DUM2
        let inputFields = await $('input[placeholder="Namn (2-10 tecken)"]');
        await inputFields[0].sendKeys('DUM1');
        await inputFields[1].sendKeys('DUM2');


        // Sätt typ spelare 1 o 2 till Dum Bot
        let typeChoiceButtons = await $('.type-choice-btn');
        for (let typeChoiceButton of typeChoiceButtons) {
            await typeChoiceButton.click();
            let choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
            for (let choice of choices) {
                let text = await choice.getText();
                if (text === 'Dum bot') {
                    await choice.click();
                    break;
                }
            }
        }
        let beginButton = await $('.begin-btn');
        beginButton.click();

        // Vänta på att spelet är slut
        await driver.wait(until.elementLocated(By.css(".again-btn")), timeOut);

        // Kopiera bild på spelplan för spel 1
        spelplan1 = await spelplanTillArray();

        // klicka spela igen
        let againButton = await $(".again-btn") 
        againButton.click();

        // klicka spela
        beginButton = await $('.begin-btn');
        beginButton.click();

        // Vänta på att andra spelet är slut
        await driver.wait(until.elementLocated(By.css(".again-btn")), timeOut);

        // Kopiera bild på spelplan för spel 2
        spelplan2 = await spelplanTillArray();
    });
    
    this.Given(/^två matcher spelade med två bot$/, { timeout: timeOut }, async function () {
              // Ladda spel sida
              await helpers.loadPage('http' + '://localhost:3000/game');

              // Sätt namn spelare 1 till DUM1
              // Sätt namn spelare 2 till DUM2
              let inputFields = await $('input[placeholder="Namn (2-10 tecken)"]');
              await inputFields[0].sendKeys('SMART1');
              await inputFields[1].sendKeys('SMART2');
      
      
              // Sätt typ spelare 1 o 2 till Dum Bot
              let typeChoiceButtons = await $('.type-choice-btn');
              for (let typeChoiceButton of typeChoiceButtons) {
                  await typeChoiceButton.click();
                  let choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
                  for (let choice of choices) {
                      let text = await choice.getText();
                      if (text === 'Bot') {
                          await choice.click();
                          break;
                      }
                  }
              }
              let beginButton = await $('.begin-btn');
              beginButton.click();
      
              // Vänta på att spelet är slut
              await driver.wait(until.elementLocated(By.css(".again-btn")), timeOut);
      
              // Kopiera bild på spelplan för spel 1
              spelplan1 = await spelplanTillArray();
      
              // klicka spela igen
              let againButton = await $(".again-btn") 
              againButton.click();
      
              // klicka spela
              beginButton = await $('.begin-btn');
              beginButton.click();
      
              // Vänta på att andra spelet är slut
              await driver.wait(until.elementLocated(By.css(".again-btn")), timeOut);
      
              // Kopiera bild på spelplan för spel 2
              spelplan2 = await spelplanTillArray();
      

    });


    this.When(/^jag jämnför spelplanerna$/, function () {
        // Inget att göra

    });


    this.Then(/^då ska de vara olika$/, function () {
        // Förvänta oss att de är olika
        assert.notDeepEqual(spelplan1, spelplan2, "Ska inte vara lika");
    });


}
