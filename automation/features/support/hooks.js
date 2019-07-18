'use strict';

module.exports = function() {
    const nconf = require('nconf');
    nconf.argv().env();
    const domainName = nconf.get('APP_KEY');

    this.BeforeFeatures(() => {
        const timeoutInMs = 240000;
        const timeoutInMins = timeoutInMs / 1000 / 60;

        this.setDefaultTimeout(timeoutInMs);
        console.log(`Updated default timeout to ${timeoutInMins} minutes`);
    });

    this.After(scenario => {
        browser.deleteCookie();
    });
};
