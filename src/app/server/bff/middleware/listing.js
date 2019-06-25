import has from 'lodash/object/has';
import makeRequest from '../../makeRequest';

export default async function listing(req, res, next) {
    try {
        const { page, section, subsection, path } = req.query;

        if (has(req, 'data.entity') || !section || page) {
            next();

            return;
        }

        const listingData = await makeRequest(`${req.app.locals.config.services.remote.entity}/?url=${path}`)
            .then(data => data)
            .catch(() => ({}));

        let entityData = { ...listingData };
        let sectionData = listingData;
        let subsectionData;

        if (subsection) {
            sectionData = await makeRequest(`${req.app.locals.config.services.remote.entity}/?url=/${section}`)
                .then(data => data)
                .catch(() => ({}));

            subsectionData = listingData;
            entityData = { ...subsectionData };
        }

        req.data = {
            ...req.data,
            entity: { ...entityData },
            section: {
                id: sectionData.id,
                name: sectionData.contentTitle,
                urlName: sectionData.urlName
            },
            ...(subsectionData && {
                subsection: {
                    id: subsectionData.id,
                    name: subsectionData.contentTitle,
                    urlName: subsectionData.urlName
                }
            })
        };

        next();
    } catch (error) {
        next(error);
    }
}
