'use strict';

module.exports = function() {
    const nconf = require('nconf');
    nconf.argv().env();
    const domainName = nconf.get('APP_KEY');

    this.After(scenario => {
        browser.deleteCookie();
    });
};
