import makeRequest from '../../makeRequest';
import config from '../../../config';
import logger from '../../../../logger';
const FEEDPATH = '/teasers';

export function getLatestTeasers(top = 20, skip = 0, filter) {
    let query = '?$select=*';
    if (filter) {
        query += `&$filter=${filter}`;
    }

    query += `&$orderby=pageDateCreated desc&$top=${top}&$skip=${skip}`;
    return makeRequest(`${config.services.remote.listings}${FEEDPATH}/${query}`)
        .then(res => res)
        .catch(err => {
            logger.error(err);
            return [];
        });
}

export function getMoreGalleries(top = 10) {
    const query = `?$select=*&$filter=nodeTypeAlias eq %27Gallery%27&$orderby=pageDateCreated desc&$top=${top}`;
    return makeRequest(`${config.services.remote.listings}${FEEDPATH}/${query}`)
        .then(res => res)
        .catch(() => []);
}
