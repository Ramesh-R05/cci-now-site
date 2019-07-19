import has from 'lodash/object/has';
import APIUtils from '@bxm/api-utils';
import logger from '../../../../logger';

export default async function listing(req, res, next) {
    try {
        const { page, section, subsection, path } = req.query;
        const { config } = req.app.locals;

        const { getEntity } = new APIUtils(logger, config);

        if (has(req, 'data.entity') || !section || page) {
            next();

            return;
        }

        const listingData = await getEntity(`?url=${path}`);

        let entityData = { ...listingData };
        let sectionData = listingData;
        let subsectionData;

        if (subsection) {
            sectionData = await getEntity(`?url=/${section}`);

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
