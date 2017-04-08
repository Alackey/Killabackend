const express = require('express');
const utils = require('../internal/utils');
const googleplaces = require('../internal/googleplaces');

const router = express.Router();

/* GET airports
 *
 * @queryparam [lat] the latitude
 * @queryparam [long] the longitude
 * @queryparam [radius] the radius of the search area in miles
*/
router.get('/airports', (req, res) => {
  const lat = req.query.lat;
  const long = req.query.long;
  const radius = utils.toMeters(req.query.radius);

  googleplaces.getPlaces(lat, long, radius, 'airport')
    .then((airports) => {
      res.status(200).json({ data: airports });
    }).catch((err) => {
      res.status(500).json({ data: err });
    });
});

module.exports = router;
