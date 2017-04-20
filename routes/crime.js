const express = require('express');
const utils = require('../internal/utils');
const datastore = require('../internal/datastore');

const router = express.Router();

/* GET crime
 * Ex: /crime?state=CA&city=pomona
 * Ex: /crime?state=california&city=pomona
 *
 * @queryparam [state] the state in abbreviation form
 * @queryparam [city] the city
*/
router.get('/', (req, res) => {
  let state = req.query.state;
  let city = req.query.city;

  if (state === undefined || city === undefined) {
    res.status(500).json({ data: { error: 'state or city no provided' } });
  }

  state = utils.stateToFull(state);
  city = city.toLowerCase();

  // Get crime from Google Datastore
  datastore.getCrimes(`${state}-${city}`)
    .then((results) => {
      if (results[0] === undefined) { // No results returned
        // Could not find data. Get crime in entire state
        datastore.getCrimesByState(state)
          .then((stateResults) => {
            const data = { results: stateResults };
            data.message = 'Could not find State + City. Displaying all cities in state.';
            res.status(200).json({ data });
          })
          .catch((err) => {
            res.status(500).json({ data: err });
          });
      } else {
        res.status(200).json({
          data: { results },
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ data: err });
    });
});

module.exports = router;
