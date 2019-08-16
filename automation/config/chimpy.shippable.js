/* 
    these are the arguments passed to the chimpy cli when the bxm-automation command is run
    for a full list of possible arguments, follow this link
    https://github.com/TheBrainFamily/chimpy/blob/master/src/bin/default.js
*/

const path = require('path');
const debug = process.env.APP_DEBUG === 'true';

require('dotenv').config({
    path: path.resolve(process.cwd(), '../src/.sit.env')
});

module.exports = {
    screenshotsOnError: false,
    captureAllStepScreenshots: false,
    jsonOutput: 'reports/regression.json',
    webdriverio: {
        /**
         * log level
         * silent : no logs
         * command : command only
         * result : result only
         * error : error only
         * verbose : command + data + result
         */
        // logLevel: 'silent',
        desiredCapabilities: {
            execArgv: debug ? ['--inspect'] : [],
            // go to https://peter.sh/experiments/chromium-command-line-switches/
            chromeOptions: {
                args: [
                    '--enable-automation',
                    '--allow-insecure-localhost',
                    '--headless',
                    '--help',
                    '--disable-gpu',
                    '--enable-logging',
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--whitelisted-ips=',
                    '--browser-test ',
                    '--enable-auto-reload',
                    '--new-window'
                ]
            }
        }
    },
    seleniumStandaloneOptions: {
        // check for more recent versions of selenium here:
        // http://selenium-release.storage.googleapis.com/index.html
        version: '3.9.1',
        baseURL: 'https://selenium-release.storage.googleapis.com',
        drivers: {
            chrome: {
                // check for more recent versions of chrome driver here:
                // http://chromedriver.storage.googleapis.com/index.html
                version: '76.0.3809.68',
                arch: process.arch,
                baseURL: 'https://chromedriver.storage.googleapis.com'
            }
        }
    },
    log: 'info',
    debugCucumber: true,
    debugBrkCucumber: debug ? true : null,
    debugCucumber: debug ? true : null
    // uncomment below for selenium logs
    // seleniumDebug: true
};
