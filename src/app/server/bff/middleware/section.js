import APIUtils from '@bxm/api-utils';
import find from 'lodash/collection/find';
import get from 'lodash/object/get';
import logger from '../../../../logger';
import createReapeatableList from '../helper/createReapeatableList';
import createListingQuery from '../helper/createListingQuery';

const latestTeaserCountForBrand = 6;
const latestTeaserCountDefault = 7;
let latestTeaserCount = latestTeaserCountDefault;
const listCount = 14;

export default async function sectionMiddleware(req, res, next) {
    try {
        let pageNo = 1;
        const { page, section, subsection } = req.query;
        const { config } = req.app.locals;
        const { commercialTagSections, excludeTagQuery } = req.data;

        pageNo = parseInt(req.query.pageNo || pageNo, 10);

        const nodeTypeAlias = get(req, 'data.entity.nodeTypeAlias', '');
        const id = get(req, 'data.entity.id', '');

        if (
            (nodeTypeAlias !== 'Section' &&
                nodeTypeAlias !== 'Subsection' &&
                nodeTypeAlias !== 'Brand' &&
                nodeTypeAlias !== 'CommercialTagSection') ||
            !section ||
            page
        ) {
            next();

            return;
        }

        let listingQuery;
        let teaserQuery;
        let teaserFilter;
        let sectionQuery;

        const { getLatestTeasers, getModules } = new APIUtils(logger, config);

        if (nodeTypeAlias === 'CommercialTagSection') {
            const currentCommercialTagSection = commercialTagSections.find(tag => tag.id === id);
            const isEmptyTagsDetails =
                !currentCommercialTagSection ||
                !Array.isArray(currentCommercialTagSection.tagsDetails) ||
                !currentCommercialTagSection.tagsDetails.length;

            if (!currentCommercialTagSection || isEmptyTagsDetails) {
                req.data.latestTeasers = [];
                next();

                return;
            }

            const commercialTagFullNames = currentCommercialTagSection.tagsDetails.map(tag => tag.fullName);

            teaserQuery = `/${section}${subsection ? `/${subsection}` : ''}`;
            sectionQuery = `/${section}${subsection ? `/${subsection}` : ''}`;
            listingQuery = createListingQuery(commercialTagFullNames, { operator: 'eq' });
        }

        if (nodeTypeAlias === 'Section' || nodeTypeAlias === 'Subsection') {
            latestTeaserCount = latestTeaserCountDefault;
            teaserQuery = `/${section}${subsection ? `/${subsection}` : ''}`;
            sectionQuery = `/${section}${subsection ? `/${subsection}` : ''}`;
            teaserFilter = 'parentUrl';
            const sectionListingQuery = `${teaserFilter} eq %27${teaserQuery}%27`;
            listingQuery = excludeTagQuery ? `${sectionListingQuery} and ${excludeTagQuery}` : sectionListingQuery;
            req.data.subsectionList = await getModules([`sections/${section}`]);
        }

        if (nodeTypeAlias === 'Brand') {
            latestTeaserCount = latestTeaserCountForBrand;
            const source = get(req, 'data.entity.source', '');
            const adBrand = find(req.app.locals.config.brands.site, b => b.title === source);
            req.data.entity.adBrand = get(adBrand, 'id', 'ntl');
            sectionQuery = `/${section}`;
            teaserQuery = source.replace(/'/g, "''");
            teaserFilter = 'source';
            const brandListingQuery = `${teaserFilter} eq %27${teaserQuery}%27 and nodeTypeAlias ne %27Brand%27`;
            listingQuery = excludeTagQuery ? `${brandListingQuery} and ${excludeTagQuery}` : brandListingQuery;
        }

        const skip = (pageNo - 1) * listCount;

        const latestTeasersResp = await getLatestTeasers(listCount, skip, listingQuery);

        const latestTeasers = latestTeasersResp && latestTeasersResp.data;
        const totalCount = latestTeasersResp.totalCount;

        const totalPageFloor = Math.floor(totalCount / listCount);
        const totalPage = totalCount % listCount ? totalPageFloor : totalPageFloor + 1;
        const err = new Error('Page not found');
        err.status = 404;

        if (totalPage < pageNo - 1) {
            throw err;
        }

        const list = createReapeatableList({
            host: config.site.host,
            listName: section,
            basePath: sectionQuery,
            pageNo,
            skip,
            items: latestTeasers,
            totalCount,
            startFrom: latestTeaserCount,
            additionalParams: {
                section: teaserQuery,
                filter: teaserFilter,
                sectionFormatted: section
            }
        });

        req.data = {
            ...req.data,
            latestTeasers: latestTeasers.slice(0, latestTeaserCount),
            list
        };

        next();
    } catch (error) {
        next(error);
    }
}
