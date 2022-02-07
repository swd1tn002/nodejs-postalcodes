const request = require('supertest');
const { test, describe } = require('@jest/globals');
const assert = require('assert').strict;

const app = require('../app');

describe('the front page', () => {

    test('contains text hello world', async () => {
        const response = await request(app).get('/');

        assert.ok(response.ok, `Path "/" returned HTTP status ${response.statusCode}`);
        assert.strictEqual(response.text, 'Hello world!', `Front page should return Hello world!`);
    });
});