export default {
    ads: {
        targets: ''
    },
    gigya: { apiKey: '3_gzVo_oseZLARo4_VUUqJBB2Y9zC2eDqp8Puo28P_UsBV1lHkIe8V8WX5-sKKdp56' },
    site: {
        host: 'http://www.nowtolove.com.au'
    },
    services: {
        remote: {
            entity: 'http://services.prod.bxm.internal/entity/v1/now',
            listings: 'http://services.prod.bxm.internal/listing/v1/now',
            module: 'http://services.prod.bxm.internal/module/v1/now',
            sitemap: 'http://sitemap-service.prod.bxm.net.au/v1/now',
            tag: 'http://services.prod.bxm.internal/tag/v1/now'
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
