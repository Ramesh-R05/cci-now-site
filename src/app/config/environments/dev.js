import brightcove from '../brightcove';
const playerId = 'VkuyApojl';

export default {
    site: {
        host: 'http://dev.life-site.bauer-media.net.au'
    },
    brightcove: {
        playerId,
        script: `//players.brightcove.net/${brightcove.accountId}/${playerId}_default/index.min.js`
    },
    loggly: {
        inputToken: '9b4a2693-dc77-4e7e-a5ee-498845c59793',
        subdomain: 'bauerdigital',
        tags: [
            'life',
            'dev'
        ],
        json: true,
        level: 'info',
        proxy: 'http://proxy.mgmt.local:3128'
    },
    services: {
        faceBookAppID: '520578108132544'
    }
};
