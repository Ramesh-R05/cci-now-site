//compose URL base on ENV variables
const nconf = require('nconf');
nconf.argv().env();
const runEnv = nconf.get('APP_ENV');
const siteDomain = nconf.get('APP_KEY');
const domainSuffix = '.bauer-media.net.au/';
let baseUrl = nconf.get('URL');

if (typeof baseUrl === 'string' && baseUrl !== ''){
    // Ensure valid URL path has been specified
    const rx = /^http(s)?:\/\/([a-z0-9-_]{1,61})(:(\d+))?(.*?)$/i;
    const index = 5;
    const matches = baseUrl.match(rx);
    if (matches.length > index && matches[index] === ''){
        const oldUrl = baseUrl;
        baseUrl += '/';
        console.log(`Found invalid url path (${oldUrl}), patching to ${baseUrl}`);
        nconf.set('URL', baseUrl);
    }
}

baseUrl === '' && (baseUrl = `http://${runEnv}.${siteDomain}${domainSuffix}`);
console.log(`Running on url: ${baseUrl}`);

module.exports = {
    Urls: {
        'home_page': baseUrl,
        'site': siteDomain
    }
};
