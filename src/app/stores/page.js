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

        getSubsections(state) {
            return state.subsections;
        },

        getImageUrl(state) {
            return state.imageUrl;
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
        },

        getRequest(state) {
            return state.request;
        }
    }
});

