import siteBrands from './siteBrands';
import networkBrands from './networkBrands';

export default {
    urls: {
        footerUrls: {
            privacy: 'http://www.bauer-media.com.au/privacy',
            advertise: 'http://www.bauer-media.com.au/advertising/advertise-with-us',
            terms: 'http://www.bauer-media.com.au/terms/website-terms'
        },
        newsletterUrl: 'https://www.nowtolove.com.au/now-newsletter',
        newsletterSignupInBodyCopy: 'https://cb.sailthru.com/join/5k8/signup-nowtolove-article-iframe-bottom'
    },

    brands: {
        site: siteBrands,
        network: networkBrands,
        shortSources: {
            "Australian Women's Weekly": 'AWW'
        }
    },
    // Any features added here will NOT be loaded by NZ config
    features: {
        outbrain: {
            enabled: true
        },
        outbrainAmp: {
            enabled: true
        },
        teaserVideoIcon: {
            enabled: false
        },
        feedItemVideoIcon: {
            enabled: false
        },
        showHeaderSocialIcons: {
            enabled: true
        },
        showBuyMagazinesButton: {
            enabled: true
        },
        showTeaserBrandSource: {
            enabled: true
        }
    },
    outbrain: {
        templateId: 'NowtoLove',
        widgetId: 'AR_1',
        scriptUrl: '//widgets.outbrain.com/outbrain.js'
    }
};
