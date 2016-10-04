import makeRequest from '../../makeRequest';
import {load} from '@bxm/config';
const config = load();

export function getTrending(top = 5) {
    let query = `&n=${top}&format=json`;
    return makeRequest(`${config.services.remote.trending}${query}`).then((res) => {
        return res;
    }).catch((err) => {
        console.error('[server][api][section]getTrending=>', err);
        return [];
    });
}
