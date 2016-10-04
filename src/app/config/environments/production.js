export default {
    ads: {
        targets: ''
    },
    gigya: { apiKey: '3_EXK14YAqK4_TWaS0EQKvN0k7RjNsxDAo7mJTOMT_FwNBOiNI5uvYLr8RUEOqTR59' },
    site: {
        host: 'http://www.dolly.com.au'
    },
    loggly: {
        inputToken: '9b4a2693-dc77-4e7e-a5ee-498845c59793',
        subdomain: 'bauerdigital',
        tags: [
            'dolly',
            'live'
        ],
        json: true,
        level: 'info',
        proxy: 'http://proxy.mgmt.local:3128'
    },
    services: {
        remote: {
            entity: 'http://live.entities.services.bauer-media.internal/v1/dolly',
            listings: 'http://live.listings.services.bauer-media.internal/v1/dolly',
            module: 'http://live.modules.services.bauer-media.internal/v1/dolly',
            sitemap: 'http://live.sitemaps.services.bauer-media.internal/v1/dolly',
            tag: 'http://live.tags.services.bauer-media.internal/v1/dolly'
        },
        redirect: {
            url: 'http://live.redirect.services.bauer-media.internal/v1/dolly/301'
        }
    }
};
