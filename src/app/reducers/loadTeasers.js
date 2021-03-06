export const initialState = {
    heroTeaser: null,
    latestTeasers: [],
    mustRead: [],
    promoted: { title: '', items: [] },
    list: {}
};

export function reducer(state = initialState, payload = { body: {} }, eventName = '') {
    const actionType = eventName || payload.type || '';

    switch (actionType) {
        case 'LOAD_CONTENT': {
            const { heroTeaser = null, latestTeasers = [], list = {}, mustRead = [], promoted = { title: '', items: [] } } = payload.body;

            return {
                heroTeaser,
                latestTeasers,
                mustRead,
                promoted,
                list
            };
        }

        case 'LOAD_CONTENT_FAILED': {
            return {
                heroTeaser: null,
                latestTeasers: [],
                mustRead: [],
                promoted: { title: '', items: [] },
                list: {}
            };
        }

        case 'LOAD_LIST': {
            return {
                ...state,
                list: {
                    ...payload.body.list,
                    items: [...state.list.items, ...payload.body.list.items]
                }
            };
        }

        default:
            return state;
    }
}
