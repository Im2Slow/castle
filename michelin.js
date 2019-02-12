let axios = require('axios')
let cheerio = require('cheerio')

module.exports = function (url,callback){
  let names = []
  let prices = []
  let stars = []
  axios(url).then((response) => {
    const $ = cheerio.load(response.data)
    $('li').each(function(i,elem){
      names = $('div .poi_card-display-title').text()
      prices = $('div .poi_card-display-price').text()
      if($('.guide-icon icon-mr icon-cotation1etoile')){ //need to check span class for each liesilv.
        stars[i] = "1"
      }
      else if($('.guide-icon icon-mr icon-cotation2etoiles')){
        stars[i] = "2"
      }
      else if($('.guide-icon icon-mr icon-cotation3etoiles')){
        stars[i] = "3"
      }
    })
    callback(null,names,prices,stars)
  }).catch(function(err){
    return callback(err,null,null,null)
  })
}
