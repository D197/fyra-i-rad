let {$, sleep} = require('./funcs');
let sleepTime = 500;
const expect = require('chai');
async function boardToArray(){

  let boardArray = [];

  let slots = await $('.slot'); // 42 slots

  let count = 0;

  for(let slot of slots){

    let cssClass = await slot.getAttribute('class');

    let color = 'empty';

    if(cssClass.includes('red')){ color = 'red'; }

    if(cssClass.includes('yellow')){ color = 'yellow'; }

    boardArray.push(color);

  }

  return boardArray;

}

module.exports = function(){
  var spelBoard1
  var spelBoard2
  var spelBoard3
  var spelBoard4
  var spelBoard5

  this.Given(/^that I goto the game page$/, async function () {
    await helpers.loadPage('localhost:3000/game');
  });

  this.When(/^I choose to play as Human and Bot with two different names$/, async function () {
    let inputFields = await $('input[placeholder="Namn (2-10 tecken)"]');
    await inputFields[0].sendKeys('Player');
    await sleep(sleepTime * 2);
    await inputFields[1].sendKeys('Bot');
    await sleep(sleepTime * 2);
  });

  this.When(/^press the Börja spela\-button$/, async function () {
    let beginButton = await $('.begin-btn');
    beginButton.click();
    await sleep(sleepTime * 2);
  });

  this.Then(/^the game start$/, async function () {
    let activeMenuLink = await $('.nav-link.active');
    let text = await activeMenuLink.getText();
    await sleep(1000);
    assert.equal(text, 'Avbryt spelet', 'The game did not start!');
    await sleep(sleepTime * 2);
  });

  this.When(/^the Player plays (\d+) bricks in a row horizontally$/, async function (BricksToWin) {
    let slots = await $('.slot');
    await slots[1].click();
    await sleep(2000);
    await slots[2].click();
    await sleep(2000);
    let slots2 = await $('.slot');
    await slots2[3].click();
    await sleep(2000);
    let slots3 = await $('.slot');
    await slots3[4].click();
    await sleep(2000);
  });

  this.Then(/^the bot should have placed on specified tile1$/, async function () {
    spelBoard1 = await boardToArray();
    //console.log(spelBoard1);
    await sleep(2000);
  });

  this.Then(/^the bot should have placed on specified tile2$/, async function () {
    spelBoard2 = await boardToArray();
    //console.log(spelBoard2);
    assert.deepEqual(spelBoard1, spelBoard2);
    await sleep(2000);
  });

  this.Then(/^the bot should have placed on specified tile3$/, async function () {
    spelBoard3 = await boardToArray();
    //console.log(spelBoard3);
    assert.deepEqual(spelBoard1, spelBoard3);
    await sleep(2000);
  });

  this.Then(/^the bot should have placed on specified tile4$/, async function () {
    spelBoard4 = await boardToArray();
    //console.log(spelBoard4);
    assert.deepEqual(spelBoard1, spelBoard4);
    await sleep(2000);
  });

  this.Then(/^the bot should have placed on specified tile5$/, async function () {
    spelBoard5 = await boardToArray();
    //console.log(spelBoard5);
    assert.deepEqual(spelBoard1, spelBoard5);
    await sleep(2000);
  });
}
