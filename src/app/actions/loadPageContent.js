export default function loadPageContent(context, payload) {
    const { url, navigate, query, params } = payload;
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
        pageNo: query.pageNo
    };
    return context.getService('page').read(args).then(
        content => context.dispatch('LOAD_CONTENT', { ...content, request: { payload } }),
        error => context.dispatch('LOAD_CONTENT_FAILED', error)
    );
}
