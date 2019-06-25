import has from 'lodash/object/has';
import makeRequest from '../../makeRequest';
import logger from '../../../../logger';

export default async function listing(req, res, next) {
    try {
        const { page, section, subsection, path } = req.query;

        if (has(req, 'data.entity') || !section || page) {
            next();

            return;
        }

        const listingData = await makeRequest(`${req.app.locals.config.services.remote.entity}/?url=${path}`)
            .then(data => data)
            .catch(e => {
                const error = new Error(`entity not found for path: ${path}`);
                error.status = 404;
                logger.error({ msg: 'listing middleware: entity not found', e });

                throw error;
            });

        let entityData = { ...listingData };
        let sectionData = listingData;
        let subsectionData;

        if (subsection) {
            sectionData = await makeRequest(`${req.app.locals.config.services.remote.entity}/?url=/${section}`)
                .then(data => data)
                .catch(e => {
                    const error = new Error(`entity not found for section: ${section}`);
                    error.status = 404;

                    logger.error({ msg: 'listing middleware: entity not found', e });

                    throw error;
                });

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
