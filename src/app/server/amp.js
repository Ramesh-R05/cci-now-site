import { parse, splitParagraphs } from '@bxm/markdown';
import { formatDateCreated } from '@bxm/datetime';

let protocol = 'http';

function fixUrlProtocol(url) {
    if (!url) return null;

    const search = '://';
    const pos = url.indexOf(search);

    return `${protocol}${search}${pos > -1 ? url.substring(pos + search.length) : url}`;
}

// eslint-disable-next-line no-unused-vars
export default function (req, res, next) {
    req.app.set('views', `${__dirname}/amp`);
    req.app.set('view engine', 'pug');

    protocol = req.protocol;
    req.app.locals.splitParagraphs = splitParagraphs;
    req.app.locals.parse = parse;
    req.app.locals.formatDateCreated = formatDateCreated;
    req.app.locals.fixUrlProtocol = fixUrlProtocol;

    const nodeType = res.body.entity.nodeType;
    const maxAge = nodeType ? req.app.locals.config.cache[nodeType] : 180;
    res.header('Cache-Control', `public, max-age=${maxAge}`);

    res.render('index', { ...res.body, locals: req.app.locals });
}
