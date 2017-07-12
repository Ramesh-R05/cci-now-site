import get from 'lodash/object/get';
import * as ActionTypes from '../actions';

export const initialState = {
    error: null,
    footer: {},
    nodeType: '',
    title: '',
    imageUrl: '',
    trendingItems: [],
    request: {}
};

function loadPage(state = initialState, action) {
    const actionType = action.type || '';
    switch (actionType) {
    case ActionTypes.LOAD_CONTENT: {
        const entity = action.body.entity;
        const trendingItems = action.body.trendingItems || [];
        const footer = action.body.footer || {};
        const request = action.request.action || {};
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
                theme: action.body.theme,
                request
            }
        };
    }
    case ActionTypes.LOAD_CONTENT_FAILED: {
        const { response } = { ...action };
        response.status = response.status || 400;
        return {
            ...state,
            ...{ error: response, footer: get(action, 'response.body.footer', {}) }
        };
    }
    case ActionTypes.PAGE_NOT_FOUND: {
        return {
            ...state,
            ...{ error: { ...action } }
        };
    }
    default:
        return state;
    }
}

export default loadPage;
