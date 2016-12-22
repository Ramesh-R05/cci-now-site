import {createReducerStore} from 'fluxible-reducer-store';
import {initialState, reducer} from '../reducers/loadPage';

export default createReducerStore({
    storeName: 'PageStore',
    initialState,
    reducer,
    getters: {
        getTitle(state) {
            return state.title;
        },

        getErrorStatus(state) {
            return state.error;
        },

        getNodeType(state) {
            return state.nodeType;
        },

        getTrendingItems(state) {
          return state.trendingItems;
        },

        getFooter(state) {
          return state.footer;
        },

        getMustReadItems(state) {
          return state.mustRead;   
        }
    }
});
