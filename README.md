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
* My data source was the Zillow API documentation itself and the README for the node-zillow module that simplifies making API calls to zillow. I made use of the 'GetSearchResults' call to get the zillow ID for a given address and the 'GetComps' call to retrieve information on nearby houses and places to rent that are for sale and have been sold recently. This information includes the address, latitute and longitude, and zillow estimate price (zestimate).

## Weather

OVERVIEW:
* The file, weather.js, provides weather data of the specified location. It will return the current weekly forecast and the seasonal weather for the previous year.  Among the seven days of weather information, the average temperature is, the expected maximum temperature, and the expected minimum temperature are provided. Furthermore, the average weather for the previous is also given such that the quarterly weather data is provided.  This functionality strives to provide thorough weather information on the specified location. It will allow users to have a better insight on how the weather will be like in the specified location.

* weather.js receives the coordinates of the specified location as arguments, therefore the latitude and longitude are passed into this function. This function will direct to darksky.js, which will make API calls to two different sources, DarkSky and Weather Underground, in order to reduce the strain on using one API KEY for all data retrieval. DarkSky's API is solely used for retrieving weekly forecasts of the current location. The approach to gather the seasonal weather for the previous year was not as straight forward. The call to Weather Underground was to simply retrieve the code of the nearest airport. The airport code is then used to reconstruct a URL, in which a request will be made to with that URL to attain the HTML elements of the website. Cheerio and CheerioTableParser are two libraries used to web scrape the body of the response, and extract the maximum and minimum temperature of each quarter. Then, a simple computation was made to retrieve the average temperature of every three months of the previos year.
 
>>>>>>> c8066c8de19cb432265c36bf481ccdf381919c86
