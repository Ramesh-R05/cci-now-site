export default {
    ads: {
        targets: ''
    },
    gigya: { apiKey: '3_gzVo_oseZLARo4_VUUqJBB2Y9zC2eDqp8Puo28P_UsBV1lHkIe8V8WX5-sKKdp56' },
    site: {
        host: 'http://www.nowtolove.com.au',
        protocol: 'https'
    },
    services: {
        remote: {
            entity: 'http://services.prod.bxm.internal/entity/v1/now',
            listings: 'http://services.prod.bxm.internal/listing/v1/now',
            module: 'http://services.prod.bxm.internal/module/v1/now',
            sitemap: 'http://sitemap-service.prod.bxm.net.au/v1/now',
            tag: 'http://services.prod.bxm.internal/tag/v1/now',
            search: 'http://services.prod.bxm.internal/es-search/v1/now',
            identity: 'https://live.dmp.bauer-media.net.au/api/identity'
        },
        redirect: {
            url: 'http://services.prod.bxm.internal/redirect/v1/now/301'
        }
    },
    polar: {
        targets: {
            env: ''
        }
    }
};
