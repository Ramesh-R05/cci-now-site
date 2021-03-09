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
            entity: 'https://services.prod.bxm.net.au/entity/v1/now',
            listings: 'https://services.prod.bxm.net.au/listing/v1/now',
            module: 'https://services.prod.bxm.net.au/module/v1/now',
            sitemap: 'http://sitemap-service.prod.bxm.net.au/v1/now',
            tag: 'https://services.prod.bxm.net.au/tag/v1/now',
            search: 'https://services.prod.bxm.net.au/es-search/v1/now',
            identity: 'https://live.dmp.aremedia.net.au/federation/api/identity'
        },
        redirect: {
            url: 'http://services.prod.bxm.internal/redirect/v1/now/301'
        }
    },
    googleNativeAds: {
        targets: {
            env: ''
        }
    }
};
