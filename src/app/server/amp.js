import { parse, splitParagraphs } from '@bxm/markdown';

// eslint-disable-next-line no-unused-vars
export default function (req, res, next) {
    req.app.set('views', `${__dirname}/amp`);
    req.app.set('view engine', 'pug');

    req.app.locals.splitParagraphs = splitParagraphs;
    req.app.locals.parse = parse;

    res.render('index', { ...req.data, locals: req.app.locals });
}
