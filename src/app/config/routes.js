import loadPageContent from '../actions/loadPageContent';
import loadSearch from '../actions/loadSearch';
import pageNotFound from '../actions/pageNotFound';

import HomePage from '../containers/home';
import SectionPage from '../containers/section';
import SinglePage from '../containers/document';
import ErrorPage from '../components/page/error';
import LogiesPage from '../containers/logies';
import SearchPage from '../containers/search';

export default {
    home: {
        path: '/',
        method: 'get',
        handler: HomePage,
        action: loadPageContent
    },
    search: {
        path: '/search/:query',
        method: 'get',
        handler: SearchPage,
        action: loadSearch
    },
    logies: {
        path: LogiesPage.DEFAULT_PATH,
        method: 'get',
        handler: LogiesPage,
        action: loadPageContent
    },
    section: {
        path: '/:section',
        method: 'get',
        handler: SectionPage,
        action: loadPageContent
    },
    tags: {
        path: '/tags/:tag',
        method: 'get',
        handler: SectionPage,
        action: loadPageContent
    },
    subsection: {
        path: '/:section/:subsection',
        method: 'get',
        handler: SectionPage,
        action: loadPageContent
    },
    page: {
        path: '/:section/:subsection/:page',
        method: 'get',
        handler: SinglePage,
        action: loadPageContent
    },
    previewPage: {
        path: '/:preview(preview)/:section/:subsection/:page',
        method: 'get',
        handler: SinglePage,
        action: loadPageContent
    },
    all: {
        path: '/:all*',
        method: 'get',
        handler: ErrorPage,
        action: pageNotFound
    }
};
