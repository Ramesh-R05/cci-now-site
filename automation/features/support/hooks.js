var automation = require('@bxm/automation').default;

var hooks = function () {
    var world = require('./world');

    var nconf = require('nconf');
    nconf.argv().env();
    var domainName = nconf.get('APP_KEY');

        this.After(function (scenario) {
            console.log('run on domain : ' + domainName);
            automation.sendReport(scenario, 'agent-i',domainName);
            browser.deleteCookie();
        });
};

module.exports = hooks;
