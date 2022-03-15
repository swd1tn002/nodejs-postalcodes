const memoize = require('memoizee');
const fetch = require('node-fetch');

/**
 * Fetches and returns a JSON object containing Finnish postal codes as keys and district names
 * as values.
 * 
 * @returns object of postal codes and districts, in the form {'00100': 'HELSINKI', ...}
 */
async function loadJson() {
    let response = await fetch('https://raw.githubusercontent.com/theikkila/postinumerot/master/postcode_map_light.json');
    return await response.json();
}

// Remember (memoize) past results from loadJson for 60 seconds.
// See https://www.npmjs.com/package/memoizee
loadJson = memoize(loadJson, { maxAge: 60_000 });


/**
 * Returns the name of the postal district that the given postal code belongs to.
 * 
 * @param {str} code such as '00100' 
 * @returns District name such as 'HELSINKI' or null
 */
async function getPostalDistrict(code) {
    let data = await loadJson();
    return data[code] ?? null;
}

/**
 * Returns all postal codes that are in the given postal district (by name).
 * 
 * @param {str} district such as 'HELSINKI'
 * @returns list of postal codes, ['00100', '00700']
 */
async function getPostalCodes(district) {
    let data = await loadJson();
    let codesAndNames = Object.entries(data);

    return codesAndNames
        .filter(([code, name]) => name.toUpperCase() === district.toUpperCase())
        .map(([code, name]) => code);
}

module.exports = { getPostalDistrict, getPostalCodes };