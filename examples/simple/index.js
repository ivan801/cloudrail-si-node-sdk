var cloudrail = require("cloudrail-si");

var googlePlaces = new cloudrail.services.GooglePlaces(null, "xxx"); // replace "xxx" with a valid API key

googlePlaces.getNearbyPOIs(49.4557091, 8.5279138, 3000, "sparkasse", ["bank"], (err, pois) => {
    if (err) console.log(err);
    else console.log("Amount of locations called 'sparkasse' in a 3km radius around the given coordinates, tagged with category 'bank': " + pois.length);
});