let axios = require('axios')
let cheerio = require('cheerio')

  let hotelName
  //let hotelPrice
  let restoName
  //let restoPrice
  axios('https://www.relaischateaux.com/fr/chef/guillaume-royer').then((response) => {
    const $ = cheerio.load(response.data)
    hotelName = $('div.chefDetailInfo').find('h4').eq(0).text()
    restoName = $('div.chefDetailInfo').find('h4').eq(1).text()
    //hotelPrice = $('div.chefDetailInfo').text();
    console.log(hotelName)
    console.log(restoName)
    //console.log(hotelPrice)
  })
