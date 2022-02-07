const request = require('supertest');
const { test, describe } = require('@jest/globals');
const assert = require('assert').strict;

const app = require('../app');

describe('finding postal district names by giving a postal code', () => {

    test('postal district for code 99999 is Korvatunturi', async () => {
        const response = await request(app).get('/postalcodes?number=99999');

        assert.ok(response.ok, `Server responded with HTTP status ${response.statusCode}`);
        assert.ok(response.headers['content-type'].includes('json'), `Expected JSON, got "${response.headers['content-type']}"`);
        assert.ok(response.body.name, 'Response should have attribute `name`');
        assert.strictEqual(response.body.name.toLowerCase(), 'korvatunturi');
    });

    test('postal district for code 00100 is Helsinki', async () => {
        const response = await request(app).get('/postalcodes?number=00100');

        assert.ok(response.ok, `Server responded with HTTP status ${response.statusCode}`);
        assert.ok(response.headers['content-type'].includes('json'), `Expected JSON, got "${response.headers['content-type']}"`);
        assert.ok(response.body.name, 'Response should have attribute `name`');
        assert.strictEqual(response.body.name.toLowerCase(), 'helsinki');
    });

    test('unknown postal code returns 404', async () => {
        const response = await request(app).get('/postalcodes?number=-1');

        assert.strictEqual(response.status, 404, `Server responded with HTTP status ${response.statusCode}, expected 404.`);
        assert.ok(response.headers['content-type'].includes('json'), `Expected JSON, got "${response.headers['content-type']}"`);
        assert.strictEqual(response.body.name, null, 'Attribute `name` should be null');
    });
});