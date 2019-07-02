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

        console.log('\n\n\n');
        console.log(req.query);
        console.log('\n\n\n');

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
