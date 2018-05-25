import page from './bff/middleware/page';
import home from './bff/middleware/home';
import article from './bff/middleware/article';
import gallery from './bff/middleware/gallery';
import responseBody from './bff/middleware/responseBody';
import https from './bff/middleware/https';
import render from './bff/middleware/render';
import error from './bff/middleware/error';
import pageModules from './bff/middleware/pageModules';
import listing from './bff/middleware/listing';
import section from './bff/middleware/section';
import tag from './bff/middleware/tag';
import headerMeta from './bff/middleware/headerMeta';
import sitemap from './bff/middleware/sitemap';
import list from './bff/middleware/list';
import amp from '@bxm/server/lib/middleware/amp';
import stubServer from '../../automation/test_data/contentApi';
import logger from '../../logger';
import assetProxy from './bff/middleware/assetProxy';
import comScore from './bff/middleware/comScore';
import search from './bff/middleware/search';

// only use comscore in deployed infra environment because local network blocks the port used for the comscore api
const useComScore = ['sit', 'prod'].includes(process.env.APP_ENV);

export default function bff(server) {
    server.get('/api/asset', assetProxy);
    if (process.env.APP_STUBBED === 'true') {
        stubServer(server, server.locals.config);
        logger.warn('stubbing does not exercise BFF code');
    } else {
        server.get(
            '(/:preview(preview))?/amp/:section/:subsection/:page',
            pageModules, section, page, article, gallery, headerMeta, responseBody, amp
        );
        server.get('/sitemap/:section?', sitemap, error);
        server.get(server.locals.config.services.endpoints.list, list, https, render, error);
        server.get(
            server.locals.config.services.endpoints.page,
            pageModules,
            useComScore ? comScore : (req, res, next) => next(),
            home,
            listing,
            tag,
            section,
            page,
            article,
            gallery,
            headerMeta,
            https,
            responseBody,
            render,
            error
        );
        server.get(
            server.locals.config.services.endpoints.search,
            pageModules,
            headerMeta,
            search,
            https,
            render,
            error
        );
    }
}
