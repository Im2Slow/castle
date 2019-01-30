let fs = require('fs');
let axios = require('axios');
let cheerio = require('cheerio');
let decode = require('decode-html');
let S = require('string');

axios('https://www.relaischateaux.com/fr/destinations/europe/france').then((response) => { //requete http à l'adresse du site relaischateaux
  const $ = cheerio.load(response.data);//on charge le contenu de la page html
  var data = $('div').children('script').html().split(', markers : ')[1];// on sélectionne la donnée
  var decoded_data = decode(data); //enlève &amp
  var list = { // à remplacer pour valider le format JSON
    'name' : '"name"',
    'type' : '"type"',
    "'hotel'" : '"hotel"',
    'LatLng' : '"LatLng"',
    'lat' : '"lat"',
    'lng' : '"lng"',
    'restaurant' : '"restaurant"'
  };
  var final_data = S(decoded_data).replaceAll('name','"name"').s; // /!\ ne fonctionne pas comme prévu
  final_data = '"hotels"' + decoded_data;
  fs.writeFileSync("hotel.json", final_data);
});
