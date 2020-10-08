import siteBrands from './siteBrands';
import networkBrands from './networkBrands';

export default {
    urls: {
        footerUrls: {
            privacy: 'https://www.aremedia.com.au/privacy',
            advertise: 'https://www.aremedia.com.au/brands/now-to-love/',
            terms: 'https://www.aremedia.com.au/terms/',
            contactUs: 'https://www.aremedia.com.au/about-us/contact-us/'
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
        showQuickExitButton: {
            enabled: true,
            sectionUrl: '/coercive-control',
            tagName: 'common:topic:Coercive control'
        },
        showTeaserBrandSource: {
            enabled: true
        }
    },
    outbrain: {
        templateId: 'NowtoLove',
        widgetId: 'AR_1',
        scriptUrl: '//widgets.outbrain.com/outbrain.js'
    },
    externalNavigationLinks: [
        {
            title: 'Coupons',
            url: 'https://coupons.nowtolove.com.au/'
        }
    ]
};
