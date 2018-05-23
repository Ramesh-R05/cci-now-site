import { createReducerStore } from 'fluxible-reducer-store';
import { initialState, reducer } from '../reducers/loadSearch';
import get from 'lodash/object/get';

export default createReducerStore({
    storeName: 'SearchStore',
    initialState,
    reducer,
    getters: {
        getTitle(state) {
            return state.title;
        },

        getMagazineImageUrl(state) {
            return get(state, 'magCover.moduleImageUrl', '');
        },

        getSearchTotal(state) {
            return get(state, 'search.total', 0);
        },

        getInitialSearchResults(state) {
            return state.latestTeasers;
        },

        getSearchResultsList(state) {
            return state.list;
        },

        getSearchListNextParams(state) {
            const pageNo = get(state, 'list.params.pageNo', 1);
            const listParams = get(state, 'list.params', {});

            return {
                ...listParams,
                pageNo: pageNo + 1
            };
        },

        getModule: (state, module) => {
            if (!module) return [];
            return state[module] || [];
        }
    }
});
