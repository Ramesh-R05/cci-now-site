import amp from '@bxm/server/lib/middleware/amp';
import assetProxy from '@bxm/server/lib/middleware/assetProxy';
import emailLinkTracking from '@bxm/server/lib/middleware/emailLinkTracking';
import stubServer from '../../automation/test_data/contentApi';
import logger from '../../logger';
import article from './bff/middleware/article';
import comScore from './bff/middleware/comScore';
import createRequestData from './bff/middleware/createRequestData';
import error from './bff/middleware/error';
import gallery from './bff/middleware/gallery';
import headerMeta from './bff/middleware/headerMeta';
import home from './bff/middleware/home';
import https from './bff/middleware/https';
import list from './bff/middleware/list';
import listing from './bff/middleware/listing';
import page from './bff/middleware/page';
import pageModules from './bff/middleware/pageModules';
import render from './bff/middleware/render';
import responseBody from './bff/middleware/responseBody';
import search from './bff/middleware/search';
import section from './bff/middleware/section';
import siteAlert from './bff/middleware/siteAlert';
import sitemap from './bff/middleware/sitemap';
import tag from './bff/middleware/tag';
import separateTagSections from './bff/middleware/separateTagSections';

export default function bff(server) {
    server.get('/api/asset', assetProxy);

    if (process.env.APP_STUBBED === 'true') {
        stubServer(server, server.locals.config);
        logger.warn('stubbing does not exercise BFF code');
    } else {
        server.get(
            '(/:preview(preview))?/amp/:section/:subsection/:page',
            createRequestData,
            separateTagSections,
            pageModules,
            section,
            page,
            article,
            gallery,
            headerMeta,
            responseBody,
            amp
        );
        server.get('/sitemap/:section?', sitemap, error);
        server.get(server.locals.config.services.endpoints.list, separateTagSections, list, https, render, error);
        server.get(
            server.locals.config.services.endpoints.page,
            createRequestData,
            separateTagSections,
            emailLinkTracking,
            pageModules,
            siteAlert,
            comScore,
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
        server.get(server.locals.config.services.endpoints.search, pageModules, comScore, headerMeta, search, https, render, error);
    }
}
