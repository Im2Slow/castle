let axios = require('axios');
let cheerio = require('cheerio');

module.exports.getURL = function (url,callback){
  let chefURLs = [];
  axios(url).then((response) => {
    const $ = cheerio.load(response.data);
    $('#countryF').eq(1).find('li').each(function(i,elem){
      if(String($(elem).find('a').eq(1).attr('href')).includes('chef')){
        chefURLs[i] = String($(elem).find('a').eq(1).attr('href'));
      }
    });
    callback(null,chefURLs);
  }).catch(function(err){
    return callback(err,null);
  });
};

module.exports.getList = function (url,callback){
  let hotelName;
  //let hotelPrice
  let restoName;
  //let restoPrice
  axios(url).then((response) => {
    const $ = cheerio.load(response.data);
    hotelName = {
      name: $('div.chefDetailInfo').find('h4').eq(0).text()
    }
    restoName = {
      name: $('div.chefDetailInfo').find('h4').eq(1).text()
    }
    callback(null, hotelName, restoName);
  }).catch(function(err){
    return callback(err, null, null);
  });
};
