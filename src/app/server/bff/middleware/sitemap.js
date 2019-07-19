import APIUtils from '@bxm/api-utils';
import logger from '../../../../logger';

export default async function sitemap(req, res, next) {
    try {
        const section = req.params.section;
        const { config } = req.app.locals;
        const { getSitemap } = new APIUtils(logger, config);

        const sitemaps = await getSitemap(section);

        res.header('Cache-Control', 'public, max-age=0');
        res.header('Content-Type', 'text/xml');
        res.send(sitemaps);
    } catch (err) {
        next(err);
    }
}
