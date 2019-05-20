let {$, sleep} = require('./funcs');
let sleepTime = 500;

module.exports = function(){

  this.Given(/^that I goto the game page$/, async function () {
    await helpers.loadPage('localhost:3000/game');
  });

  this.When(/^I choose to play as two human players$/, async function () {
    await sleep(2000);
    let typeChoiceButtons = await $('.type-choice-btn' );
    for(let typeChoiceButton of typeChoiceButtons){
      await typeChoiceButton.click();
      let choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
      for(let choice of choices){
        let text = await choice.getText();
        if(text === 'Människa'){
          await choice.click();
          break;
        }
      }
      await sleep(sleepTime * 2);
    }
  });

  this.When(/^with two different names$/, async function () {
    let inputFields = await $('input[placeholder="Namn (2-10 tecken)"]');
    await inputFields[0].sendKeys('Spelare 1');
    await sleep(sleepTime * 2);
    await inputFields[1].sendKeys('Spelare 2');
    await sleep(sleepTime * 2);
  });

  this.When(/^press the Börja spela\-button$/, async function () {
    let beginButton = await $('.begin-btn');
    beginButton.click();
    await sleep(sleepTime * 2);
  });

  this.Then(/^the game should start$/, async function () {
    let activeMenuLink = await $('.nav-link.active');
    let text = await activeMenuLink.getText();
    await sleep(1000);
    assert.equal(text, 'Avbryt spelet', 'The game did not start!');
    await sleep(sleepTime * 2);
  });

  
  this.When(/^the first player plays (\d+) bricks in a row horizontally$/, async function (BricksToWin) {
    let slots = await $('.slot');
    await slots[0].click();
    await sleep(2000);
    await slots[6].click();
    await sleep(2000);
    await slots[1].click();
    await sleep(2000);
    await slots[5].click();
    await sleep(2000);
    await slots[2].click();
    await sleep(2000);
    await slots[4].click();
    await sleep(2000);
    await slots[3].click();
    await sleep(2000);
    let lastCoin = await $('.slot.row5.red.float-left.won');
    //console.log(lastCoin);
  });

  this.Then(/^he or she should win$/, async function () {
    let spelareVinner = await $("html body div main.container.mt-4.mb-3 div.game div.game-info h3.mb-3.text-center span");
    let winText = await spelareVinner.getText();
    assert.equal(winText, "Spelare 1 vann, efter 4 drag!");
  });


  this.When(/^the first player plays (\d+) bricks in a row vertical$/, async function (BricksToWin) {
    let count = 0;
    while (count < 4){
      let slots = await $('.slot');
      await slots[4].click();
      count++;
      if (count === 4){
        break;
      }
      await sleep(2000);
      await slots[3].click();
      await sleep(2000);
    }
    let lastCoin = await $(".slot.row2.red.float-left.won");
    //console.log(lastCoin);
  });


  this.Then(/^he\/she should win$/, async function () {
    await sleep(1000);
    let spelareVinner = await $("h3.mb-3 > span");
    let winText = await spelareVinner.getText();
    assert.equal(winText, "Spelare 1 vann, efter 4 drag!");
    
  });

  this.When(/^the first player plays (\d+) bricks in a diagonally \(left to right\)$/, async function (BricksToWin) {
    let slots = await $('.slot');
    await slots[5].click();
    await sleep(1000);
    await slots[4].click();
    await sleep(1000);
    let slots2 = await $('.slot');
    await slots2[4].click();
    await sleep(1000);
    await slots2[3].click();
    await sleep(1000);
    let slots3 = await $('.slot');
    await slots3[3].click();
    await sleep(1000);
    await slots3[2].click();
    await sleep(1000);
    let slots4 = await $('.slot');
    await slots4[3].click();
    await sleep(1000);
    await slots4[2].click();
    await sleep(1000);
    await slots4[1].click();
    await sleep(1000);
    let slots5 = await $('.slot');
    await slots5[2].click();
    await sleep(1000);
    let slots6 = await $('.slot');
    await slots6[2].click();
    await sleep(1000);
    let lastCoin = await $('.slot.row2.red.float-left.won');
    //console.log(lastCoin);
    
    
  });

  this.Then(/^he should win$/, async function () {
    let spelareVinner = await $("h3.mb-3 > span");
    let winText = await spelareVinner.getText();
    assert.equal(winText, "Spelare 1 vann, efter 6 drag!");
    
  });

  this.When(/^the first player plays (\d+) bricks in a diagonally \(right to left\)$/, async function (BricksToWin) {
    let slots = await $('.slot');
    await slots[2].click();
    await sleep(1000);
    await slots[3].click();
    await sleep(1000);
    let slots2 = await $('.slot');
    await slots2[3].click();
    await sleep(1000);
    await slots2[4].click();
    await sleep(1000);
    let slots3 = await $('.slot');
    await slots3[4].click();
    await sleep(1000);
    await slots3[5].click();
    await sleep(1000);
    let slots4 = await $('.slot');
    await slots4[4].click();
    await sleep(1000);
    await slots4[5].click();
    await sleep(1000);
    let slots5 = await $('.slot');
    await slots5[6].click();
    await sleep(1000);
    await slots5[5].click();
    await sleep(1000);
    let slots6 = await $('.slot');
    await slots6[5].click();
    await sleep(1000);
    let lastCoin = $(".slot.row2.red.float-left.won");
    //console.log(lastCoin);
  });

  this.Then(/^she should win$/, async function () {
    let spelareVinner = await $("h3.mb-3 > span");
    let winText = await spelareVinner.getText();
    assert.equal(winText, "Spelare 1 vann, efter 6 drag!");
    
  });
  this.When(/^two players play but noone wins$/, {timeout: 100 * 1000}, async function () {
    while (true){
      let slots = await $('.slot');
      await sleep(1000);
      await slots[0].click();
      await sleep(1000);
      await slots[6].click();
      await sleep(1000);
      await slots[1].click();
      await sleep(1000);
      await slots[5].click();
      await sleep(1000);
      await slots[4].click();
      await sleep(1000);
      await slots[2].click();
      await sleep(1000);
      await slots[3].click();
      await sleep(1000);
      let gameInfoH3 = await $('.game-info h3');
      let text;
      try {
        text = await gameInfoH3.getText();
      }
      catch(e){
        continue;
      }
      if(text.includes('oavgjort')){
        break;
      }
      await sleep(100);
    }

  });

  this.Then(/^it should be a draw$/, async function (){
    let drawText = await $('.game-info h3');
    await sleep(1000);
    let draw = await drawText.getText();
    await sleep(1000);
    assert.isTrue(draw.includes('oavgjort'), console.log("Game draw"));
  });
}
