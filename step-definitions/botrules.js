let { $, sleep } = require('./funcs');
const fs = require('fs');
let sleepTime = 1000;
let timeOut = 5 * 60 * 1000



async function boardToArray(){
  let boardArray = [];
  let slots = await $('.slot'); // 42 slots
  for(let slot of slots){
    let cssClass = await slot.getAttribute('class');
    let color = 'empty';
    if(cssClass.includes('red')){ color = 'red'; }
    if(cssClass.includes('yellow')){ color = 'yellow'; }
    boardArray.push(color);
  }
  return boardArray;
}



module.exports = function () {

  this.Given(/^that I am on the game website$/, async function () {
    await helpers.loadPage('http' + '://localhost:3000/game');
  });

  this.When(/^I choose bot against bot and press Börja Spela$/, async function () {
    await driver.findElement(By.xpath("/html/body/div/main/div/div[1]/div/div[2]/button")).click();
    await sleep(sleepTime * 2);
    await driver.findElement(By.xpath("/html/body/div/main/div/div[1]/div/div[2]/div/div[3]")).click();
    await sleep(sleepTime * 2);
    await driver.findElement(By.xpath("/html/body/div/main/div/div[1]/div/input")).sendKeys("Bot1");
    await sleep(sleepTime * 2);
    await driver.findElement(By.xpath("/html/body/div/main/div/div[2]/div/input")).sendKeys("Bot2");
    await sleep(sleepTime * 2);
    await driver.findElement(By.xpath("/html/body/div/main/div/div[3]/button[1]")).click();
  });

  this.Then(/^the bots should follow the rules throughout the game\.$/, { timeout: 60 * 1000 }, async function () {
    await driver.wait(until.elementLocated(By.css(".again-btn")), timeOut);
    let vinnare = await $('.game-info h3');
    await sleep(1000);
    let vinner = await vinnare.getText();
    await sleep(1000);
    //console.log(vinner);

    let theBoard = await boardToArray();
    let red = 0;
    let yellow = 0;
    

    for(i=0;i<theBoard.length;i++){
      if(theBoard[i].includes('red')){
        red++;
      }
      else if(theBoard[i].includes('yellow')){
        yellow++;
      }
    }

    //console.log(yellow);
  
    if (vinner.includes('Bot1')) {
      assert.isTrue(red > yellow, "[Röd vann]");
      fs.appendFileSync('botregler.txt', "Röd vann\n" + "Spelade pjäser: Röd: " + red + " Gul: " + yellow + "\n", "UTF-8",  {'flags': 'a+'}, (err) => {
        if (err) throw err;})
    } else if (vinner.includes('Bot2')) {
      assert.equal(yellow, red, "[Gul vann]");
      fs.appendFileSync('botregler.txt', "Gul vann\n" + "Spelade pjäser: Röd: " + red + " Gul: " + yellow + "\n", "UTF-8",  {'flags': 'a+'}, (err) => {
        if (err) throw err;})
    } else {
      assert.equal(red, yellow, "[ovagjort]");
      fs.appendFileSync('botregler.txt', "Oavgjort\n"+ "Spelade pjäser: Röd: " + red + " Gul: " + yellow + "\n", "UTF-8",  {'flags': 'a+'}, (err) => {
        if (err) throw err;})
    }

  });

}
