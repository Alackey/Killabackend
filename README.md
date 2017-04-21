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

## Real estate documentation
* Zillow API - https://www.zillow.com/howto/api/APIOverview.htm
* node-zillow module for Node.js - https://github.com/ralucas/node-zillow
* My data source was the Zillow API documentation itself and the README for the node-zillow module that simplifies making API calls to zillow. I made use of the 'GetSearchResults' call to get the zillow ID for a given address and the 'GetComps' call to retrieve information on nearby houses and places to rent that are for sale and have been sold recently. This information includes the address, latitute and longitude, and zillow estimate price (zestimate). ...(More coming)

## Weather

**OVERVIEW**: The weather functionality consists of two files: weather.js and darksky.js. These two javascript programs interact with each other to return weather information: a  weekly forecast and the seasonal weather of the previous year. The weekly forecast will conventionally display daily temperatures for the next seven days. Furthermore, the average weather temperature is returned for every quarter of the previos year.  This functionality strives to provide thorough weather information on the specified location. It will allow users to have a better sense of how the weather will be like in the specified location.

* weather.js
* darksky.js

### weather.js 
* `weather.js` receives the coordinates of the specified location as arguments, therefore the latitude and longitude are passed into this function. This function will direct to darksky.js, which will make API calls to two different sources, DarkSky and Weather Underground, in order to reduce the strain on using one API KEY for all data retrieval. This 
file's main focus is to return a response to the browser with data in JSON. The response should look like the follow: 
`{ "forecast": [ Object ], "seasonal": [ Object }`

### darksky.js
* `darksky.js` handles all the API calls to DarkSky and Weather Underground. DarkSky's API is solely used for retrieving weekly forecasts of the current location, which is handled by `getWeather()` function. However, the approach to gather the seasonal weather for the previous year is not as straight forward. The first component to retrieve the seasonal weather is to call Weather Underground's API and extract the code of the nearest airport from the response; this was handled but the function, `getGeolocation()`. The airport code is later passed as an argument into the function, `getHistory()`. This method will make HTTP requests with the reconstructed URL that contains the airport code. Weather temperatures are then extracted for the following quarters: January - March, April - June, July - September, October - December. Cheerio and CheerioTableParser were two libraries used to web scrape the body of the response, and extract the maximum and minimum temperature of each quarter of the previous year. The maximum and minimum values were used to calculate the average temperature of each quarter. Finally, JSON objects were constructed from the attained information and returned to `weather.js`. 

* Weather Underground API - https://www.wunderground.com/weather/api/d/docs
* DarkSky API - https://darksky.net/dev/docs
* Cheerio - https://cheerio.js.org
* CheerioTableParser - https://www.npmjs.com/package/cheerio-tableparser
 
