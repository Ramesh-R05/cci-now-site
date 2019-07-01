import get from 'lodash/object/get';
import find from 'lodash/collection/find';
import makeRequest from '../../makeRequest';
import config from '../../../config';
import logger from '../../../../logger';
import { getModulesStub, getModuleStub } from '../../../../automation/test_data/api/moduleStub';

const { getModules, getModule } = (() => {
    if (process.env.APP_STUBBED === 'true') {
        return {
            getModules: getModulesStub,
            getModule: getModuleStub
        };
    }

    return {
        async getModules(...args) {
            try {
                if (!args.length) {
                    return {};
                }

                const moduleNames = args.join(',');
                const modules = await makeRequest(`${config.services.remote.module}/${moduleNames}`);
                const moduleList = {};

                const brandHeroModule =
                    get(modules, 'data', []).filter(module => get(module, 'moduleName').indexOf('hero') >= 0 && module.moduleName.length > 4)[0] ||
                    {};

                args.forEach(arg => {
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
            } catch (error) {
                logger.error(error);

                return {};
            }
        },
        getModule(modulePath) {
            return makeRequest(`${config.services.remote.module}/${modulePath}`)
                .then(res => res)
                .catch(err => {
                    logger.error({ msg: 'getModules: makeRequest error', err });

                    return {
                        data: [],
                        totalCount: 0
                    };
                });
        }
    };
})();

export default getModules;
export { getModule };
