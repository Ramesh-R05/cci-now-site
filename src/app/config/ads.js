// This gets called inside app.js. It manipulates the default adConfig inside @bxm/ad
import merge from 'lodash/object/merge';
import adConfig from '@bxm/ad/lib/google/config';
import breakpoints from '../breakpoints';

export default {
    init(siteId) {
        merge(adConfig, {
            breakpoints,
            pageTypes: {
                Brand: 'index'
            },
            siteId,
            tagsObject: 'tags',
            sizes: {
                native: [250, 30],
                'leaderboard-wide': [760, 120]
            }
        });
    }
};
