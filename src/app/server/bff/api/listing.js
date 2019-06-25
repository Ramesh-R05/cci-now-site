import makeRequest from '../../makeRequest';
import config from '../../../config';
import logger from '../../../../logger';
const FEEDPATH = '/teasers';

const emptyResponse = {
    data: [],
    totalCount: 0
};

export function getLatestTeasers(top = 20, skip = 0, filter) {
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
}

export function getMoreGalleries(top = 10) {
    const query = `?$select=*&$filter=nodeTypeAlias eq %27Gallery%27&$orderby=pageDateCreated desc&$top=${top}`;

    return makeRequest(`${config.services.remote.listings}${FEEDPATH}/${query}`)
        .then(res => res)
        .catch(err => {
            logger.error({ msg: 'getMoreGalleries makeRequest catch', err });

            return emptyResponse;
        });
}
