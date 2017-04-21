const express = require('express');

const zillow = require('../internal/zillow.js');

const router = express.Router();

/* GET realestate
 * Ex: /realestate?address=12345%20kellog%20dr.&citystate=Pomona,%20CA&state=CA&zip=91766
 *
 * @queryparam [address] the address, with url encoded spaces
 * @queryparam [citystate] city and state with url encoded spaces, this or zipcode is required
 * @queryparam [zip] zipcode, either this or citystate is required
 */

router.get('/', (req, res) => {
  const addres = req.query.address;
  const citystate = req.query.citystate;
  const zip = req.query.zip;
  let output;

  if (citystate == null) {
    output = zillow.getNeighbours({ address: addres, citystatezip: zip} );
  } else {
    output = zillow.getNeighbours({ address: addres, citystatezip: citystate });
  }


  output.then((meh) => {
      res.status(200).json({ data: meh });
  });
});

module.exports = router;
