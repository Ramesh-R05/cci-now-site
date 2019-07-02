import makeRequest from '../../makeRequest';
import config from '../../../config';
import logger from '../../../../logger';

export default function getTags(title) {
    return makeRequest(`${config.services.remote.tag}/tags/${title}`)
        .then(res => res)
        .catch(err => {
            logger.error({ msg: 'getTags: tagData not found', err });

            return {};
        });
}
