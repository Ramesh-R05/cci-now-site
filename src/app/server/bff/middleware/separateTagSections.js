import APIUtils from '@bxm/api-utils';
import logger from '../../../../logger';
import createListingQuery from '../helper/createListingQuery';

export default async function separateTagSections(req, res, next) {
    try {
        const { config } = req.app.locals;

        const API = new APIUtils(logger, config);
        const allTagSections = await API.getEntity('alltagsections').catch(() => []);

        if (!allTagSections || !Array.isArray(allTagSections) || !allTagSections.length) {
            next();

            return;
        }

        const commercialTagSections = allTagSections.filter(tag => tag.nodeTypeAlias === 'CommercialTagSection');
        const tagSections = allTagSections.filter(tag => tag.nodeTypeAlias === 'TagSection');

        const tagsToExclude = commercialTagSections.reduce((fullNameList, currentTag) => {
            const newFullNames = (Array.isArray(currentTag.tagsDetails) && currentTag.tagsDetails.length ? currentTag.tagsDetails : []).map(
                tag => tag.fullName
            );

            return [...fullNameList, ...newFullNames];
        }, []);

        const excludeTagQuery = createListingQuery(tagsToExclude, { operator: 'ne' });

        req.data = {
            ...req.data,
            tagSections,
            commercialTagSections,
            excludeTagQuery
        };

        next();
    } catch (error) {
        next(error);
    }
}
