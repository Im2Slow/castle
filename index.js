let michelin = require('./michelin.js');
let castle = require('./castle.js');
let fs = require('fs');

let getURL = castle.getURL;
let getList = castle.getList;

//scraping nom resto (de 1 à 3 étoiles) sur michelin
var urls = [];
var url = "https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin";
urls[0] = url;

for(var i = 1; i<34; i++){
  urls[i] = url + '/page-'+ (i+1).toString();
}
urls.forEach(function (url){
  michelin(url,function (err,names,i){
    if(err){
      return console.error("Error : ", err);
    }
    if(i == 0){
      fs.writeFileSync('starredRestaurants.json', JSON.stringify(names),'utf8');
    }
    else{
        fs.appendFileSync('starredRestaurants.json', JSON.stringify(names),'utf8');
    }
  })
});
//scraping chefs => hotel + resto
var url2 = "https://www.relaischateaux.com/fr/site-map/etablissements";
getURL(url2,function (err,chefURLs){
  if(err){
    return console.error("Error : ", err);
  }
  //console.dir(chefURLs,{'maxArrayLength': null});
  chefURLs.forEach(function (i,url){
    //console.log(url);
    if(String(url).includes('chef')){
      getList(url,function(err, hotelName, restoName){
        if(err) {
          return console.error("Error :", err);
        }
        fs.writeFileSync('hotelNames.json', JSON.stringify(hotelName),'utf8');
        fs.writeFileSync('restoNames.json', JSON.stringify(restoName),'utf8');
      })
    }
  })
});
