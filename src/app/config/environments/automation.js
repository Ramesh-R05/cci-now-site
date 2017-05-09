import brightcove from '../brightcove';
const playerId = 'VkuyApojl';

export default {
    brightcove: {
        playerId,
        script: `//players.brightcove.net/${brightcove.accountId}/${playerId}_default/index.min.js`
    },
    services: {
        host: 'http://localhost:3000',
        header: {
            url: 'http://automation.now-site.bauer-media.net.au/stub/wn-header'
        }
    },
    site: {
        host: 'http://automation.now-site.bauer-media.net.au/'
    },
    polar: {
        propertyId: 'NA-NOWTOLOVE-11238611'
    }
};