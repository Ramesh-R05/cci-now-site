//compose URL base on ENV variables
var nconf = require('nconf');
nconf.argv().env();
var run_version = nconf.get('BrowserVersion');
var run_os = nconf.get('BrowserOs');
var run_osversion = nconf.get('BrowserOsVersion');

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
            "browser_version": run_version,
            "os": run_os,
            "os_version": run_osversion,
            'resolution' : '1920x1080',
            "browserstack.debug": true
        }

        }
};
