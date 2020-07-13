const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=0ac81bb2b00d01b3f976f99648a7ed71&query=" +
    latitude +
    "," +
    longitude +
    "";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unableto connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        "Its is currently " +
          response.body.current.temperature +
          "out. It feels like " +
          response.body.current.feelslike +
          " out"
      );
    }
  });
};

module.exports = forecast;
