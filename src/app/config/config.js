import brightcove from './brightcove';
import cache from './cache';
import features from './features';
import global from './global';
import services from './services';
import site from './site';
import polar from './polar';
import routes from './routes';

export default {

    ga: { id: 'UA-57795117-6' },

    gtm: { masthead: 'NOW', id: 'GTM-MSL9XB' },

    defaultImageUrl: 'https://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/now/defaultimage.png',

    brightcove,

    gigya: { apiKey: '3_R74vzxKbWVOiWuMSjElPNubJi5gS7NQ-KkpquR6Y3zVBafukYzJSZRMHKtri2igs' },

    features,

    global,

    ads: {
        targets: { env: 'test' },
        disabledGalleryChangeRefresh: true,
        iasAds: true
    },

    site,

    server: { port: 3001 },

    services,

    cache,

    headerBaseHeight: 193,

    error: {
        404: {
            title: 'Sorry, this page is not found.',
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
    },

    oriel: {
        scriptUrl: '//f92j5.com/gks7m1ojipkc3pg6y79ct5xpm73slf5p5a.js'
    },

    nielsen: '6148F238-179C-4F36-9AD2-5B6EC6981EFC',
    subscribeText: 'The latest news delivered to your inbox',
    logiesVoting: {
        url: routes.logies.path,
        metadata: {
            siteName: 'TV Week Logie Awards',
            title: 'The 60th TV WEEK Logie Awards',
            description: 'Place your vote for the 60th TV WEEK Logie Awards in 2018.',
            url: 'http://www.tvweeklogieawards.com.au/'
        }
    }
};
