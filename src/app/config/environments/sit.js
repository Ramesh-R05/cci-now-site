import brightcove from '../brightcove';
const playerId = 'ByDaSOUCG';

export default {
    site: {
        host: 'http://now-site-au.sit.bxm.net.au'
    },
    brightcove: {
        playerId,
        script: `//players.brightcove.net/${brightcove.accountId}/${playerId}_default/index.min.js`
    },
    services: {
        faceBookAppID: '520578108132544'
    },
    features: {
        jwPlayer: {
            enabled: true
        }
    }
};
