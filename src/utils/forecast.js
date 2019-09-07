const request = require('request')
const chalk = require('chalk')
const forecast = (lat,long,callback) => {
    const url = 'https://api.darksky.net/forecast/16e47d843fff38549a68a1f9ce1e6ce8/'+lat+','+long+'?units=si&lang=en'
    
    request({url,json:true},(error,{body}) => {
       if(error) {
        callback("Unable to connect to weather service!",undefined)
       } else if(body.error) {
        callback("Unable to find the weather,Please try with different lat and long",undefined)
       } else {
          const temperature = body.currently.temperature
          const temperatureMin = body.daily.data[0].temperatureMin
          const temperatureMax = body.daily.data[0].temperatureMax
          const summary = body.daily.data[0].summary
          const rainPerception = body.currently.precipProbability
          callback(undefined,"Today Summary :"+summary+" | It is current temperature : "+ temperature +" degrees out. | This is today high tempertur : "+temperatureMax+" | Today low temperature is : "+temperatureMin+" |  Rain Chance : There is a "+rainPerception+" % chance of rain")
       }
    })
  }

  module.exports = forecast