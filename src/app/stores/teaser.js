import { createReducerStore } from 'fluxible-reducer-store';
import get from 'lodash/object/get';
import { initialState, reducer } from '../reducers/loadTeasers';

export default createReducerStore({
    storeName: 'TeaserStore',
    initialState,
    reducer,
    getters: {
        getHeroTeaser(state) {
            return state.heroTeaser;
        },

        getLatestTeasers(state) {
            return state.latestTeasers;
        },

        getVideoGalleryTeasers(state) {
            return state.videoGalleryTeasers;
        },

        getList(state) {
            return state.list;
        },

        getMustReadItems(state) {
            return state.mustRead;
        },

        getPromoted(state) {
            return state.promoted;
        },

        getListNextParams(state) {
            const pageNo = get(state, 'list.params.pageNo', 1);

            return {
                ...state.list.params,
                pageNo: pageNo + 1
            };
        }
    }
});
