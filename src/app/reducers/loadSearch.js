import get from 'lodash/object/get';

export const initialState = {
    error: null,
    footer: {},
    title: '',
    magazineImageUrl: '',
    magCover: {
        moduleImageUrl: ''
    },
    headerMetaData: {
        title: ''
    },
    comScoreSegmentIds: '',
    search: {
        total: 0,
        initialResults: [],
        resultsList: []
    },
    list: {
        items: []
    },
    latestTeasers: [],
    theme: {}
};

export function reducer(state = initialState, payload = {}, eventName = '') {
    const actionType = eventName || payload.type || '';

    switch (actionType) {

    case 'LOAD_SEARCH': {
        const search = payload.body.search;
        const footer = payload.body.footer || {};
        if (!search || !search.total) return state;

        return {
            error: null,
            title: get(payload, 'body.headerMetaData.title', initialState.title),
            footer,
            magazineImageUrl: get(payload, 'body.magCover.moduleImageUrl', initialState.magazineImageUrl),
            theme: payload.body.theme,
            magCover: payload.body.magCover,
            latestTeasers: payload.body.list.params.pageNo === 1 ? payload.body.latestTeasers : state.latestTeasers,
            list: {
                ...payload.body.list,
                items: [
                    ...state.list.items,
                    ...payload.body.list.items
                ]
            },
            search: {
                total: search.total,
                initialResults: payload.body.latestTeasers,
                resultsList: payload.body.list
            }
        };
    }

    case 'LOAD_SEARCH_FAILED': {
        const { response = {} } = payload;
        const { body = {} } = response;
        const footer = body.footer || {};
        const magCover = body.magCover || {};

        response.status = response.status || 400;

        return {
            error: response,
            title: '',
            footer,
            magazineImageUrl: '',
            theme: {},
            magCover,
            list: {
                items: []
            },
            latestTeasers: [],
            search: {
                total: 0,
                initialResults: [],
                resultsList: []
            }
        };
    }

    default:
        return state;
    }
}
