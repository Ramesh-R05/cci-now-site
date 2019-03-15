import find from 'lodash/collection/find';
import get from 'lodash/object/get';
import { getLatestTeasers } from '../api/listing';
import { parseEntities } from '../helper/parseEntity';
import makeRequest from '../../makeRequest';
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
        const totalPageFloor = Math.floor(latestTeasersResp.totalCount / listCount);
        const totalPage = latestTeasersResp.totalCount % listCount ? totalPageFloor : totalPageFloor + 1;
        const err = new Error('Page not found');
        err.status = 404;

        if (totalPage < pageNo - 1) {
            throw err;
        }

        // TODO: need to handle `data` in resp better
        const latestTeasers = latestTeasersResp || {
            data: []
        };

        let previousPage = null;

        if (pageNo > 1) {
            const path = pageNo === 2 ? `${sectionQuery}` : `${sectionQuery}?pageNo=${pageNo - 1}`;
            previousPage = {
                path,
                url: `${req.app.locals.config.site.host}${path}`
            };
        }

        let nextPage = null;

        if (skip + latestTeasers.data.length < latestTeasers.totalCount) {
            const path = `${sectionQuery}?pageNo=${pageNo + 1}`;
            nextPage = {
                path,
                url: `${req.app.locals.config.site.host}${path}`
            };
        }

        const path = pageNo > 1 ? `${sectionQuery}?pageNo=${pageNo}` : `${sectionQuery}`;
        const currentPage = {
            path,
            url: `${req.app.locals.config.site.host}${path}`
        };

        req.data.latestTeasers = latestTeasers.data.slice(0, latestTeaserCount);
        req.data.list = {
            listName: section,
            params: {
                pageNo,
                section: teaserQuery,
                filter: teaserFilter,
                sectionFormatted: section
            },
            items: [parseEntities(latestTeasers.data.slice(latestTeaserCount))],
            previous: previousPage,
            current: currentPage,
            next: nextPage
        };

        next();
    } catch (error) {
        next(error);
    }
}
