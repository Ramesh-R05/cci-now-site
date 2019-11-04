import get from 'lodash/object/get';
import find from 'lodash/collection/find';
import getTagName from '@bxm/tags/lib/utils/getTagName';
import APIUtils from '@bxm/api-utils';
import logger from '../../../../logger';
import createReapeatableList from '../helper/createReapeatableList';
import createListingQuery from '../helper/createListingQuery';

const latestTeaserCount = 7;
const listCount = 14;

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default async function tagMiddleware(req, res, next) {
    try {
        let pageNo = 1;
        const query = req.query;
        const { config } = req.app.locals;
        pageNo = parseInt(query.pageNo || pageNo, 10);
        const tag = query ? query.tag || query.section : null;
        const entity = get(req, 'data.entity');
        const tagsDetails = get(req, 'data.entity.tagsDetails', []);
        const { excludeTagQuery } = req.data;

        if (!tag || query.page || (entity && entity.nodeTypeAlias !== 'TagSection')) {
            next();

            return;
        }

        let title = tag
            .split('-')
            .map(capitalize)
            .join(' ');

        const { getEntity, getTags, getLatestTeasers } = new APIUtils(logger, config);

        // TODO(thatzi): I don't like this. Need a better way to handle tag pages, tag data and tag canonicals
        // Check the current entity url if it is a /:section page. If this is a /tags/:tag page, then this won't exist.
        // If the latter, we need to query the entity service, passing the tag to check if a tag route has been defined
        // as a TagSection node type to have a tag url without '/tags' so to correctly define the canonical url
        const url =
            get(req, 'data.entity.url') ||
            (await getEntity(`section/${tag}`)
                .then(listingData => {
                    const defaultTagUrl = `/tags/${tag}`;

                    return listingData.nodeTypeAlias !== 'TagSection' ? defaultTagUrl : listingData.url || defaultTagUrl;
                })
                .catch(() => `/tags/${tag}`));

        const tagData = await getTags(title)
            .then(({ data }) => {
                if (!data.length) {
                    return {};
                }

                return (
                    find(data, tagObj => {
                        const tagName = getTagName(tagObj.tag.name);

                        if (tagName.toLowerCase() === title.toLowerCase()) {
                            title = tagName; // Override tagName with one received from service

                            return true;
                        }

                        return false;
                    }) || {}
                );
            })
            .catch(() => ({}));

        const skip = (pageNo - 1) * listCount;
        const loweredCaseTag = tag.toLowerCase().replace('%20', '-');

        const tagListingQuery = tagsDetails.length
            ? createListingQuery(tagsDetails.map(singleTag => singleTag.fullName), { operator: 'eq' })
            : `tagsDetails/urlName eq %27${loweredCaseTag}%27`;

        const listingQuery = excludeTagQuery ? `${tagListingQuery} and ${excludeTagQuery}` : tagListingQuery;
        const latestTeasersResp = await getLatestTeasers(listCount, skip, listingQuery);

        // TODO: need to handle `data` in resp better
        const latestTeasers = latestTeasersResp && latestTeasersResp.data;
        const totalCount = latestTeasersResp.totalCount;

        const basePath = query.section ? `/${tag}` : `/tags/${tag}`;

        const list = createReapeatableList({
            basePath,
            host: req.app.locals.config.site.host,
            listName: title,
            additionalParams: {
                section: title,
                filter: 'contentTags',
                tagSectionQuery: listingQuery
            },
            items: latestTeasers,
            pageNo,
            startFrom: latestTeaserCount,
            skip,
            totalCount
        });

        req.data = {
            ...req.data,
            entity: {
                id: get(req, 'data.entity.id'),
                nodeTypeAlias: 'TagSection',
                contentTitle: title,
                url,
                pageTitle: tagData.title || title,
                pageMetaDescription: tagData.description || ''
            },
            latestTeasers: latestTeasers.slice(0, latestTeaserCount),
            list,
            section: { id: get(req, 'data.entity.id'), name: 'Tag', urlName: 'tag' }
        };

        next();
    } catch (error) {
        next(error);
    }
}
