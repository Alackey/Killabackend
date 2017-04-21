# Killabackend

## Getting Started
1. Clone repo
2. cd into root directory
3. ```npm install```
4. ```npm start```

### Configuring API keys
1. Set the environment variable: ```GOOGLE_API_KEY=YOU_API_KEY```
2. Set the environment variable: ```DARKSKY_API_KEY=YOUR_API_KEY```
3. Set the environment variable: ```WUNDERGROUND_API_KEY=YOUR_API_KEY```

## Notes
* To add a new route create the file in the routes folder then define the route in 'app.js'. You have to add 2 lines in 'app.js' when you create a new route.

## Weather

OVERVIEW: The weather functionality consists of two files: weather.js and darksky.js. These two javascript programs interact with each other to return weather information: a  weekly forecast and the seasonal weather of the previous year. The weekly forecast will conventionally display daily temperatures for the next seven days. Furthermore, the average weather temperature is returned for every quarter of the previos year.  This functionality strives to provide thorough weather information on the specified location. It will allow users to have a better sense of how the weather will be like in the specified location.

* weather.js
* darksky.js

### weather.js 
* `weather.js` receives the coordinates of the specified location as arguments, therefore the latitude and longitude are passed into this function. This function will direct to darksky.js, which will make API calls to two different sources, DarkSky and Weather Underground, in order to reduce the strain on using one API KEY for all data retrieval. This 
file's main focus is to return a response to the browser with data in JSON. The response should look like the follow: `{ "data": [ Object ], "seasonal": [ Object }`

### darksky.js
* `darksky.js` handles all the API calls to DarkSky and Weather Underground. It contains two methods, getWeather . This method hands all calls for. DarkSky's API is solely used for retrieving weekly forecasts of the current location. However, the approach to gather the seasonal weather for the previous year was not as straight forward. The call to Weather Underground is to simply retrieve the code of the nearest airport. Retrieving the airport code was handled by the function `getGeolocation()`. The airport code is then used to reconstruct a URL, in which a request will be made to with that URL to attain the HTML elements of the website. Cheerio and CheerioTableParser are two libraries used to web scrape the body of the response, and extract the maximum and minimum temperature of each quarter. Then, a simple computation was made to retrieve the average temperature of every three months of the previos year.
 