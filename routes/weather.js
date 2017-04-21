const express = require('express');
const weather = require('../internal/darksky');

const router = express.Router();

/* GET weather. */
router.get('/', (req, res) => {
  const lat = req.query.lat;
  const long = req.query.long;

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const daily = [];

  weather.getWeather(lat, long)
    .then((data) => {
      daily.push({
        currentTemperature: data.currently.apparentTemperature,
        summary: data.currently.summary,
      });

      for (let i = 0; i < 8; i++) {
        const date = new Date(0);
        const weeklyTemperature = {};
        date.setUTCSeconds(data.daily.data[i].time);
        weeklyTemperature.time = date;
        weeklyTemperature.day = days[date.getUTCDay()];
        weeklyTemperature.summary = data.daily.data[i].summary;
        weeklyTemperature.temperatureMax = data.daily.data[i].temperatureMax;
        weeklyTemperature.temperatureMin = data.daily.data[i].temperatureMin;
        weeklyTemperature.temp = ( data.daily.data[i].temperatureMax + data.daily.data[i].temperatureMin) / 2;
        daily.push(weeklyTemperature);
      }
      //res.status(200).json({ daily });
    })
    .catch((err) => {
      res.status(500).json({ data: err });
    });

      //Query Weather Underground for local weather history
      weather.getGeolocation(lat, long)
      .then((body) => {
        //Parses the first existing airport code. Thus, meaning the neartest airport station.
        const icao = body.location.nearby_weather_stations.airport.station.find((station) => {
          return station.icao !== '';
        });
        weather.getHistory(icao.icao)
          .then((historyBody) => {
            res.status(200).json({
              forecast: daily,
              seasonal: historyBody });
          })
          .catch((historyError) => {
            console.log(historyError);
            //res.status(500).json({ data: historyError });
          });
      })
      .catch((error) => {
        console.log(error);
      });
});

// router.get('/history', (req, res) => {
//   const lat = req.query.lat;
//   const long = req.query.long;


// });

module.exports = router;
