const express = require('express');
const utils = require('../internal/utils');
const googleplaces = require('../internal/googleplaces');

const router = express.Router();

/* GET amenities
 * Ex: /amenities?lat=12&long=34&radius=3&types=restaurant
 *
 * @queryparam [lat] the latitude
 * @queryparam [long] the longitude
 * @queryparam [radius] the radius of the search area in miles
 * @queryparam [types] the types of the places of amenities
*/
router.get('/', (req, res) => {
  const lat = req.query.lat;
  const long = req.query.long;
  const radius = utils.toMeters(req.query.radius);
  let types = [req.query.types];

  // Check if types is not given or a list of types
  if (types[0] == null) {
    types = ['restaurant', 'grocery_or_supermarket', 'gym', 'bank', 'park', 'school', 'university',
      'shopping_mall', 'shoe_store', 'library', 'hospital', 'dentist', 'pharmacy', 'laundry', 'bakery',
      'post_office', 'police', 'electronics_store', 'cafe', 'beauty_salon'];
  } else if (types[0].includes(',')) {
    types = types[0].split(',');
  }
  // Get Google Places results for all types
  const placePromises = [];
  types.forEach((type) => {
    placePromises.push(googleplaces.getPlaces(lat, long, radius, type));
  });

  Promise.all(placePromises)
    .then((data) => {
      const finalResult = googleplaces.mergeResults(data);
      finalResult.type = 'amenity';
      res.status(200).json({ data: finalResult });
    }).catch((err) => {
      res.status(500).json({ data: err });
    });
});

module.exports = router;
