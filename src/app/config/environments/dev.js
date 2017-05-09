import brightcove from '../brightcove';
const playerId = 'VkuyApojl';

export default {
    site: {
        host: 'http://dev.now-site.bauer-media.net.au'
    },
    brightcove: {
        playerId,
        script: `//players.brightcove.net/${brightcove.accountId}/${playerId}_default/index.min.js`
    },
    features: {
        sailthru: {
            enabled: true
        }
    },
    services: {
        faceBookAppID: '520578108132544'
    }
};
