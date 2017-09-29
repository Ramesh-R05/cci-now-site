export default {
    local: 'http://127.0.0.1',
    remote: {
        entity: 'http://services.sit.bxm.internal/entity/v1/now',
        listings: 'http://services.sit.bxm.internal/listing/v1/now',
        module: 'http://services.sit.bxm.internal/module/v1/now',
        sitemap: 'http://sitemap-service.sit.bxm.net.au/v1/now',
        tag: 'http://services.sit.bxm.internal/tag/v1/now'
    },
    endpoints: {
        page: '/api/getPageContent',
        list: '/api/list'
    },
    header: {
        url: 'https://d38h2iiydertbj.cloudfront.net/header/prod/globalheader.json'
    },
    redirect: {
        url: 'http://services.sit.bxm.internal/redirect/v1/now/301'
    },
    faceBookAppID: '373446372845719'
};

