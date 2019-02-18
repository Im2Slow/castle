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
  let data;
  axios(url).then((response) => {
    const $ = cheerio.load(response.data);
    data = {
      hotelName: $('div.chefDetailInfo').find('h4').eq(0).text(),
      hotelPrice: {
        room: $('div.chefDetailInfo','#text').text(),
        suite: $('div.chefDetailInfo').slice("suites :","s.c.").text()
      },
      restoName: $('div.chefDetailInfo').find('h4').eq(1).text(),
      restoPrice: {
        menu: $('div.chefDetailInfo').slice("Menu :","s.c.").text(),
        carte: $('div.chefDetailInfo').slice("Carte :","s.c.").text()
      }
    }
    callback(null, data);
  }).catch(function(err){
    return callback(err, null);
  });
};
