import {createReducerStore} from 'fluxible-reducer-store';
import {initialState, reducer} from '../reducers/loadTeasers';

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

        getListNextParams(state) {
            return {
                ...state.list.params,
                pageNo: (state.list.params.pageNo + 1)
            };
        }
    }
});
