import get from 'lodash/object/get';

export const initialState = {
    error: null,
    footer: {},
    nodeType: '',
    title: '',
    imageUrl: '',
    request: {},
    comScoreSegmentIds: ''
};

export function reducer(state = initialState, payload = {}, eventName = '') {
    const actionType = eventName || payload.type || '';
    switch (actionType) {
    case 'LOAD_CONTENT': {
        const entity = payload.body.entity;
        const footer = payload.body.footer || {};
        const request = payload.request.payload || {};
        const subsections = payload.body.subsectionList;
        const comScoreSegmentIds = payload.body.comScoreSegmentIds;
        if (!entity) return state;
        return {
            ...state,
            ...{
                nodeType: entity.nodeType,
                title: entity.title,
                shortTitle: entity.shortTitle,
                summary: entity.summary,
                footer,
                imageUrl: entity.imageUrl,
                theme: payload.body.theme,
                request,
                subsections,
                comScoreSegmentIds
            }
        };
    }
    case 'LOAD_CONTENT_FAILED': {
        const { response } = { ...payload };
        response.status = response.status || 400;
        return {
            ...state,
            ...{
                error: response,
                footer: get(payload, 'response.body.footer', {}),
                comScoreSegmentIds: initialState.comScoreSegmentIds
            }
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
