import { parse, splitParagraphs } from '@bxm/markdown';
import { formatDateCreated } from '@bxm/datetime';

// eslint-disable-next-line no-unused-vars
export default function (req, res, next) {
    req.app.set('views', `${__dirname}/amp`);
    req.app.set('view engine', 'pug');

    req.app.locals.splitParagraphs = splitParagraphs;
    req.app.locals.parse = parse;
    req.app.locals.formatDateCreated = formatDateCreated;

    const nodeType = res.body.entity.nodeType;
    let maxAge = nodeType ? req.app.locals.config.cache[nodeType]: 180;
    res.header('Cache-Control', `public, max-age=${maxAge}`);

    res.render('index', { ...res.body, locals: req.app.locals });
}
