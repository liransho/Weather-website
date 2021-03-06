const request = require('request')

const forecast = (lat,alt,callback) =>{
    const url ='http://api.weatherstack.com/current?access_key=ba1f83c7013b1c39811923f8408eb2df&query='+alt+','+lat
    request({url, json:true}, (error,{body}) => {
        if (error) {
            callback('unable to connect to weather',undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        } else {
            callback(undefined,
                body.current.weather_descriptions[0] + ". It is currently "+
                body.current.temperature + " degress out. It feels like "+
                body.current.feelslike + " degress out. The humidity is "+
                body.current.humidity+"%"
            )
        }
    })
}

module.exports = forecast