import has from 'lodash/object/has';
import getEntity from '../api/entity';

export default async function listing(req, res, next) {
    try {
        const { page, section, subsection, path } = req.query;

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
                id: sectionData && sectionData.id,
                name: sectionData && sectionData.contentTitle,
                urlName: sectionData && sectionData.urlName
            },
            ...(subsectionData && {
                subsection: {
                    id: subsectionData && sectionData.id,
                    name: subsectionData && subsectionData.contentTitle,
                    urlName: subsectionData && subsectionData.urlName
                }
            })
        };

        next();
    } catch (error) {
        next(error);
    }
}
