'use strict';

module.exports = function hooks() {

    this.setDefaultTimeout(120 * 1000);
    console.log("Update timeout to 120000");


    var nconf = require('nconf');
    nconf.argv().env();
    var domainName = nconf.get('APP_KEY');

    this.After(function (scenario) {
            console.log('run on domain : ' + domainName);
            browser.deleteCookie();
        });
};
