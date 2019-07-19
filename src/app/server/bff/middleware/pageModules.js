import APIUtils from '@bxm/api-utils';
import find from 'lodash/collection/find';
import get from 'lodash/object/get';
import logger from '../../../../logger';

function processModules(moduleArgs, modules) {
    const moduleList = {};

    const brandHeroModule =
        get(modules, 'data', []).filter(module => get(module, 'moduleName').indexOf('hero') >= 0 && module.moduleName.length > 4)[0] || {};

    moduleArgs.forEach(arg => {
        const moduleConfig = find(modules.data, { moduleName: arg });

        if (arg === 'footer') {
            moduleList[arg] = moduleConfig || {};
        } else if (arg === 'promoted') {
            moduleList[arg] = {};
            moduleList[arg].items = get(moduleConfig, 'moduleManualContent.data', []);
            moduleList[arg].title = get(moduleConfig, 'moduleTitle', '');
        } else if (arg && arg.indexOf('theme') >= 0) {
            moduleList.theme = moduleConfig;
        } else if (arg === 'hero') {
            moduleList[arg] =
                get(brandHeroModule, 'moduleManualContent.data', []).length > 0
                    ? Object.assign({}, brandHeroModule.moduleManualContent.data[0], { isBrandHero: true })
                    : get(moduleConfig, 'moduleManualContent.data[0]', null);
        } else {
            moduleList[arg] = get(moduleConfig, 'moduleManualContent.data', []);
        }
    });

    return moduleList;
}

export default async function pageModules(req, res, next) {
    try {
        const section = (req.query && req.query.section) || 'home';
        const { config } = req.app.locals;
        const { getModules } = new APIUtils(logger, config);

        req.data = await getModules(
            ['headernavigation', 'hamburgernavigation', 'footer', 'mustread', 'promoted', 'hero', `${section}hero`, `${section}theme`],
            processModules
        );

        next();
    } catch (error) {
        next(error);
    }
}
