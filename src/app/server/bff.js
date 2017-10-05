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
import rss from './rss';
import rssInfo from './rss/info';
import stubServer from '../../automation/test_data/contentApi';
import logger from '../../logger';

export default function bff(server) {
    if (process.env.APP_STUBBED === 'true') {
        stubServer(server, server.locals.config);
        logger.warn('stubbing does not exercise BFF code');
    } else {
        server.get('/rss/info', rssInfo);
        server.get('/rss/summary/:section?', rss);
        server.get('/rss/:section?', rss);
        server.get('/amp/:section/:subsection/:page', pageModules, section, page, article, gallery, headerMeta, responseBody, amp);
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
            https,
            responseBody,
            render,
            error
        );
    }
}
