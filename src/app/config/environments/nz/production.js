export default {
    services: {
        remote: {
            entity: 'http://live.entities.services.bauer-media.internal/v1/nznow',
            listings: 'http://live.listings.services.bauer-media.internal/v1/nznow',
            module: 'http://live.modules.services.bauer-media.internal/v1/nznow',
            sitemap: 'http://live.sitemaps.services.bauer-media.internal/v1/nznow',
            tag: 'http://live.tags.services.bauer-media.internal/v1/nznow'
        },
        redirect: {
            url: 'http://live.redirect.services.bauer-media.internal/v1/now/301'
        }
    },
    polar: {
        targets: {
            env: ''
        }
    }
};
