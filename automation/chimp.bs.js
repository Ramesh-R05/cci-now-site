module.exports = {

    featurePath: './features/mobile',
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
            "browserstack.debug": false,
            'realMobile': true,
            'browserName': 'iPhone',
            'platform': 'MAC',
            'device': 'iPhone 6'
            }
      }
};
