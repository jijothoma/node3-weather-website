const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url ='https://api.darksky.net/forecast/4223b135d51f1f4ca8203bfa4194a8ef/'+ latitude +','+ longitude +'?units=si&lang=en'

    request({ url: url , json: true },(error, {body}) => {
        if (error)
        {
            callback ('Unable to connect to weather service!!!',undefined)
        } 
        else if (body.error){
            callback ('Unable to Find Location!!!',undefined)
        }
        else{
            console.log(body.daily.data[0])
            const data = body.currently
            callback(undefined,body.daily.data[0].summary + ' It is currently ' + data.temperature + ' degrees out. The High today is ' + body.daily.data[0].temperatureHigh + ' with a low of '+ body.daily.data[0].temperatureLow  +'. There is a ' + data.precipProbability + '% chance of rain.')
        }
        
    })
}

module.exports = forecast

