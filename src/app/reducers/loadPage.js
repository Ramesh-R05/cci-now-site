import get from 'lodash/object/get';

export const initialState = {
    error: null,
    footer: {},
    nodeType: '',
    title: '',
    imageUrl: '',
    trendingItems: []
};

export function reducer(state = initialState, payload = {}, eventName = '') {
    const actionType = eventName || payload.type || '';
    switch (actionType) {
    case 'LOAD_CONTENT': {
        const entity = payload.body.entity;
        const trendingItems = payload.body.trendingItems || [];
        const footer = payload.body.footer || {};
        const request = payload.request.payload;
        if (!entity) return state;
        return {
            error: null,
            nodeType: entity.nodeType,
            title: entity.title,
            shortTitle: entity.shortTitle,
            summary: entity.summary,
            trendingItems,
            footer,
            imageUrl: entity.imageUrl,
            theme: payload.body.theme,
            request
        };
    }
    case 'LOAD_CONTENT_FAILED': {
        const { response } = payload;
        response.status = response.status || 400;
        return {
            error: response,
            nodeType: '',
            title: '',
            trendingItems: [],
            footer: get(payload, 'response.body.footer', {}),
            imageUrl: ''
        };
    }
    default:
        return state;
    }
}
