//compose URL base on ENV variables
var nconf = require('nconf');
nconf.argv().env();
var run_env = nconf.get('APP_ENV');
var site_domain = nconf.get('APP_KEY');
var baseUrl = nconf.get('URL');
var domain_sufx = '.bauer-media.net.au/';

if (typeof baseUrl === 'string' && baseUrl !== ''){
    // Ensure valid URL path has been specified
    var rx = /^http(s)?:\/\/([a-z0-9-_]{1,61})(:(\d+))?(.*?)$/i;
    var index = 5;
    var matches = baseUrl.match(rx);
    if (matches.length > index && matches[index] === ''){
        var oldUrl = baseUrl;
        baseUrl += '/';
        console.log('Found invalid url path (' + oldUrl + '), patching to ' + baseUrl);
        nconf.set('URL', baseUrl);
    }
}

baseUrl === '' && (baseUrl = 'http://' + run_env + '.' + site_domain + domain_sufx);
console.log('running on url: ' + baseUrl);

module.exports = {
    Urls: {
        'home_page': baseUrl
    }
};
