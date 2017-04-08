const config = require('../settings/config');
const googleplacesAPI = require('googleplaces')(config.google.API_KEY, 'json');

const placeSearch = googleplacesAPI.placeSearch;

/*
 * getPlaces gets the gets the specific places using google places
 * @param lat - the latitude of the location
 * @param long - the longitude of the location
 * @param radius - the radius from the location to search for places
 * @param types - the types of the places
*/
const getPlaces = function getPlaces(lat, long, radius, type) {
  return new Promise((resolve, reject) => {
    const parameters = {
      location: [lat, long],
      type,
      radius,
    };

    placeSearch(parameters, (err, response) => {
      if (response.status !== 'OK') reject(response);
      resolve(response);
    });
  });
};

module.exports = {
  getPlaces,
};
