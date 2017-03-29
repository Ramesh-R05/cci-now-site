import { load } from '@bxm/config';
import makeRequest from '../../makeRequest';
const config = load();

export default async function sitemap(req, res, next) {
    const section = req.params.section;
    const serviceUrl = config.services.remote.sitemap;
    const requestUrl = section ? `${serviceUrl}/${section}` : serviceUrl;

    try {
        const sitemaps = await makeRequest(requestUrl, false);
        res.header('Cache-Control', 'public, max-age=0');
        res.header('Content-Type', 'text/xml');
        res.send(sitemaps);
    } catch (err) {
        next(err);
    }
}
