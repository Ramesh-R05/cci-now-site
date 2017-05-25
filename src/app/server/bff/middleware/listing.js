import has from 'lodash/object/has';
import makeRequest from '../../makeRequest';

export default async function listing(req, res, next) {
    try {
        const { page, section } = req.query;
        if (has(req, 'data.entity') || !section || page) {
            next();
            return;
        }

        const listingData = await makeRequest(`${req.app.locals.config.services.remote.entity}/section/${section}`);

        req.data = req.data || {};
        req.data.entity = { ...listingData };
        req.data.section = {
            id: listingData.id,
            name: listingData.contentTitle,
            urlName: listingData.urlName
        }; // Initially used to set the ad slot within @bxm/ads + gtm in @bxm/server

        next();
    } catch (error) {
        next(error);
    }
}
