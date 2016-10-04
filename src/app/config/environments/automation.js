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
            url: 'http://automation.dolly-site.bauer-media.net.au/stub/wn-header'
        }
    },
    site: {
        host: 'http://automation.dolly-site.bauer-media.net.au/'
    }
};
