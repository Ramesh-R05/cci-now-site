import request from 'superagent';
import requestProxy from 'superagent-proxy';
import LRU from 'lru-cache';
import url from 'url';

requestProxy(request);

const cache = LRU({ max: 1000, maxAge: 1 });

function send(res, header, status, text) {
    res.set(header).status(status).send(text);
}

export default function assetProxy({ originalUrl }, res) {
    const origin = decodeURIComponent(originalUrl.replace('/api/asset?url=', ''));
    const originAsUrl = url.parse(origin);
    if (!originAsUrl.protocol || !originAsUrl.slashes || !originAsUrl.hostname) res.sendStatus(400);
    else {
        const cachedOrigin = cache.get(origin);
        if (cachedOrigin) {
            send(res, cachedOrigin.header, cachedOrigin.status, cachedOrigin.text);
        } else {
            const req = request.get(origin);
            if (process.env.HTTP_PROXY) req.proxy(process.env.HTTP_PROXY);
            req.end((e, r) => {
                const { header, status, text } = e ? e.response : r;
                const maxAge = header['cache-control'].match(/max-age=(\d+)/i);
                if (maxAge && !!maxAge.length) {
                    cache.set(origin, { header, status, text }, 1000 * parseInt(maxAge[1], 10));
                }
                send(res, header, status, text);
            });
        }
    }
}
