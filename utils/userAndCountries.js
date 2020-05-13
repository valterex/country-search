const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const calculateDistance = require("./distance");

/**
 *
 * @desc Get latitude/longitude of current user
 *
 */
const userLocation = async () => {
  try {
    let response = await fetch(
      "http://api.ipstack.com/check?access_key=a1d5abe0fd6709ed6ee80744cc29def2"
    );

    let data = await response.json();

    let position = await {
      lat: data.latitude,
      lon: data.longitude,
    };

    return position;
  } catch (err) {
    console.log(err);
  }
};

/**
 *
 * @desc Get countries sorted by ascending distance
 *
 */
const countriesByDistance = async () => {
  try {
    const user = await userLocation();
    const response = await fs.readFileSync(
      path.join("data", "countries_metadata.json"),
      "utf8"
    );

    const data = await JSON.parse(response);

    const countries = await data.countries.map((country) => {
      let o = Object.assign({}, country);
      o.distance;

      return {
        name: country.name,
        lat: country.lat,
        lon: country.lng,
        distance: calculateDistance(
          user.lat,
          user.lon,
          country.lat,
          country.lng
        ),
      };
    });

    const sorted = await countries.sort((a, b) => {
      return a.distance - b.distance;
    });

    return sorted;
  } catch (err) {
    console.log(err);
  }
};

module.exports = countriesByDistance;
