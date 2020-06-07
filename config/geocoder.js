const NodeGeoder = require("node-geocoder");

const geocoderProvider = require('./keys').geocoderProvider;
const geocoderAPIKey = require('./keys').geocoderAPIKey;

const options = {
    provider: geocoderProvider,
    httpAdapter: "https",
    apiKey: geocoderAPIKey,
    formatter: null
}

const geocoder = NodeGeoder(options);

module.exports = geocoder;