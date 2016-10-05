var hooks = function () {
    var world = require('./world');


    this.After(function (scenario) {
        browser.deleteCookie();
    });

    this.registerHandler('AfterFeatures', function (event, callback) {
        browser.endAll();
    });
};

module.exports = hooks;
