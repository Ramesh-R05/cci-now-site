function pageNotFound(context, payload) {
    const err = new Error('Page not found');
    err.status = 404;
    err.payload = payload;

    return context.dispatch('PAGE_NOT_FOUND', err);
}

export default pageNotFound;
