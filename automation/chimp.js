module.exports = {
    //Generic config
    screenshotsOnError: false,
    captureAllStepScreenshots: false,
    saveScreenshotsToReport: false,
    saveScreenshotsToDisk: false,
    jsonOutput: 'reports/regression.json',
    webdriverio: {
        desiredCapabilities: {
            chromeOptions: {
                args: ["--enable-automation"]
            }
        }
    }
};
