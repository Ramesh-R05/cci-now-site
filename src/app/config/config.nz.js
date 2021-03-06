import services from './nzconfig/services';
import site from './nzconfig/site';
import urls from './nzconfig/urls';
import brands from './nzconfig/brands';
import features from './nzconfig/features';
import footer from './nzconfig/footer';

export default {
    ga: { id: 'UA-57795117-7' },

    gtm: { masthead: 'NZNOW', id: 'GTM-W8G546R' },

    features,

    services,

    gigya: { apiKey: '3_Yq81-uJDdxXpZkQJw_lte1IiZ8cRnixdv4mzwpglI1Ft2AN3vZY0DuQQa4Be2gR1' },

    site,

    jwPlayer: {
        scriptKey: 'nCfLebbM',
        baseUrl: 'https://cdn.jwplayer.com'
    },

    urls,

    brands,

    outbrain: {
        templateId: 'NowtoLoveNZ',
        widgetId: 'AR_1',
        scriptUrl: '//widgets.outbrain.com/outbrain.js'
    },

    parsely: {
        apiKey: 'nowtolove.co.nz'
    },

    footer
};
