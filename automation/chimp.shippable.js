module.exports = {

    featurePath: './features/regression',
    //Generic config
    screenshotsOnError: false,
    captureAllStepScreenshots: false,
    saveScreenshotsToReport: false,
    webdriverio: {
        desiredCapabilities: {
            // go to https://peter.sh/experiments/chromium-command-line-switches/
            chromeOptions: {
                args: ["--enable-automation", "--allow-insecure-localhost"]
            }
        }
    },

    phantom_ignoreSSLErrors: true
};
