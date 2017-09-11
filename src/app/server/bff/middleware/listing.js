import has from 'lodash/object/has';
import makeRequest from '../../makeRequest';

export default async function listing(req, res, next) {
    try {
        const { page, section, subsection, path } = req.query;
        if (has(req, 'data.entity') || !section || page) {
            next();
            return;
        }

        const listingData = await makeRequest(`${req.app.locals.config.services.remote.entity}/?url=${path}`);
        let entityData = { ...listingData };
        let sectionData = listingData;
        let subsectionData;

        if (subsection) {
            sectionData = await makeRequest(`${req.app.locals.config.services.remote.entity}/?url=/${section}`);
            subsectionData = listingData;
            entityData = { ...subsectionData };
        }

        req.data = req.data || {};
        req.data.entity = { ...entityData };
        req.data.section = {
            id: sectionData.id,
            name: sectionData.contentTitle,
            urlName: sectionData.urlName
        }; // Initially used to set the ad slot within @bxm/ads + gtm in @bxm/server

        if (subsectionData) {
            req.data.subsection = {
                id: subsectionData.id,
                name: subsectionData.contentTitle,
                urlName: subsectionData.urlName
            };
        }

        next();
    } catch (error) {
        next(error);
    }
}
