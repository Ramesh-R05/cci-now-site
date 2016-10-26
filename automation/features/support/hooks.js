var hooks = function () {
var world = require('./world');

var nconf = require('nconf');
nconf.argv().env();
var domainName = nconf.get('APP_KEY');
function randomValue(){
    return Date.now();
}
    
    this.After(function (scenario) {
        var randomId = randomValue();
        var tags='';
        if (scenario.getTags().length == '1'){
            tags = scenario.getTags()[0].getName();
        } else {
            for (var i=0; i<scenario.getTags().length;i++){
                tags = scenario.getTags()[i].getName()+","+tags;
            }
            //clean tags
            tags=tags.substr(0, tags.length-1);
        }


        if (scenario.isSuccessful()) {
            console.log("Nothing to record - Test Passed")
        } else {
            console.log("if is not Passed is FAILED");
            browser.url("http://dev.historical-report.bauer-media.net.au/historical_report/reports/insert.php?id="+domainName+randomId+"&name="+scenario.getName()+"&status=1&tags="+tags);
        }
        browser.deleteCookie();
    });

    this.registerHandler('AfterFeatures', function (event, callback) {
        browser.endAll();
    });
};

module.exports = hooks;
