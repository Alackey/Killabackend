const config = require('../settings/config');
const DarkSky = require('dark-sky');
const request = require('request');
const got = require('got');
const cheerio = require('cheerio');
const cheerioTableParser = require('cheerio-tableparser');

const forecast = new DarkSky(config.darksky.API_KEY);

/*
 * getWeather gets the gets the specific places using google places
 * @param lat - the latitude of the location
 * @param long - the longitude of the location
 * @param radius - the radius from the location to search for places
 * @param types - the types of the places
*/


const getWeather = function getWeather(lat, long) {
  return new Promise((resolve, reject) => {
    forecast
     .latitude(lat)            // required: latitude, string.
     .longitude(long)          // required: longitude, string.
     .exclude('minutely, hourly, flag')
     .get()                          // execute your get request.
     .then(res => {                  // handle your success response.
       resolve(res);
     })
    .catch(err => {                 // handle your error response.
      reject(err);
    });
  });
};

//Call Weather Underground API to retrieve nearest city Airport Code for weather history of current location
const getGeolocation = function getGeolocation(lat, long) {
  return new Promise((resolve, reject) => {
    const weatherHistory = {
      json: true,
    };
    weatherHistory.url = `https://api.wunderground.com/api/${config.wunderground.API_KEY}/geolookup/q/${lat},${long}.json`;
    weatherHistory.method = 'post';
    request(weatherHistory, (error, response, body) => {
      if(error != null ) reject(error);
      resolve(body);
    });
  });
};

//HTTP Request to WUNGERGROUND for all four quarters of the year and web scrape average temperature.
const getHistory = function getHistory(icao) {
  return new Promise((resolve, reject) => {
    const year = new Date().getFullYear() - 1;
    const historyArray = [
      got(`https://www.wunderground.com/history/airport/${icao}/${year}/1/1/CustomHistory.html?dayend=31&monthend=3&yearend=${year}`),
      got(`https://www.wunderground.com/history/airport/${icao}/${year}/4/1/CustomHistory.html?dayend=30&monthend=6&yearend=${year}`),
      got(`https://www.wunderground.com/history/airport/${icao}/${year}/7/1/CustomHistory.html?dayend=30&monthend=9&yearend=${year}`),
      got(`https://www.wunderground.com/history/airport/${icao}/${year}/10/1/CustomHistory.html?dayend=31&monthend=12&yearend=${year}`),
    ];

    const quarterlyWeather = [];
    Promise.all(historyArray) 
      .then((responses) => {
        let counter = 1;
        responses.forEach((quarter) => {
          const $ = cheerio.load(quarter.body, { normalizeWhitespace:true });
          cheerioTableParser($);
          const table = $('#historyTable').parsetable(false, false, false);
          const temperature = $(table[2][3]).find('.wx-value').text();

          const quarterlyAverage = {};
          quarterlyAverage.yearOfData = year;
          quarterlyAverage.quarter = counter++;
          quarterlyAverage.averageTemperature = temperature;
          quarterlyWeather.push(quarterlyAverage);
        });
        resolve(quarterlyWeather);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = {
  getWeather,
  getGeolocation,
  getHistory,
};
