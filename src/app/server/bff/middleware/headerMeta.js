import has from 'lodash/object/has';
import get from 'lodash/object/get';

export default function headerMeta(req, res, next) {
    const config = req.app.locals.config;
    const { hostname } = req.query || {};
    const env = process.env.APP_ENV || 'local';
    const isProdDomain = hostname === config.site.prodDomain;
    let robotsIndex = 'INDEX';
    let robotsFollow = 'FOLLOW';

    if (!isProdDomain || has(req, 'query.preview')) {
        robotsIndex = 'NOINDEX';
        robotsFollow = 'NOFOLLOW';
    }

    // Alter meta title and description on entity object
    if (has(req, 'data.entity')) {
        const entity = req.data.entity;
        const currentPageNo = get(req, 'data.list.params.pageNo');
        entity.pageTitle = (entity.pageTitle || entity.contentTitle) + (currentPageNo > 1 ? ` - Page ${currentPageNo}` : '');

        if (entity.pageMetaDescription) {
            entity.pageMetaDescription += currentPageNo > 1 ? ` - Page ${currentPageNo}` : '';
        } else {
            entity.pageMetaDescription = entity.contentSummary ? entity.contentSummary : entity.pageTitle;
        }
        // For future reference
        // https://bitbucket.org/bauermediaau/bauerdigital/src/5e59351b2544c5ce91bb20e0e4d99593076d074a/Lynx.Services.Common/Implementations/HeaderMetaService.cs?at=develop-v3.1&fileviewer=file-view-default#HeaderMetaService.cs-36
    }

    req.data = req.data || {};
    req.data.headerMetaData = {
        googleTagManagerEnvironment: env,
        googleTagManagerMasthead: config.gtm.masthead,
        robots: `${robotsIndex},${robotsFollow}`
    };

    const currentPageUrl = get(req, 'data.list.current.url');
    if (currentPageUrl) {
        req.data.entity.pageCanonicalUrl = currentPageUrl;
    }

    next();
}
