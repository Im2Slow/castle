let michelin = require('./michelin.js');
let castle = require('./castle.js');
let fs = require('fs');

let getURL = castle.getURL;
let getList = castle.getList;

//scraping nom resto (de 1 à 3 étoiles) sur michelin
var urls = [];
var url = "https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin";
urls[0] = url;

for(var i = 0; i<33; i++){
  urls[i] = url + '/page-'+ (i+2).toString();
}
var j = 0;
urls.forEach(function (url){
  michelin(url,function (err,names){
    if(err){
      return console.error("Error : ", err);
    }
    if(j == 0){
      fs.writeFileSync('starredRestaurants.json', JSON.stringify(names),'utf8');
      j++;
    }
    else{
        fs.appendFileSync('starredRestaurants.json', JSON.stringify(names),'utf8');
        j++;
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
  chefURLs.forEach(function (i, url){
    //console.log(url);
    if(String(url).includes('chef')){
      getList(url,function(err, data){
        if(err) {
          return console.error("Error :", err);
        }
        if(i == 0){
          fs.writeFileSync('castle.json',"[" + JSON.stringify(data),'utf8');
        }
        else{
          fs.appendFileSync('castle.json',"," + JSON.stringify(data),'utf8');
        }
      })
    }
  })
  fs.appendFileSync('castle.json',"]",'utf8');
});
