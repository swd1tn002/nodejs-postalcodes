const memoize = require('memoizee');
const fetch = require('node-fetch');

async function loadJson() {
    let response = await fetch('https://raw.githubusercontent.com/theikkila/postinumerot/master/postcode_map_light.json');
    return await response.json();
}

// Remember past results from loadJson for 60 seconds.
// See https://www.npmjs.com/package/memoizee
loadJson = memoize(loadJson, { maxAge: 60_000 });

async function getPostalDistrict(postalCode) {
    let data = await loadJson();
    return data[postalCode] ?? null;
}

async function getPostalCodes(district) {
    let data = await loadJson();
    let codesAndNames = Object.entries(data);

    return codesAndNames
        .filter(([code, name]) => name.toUpperCase() === district.toUpperCase())
        .map(([code, name]) => code);
}

module.exports = { getPostalDistrict, getPostalCodes };