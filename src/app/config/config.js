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

    jwPlayer: {
        scriptKey: 'CXz2IUna',
        baseUrl: 'https://cdn.jwplayer.com'
    },

    gigya: { apiKey: '3_R74vzxKbWVOiWuMSjElPNubJi5gS7NQ-KkpquR6Y3zVBafukYzJSZRMHKtri2igs' },

    features,

    global,

    ads: {
        targets: { env: 'test' },
        disabledGalleryChangeRefresh: true
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
            returnHomeText: 'Try refreshing this page or join us back on the homepage'
        },
        503: {
            title: 'Sorry, this page is broken.',
            symbol: null,
            content: [''],
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
    },
    useBrandTitleSuffix: true,

    meta: {
        awinDomainVerification: {
            content: '20efe2d93067619017128517d6ebfc18',
            scriptUrl: 'https://www.dwin2.com/pub.687331.min.js'
        },
        commissionFactoryVerification: {
            content: 'a380c2ed69c04c3680aa8755a729d913'
        }
    },

    footer: {
        links: {
            corporate: [
                {
                    title: 'Privacy Policy',
                    url: 'http://www.bauer-media.com.au/privacy',
                    gtmClass: 'gtm-footer-privacy'
                },
                {
                    title: 'Advertise',
                    url: 'http://www.bauer-media.com.au/advertising/advertise-with-us',
                    gtmClass: 'gtm-footer-advertising'
                },
                {
                    title: 'Terms of Use',
                    url: 'http://www.bauer-media.com.au/terms/website-terms',
                    gtmClass: 'gtm-footer-terms'
                },
                {
                    title: 'Magshop',
                    url: 'https://www.magshop.com.au/',
                    gtmClass: 'gtm-footer-magshop'
                }
            ]
        }
    }
};
