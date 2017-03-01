import { createReducerStore } from 'fluxible-reducer-store';
import { initialState, reducer } from '../reducers/loadPage';

export default createReducerStore({
    storeName: 'PageStore',
    initialState,
    reducer,
    getters: {
        getTitle(state) {
            return state.title;
        },

        getShortTitle(state) {
            return state.shortTitle;
        },

        getSummary(state) {
            return state.summary;
        },

        getErrorStatus(state) {
            return state.error;
        },

        getNodeType(state) {
            return state.nodeType;
        },

        getMagazineImageUrl(state) {
            return state.magazineImageUrl;
        },

        getTrendingItems(state) {
            return state.trendingItems;
        },

        getFooter(state) {
            return state.footer;
        },

        getMustReadItems(state) {
            return state.mustRead;
        },

        getModule: (state, module) => {
            if (!module) return [];
            return state[module] || [];
        }
    }
});

