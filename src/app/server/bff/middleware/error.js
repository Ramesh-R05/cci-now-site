import get from 'lodash/object/get';
import logger from '../../../../logger';
import parseModule from '../helper/parseModule';

// disable lint rule for unused next param as expressjs uses function parameters length to detect error middleware
// eslint-disable-next-line no-unused-vars
export default function errorMiddleware(err, req, res, next) {
    if (!err.status) {
        err.status = 500;
    }

    if (err.status !== 404) {
        logger.error(err);
    }

    const errorResponse = {
        error: err,
        footer: parseModule(get(req, 'data.footer', {}))
    };

    res.status(err.status).json(errorResponse);
}
