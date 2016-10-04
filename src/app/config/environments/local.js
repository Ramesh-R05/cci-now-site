import brightcove from '../brightcove';
const playerId = 'VkuyApojl';

export default {
    site: {
        host: 'http://localhost:3001'
    },
    brightcove: {
        playerId,
        script: `//players.brightcove.net/${brightcove.accountId}/${playerId}_default/index.min.js`
    },
    services: {
        faceBookAppID: '520578108132544'
    }
};
