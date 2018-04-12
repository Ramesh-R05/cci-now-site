/* eslint-disable consistent-return */

import request from 'request';

const debug = process.env.APP_DEBUG || false;
const map = new Map();

export default function comScore(req, res, next) {
    req.data = req.data || {};

    const start = Date.now();

    let segmentIds = map.get(req.query.url) || [];
    if (segmentIds.length > 0) {
        if (debug) console.log(`comscore: using segments from cache for ${req.query.url} in ${Date.now() - start}ms`);
        req.data.comScoreSegmentIds = segmentIds;
        return next();
    }
    if (debug) console.log(`comscore: requesting segments from remote ${req.query.url}`);

    const pageUrl = encodeURIComponent(`https://${req.app.locals.config.site.prodDomain}${req.query.url}`);
    const options = {
        url: `http://api-ap-southeast.proximic.com:9100/sources.json?dkey=_cfXczyV1aBZSjb4Lu1AVHeDZRDCWdUAlc_BOvD2IvI&url=${pageUrl}`,
        timeout: 1000
    };

    request.get(options, (err, response, body) => {
        if (!err && response.statusCode === 200) {
            /*
            * Example responses:
            * var pxSegmentIDs = "300003,210000,110000,110006";
            *
            * or
            *
            * {“scope”: ”page”, “segments”: [“300003", “110000", “110005", "tzvs7j"]}
            *
            * */

            const isJson = body.startsWith('{');

            if (isJson) {
                try {
                    const json = JSON.parse(body);
                    segmentIds = json.segments || [];
                } catch (e) {
                    // do nothing
                }
            } else {
                const match = body.match(/"(.*?)"/);
                if (match) {
                    segmentIds = match[1].split(',');
                }
            }

            if (segmentIds.length > 0) {
                req.data.comScoreSegmentIds = map.set(req.query.url, segmentIds.join(','));
            }
            if (debug) console.log(`comscore: received segments from remote for ${req.query.url} in ${Date.now() - start}ms`);
            next();
        } else {
            next(err);
        }
    });
}
