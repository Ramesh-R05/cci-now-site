import brightcove from './brightcove';
import cache from './cache';
import features from './features';
import global from './global';
import services from './services';
import site from './site';
import polar from './polar';

export default {

    gtm: { masthead: 'NOW', id: 'GTM-MSL9XB' },

    defaultImageUrl: 'http://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/now/defaultimage.png',

    brightcove,

    gigya: { apiKey: '3_R74vzxKbWVOiWuMSjElPNubJi5gS7NQ-KkpquR6Y3zVBafukYzJSZRMHKtri2igs' },

    features,

    global,

    ads: { targets: { env: 'test' } },

    site,

    server: { port: 3001 },

    services,

    cache,

    headerBaseHeight: 193,

    error: {
        404: {
            title: 'Sorry, this page is broken.',
            symbol: null,
            content: [''],
            emojiSrc: '/assets/images/error.gif',
            returnHomeText: 'Try refreshing this page or join us back on the homepage'
        },
        503: {
            title: 'Sorry, this page is broken.',
            symbol: null,
            content: [''],
            emojiSrc: '/assets/images/error.gif',
            returnHomeText: 'Try refreshing this page or join us back on the homepage'
        }
    },

    polar,

    newrelic: {
        browser: {
            licenseKey: '81938b3952',
            applicationID: '37598318'
        }
    }
};

