import page from './bff/middleware/page';
import home from './bff/middleware/home';
import article from './bff/middleware/article';
import gallery from './bff/middleware/gallery';
import responseBody from './bff/middleware/responseBody';
import render from './bff/middleware/render';
import error from './bff/middleware/error';
import pageModules from './bff/middleware/pageModules';
import listing from './bff/middleware/listing';
import section from './bff/middleware/section';
import tag from './bff/middleware/tag';
import headerMeta from './bff/middleware/headerMeta';
import sitemap from './bff/middleware/sitemap';
import list from './bff/middleware/list';
import stubServer from '../../automation/test_data/contentApi';
import { backendLogger as logger } from '@bxm/winston-logger';

export default function bff(server) {
    if (process.env.APP_STUBBED === 'true' ||
        process.env.APP_ENV === 'automation' ||
        process.env.NODE_ENV === 'stubbed' ||
        process.env.NODE_ENV === 'automation'
    ) {
        stubServer(server, server.locals.config);
        logger.warn('stubbing does not exercise BFF code');
    } else {
        server.get('/sitemap/:section?', sitemap, error);
        server.get(server.locals.config.services.endpoints.list, list, render, error);
        server.get(
            server.locals.config.services.endpoints.page,
            pageModules,
            home,
            listing,
            tag,
            section,
            page,
            article,
            gallery,
            headerMeta,
            responseBody,
            render,
            error
        );
    }
}
