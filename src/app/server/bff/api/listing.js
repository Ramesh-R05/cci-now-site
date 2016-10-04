import makeRequest from '../../makeRequest';
import {load} from '@bxm/config';
import {backendLogger as logger} from '@bxm/winston-logger';
const config = load();
const FEEDPATH = '/teasers';

export function getLatestTeasers(top = 20, skip = 0, section = 'all', filter = 'path') {
    if (!section) return Promise.resolve([]);

    let query = '?$select=*';

    if (section !== 'all') {
        query += `&$filter=${filter} eq %27${section}%27`;
    }

    query += `&$orderby=pageDateCreated desc&$top=${top}&$skip=${skip}`;
    return makeRequest(`${config.services.remote.listings}${FEEDPATH}/${query}`).then((res) => {
        return res;
    }).catch((err) => {
        logger.log('error', err);
        return [];
    });
}

export function getMoreGalleries(top = 10) {
    let query = `?$select=*&$filter=nodeTypeAlias eq %27Gallery%27&$orderby=pageDateCreated desc&$top=${top}`;
    return makeRequest(`${config.services.remote.listings}${FEEDPATH}/${query}`).then((res) => {
        return res;
    }).catch((err) => {
        console.error('[server][api][section]getMoreGalleries=>', err);
        return [];
    });
}
