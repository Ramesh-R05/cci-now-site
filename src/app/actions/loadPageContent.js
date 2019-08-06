import { validateRouteParams } from '@bxm/flux';
import pageService from '../services/page';

function loadPageContent(context, payload) {
    const { url, query, params } = payload;
    const routeStore = context.getStore('RouteStore');
    const navigate = routeStore.getCurrentNavigate();
    const pos = url.lastIndexOf('?');
    let path = pos > -1 ? url.substr(0, pos) : url;

    if (path.endsWith('/')) {
        path = path.substr(0, path.length - 1);
    }

    const args = {
        ...params,
        hostname: navigate.hostname,
        url,
        path,
        pageNo: query.pageNo,
        ...query
    };

    return pageService.read(args).then(
        content => {
            if (content instanceof Error) {
                context.dispatch('LOAD_CONTENT_FAILED', content);
            } else {
                context.dispatch('LOAD_CONTENT', { ...content, request: { payload } });
            }
        },
        error => context.dispatch('LOAD_CONTENT_FAILED', error)
    );
}

export default validateRouteParams(loadPageContent);
