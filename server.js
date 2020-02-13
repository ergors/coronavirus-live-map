const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const target = "https://www.worldometers.info/coronavirus/#countries";
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
let time = year + "-" + month + "-" + date + "|" + hours + ":" + minutes + ":" + seconds + ".txt";

process.stdout.write("Downloading coronavirus status...\n");
request(target, function(err, res, body){
    if (err) console.log("Ocorreu um erro " + err);
    var $ = cheerio.load(body);
    $("tr td").each(function(i, elm) {
        var resultado = $(this).html().trim() + '\n';
        // 7 columns each country
        // 1 -> country name
        // 2 -> total cases
        fs.appendFileSync("output/" + time, resultado);

    });
});

