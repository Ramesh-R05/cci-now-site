export default {
    url: '//plugin.mediavoice.com/plugin.js',
    propertyId: 'NA-NOWTOLOVE-11238611',
    targets: { env: 'test' },
    adSize: '2x2',
    server: 'dfp',
    details: {
        homeMustRead: [
            {
                index: 1,
                label: 'home_mustread_1',
                targets: { kw: 'home_mustread_1' }
            },
            {
                index: 4,
                label: 'home_mustread_2',
                targets: { kw: 'home_mustread_2' }
            }
        ],
        homeTopFeed: [
            {
                index: 0,
                label: 'home_top_feed_1',
                targets: { kw: 'home_top_feed_1' }
            },
            {
                index: 5,
                label: 'home_top_feed_2',
                targets: { kw: 'home_top_feed_2' }
            }
        ],
        homeBottomFeed: [
            {
                index: 1,
                label: 'home_bottom_feed_1',
                targets: { kw: 'home_bottom_feed_1' }
            },
            {
                index: 5,
                label: 'home_bottom_feed_2',
                targets: { kw: 'home_bottom_feed_2' }
            }
        ],
        take5SectionTopFeed: [
            {
                index: 0,
                label: 'take5_section_top_feed_1',
                targets: { kw: 'take5_section_top_feed_1' }
            }
        ],
        sectionTopFeed: [
            {
                index: 0,
                label: 'section_top_feed_1',
                targets: { kw: 'section_top_feed_1' }
            },
            {
                index: 5,
                label: 'section_top_feed_2',
                targets: { kw: 'section_top_feed_2' }
            }
        ],
        sectionBottomFeed: [
            {
                index: 1,
                label: 'section_bottom_feed_1',
                targets: { kw: 'section_bottom_feed_1' }
            },
            {
                index: 5,
                label: 'section_bottom_feed_2',
                targets: { kw: 'section_bottom_feed_2' }
            }
        ],
        articleRightFeed: [
            {
                index: 1,
                label: 'article_right_feed_1',
                targets: {
                    kw: 'article_right_feed_1'
                }
            },
            {
                index: 4,
                label: 'article_right_feed_2',
                targets: {
                    kw: 'article_right_feed_2'
                }
            },
            {
                index: 8,
                label: 'article_right_feed_3',
                targets: {
                    kw: 'article_right_feed_3'
                }
            },
            {
                index: 13,
                label: 'article_right_feed_4',
                targets: {
                    kw: 'article_right_feed_4'
                }
            }
        ],
        articleRelatedFeed: {
            index: 0,
            label: 'article_related_1',
            targets: {
                kw: 'article_related_1'
            },
            pos: 'body' // most polar positions are hard coded, to define it in config you must extend the functionality of the component that uses it
            // example @ https://github.com/bauerxcelmedia/wn-article/blob/master/src/components/feed/feedItem.jsx
        },
        articleCarousel: {
            index: 0,
            label: 'article_mobilecarousel_1',
            targets: {
                kw: 'article_mobilecarousel_1'
            },
            pos: 'body'
        }
    }
};
