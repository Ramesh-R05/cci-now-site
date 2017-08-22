import { parse, splitParagraphs } from '@bxm/markdown';
import { formatDateCreated } from '@bxm/datetime';

// eslint-disable-next-line no-unused-vars
export default function (req, res, next) {
    req.app.set('views', `${__dirname}/amp`);
    req.app.set('view engine', 'pug');

    req.app.locals.splitParagraphs = splitParagraphs;
    req.app.locals.parse = parse;
    req.app.locals.formatDateCreated = formatDateCreated;

    res.render('index', { ...res.body, locals: req.app.locals });
}
