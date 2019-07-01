import { getLatestTeasersStub, getMoreGalleriesStub } from '../../../../automation/test_data/api/listingStub';
import logger from '../../../../logger';
import config from '../../../config';
import makeRequest from '../../makeRequest';
const FEEDPATH = '/teasers';

const emptyResponse = {
    data: [],
    totalCount: 0
};

const { getLatestTeasers, getMoreGalleries } = (() => {
    if (process.env.APP_STUBBED === 'true') {
        return {
            getLatestTeasers: getLatestTeasersStub,
            getMoreGalleries: getMoreGalleriesStub
        };
    }

    return {
        getLatestTeasers(top = 20, skip = 0, filter) {
            let query = '?$select=*';

            if (filter) {
                query += `&$filter=${filter}`;
            }

            query += `&$orderby=pageDateCreated desc&$top=${top}&$skip=${skip}`;

            return makeRequest(`${config.services.remote.listings}${FEEDPATH}/${query}`)
                .then(res => res)
                .catch(err => {
                    logger.error({ msg: 'getLatestTeasers makeRequest catch', err });

                    return emptyResponse;
                });
        },
        getMoreGalleries(top = 10) {
            const query = `?$select=*&$filter=nodeTypeAlias eq %27Gallery%27&$orderby=pageDateCreated desc&$top=${top}`;

            return makeRequest(`${config.services.remote.listings}${FEEDPATH}/${query}`)
                .then(res => res)
                .catch(err => {
                    logger.error({ msg: 'getMoreGalleries makeRequest catch', err });

                    return emptyResponse;
                });
        }
    };
})();

export { getLatestTeasers, getMoreGalleries };
