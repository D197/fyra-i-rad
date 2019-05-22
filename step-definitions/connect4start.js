let { $, sleep } = require('./funcs');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');


let driver1 = new webdriver.Builder().forBrowser('chrome').build();
let driver2 = new webdriver.Builder().forBrowser('chrome').build();

let Master = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
  "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
let pos1 = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
  "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
let pos2 = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
  "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
let b1 = false;
let b2 = false;
let sleepTime = 500;
let J = 0;
let i = 0;
let a = 0;
let b = 0;

async function bot1() {
  console.log("bot1");
  await sleep(sleepTime * 20);
  let all = await driver1.findElements(by.css('.float-left'));
  //console.log("1");
  for (let slot of all) {
    let C = await slot.getAttribute("class");
    if (C.includes('yellow')) {
      let n = await slot.getAttribute("data-instance-id");
      //console.log(n);
      let p = n - 15;
      if (pos1[b] === "0" && !(pos1.includes(p))) {
        pos1[b] = p
        b1 = true;
        //console.log(pos1);
        converter(pos1);
      }

    }
  }
}


async function lägga(p) {
  console.log("lägga");
  if (b1 === true) {
    //console.log(p);
    let p1 = await driver2.findElements(by.css('.board'));
    for (let slot of p1) {
      let C = await slot.getAttribute("style");
      if (p.includes(C)) {
        //console.log(C);
        sleep(1000);
        slot.click();
        b1 = false;
        bot2();
      }
    }
  }

  if (b2 === true) {
    let p2 = await driver1.findElements(by.css('.row0'));
    for (let slot of p2) {
      let C = await slot.getAttribute("data-instance-id");
      //console.log(C);
      if (p === C.toString()) {
        sleep(1000);
        slot.click();
        b2 = false;
        bot1();
      } else {
        //console.log("bajs");
      }
    }
  }

}

async function converter(p) {
  console.log("converter");
  //console.log(Master);
  let Lpos1;
  let Lpos2;

  if (b1 === true) {
    //console.log(b);
    while (true) {
      //console.log(p);
      if (Master[i] === "0" && p[b] !== "0") {

        if (p.includes(0, b) || p.includes(7, b) || p.includes(14, b) || p.includes(21, b) || p.includes(28, b) || p.includes(35, b)) {
          Lpos2 = "left: 0%; top: 0%;"
          Master[i] = "1"
          break;
        }
        else if (p.includes(1, b) || p.includes(8, b) || p.includes(15, b) || p.includes(22, b) || p.includes(29, b) || p.includes(36, b)) {
          Lpos2 = "left: 14.2857%; top: 0%;"
          Master[i] = "1"
          break;
        }
        else if (p.includes(2, b) || p.includes(9, b) || p.includes(16, b) || p.includes(23, b) || p.includes(30, b) || p.includes(37, b)) {
          Lpos2 = "left: 28.5714%; top: 0%;"
          Master[i] = "1"
          break;
        }
        else if (p.includes(3, b) || p.includes(10, b) || p.includes(17, b) || p.includes(24, b) || p.includes(31, b) || p.includes(38, b)) {
          Lpos2 = "left: 42.8571%; top: 0%;"
          Master[i] = "1"
          break;
        }
        else if (p.includes(4, b) || p.includes(11, b) || p.includes(18, b) || p.includes(25, b) || p.includes(32, b) || p.includes(39, b)) {
          Lpos2 = "left: 57.1429%; top: 0%;"
          Master[i] = "1"
          break;
        }
        else if (p.includes(5, b) || p.includes(12, b) || p.includes(19, b) || p.includes(26, b) || p.includes(33, b) || p.includes(40, b)) {
          Lpos2 = "left: 71.4286%; top: 0%;"
          Master[i] = "1"
          break;

        }
        else if (p.includes(6, b) || p.includes(13, b) || p.includes(20, b) || p.includes(27, b) || p.includes(34, b) || p.includes(41, b)) {
          Lpos2 = "left: 85.7143%; top: 0%;"
          Master[i] = "1"
          break;
        }
      } else {
        console.log("fel1");
      }
    }
    b++;
    i++;
    lägga(Lpos2);
  }


  if (b2 === true) {
    //console.log(p);
    //console.log(i);
    //console.log(Master[i]);
    while (true) {
      if (Master[i] === "0") {
        if (p[a].includes("left: 0%;")) {
          Lpos1 = "15";
          Master[i] = "2"
          break;
        }
        else if (p[a].includes("left: 14.2857%;")) {
          Lpos1 = "16";
          Master[i] = "2"
          break;
        }
        else if (p[a].includes("left: 28.5714%;")) {
          Lpos1 = "17";
          Master[i] = "2"
          break;
        }
        else if (p[a].includes("left: 42.8571%;")) {
          Lpos1 = "18";
          Master[i] = "2"
          break;
        }
        else if (p[a].includes("left: 57.1429%;")) {
          Lpos1 = "19";
          Master[i] = "2"
          break;
        }
        else if (p[a].includes("left: 71.4286%;")) {
          Lpos1 = "20";
          Master[i] = "2"
          break;
        }
        else if (p[a].includes("left: 85.7143%;")) {
          Lpos1 = "21";
          Master[i] = "2"
          break;
        }
      }
      else {
        console.log("fel2");
        console.log(Lpos1);
      }

    }
    a++;
    i++;
    lägga(Lpos1);
  }
}


async function bot2() {
  console.log("bot2");

  await sleep(sleepTime * 5);
  let all = await driver2.findElements(by.css('.player1'));
  for (let slot of all) {
    //sleep(sleepTime*1);
    let C = await slot.getAttribute("style");
    //console.log(C);
    //console.log(a);
    if (C !== "display: none;" && !((pos2.includes(C)))) {
      //console.log(C);
      if (C.includes("left: 0%;")) {
        pos2[a] = C;
        b2 = true;
        converter(pos2);
      }
      else if (C.includes("left: 14.2857%;")) {
        pos2[a] = C;
        b2 = true;
        converter(pos2);
      }
      else if (C.includes("left: 28.5714%;")) {
        pos2[a] = C;
        b2 = true;
        converter(pos2);
      }
      else if (C.includes("left: 42.8571%;")) {
        pos2[a] = C;
        b2 = true;
        converter(pos2);
      }
      else if (C.includes("left: 57.1429%;")) {
        pos2[a] = C;
        b2 = true;
        converter(pos2);
      }
      else if (C.includes("left: 71.4286%;")) {
        pos2[a] = C;
        b2 = true;
        converter(pos2);
      }
      else if (C.includes("left: 85.7143%;")) {
        pos2[a] = C;
        b2 = true;
        converter(pos2);
      }
    } else {
      //console.log("error");
    }

  }
}

module.exports = function () {


  this.Given(/^that I go to the game page$/, async function () {
    await driver1.get('http://localhost:3000/game');
  });

  this.When(/^I choose to play as one human and one bot$/, async function () {
    let typeChoiceButtons = await driver1.findElements(by.css('.type-choice-btn'));
    let typeChoiceButton = typeChoiceButtons[0]
    await typeChoiceButton.click();
    let choices = await driver1.findElements(by.css('.dropdown-menu.type-choice.show .dropdown-item'));
    for (let choice of choices) {
      let text = await choice.getText();
      if (text === 'Människa') {
        await choice.click();
        // we MUST break because the dom changes after click
        // and erases the old menu.. (tricky...)
        break;
      }
    }
    await sleep(sleepTime * 2);

    let TypeChoiceButtons = await driver1.findElements(by.css('.type-choice-btn'));
    let TypeChoiceButton = TypeChoiceButtons[1]
    await TypeChoiceButton.click();
    let Choices = await driver1.findElements(by.css('.dropdown-menu.type-choice.show .dropdown-item'));
    for (let Choice of Choices) {
      let text = await Choice.getText();
      if (text === 'bot') {
        await Choice.click();
        // we MUST break because the dom changes after click
        // and erases the old menu.. (tricky...)
        break;
      }
    }
    await sleep(sleepTime * 2);
  });

  this.When(/^I enter a name$/, async function () {
    let inputFields = await driver1.findElements(by.css('input[placeholder="Namn (2-10 tecken)"]'));
    await inputFields[0].sendKeys('Spelare 1');
    await sleep(sleepTime * 2);
    await inputFields[1].sendKeys('Spelare 2');
    await sleep(sleepTime * 2);
  });

  this.When(/^press the start button$/, async function () {
    let beginButton = await driver1.findElement(by.css('.begin-btn'));
    beginButton.click();
    await sleep(sleepTime * 2);
  });

  this.Then(/^the game should start$/, async function () {
    let activeMenuLink = await driver1.findElement(by.css('.nav-link.active'));
    let text = await activeMenuLink.getText();
    await sleep(1000); // small wait needed
    assert.equal(text, 'Avbryt spelet', 'The game did not start!');
    await sleep(sleepTime * 2);
  });

  this.Given(/^that I go to the home page$/, async function () {
    await driver2.get('https://connect4.gamesolver.org/');
  });

  this.When(/^I choose to play as one bot and one human$/, async function () {
    await driver2.findElement(by.xpath('//*[@id="player_1"]')).click();
    await sleep(sleepTime * 2);
  });

  this.Then(/^the game should Start$/, async function () {
    await sleep(sleepTime*2);
    assert.equal(await driver2.findElement(By.xpath("//*[@id='solution_header']")).getText(), "Yellow loses in 20 moves", "[Passed]");
  });

  this.When(/^they have played until someone wins$/, { timeout: 60 * 60 * 5 }, async function () {
    await bot2();

  });

  this.Then(/^one should win$/, async function () {
    let result;
    while (true) {
      let n = driver1.findElement(by.css('.game-info h3'));

      if (n === null) { continue; }

      let text;
      try {
        text = await n.getText();
      }
      catch (e) {
        continue;
      }

      if (text.includes('ovagjort') || text.includes('vann')) {
        result = text;
        break;
      }
      await sleep(100);
    }
    if(result.includes('Spelare 1')){
        fs.appendFileSync("result.txt", "Connect four boten började" + " Connect four boten vann" + "\n", "UTF-8",  {'flags': 'a+'}, (err) => {
            if (err) throw err;
        })
      console.log("result saved to result.txt");
    }else if(result.includes('Spelare 2')){
        fs.appendFileSync("result.txt", "Connect four boten började" + " four-wit-boten vann" + "\n", "UTF-8",  {'flags': 'a+'}, (err) => {
            if (err) throw err;
        })
      console.log("result saved to result.txt");
    }else{
        fs.appendFileSync("result.txt", "Connect four boten började" + " ovagjort" + "\n", "UTF-8",  {'flags': 'a+'}, (err) => {
            if (err) throw err;
        })
      console.log("result saved to result.txt");
    }
    console.log(result);
    driver1.quit();
    driver2.quit();
  });
}
