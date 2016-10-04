import brightcove from './brightcove';
import site from './site';
import services from './services';

export default {

    defaultImageUrl: 'http://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/cosmo/defaultimage.png',

    brightcove,

    site,

    gtm: { masthead: 'COSMO', id: 'GTM-K774C2' },

    gigya: { apiKey: '3_9adtmm8qGhCt_TN8f88ifpDX8YdJZVYyRkgnO_nokUIw1f0kbwQt9TMAfhdR0Pb8' },

    services,

    features: {
        galleryOfGalleries: {
            enabled: false
        }
    },

    subscribe: {
        subscribeHeading: 'Get the mag',
        subscribeText: 'Subscribe to Cosmo magazine for heaps more awesomeness! From advice, to beauty, to fashion  – we’ve got you covered.',
        subscribeMagUrl: 'https://www.magshop.com.au/cos/h1609cos',
        subscribeIpadUrl: 'http://www.magshop.com.au/cosdigital',
        subscribeButtonUrl: 'https://www.magshop.com.au/cos/h1609cos'
    },
    newsletterIframeUrl: 'https://d4jqclkssewcy.cloudfront.net/page.aspx?QS=38dfbe491fab00eaf0b8fb992ad1a0b52fb9e1dc0c154322&brand=cosmo',

    error: {
        404: {
            title: `*COUGH* I CAN'T LOAD UP, I'M SICK!`,
            symbol: null,
            content: [''],
            emojiSrc: '/assets/images/error.gif',
            returnHomeText: 'Try refreshing this page or join us back on the homepage'
        },
        503: {
            title: `*COUGH* I CAN'T LOAD UP, I'M SICK!`,
            symbol: null,
            content: [''],
            emojiSrc: '/assets/images/error.gif',
            returnHomeText: 'Come join us back on the homepage!'
        }
    }
};
