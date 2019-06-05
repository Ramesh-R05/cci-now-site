'use strict';

module.exports = function() {

    const timeout = 120 * 2000;
    this.setDefaultTimeout(timeout);
    console.log(`Updated default timeout to ${timeout / 1000 / 60 * 1} minutes`);

    const nconf = require('nconf');
    nconf.argv().env();
    const domainName = nconf.get('APP_KEY');

    this.After((scenario) => {
        browser.deleteCookie();
    });

};
