import makeRequest from '../../makeRequest';
import config from '../../../config';
import logger from '../../../../logger';

export default function getEntity(path, options = { throwOnFailedRequest: true }) {
    if (!path) {
        logger.error({ msg: 'getEntity: no path passed' });

        if (options.throwOnFailedRequest) {
            const error = new Error(`invalid args for function getEntity: path required`);
            error.status = 404;
            throw error;
        }

        return {};
    }

    return makeRequest(`${config.services.remote.entity}/${path}`)
        .then(res => res)
        .catch(err => {
            logger.error({ msg: 'getEntity: makeRequest error', err });

            if (options.throwOnFailedRequest) {
                const error = new Error(`entity not found for path: ${path}`);
                error.status = 404;

                throw error;
            }

            return {};
        });
}
