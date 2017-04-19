const config = {};

config.google = {};
config.darksky = {};
config.wunderground = {};

config.google.API_KEY = process.env.GOOGLE_API_KEY;
config.darksky.API_KEY = process.env.DARKSKY_API_KEY;
config.wunderground.API_KEY = process.env.WUNDERGROUND_API_KEY;

module.exports = config;
