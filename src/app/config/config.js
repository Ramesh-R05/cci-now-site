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

    gigya: { apiKey: '3_R74vzxKbWVOiWuMSjElPNubJi5gS7NQ-KkpquR6Y3zVBafukYzJSZRMHKtri2igs' },

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
            title: `Shock! Horror! This page is broken...`,
            symbol: null,
            content: [''],
            emojiSrc: '/assets/images/error.gif',
            returnHomeText: 'Try refreshing this page or join us back on the homepage'
        },
        503: {
            title: `Shock! Horror! This page is broken...`,
            symbol: null,
            content: [''],
            emojiSrc: '/assets/images/error.gif',
            returnHomeText: 'Try refreshing this page or join us back on the homepage'
        }
    },

    polar: {
        url: '//plugin.mediavoice.com/plugin.js',
        propertyId: 'NA-NOWTOLOVE-11238611',
        targets: { env: 'test' },
        adSize: '2x2',
        server: 'dfp',
        labels: {
            homeMustReadTwo: {
                slot: 1,
                label: 'home_mustread_1',
                targets: {kw:'home_mustread_1'}
            },
            homeMustReadFive: {
                slot: 4,
                label: 'home_mustread_2',
                targets: {kw:'home_mustread_2'}
            },
            homeTopFeedsOne: {
                slot: 0,
                label: 'home_top_feed_1',
                targets: {kw:'home_top_feed_1'}
            },
            homeTopFeedsSix: {
                slot: 5,
                label: 'home_top_feed_2',
                targets: {kw:'home_top_feed_2'}
            },
            homeBottomFeedsTwo: {
                slot: 1,
                label: 'home_bottom_feed_1',
                targets: {kw:'home_bottom_feed_1'}
            },
            homeBottomFeedsSix: {
                slot: 5,
                label: 'home_bottom_feed_2',
                targets: {kw:'home_bottom_feed_2'}
            },
            sectionTopFeedsOne: {
                slot: 0,
                label: 'section_top_feed_1',
                targets: {kw:'section_top_feed_1'}
            },
            sectionTopFeedsSix: {
                slot: 5,
                label: 'section_top_feed_2',
                targets: {kw:'section_top_feed_2'}
            },
            sectionBottomFeedsTwo: {
                slot: 1,
                label: 'section_bottom_feed_1',
                targets: {kw:'section_bottom_feed_1'}
            },
            sectionBottomFeedsSix: {
                slot: 5,
                label: 'section_bottom_feed_2',
                targets: {kw:'section_bottom_feed_2'}
            }
        }
    }
};

