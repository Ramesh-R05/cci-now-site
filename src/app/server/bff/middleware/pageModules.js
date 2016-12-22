import { backendLogger as logger } from '@bxm/winston-logger';
import { getModules } from '../api/module';


export default async function pageModules(req, res, next) {
    try {
        req.data = {};
        req.data = await getModules('headernavigation', 'hamburgernavigation', 'footer', 'mustread');
    } catch(error) {
        logger.log('error', error);
    }

    next();
}
