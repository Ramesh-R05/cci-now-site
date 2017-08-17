import get from 'lodash/object/get';

export const initialState = {
    error: null,
    footer: {},
    nodeType: '',
    title: '',
    imageUrl: '',
    trendingItems: [],
    request: {}
};

export function reducer(state = initialState, payload = {}, eventName = '') {
    const actionType = eventName || payload.type || '';
    switch (actionType) {
    case 'LOAD_CONTENT': {
        const entity = payload.body.entity;
        const trendingItems = payload.body.trendingItems || [];
        const footer = payload.body.footer || {};
        const request = payload.request.payload || {};
        const subsections = payload.body.subsectionList;
        if (!entity) return state;
        return {
            ...state,
            ...{
                nodeType: entity.nodeType,
                title: entity.title,
                shortTitle: entity.shortTitle,
                summary: entity.summary,
                trendingItems,
                footer,
                imageUrl: entity.imageUrl,
                theme: payload.body.theme,
                request,
                subsections
            }
        };
    }
    case 'LOAD_CONTENT_FAILED': {
        const { response } = { ...payload };
        response.status = response.status || 400;
        return {
            ...state,
            ...{ error: response, footer: get(payload, 'response.body.footer', {}) }
        };
    }
    case 'PAGE_NOT_FOUND': {
        return {
            ...state,
            ...{ error: { ...payload } }
        };
    }
    default:
        return state;
    }
}
