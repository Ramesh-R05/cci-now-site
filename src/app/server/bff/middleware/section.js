import find from 'lodash/collection/find';
import get from 'lodash/object/get';
import { getLatestTeasers } from '../api/listing';
import makeRequest from '../../makeRequest';
import createReapeatableList from '../helper/createReapeatableList';

const latestTeaserCountForBrand = 6;
const latestTeaserCountDefault = 7;
let latestTeaserCount = latestTeaserCountDefault;
const listCount = 14;

export default async function sectionMiddleware(req, res, next) {
    try {
        let pageNo = 1;
        const { page, section, subsection } = req.query;
        pageNo = parseInt(req.query.pageNo || pageNo, 10);

        const nodeTypeAlias = get(req, 'data.entity.nodeTypeAlias', '');

        if ((nodeTypeAlias !== 'Section' && nodeTypeAlias !== 'Subsection' && nodeTypeAlias !== 'Brand') || !section || page) {
            next();

            return;
        }

        let listingQuery;
        let teaserQuery;
        let teaserFilter;
        let sectionQuery;

        if (nodeTypeAlias === 'Section' || nodeTypeAlias === 'Subsection') {
            latestTeaserCount = latestTeaserCountDefault;
            teaserQuery = `/${section}${subsection ? `/${subsection}` : ''}`;
            sectionQuery = `/${section}${subsection ? `/${subsection}` : ''}`;
            teaserFilter = 'parentUrl';
            listingQuery = `${teaserFilter} eq %27${teaserQuery}%27`;
            req.data.subsectionList = await makeRequest(`${req.app.locals.config.services.remote.module}/sections/${section}`);
        }

        if (nodeTypeAlias === 'Brand') {
            latestTeaserCount = latestTeaserCountForBrand;
            const source = get(req, 'data.entity.source', '');
            const adBrand = find(req.app.locals.config.brands.site, b => b.title === source);
            req.data.entity.adBrand = get(adBrand, 'id', 'ntl');
            sectionQuery = `/${section}`;
            teaserQuery = source.replace(/'/g, "''");
            teaserFilter = 'source';
            listingQuery = `${teaserFilter} eq %27${teaserQuery}%27 and nodeTypeAlias ne %27Brand%27`;
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
