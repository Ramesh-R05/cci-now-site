import { backendLogger as logger } from '@bxm/winston-logger';
import mergeWith from 'lodash.mergewith';

logger.info(`loading config for ${process.env.APP_KEY}`);

const environment = (process.env.APP_ENV || 'local').toLowerCase();
const region = (process.env.APP_REGION || 'au').toLowerCase();
const configApi = {
    get(path, defaultValue = '') {
        return path.split('.').reduce((prev, curr) => prev ? prev[curr] : undefined, this) || defaultValue;
    },
    isFeatureEnabled(feature) {
        return this.get(`features.${feature}.enabled`, false);
    }
};

const config = require('./config').default;
logger.info('main config loaded');

// eslint-disable-next-line import/no-dynamic-require
const environmentConfig = require(`./environments/${environment}`).default;
logger.info(`${environment} config loaded`);

let regionConfig = {};
let regionEnvironmentConfig = {};
if (region) {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    regionConfig = require(`./config.${region}.js`).default;
    logger.info(`${region} config loaded`);
    try {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        regionEnvironmentConfig = require(`./environments/${region}/${environment}`).default;
        logger.info(`${region} ${environment} region config loaded`);
    } catch (e) {
        logger.info(`${region} ${environment} region config not found`);
    }
}

const env = {
    APP_DEBUG: process.env.APP_DEBUG
};

export default mergeWith(
    env,
    configApi,
    config,
    environmentConfig,
    regionConfig,
    regionEnvironmentConfig,
    (objValue, srcValue) => Array.isArray(objValue) ? srcValue : undefined
);
