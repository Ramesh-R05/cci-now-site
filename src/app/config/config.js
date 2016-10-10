import brightcove from './brightcove';
import cache from './cache';
import features from './features';
import global from './global';
import services from './services';
import site from './site';

export default {
    typekit: { id: 'hsn1dgy' },

    gtm: { masthead: 'LIFE', id: 'GTM-WH4FTG' },

    defaultImageUrl: 'http://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/life/defaultimage.png',

    brightcove,

    gigya: { apiKey: '3_2ZyWXAZHy5qrj7nPWE_GfZG9O2PKWqK4QjMIpjw97Tn3lDEg4rKAgVk7pPQu8-Lt' },

    features,

    global,

    ads: { targets: { env: 'test' } },

    site,

    server: { port: 3001 },

    services,

    cache,

    //TODO find out if we still need magshop
    subscribe: {
        subscribeHeading: 'Get the mag',
        subscribeText: 'Subscribe to DOLLY magazine for heaps more awesomeness! From advice, to beauty, to fashion  – we’ve got you covered.',
        subscribeMagUrl: 'https://www.magshop.com.au/dolly/h1608dol',
        subscribeIpadUrl: 'https://www.magshop.com.au/dolly/h1608dol',
        subscribeButtonUrl: 'https://www.magshop.com.au/dolly/h1608dol'
    },
    newsletterIframeUrl: 'https://d4jqclkssewcy.cloudfront.net/page.aspx?QS=38dfbe491fab00eaf0b8fb992ad1a0b52fb9e1dc0c154322&brand=dolly',

    //TODO make for women not grills
    error: {
        404: {
            title: `SOZ!`,
            symbol: '#',
            content: [
                `This page is broken`
            ],
            emojiSrc: '/assets/images/grin-emoji.png',
            returnHomeText: 'Return to homepage'
        },
        503: {
            title: `SOZ!`,
            symbol: '#',
            content: [
                `It seems the page you were trying to view is temporarily unavailable.`,
                `Please try again shortly.`
            ],
            returnHomeText: 'Return to homepage'
        }
    }
};

