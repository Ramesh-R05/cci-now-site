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
            url: 'http://localhost:3001/stub/wn-header'
        }
    },
    site: {
        host: 'http://127.0.0.1:3001'
    }
};
