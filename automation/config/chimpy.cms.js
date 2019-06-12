/* 
    these are the arguments passed to the chimpy cli when the bxm-automation command is run
    for a full list of possible arguments, follow this link
    https://github.com/TheBrainFamily/chimpy/blob/master/src/bin/default.js
*/

module.exports = {
    screenshotsOnError: false,
    captureAllStepScreenshots: false,
    jsonOutput: 'reports/regression.json',
    webdriverio: {
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
        version: '3.9.0',
        baseURL: 'https://selenium-release.storage.googleapis.com',
        drivers: {
            chrome: {
                // check for more recent versions of chrome driver here:
                // http://chromedriver.storage.googleapis.com/index.html
                version: '74.0.3729.6',
                arch: process.arch,
                baseURL: 'https://chromedriver.storage.googleapis.com'
            }
        }
    }
};