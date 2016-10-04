import brightcove from '../brightcove';
const playerId = 'VkuyApojl';

export default {
    brightcove: {
        playerId,
        script: `//players.brightcove.net/${brightcove.accountId}/${playerId}_default/index.min.js`
    },
    services: {
        header: {
            url: 'http://automation.cosmo-site.bauer-media.net.au/stub/wn-header'
        }
    },
    site: {
        host: 'http://automation.cosmo-site.bauer-media.net.au/'
    }
};
