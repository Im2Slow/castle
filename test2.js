let axios = require('axios')
let cheerio = require('cheerio')

let chefURLs = []
axios('https://www.relaischateaux.com/fr/site-map/etablissements').then((response) => {
  const $ = cheerio.load(response.data)
  $('#countryF').eq(1).find('li').each(function(i,elem){
    chefURLs[i] = $(elem).find('a').eq(1).attr('href')
  })
  console.log(chefURLs[1])
}).catch(function(err){
  return callback(err,null)
})
