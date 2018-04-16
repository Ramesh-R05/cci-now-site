import logger from '../../../../logger';
import getModules from '../api/module';


export default async function pageModules(req, res, next) {
    try {
        req.data = {};
        const section = (req.query && req.query.section) || 'home';
        req.data = await getModules(
            'headernavigation', 'hamburgernavigation', 'footer', 'mustread', 'promoted', 'hero', `${section}hero`, `${section}theme`
        );
    } catch (error) {
        logger.error(error);
    }

    next();
}
