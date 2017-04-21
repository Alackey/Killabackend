const config = require('../settings/config');
const googleplacesAPI = require('googleplaces')(config.google.API_KEY, 'json');

const placeSearch = googleplacesAPI.placeSearch;

// mergeResults marges all of the result arrays
const mergeResults = function mergeResults(data) {
  const results = [];

  data.forEach((type) => {
    type.results.forEach((item) => {
      results.push(item);
    });
  });

  return { results, status: 'OK' };
};

// parseResults parses the json into smaller results
const parseResults = function parseResults(data, type) {
  const results = [];
  data.results.forEach((place) => {
    const parsedResult = {
      name: place.name,
      address: place.vicinity,
      lat: place.geometry.location.lat,
      long: place.geometry.location.lng,
      // photos: place.photos,
      rating: place.rating,
      type,
    };

    try {
      parsedResult.open = place.opening_hours.open_now;
    } catch (e) {}

    results.push(parsedResult);
  });
  return { results };
};

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
      // console.log(parseResults(response));
      if (response.status !== 'OK') reject(response);
      resolve(parseResults(response, type));
    });
  });
};

module.exports = {
  getPlaces,
  mergeResults,
};
