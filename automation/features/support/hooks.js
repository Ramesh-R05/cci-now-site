'use strict';

module.exports = function() {
    const nconf = require('nconf');
    const debug = process.env.APP_DEBUG === 'true';
    nconf.argv().env();
    const domainName = nconf.get('APP_KEY');

    this.BeforeFeatures(() => {
        if (debug) {
            const timeoutInMs = 100000;
            const timeoutInMins = timeoutInMs / 1000 / 60;

            this.setDefaultTimeout(timeoutInMs);
            console.log(`Updated default timeout to ${timeoutInMins} minutes`);
        }
    });

    this.After(scenario => {
        browser.deleteCookie();
    });
};
