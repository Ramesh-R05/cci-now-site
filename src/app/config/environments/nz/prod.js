export default {
    site: {
        host: 'http://www.nowtolove.co.nz',
        protocol: 'https'
    },
    services: {
        remote: {
            entity: 'https://services.prod.bxm.net.au/entity/v1/nznow',
            listings: 'https://services.prod.bxm.net.au/listing/v1/nznow',
            module: 'https://services.prod.bxm.net.au/module/v1/nznow',
            sitemap: 'http://sitemap-service.prod.bxm.net.au/v1/nznow',
            tag: 'https://services.prod.bxm.net.au/tag/v1/nznow',
            search: 'https://services.prod.bxm.net.au/es-search/v1/nznow'
        },
        redirect: {
            url: 'http://services.prod.bxm.internal/redirect/v1/nznow/301'
        }
    },
    gigya: { apiKey: '3_t9sNGuUPgwEUVDuOJ3g1BEMlqQWvKXQWS9toq53-iiMKRAbCWKXkW8yzltcsCF9N' },
    polar: {
        targets: {
            env: ''
        }
    }
};
