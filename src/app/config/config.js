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

    subscribe: {
        subscribeHeading: 'Get the mag',
        subscribeText: 'Subscribe to DOLLY magazine for heaps more awesomeness! From advice, to beauty, to fashion  – we’ve got you covered.',
        subscribeMagUrl: 'https://www.magshop.com.au/dolly/h1608dol',
        subscribeIpadUrl: 'https://www.magshop.com.au/dolly/h1608dol',
        subscribeButtonUrl: 'https://www.magshop.com.au/dolly/h1608dol'
    },
    newsletterIframeUrl: 'https://d4jqclkssewcy.cloudfront.net/page.aspx?QS=38dfbe491fab00eaf0b8fb992ad1a0b52fb9e1dc0c154322&brand=dolly',

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

