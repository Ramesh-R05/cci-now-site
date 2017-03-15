if (!process.env.APP_KEY) throw new Error('APP_KEY environment variable not set');

var fs = require('fs');
require('@bxm/node-apm')(process.env.APP_KEY);
require('babel-polyfill');
require('babel-register');

var requiredFile = './dist/scripts/main.js';
var retryDelay = 5000;
var attemptCount = 0;
var maxAttempts = 12;

function startWhenReady() {
    attemptCount++;
    clearTimeout(startWhenReady);
    if (fs.existsSync(requiredFile)) {
        console.log(requiredFile, 'exists. Starting...');
        require('./app/server/server');
    } else if (attemptCount <= maxAttempts) {
        console.log('Watchify is building', requiredFile, 'Waiting ' + retryDelay / 1000 + ' more seconds...');
        setTimeout(startWhenReady, retryDelay);
    } else {
        throw new Error(requiredFile + 'not found within ' + (maxAttempts * retryDelay) / 1000
            + ' seconds. Is something wrong?');
    }
}

startWhenReady();
