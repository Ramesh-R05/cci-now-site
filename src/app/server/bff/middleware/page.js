import has from 'lodash/object/has';
import makeRequest from '../../makeRequest';
import getPageID from '../helper/getPageID';

export default async function pageMiddleware(req, res, next) {
    try {
        if (has(req, 'data.entity')) {
            next();

            return;
        }

        const query = 'page' in req.query ? req.query : req.params;
        const { page, preview, section, subsection } = query;
        const pageID = getPageID(page);

        if (!pageID) {
            throw {
                status: 404,
                message: 'Invalid page ID',
                section,
                page
            };
        }

        const saved = `?saved=${!!preview}`;
        const pageData = await makeRequest(`${req.app.locals.config.services.remote.entity}/${pageID}${saved}`)
            .then(data => data)
            .catch(() => ({}));

        const path = `/${section}/${subsection}/${page}`;

        if (!pageData.url || pageData.url !== path) {
            throw { status: 404, message: `Path ${path} does not match page` };
        }

        req.data = req.data || {};

        req.data = {
            ...req.data,
            entity: { ...pageData },
            section: {
                id: pageData.sectionId,
                name: section,
                urlName: section
            },
            subsection: { name: subsection, urlName: subsection }
        };

        next();
    } catch (error) {
        next(error);
    }
}
