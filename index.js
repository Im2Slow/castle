let michelin = require('./michelin.js')
let castle = require('./castle.js')

//scraping resto + prix parmis les restos étoilés (de 1 à 3 étoiles)
var urls = [];
var url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin'
urls[0] = url

for(var i = 1; i<34; i++){
  urls[i] = url + '/page-'+ (i+1).toString()
}

urls.forEach(function (url){
  michelin(url,function (err,names,prices,stars){
    if(err) return console.error("Error : ", err)
    //console.log(names)
    //console.log(prices)
  })
})
//scraping chefs => hotel + resto + prix
var url2 = 'https://www.relaischateaux.com/fr/site-map/etablissements'
castle(url2,function (err,chefURL){
  if(err) return console.error("Error : ", err)
  console.log(chefURL)
})
