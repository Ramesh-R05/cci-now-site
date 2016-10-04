export default {
    site: {
        host: 'http://www.cosmopolitan.com.au'
    },
    gigya: { apiKey: '3_ndX508vHWsiM7qzDEdzblZzzVWxLr0MlPiKpvDO8Jq4jculYO3EgMhKJrQEh3sWr' },
    loggly: {
        inputToken: '9b4a2693-dc77-4e7e-a5ee-498845c59793',
        tags: [
            'cosmo',
            'live'
        ]
    },
    services: {
        remote: {
            entity: 'http://live.entities.services.bauer-media.internal/v1/cosmo',
            listings: 'http://live.listings.services.bauer-media.internal/v1/cosmo',
            module: 'http://live.modules.services.bauer-media.internal/v1/cosmo',
            sitemap: 'http://live.sitemaps.services.bauer-media.internal/v1/cosmo',
            tag: 'http://live.tags.services.bauer-media.internal/v1/cosmo'
        },
        redirect: {
            url: 'http://live.redirect.services.bauer-media.internal/v1/cosmo/301'
        }
    }
};
