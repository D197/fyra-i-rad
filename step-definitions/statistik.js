const fs = require('fs');
let { $, sleep } = require('./funcs');


module.exports = function() {

    this.Given(/^att vi har testdata$/, async function () {
        //Undviker error
        await helpers.loadPage('localhost:3000/game');


    });

    this.When(/^när all test är körda$/, async function () {
        //Iget att göra
    });

    this.Then(/^ska statistik beräknas$/, async function () {
        //Räknar statistik på Statistik.txt(Smart-vs-dum test)
        let data = fs.readFileSync('Statistik.txt', "UTF-8", { 'flags': 'a+' }, (err) => {
            if (err) throw err;
        })
        let statistik = data.match(/\d+/g).map(Number);

        var smart = [];
        var dum = [];
        var oavgjort= [];

        for (i = 0; i < statistik.length; i+=3){
            smart.push(statistik[i]);
        }
        for (i = 1; i < statistik.length; i+=3){
            dum.push(statistik[i]);
        }
        for (i = 2; i < statistik.length; i+=3){
            oavgjort.push(statistik[i]);
        }
            

        var smartSum = smart.reduce((partial_sum, a) => partial_sum + a,0);
        var dumSum = dum.reduce((partial_sum, a) => partial_sum + a,0);
        var oavgjortSum = oavgjort.reduce((partial_sum, a) => partial_sum + a,0);


        //console.log("Smart har vunnit: " +smartSum);
        //console.log("Dum har vunnit: " + dumSum);
        //console.log("Oavgjort: " + oavgjortSum);

        fs.appendFileSync("statistikTotal.txt", "Smarta vinster: " + smartSum + "\n" +  "Duma vinster: " + dumSum + "\n" + "Oavgjorda: " + oavgjortSum + "\n", "UTF-8",  {'flags': 'a+'}, (err) => {
            if (err) throw err;
        })
        console.log("Data saved in statistikTotal.txt.");
    });

}