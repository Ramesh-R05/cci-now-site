var ads_widget = {

    //For checking attribute of sticky ads
    adMrecNextToTopFeedSticky: '.page__top-container .page__social-wrapper > div > div > span', //homepage, section
    adMrecNextToBottomFeedSticky: '.bottom-news-feed div.carriage', //homepage, section

// =======For Ads Location
    //Outside
    ad_TopLeaderboard: '.side-menu-wrapper > .ad--section-top-leaderboard [id^=gpt-slot-]', //homepage, index, brand, gallery, article
    ad_MiddleLeaderboard: '.content-wrapper .ad--section-leaderboard [id^=gpt-slot-]', //homepage, index, brand
    ad_BottomLeaderboard: '.content-wrapper .ad--section-top-leaderboard [id^=gpt-slot-]', //homepage, index, brand, gallery, article
    ad_Teads: '.ad--slot-teads [id^=gpt-slot-]', //gallery, article

    //RHS
    ad_TopMrecRhs: '.page__top-container .ad--section-mrec [id^=gpt-slot-]', //homepage, index, brand
    ad_BottomMrecRhs: '.bottom-news-feed .ad--section-mrec [id^=gpt-slot-]', //homepage, index, brand
    ad_MrecRhs1: '.feed-ad:nth-child(3) [id^=gpt-slot-]', //gallery, article
    ad_MrecRhs2: '.feed-ad:nth-child(9) [id^=gpt-slot-]', //gallery, article
    ad_MrecRhs3: '.feed-ad:nth-child(15) [id^=gpt-slot-]', //gallery, article
    ad_MrecRhs4: '.feed-ad:nth-child(21) [id^=gpt-slot-]', //gallery, article
    ad_StickyMrecRhs: '.sticky-block.rhs-ads [id^=gpt-slot-]', //gallery

    //Additional
    ad_OutOfPage: '.ad--out-of-page [id^=gpt-slot-]', //homepage, index, brand
    ad_LeftSidePanel: '.ad--sidepanel-left [id^=gpt-slot-]', //homepage, index, brand
    ad_RightSidePanel: '.ad--sidepanel-right [id^=gpt-slot-]', //homepage, index, brand
    ad_Wallpaper: '.ad--wallpaper [id^=gpt-slot-]', //homepage, index, brand

    //After Load More
    ad_LoadMoreMrecRhs: '.bottom-news-feed:nth-child(2) .ad--section-mrec [id^=gpt-slot-]', //homepage, index, brand

    //Body
    ad_MrecAfterSlide3: '.gallery__feed-item--ad:nth-child(4) [id^=gpt-slot-]', //gallery
    ad_MrecAfterSlide7: '.gallery__feed-item--ad:nth-child(9) [id^=gpt-slot-]', //gallery

    //Mobile
    ad_MrecUnderHeroTeaser: '.hero-wrapper [id^=gpt-slot-]', //mobile homepage, index, brand
    ad_MrecInBottomFeed: '.bottom-news-feed .teaser__list-item--ad [id^=gpt-slot-]', //mobile homepage, index, brand
    ad_LoadMoreMrecInBottomFeed: '.bottom-news-feed:nth-child(2) [id^=gpt-slot-]', //mobile homepage, index, brand
    ad_MrecBeforeRecommendation: '.ad--article-before-recommendations [id^=gpt-slot-]', //mobile gallery
    ad_MrecUnderHeroImage: '.ad--beneath-hero [id^=gpt-slot-]', //mobile article

//For non-ad element
    topFeedItem6: '.top-news-feed .teaser__list-item:nth-child(6)', //for 'I should see sticky MREC ad next to the top news feed'
    bottomFeedItem1: '.teaser-view-list .teaser__list-item:nth-child(1)', //for 'I should see sticky MREC ad next to the bottom news feed'
    bottomFeedItem4: '.teaser-view-list .teaser__list-item:nth-child(4)', //for 'I should see sticky MREC ad next to the bottom news feed'
    bottomFeedItem7: '.teaser-view-list .teaser__list-item:nth-child(7)', //for 'I should see sticky MREC ad next to the bottom news feed'

};
module.exports = ads_widget;
