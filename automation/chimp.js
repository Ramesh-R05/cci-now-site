module.exports = {
    //Generic config
    screenshotsOnError: false,
    //screenshotsPath: './screenshots',
    captureAllStepScreenshots: false,
    //saveScreenshotsToReport: false,
    //saveScreenshotsToDisk: true,
    jsonOutput: 'reports/regression.json',
    webdriverio: {
        desiredCapabilities: {
            chromeOptions: {
                args: ["--enable-automation"]
            }
        }
    }
};
