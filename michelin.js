let axios = require('axios');
let cheerio = require('cheerio');

module.exports = function (url,callback){
  let names = [];
  axios(url).then((response) => {
    const $ = cheerio.load(response.data);
    $('li').each(function(i,elem){
      names= $('div .poi_card-display-title').text();
    });
    callback(null,names);
  }).catch(function(err){
    return callback(err,null);
  });
};
