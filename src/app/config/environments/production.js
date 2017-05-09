export default {
    ads: {
        targets: ''
    },
    gigya: { apiKey: '3_gzVo_oseZLARo4_VUUqJBB2Y9zC2eDqp8Puo28P_UsBV1lHkIe8V8WX5-sKKdp56' },
    site: {
        host: 'http://www.nowtolove.com.au'
    },
    loggly: {
        inputToken: '9b4a2693-dc77-4e7e-a5ee-498845c59793',
        subdomain: 'bauerdigital',
        tags: [
            'now',
            'live'
        ],
        json: true,
        level: 'info',
        proxy: 'http://proxy.mgmt.local:3128'
    },
    services: {
        remote: {
            entity: 'http://live.entities.services.bauer-media.internal/v1/now',
            listings: 'http://live.listings.services.bauer-media.internal/v1/now',
            module: 'http://live.modules.services.bauer-media.internal/v1/now',
            sitemap: 'http://live.sitemaps.services.bauer-media.internal/v1/now',
            tag: 'http://live.tags.services.bauer-media.internal/v1/now'
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