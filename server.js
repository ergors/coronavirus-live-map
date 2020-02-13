const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const target = "https://www.worldometers.info/coronavirus/#countries";


process.stdout.write("Downloading coronavirus status...\n");
fs.readdir("output", (err, files) => {
    if (err) throw err;
    //limpar arquivos do diretorio
    for (const file of files) {
      fs.unlink(path.join("output", file), err => {
        if (err) throw err;
      });
    }
});
request(target, function(err, res, body){
    if (err) console.log("Ocorreu um erro " + err);
    var $ = cheerio.load(body);
    function GetResults(){
        console.log("Writing counter...");
        $(".maincounter-number span").each(function(i, elm) {
            let resultado = $(this).html().trim() + '\n';
            // 3 numbers
            // 1 -> total cases
            // 2 -> total deaths
            fs.appendFileSync("output/" + "result.txt", resultado);
        });
        console.log("Writing country results...")
        $("tr td").each(function(i, elm) {
            let resultado = $(this).html().trim() + '\n';
            // 7 columns each country
            // 1 -> country name
            // 2 -> total cases
            fs.appendFileSync("output/" + "result.txt", resultado);
        });
    }
    GetResults();
    
});

