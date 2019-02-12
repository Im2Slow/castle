let axios = require('axios')
let cheerio = require('cheerio')

module.exports = function (url,callback){
  let chefURL = []
  axios(url).then((response) => {
    const $ = cheerio.load(response.data)
    $('#countryF').next().children('li').each(function(elem){
      chefURL = $('a').next().attr('href').toString()
    })
    callback(null,chefURL)
  }).catch(function(err){
    return callback(err,null)
  })
}
