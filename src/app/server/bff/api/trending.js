import makeRequest from '../../makeRequest';
import config from '../../../config';

export default function getTrending(top = 5) {
    const query = `&n=${top}&format=json`;
    return makeRequest(`${config.services.remote.trending}${query}`).then(res => res).catch(() => []);
}
