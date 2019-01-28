let fs = require('fs');                                                         // fs nous sert ici à écrire notre fichier
let axios = require('axios');                                                   // axios sert à réaliser une requête http
let cheerio = require('cheerio');                                               // on charge cheerio
let jsonframe = require('jsonframe-cheerio');                                   // et jsonframe-cheerio

axios('https://www.relaischateaux.com/fr/destinations/europe/france').then((response) => {  // on demande ici à axios d'aller sur relaischateaux.com, si la réponse est bonne...
fs.writeFileSync('hotel.html', response.data);                                 // alors fs enregistre le code html dans le fichier hotel.html
});
var content = fs.readFileSync("hotel.html");
var raw_data = String(content).slice(678,1429);
fs.writeFileSync('hotel2.json', raw_data);
