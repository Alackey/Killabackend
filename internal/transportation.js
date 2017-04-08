const config = require('../settings/config');
const googleplaces = require('googleplaces')(config.google.API_KEY, 'json');

const placeSearch = googleplaces.placeSearch;

// getAirports gets the airports withing a certain radius based on a lat/long
const getAirports = function getAirports(latitude, longitude, radius) {
  return new Promise((resolve, reject) => {
    const parameters = {
      location: [latitude, longitude],
      types: 'airport',
      radius,
    };

    placeSearch(parameters, (err, response) => {
      if (response.status !== 'OK') reject(response);
      resolve(response);
    });
  });
};


module.exports = {
  getAirports,
};
