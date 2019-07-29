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
        execArgv: debug ? ['--inspect'] : [],
        desiredCapabilities: {
            // go to https://peter.sh/experiments/chromium-command-line-switches/
            chromeOptions: {
                args: [
                    '--enable-automation',
                    '--allow-insecure-localhost',
                    '--headless',
                    `--proxy-server='direct://'`,
                    '--proxy-bypass-list=*',
                    '--disable-gpu',
                    '--enable-logging',
                    '--no-sandbox',
                    '--enable-features=NetworkService,NetworkServiceInProcess',
                    '--disable-setuid-sandbox'
                ]
            }
        }
    },
    seleniumStandaloneOptions: {
        // check for more recent versions of selenium here:
        // http://selenium-release.storage.googleapis.com/index.html
        version: '4.0',
        baseURL: 'https://selenium-release.storage.googleapis.com',
        drivers: {
            chrome: {
                // check for more recent versions of chrome driver here:
                // http://chromedriver.storage.googleapis.com/index.html
                version: '75.0.3770.140',
                arch: process.arch,
                baseURL: 'https://chromedriver.storage.googleapis.com'
            }
        }
    },
    debugCucumber: debug ? true : null
};
