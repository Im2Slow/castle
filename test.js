let axios = require('axios')
let cheerio = require('cheerio')

let chefURL = []
axios('https://www.relaischateaux.com/fr/site-map/etablissements').then((response) => {
  const $ = cheerio.load(response.data)
  $('div #countryF .topMargin').next().children('li').each(function(elem){
    chefURL = $('a').next().attr('href')
    console.log(chefURL)
  })
}).catch(function(err){
  return err
})
