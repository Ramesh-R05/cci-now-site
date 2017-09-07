//compose URL base on ENV variables
var nconf = require('nconf');
nconf.argv().env();
var run_device = nconf.get('DEVICE');

module.exports = {

    featurePath: './features/compatibility',
    tags: '@devices',
    offline: false,
    screenshotsOnError: false,
    captureAllStepScreenshots: false,
    saveScreenshotsToReport: false,

    // - - - - SELENIUM  - - - -
      name: 'NTL Repo',
      user: 'bxmdeveloper1',
      key: 'QmqNpg983H2ucStjNMu9',
      port: 80,
      host: 'hub.browserstack.com',

    webdriverio: {
        desiredCapabilities: {
            device: run_device,
            "browserstack.debug": true,
            "realMobile" : true
        }
      }
};
