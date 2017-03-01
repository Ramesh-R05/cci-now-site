import { backendLogger as logger } from '@bxm/winston-logger';
import getModules from '../api/module';


export default async function pageModules(req, res, next) {
    try {
        req.data = {};
        const section = (req.query && req.query.section) || 'home';
        req.data = await getModules(
            'headernavigation', 'hamburgernavigation', 'footer', 'mustread', 'promoted', 'hero', `${section}theme`
        );
    } catch (error) {
        logger.log('error', error);
    }

    next();
}
