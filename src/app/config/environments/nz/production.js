export default {
    site: {
        host: 'http://www.nowtolove.co.nz'
    },
    services: {
        remote: {
            entity: 'http://services.prod.bxm.internal/entity/v1/nznow',
            listings: 'http://services.prod.bxm.internal/listing/v1/nznow',
            module: 'http://live.modules.services.bauer-media.internal/v1/nznow',
            sitemap: 'http://live.sitemaps.services.bauer-media.internal/v1/nznow',
            tag: 'http://live.tags.services.bauer-media.internal/v1/nznow'
        },
        redirect: {
            url: 'http://live.redirect.services.bauer-media.internal/v1/nznow/301'
        }
    },
    gigya: { apiKey: '3_t9sNGuUPgwEUVDuOJ3g1BEMlqQWvKXQWS9toq53-iiMKRAbCWKXkW8yzltcsCF9N' },
    polar: {
        targets: {
            env: ''
        }
    }
};
