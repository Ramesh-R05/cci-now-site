'use strict';

module.exports = function() {

    const timeout = 120 * 1000;
    this.setDefaultTimeout(timeout);
    console.log(`Updated timeout to ${timeout}`);

    const nconf = require('nconf');
    nconf.argv().env();
    const domainName = nconf.get('APP_KEY');

    this.After((scenario) => {
        console.log(`Running on domain: ${domainName}`);
        browser.deleteCookie();
    });

};
