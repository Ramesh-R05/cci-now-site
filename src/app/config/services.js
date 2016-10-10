export default {
    local: 'http://127.0.0.1',
    remote: {
        entity: 'http://dev.entities.services.bauer-media.internal/v1/life',
        listings: 'http://dev.listings.services.bauer-media.internal/v1/life',
        module: 'http://dev.modules.services.bauer-media.internal/v1/life',
        sitemap: 'http://dev.sitemaps.services.bauer-media.internal/v1/life',
        trending: 'http://trending.bauer.mg/today?sites=life.com.au',
        tag: 'http://dev.tags.services.bauer-media.internal/v1/life'
    },
    endpoints: {
        page: '/api/getPageContent',
        list: '/api/list'
    },
    header: {
        url: 'https://d38h2iiydertbj.cloudfront.net/header/prod/globalheader.json'
    },
    redirect: {
        url: 'http://dev.redirect.services.bauer-media.internal/v1/life/301'
    },
    faceBookAppID: '373446372845719'
};

