# Killabackend

## Getting Started
1. Clone repo
2. cd into root directory
3. ```npm install```
4. ```npm start```

### Configuring API keys
Set the environment variable: ```GOOGLE_API_KEY=YOU_API_KEY```

## Notes
* To add a new route create the file in the routes folder then define the route in 'app.js'. You have to add 2 lines in 'app.js' when you create a new route.

## Real estate documentation
Zillow API - https://www.zillow.com/howto/api/APIOverview.htm

node-zillow module for Node.js - https://github.com/ralucas/node-zillow

My data source was the Zillow API documentation itself and the README for
the node-zillow module that simplifies making API calls to zillow.
I made use of the 'GetSearchResults' call to get the zillow ID for a given address
and the 'GetComps' call to retrieve information on nearby houses and places to rent that are for sale
and have been sold recently. This information includes the address, latitute and longitude, and zillow estimate
price (zestimate).