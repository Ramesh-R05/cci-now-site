import brightcove from './brightcove';
import cache from './cache';
import features from './features';
import global from './global';
import services from './services';
import site from './site';
import brands from './brands'

export default {
    typekit: { id: 'hsn1dgy' },

    gtm: { masthead: 'NOW', id: 'GTM-MSL9XB' },

    defaultImageUrl: 'http://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/now/defaultimage.png',

    brightcove,

    gigya: { apiKey: '3_2ZyWXAZHy5qrj7nPWE_GfZG9O2PKWqK4QjMIpjw97Tn3lDEg4rKAgVk7pPQu8-Lt' },

    features,

    brands,

    global,

    ads: { targets: { env: 'test' } },

    site,

    server: { port: 3001 },

    services,

    cache,

    error: {
        404: {
            title: `This page is under construction`,
            symbol: null,
            content: [''],
            emojiSrc: '/assets/images/coming-soon.jpg',
            returnHomeText: 'Try refreshing this page or join us back on the homepage'
        },
        503: {
            title: `This page is under construction`,
            symbol: null,
            content: [''],
            emojiSrc: '/assets/images/coming-soon.jpg',
            returnHomeText: 'Try refreshing this page or join us back on the homepage'
        }
    }
};

