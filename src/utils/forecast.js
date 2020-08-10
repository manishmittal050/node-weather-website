const request = require('request');

const forcast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=3845ba7409bb89e1eba516b5a4852a3c&query='+
    latitude+','+ longitude;

    // console.log(url);
    request({
        url: url,
        json: true
    }, (error, {body}) => {

        if (error) {
            callback('Unable to connect to the location server',undefined);
        }
        else if (body.error) {
            callback('Enable to find location. Please try another address',undefined);
        }
        else {

            const data = body.current;
            callback(undefined,`It is currently ${data.temperature}℃. And feels like ${data.feelslike}℃`);
  
        }

    });

}


module.exports = forcast;