import {backendLogger as logger} from '@bxm/winston-logger';
import {parseModule} from '../helper/parseModule';
import get from 'lodash/object/get';

export default function error(err, req, res, next) {
    const status = err.status || 503;
    if (err.status !== 404) logger.log('error', err);

    const errorResponse = {
        error: err,
        footer: parseModule(get(req, 'data.footer', {}))
    };

    res.status(status).json(errorResponse);
}
