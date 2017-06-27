process.env.APP_KEY = 'now-site';
process.title = process.env.APP_KEY;
if (process.env.APP_DEBUG === 'true') {
    process.on('uncaughtException', function(e) {
        throw e;
    });
}
require('babel-polyfill');
require('babel-register');
var logger = require('./logger').default;
require('./apm');
var fs = require('fs');
var requiredFile = './dist/manifest.json';
var retryDelay = 5000;
var attemptCount = 0;
var maxAttempts = 12;

function startWhenReady() {
    attemptCount++;
    clearTimeout(startWhenReady);
    if (fs.existsSync(requiredFile)) {
        logger.info(`${requiredFile} exists, ok to start`);
        require('./app/server/server');
    } else if (attemptCount <= maxAttempts) {
        logger.debug(`${requiredFile} in progress - waiting ${retryDelay / 1000} more seconds`);
        setTimeout(startWhenReady, retryDelay);
    } else {
        throw new Error(`requiredFile not found within ${(maxAttempts * retryDelay) / 1000} seconds`);
    }
}

if (process.env.APP_DEBUG === 'true' || process.env.APP_DEBUG === 'silly') {
    try {
        startWhenReady();
    } catch (e) {
        logger.error(e);
    }
} else {
    startWhenReady();
}
