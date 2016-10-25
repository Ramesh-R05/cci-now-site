// This gets called inside app.js. It manipulates the default adConfig inside @bxm/ad
import merge from 'lodash/object/merge';
import breakpoints from '../breakpoints';
import adConfig from '@bxm/ad/lib/google/config';

export default {
    init() {
        merge(adConfig, {
            breakpoints,
            pageTypes: {
                NavigationSection: 'index',
                HomesArticle: 'article'
            },
            siteId: 'Now',
            tagsObject: 'tags',
            sizes: {
                native: [250, 30],
                'leaderboard-wide': [760, 120]
            }
        });
    }
};
