const express = require('express');

const { getPostalCodes, getPostalDistrict } = require('./client');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/postalcodes', async function (req, res) {
    let postalCode = req.query.number || '';
    let districtName = await getPostalDistrict(postalCode);

    let statusCode = districtName ? 200 : 404;
    res.status(statusCode).json({
        number: postalCode,
        name: districtName
    });
});

app.get('/postalcodes/:districtName', async function (req, res) {
    let districtName = req.params.districtName;
    let codes = await getPostalCodes(districtName);

    let statusCode = codes.length > 0 ? 200 : 404;
    res.status(statusCode).json({
        name: districtName,
        numbers: codes
    });
});

module.exports = app;
