export const initialState = {
    heroTeaser: null,
    latestTeasers: [],
    videoGalleryTeasers: [],
    mustRead: [],
    promoted: { title: "", items: [] },
    list: []
};

export function reducer(state = initialState, payload = {}, eventName = '') {
    const actionType = eventName || payload.type || '';

    switch(actionType) {
        case 'LOAD_CONTENT':
            const {
                heroTeaser = null,
                latestTeasers = [],
                videoGalleryTeasers = [],
                list = [],
                mustRead = [],
                promoted = { title: '', items: [] }
            } = payload.body;
            
            return {
                heroTeaser,
                latestTeasers,
                videoGalleryTeasers,
                mustRead,
                promoted,
                list
            };
            break;
        case 'LOAD_CONTENT_FAILED':
            return {
                heroTeaser: null,
                latestTeasers: [],
                videoGalleryTeasers: [],
                mustRead: [],
                promoted: { title : '', items: [] },
                list: []
            };
            break;
        case 'LOAD_LIST':
            return {
                ...state,
                list: {
                    ...payload.body.list,
                    items: [
                        ...state.list.items,
                        ...payload.body.list.items
                    ]
                }
            };
            break;
        default:
            return state;
    }
}
