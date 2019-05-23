let { $, sleep } = require('./funcs');
let sleepTime = 500;
let timeOut = 5 * 60 * 1000

const fs = require('fs')


async function resultatTillArray() {
  let resultatArray = [];
  let spelareVinner = await $("h3.mb-3 > span");
  let winText = await spelareVinner.getText();
  let resultat = 'empty';
      if (winText.includes('Bot')) { resultat = 'Bot vinner, Dum bot förlorar'; }
      if (winText.includes('Dum bot')) { resultat = 'Bot förlorar, Dum bot vinner'; }
      resultatArray.push(resultat);
  return resultatArray;
}


module.exports = function () {

    var match1
    var match2
    var match3
    var match4
    var match5
    var match6
    var match7
    var match8
    var match9
    var match10

    this.Given(/^That I go to the game page$/, async function () {
        await helpers.loadPage('localhost:3000/game');
      });
    
      this.When(/^I choose to play as a Bot and a Dum bot$/, async function () {
        let typeChoiceButtons = await $('.type-choice-btn');
        let choiceArray = ['Bot', 'Dum bot'];
        for (let typeChoiceButton of typeChoiceButtons) {
          await typeChoiceButton.click();
          let currentChoice = choiceArray.shift();
          let choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
          for (let choice of choices) {
            let text = await choice.getText();
            if (text === currentChoice) {
              await choice.click();
              break;
            }
          }
          await sleep(sleepTime * 2);
        }
      });

      
      this.When(/^With two different names$/, async function () {
        let inputFields = await $('input[placeholder="Namn (2-10 tecken)"]');
        await inputFields[0].sendKeys('Bot');
        await sleep(sleepTime * 2);
        await inputFields[1].sendKeys('Dum bot');
        await sleep(sleepTime * 2);
      });
    
      this.When(/^Press the Börja spela\-button$/, async function () {
        let beginButton = await $('.begin-btn');
        beginButton.click();
        await sleep(sleepTime * 2);
      });
    
      this.Then(/^The game should start$/, async function () {
        let activeMenuLink = await $('.nav-link.active');
        let text = await activeMenuLink.getText();
        await sleep(1000);
        assert.equal(text, 'Avbryt spelet', 'The game did not start!');
        await sleep(sleepTime * 2);
      });
    
    this.Given(/^Ten matches played between Bot and Dum bot$/, { timeout: timeOut }, async function () {
      
              // Vänta på att första spelet är slut
              await driver.wait(until.elementLocated(By.css(".again-btn")), timeOut);
      
              // Registrera resultat för match1.
              match1 = await resultatTillArray();
              console.log(match1); // Visa resultat från match1.

              await sleep(sleepTime * 2);
      
              // Klicka spela igen
              let againButton = await $(".again-btn") 
              againButton.click();
      
              // Klicka spela
              beginButton = await $('.begin-btn');
              beginButton.click();
      
              // Vänta på att andra spelet är slut
              await driver.wait(until.elementLocated(By.css(".again-btn")), timeOut);
      
              // Registrera resultat för match2.
              match2 = await resultatTillArray();
              console.log(match2); // Visa resultat från match2.

              await sleep(sleepTime * 2);

              // Klicka spela igen
              againButton = await $(".again-btn") 
              againButton.click();
      
              // Klicka spela
              beginButton = await $('.begin-btn');
              beginButton.click();
      
              // Vänta på att andra spelet är slut
              await driver.wait(until.elementLocated(By.css(".again-btn")), timeOut);
      
              // Registrera resultat för match3.
              match3 = await resultatTillArray();
              console.log(match3); // Visa resultat från match3.

              await sleep(sleepTime * 2);

              // Klicka spela igen
             againButton = await $(".again-btn") 
             againButton.click();
    
             // Klicka spela
             beginButton = await $('.begin-btn');
             beginButton.click();
    
              // Vänta på att andra spelet är slut
             await driver.wait(until.elementLocated(By.css(".again-btn")), timeOut);
    
              // Registrera resultat för match4.
             match4 = await resultatTillArray();
             console.log(match4); // Visa resultat från match4.


            await sleep(sleepTime * 2);

            // Klicka spela igen
            againButton = await $(".again-btn") 
            againButton.click();
    
            // Klicka spela
            beginButton = await $('.begin-btn');
            beginButton.click();
    
            // Vänta på att andra spelet är slut
            await driver.wait(until.elementLocated(By.css(".again-btn")), timeOut);
    
            // Registrera resultat för match5.
            match5 = await resultatTillArray();
            console.log(match5); // Visa resultat från match5.

            await sleep(sleepTime * 2);

              // Klicka spela igen
          againButton = await $(".again-btn") 
          againButton.click();
  
          // Klicka spela
          beginButton = await $('.begin-btn');
          beginButton.click();
  
          // Vänta på att andra spelet är slut
          await driver.wait(until.elementLocated(By.css(".again-btn")), timeOut);
  
          // Registrera resultat för match6.
          match6 = await resultatTillArray();
          console.log(match6); // Visa resultat från match6.

          await sleep(sleepTime * 2);

            // Klicka spela igen
            againButton = await $(".again-btn") 
            againButton.click();
    
            // Klicka spela
            beginButton = await $('.begin-btn');
            beginButton.click();
    
            // Vänta på att andra spelet är slut
            await driver.wait(until.elementLocated(By.css(".again-btn")), timeOut);
    
            // Registrera resultat för match7.
            match7 = await resultatTillArray();
            console.log(match7); // Visa resultat från match7.

            await sleep(sleepTime * 2);

              // Klicka spela igen
          againButton = await $(".again-btn") 
          againButton.click();
  
          // Klicka spela
          beginButton = await $('.begin-btn');
          beginButton.click();
  
          // Vänta på att andra spelet är slut
          await driver.wait(until.elementLocated(By.css(".again-btn")), timeOut);
  
          // Registrera resultat för match8.
          match8 = await resultatTillArray();
          console.log(match8); // Visa resultat från match8.

          await sleep(sleepTime * 2);

            // Klicka spela igen
            againButton = await $(".again-btn") 
            againButton.click();
    
            // Klicka spela
            beginButton = await $('.begin-btn');
            beginButton.click();
    
            // Vänta på att andra spelet är slut
            await driver.wait(until.elementLocated(By.css(".again-btn")), timeOut);
    
          // Registrera resultat för match9.
          match9 = await resultatTillArray();
          console.log(match9); // Visa resultat från match9.

          await sleep(sleepTime * 2);

          // Klicka spela igen
          againButton = await $(".again-btn") 
          againButton.click();
  
          // Klicka spela
          beginButton = await $('.begin-btn');
          beginButton.click();
  
          // Vänta på att andra spelet är slut
          await driver.wait(until.elementLocated(By.css(".again-btn")), timeOut);
  
          // Registrera resultat för match10.
          match10 = await resultatTillArray();
          console.log(match10); // Visa resultat från match10.

          await sleep(sleepTime * 2);

    });


    this.When(/^Results are being compared$/, function () {
        // Inget att göra 

    });


    this.Then(/^Bot should have won ten times.$/, function () {
        // Förvänta oss att Bot har vunnit mot Dum bot i 10 av 10 matcher.
        assert.deepEqual(match1, match2, "Dum bot ska inte vinna");;
        assert.deepEqual(match3, match4, "Dum bot ska inte vinna");;
        assert.deepEqual(match5, match6, "Dum bot ska inte vinna");;
        assert.deepEqual(match7, match8, "Dum bot ska inte vinna");;
        assert.deepEqual(match9, match10, "Dum bot ska inte vinna");;
    });



}