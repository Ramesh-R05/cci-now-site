var ads_widget = {

    //For checking attribute of sticky ads
    adMrecNextToTopFeedSticky: '.page__top-container .page__social-wrapper > div > div > span', //homepage, section
    adMrecNextToBottomFeedSticky: '.bottom-news-feed div.carriage', //homepage, section

    // For ad wrapper
    adWrapper_TopLeaderboard_For_Viewability : '.side-menu-wrapper .header-wrapper + div  .sticky-block', //homepage, index, brand, gallery, article
    adWrapper_BottomLeaderboard_Landing: '.side-menu-wrapper .repeatable-component + div .sticky-block', //homepage, index, brand, gallery, article
    adWrapper_BottomLeaderboard_Content: '.side-menu-wrapper .article-section + div .sticky-block', //homepage, index, brand, gallery, article

// =======For Ads Location
    //Outside
    ad_TopLeaderboard: '.side-menu-wrapper .header-wrapper + div .sticky-block .ad--section-top-leaderboard [id^=gpt-slot-]', //homepage, index, brand, gallery, article
    ad_MiddleLeaderboard: '.content-wrapper .ad--section-leaderboard [id^=gpt-slot-]', //homepage, index, brand
    ad_BottomLeaderboard: '.content-wrapper .ad--section-bottom-leaderboard [id^=gpt-slot-]', //homepage, index, brand, gallery, article
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

    //Polar
    ad_PolarMustRead2: '.mustread-teaser-view-grid .teaser__list-item:nth-child(2) .ad--bottom-label [id^=gpt-slot-]', //homepage
    ad_PolarMustRead5: '.mustread-teaser-view-grid .teaser__list-item:nth-child(5) .ad--bottom-label [id^=gpt-slot-]', //homepage
    ad_PolarTopTeaser1: '.top-news-feed .teaser__list-item:nth-child(1) .ad--bottom-label [id^=gpt-slot-]', //homepage, section
    ad_PolarTopTeaser6: '.top-news-feed .teaser__list-item:nth-child(6) .ad--bottom-label [id^=gpt-slot-]', //homepage, section
    ad_PolarBottomTeaser2: '.bottom-news-feed:nth-child(1) .teaser__list-item:nth-child(2) .ad--bottom-label [id^=gpt-slot-]', //homepage, section
    ad_PolarBottomTeaser6: '.bottom-news-feed:nth-child(1) .teaser__list-item:nth-child(7) .ad--bottom-label [id^=gpt-slot-]', //homepage, section
    ad_PolarLoadMore2: '.bottom-news-feed:nth-child(2) .teaser__list-item:nth-child(2) .ad--bottom-label [id^=gpt-slot-]', //homepage, section
    ad_PolarLoadMore6: '.bottom-news-feed:nth-child(2) .teaser__list-item:nth-child(7) .ad--bottom-label [id^=gpt-slot-]', //homepage, section
    ad_PolarRHS2: '.feed__container .feed-item:nth-child(2) .ad--bottom-label [id^=gpt-slot-]', //gallery, article
    ad_PolarRHS5: '.feed__container .feed-item:nth-child(6) .ad--bottom-label [id^=gpt-slot-]', //gallery, article
    ad_PolarRHS9: '.feed__container .feed-item:nth-child(11) .ad--bottom-label [id^=gpt-slot-]', //gallery, article
    ad_PolarRHS14: '.feed__container .feed-item:nth-child(17) .ad--bottom-label [id^=gpt-slot-]', //gallery, article
    ad_PolarRelatedContentInBody: '.content-body-container .content-body__related-content .feed-item:nth-child(1) .ad--bottom-label [id^=gpt-slot-]', //gallery, article
    ad_PolarRelatedContentAfterSlide7: '.gallery__feed-item--ad:nth-child(9) .content-body__related-content .feed-item:nth-child(1) .ad--bottom-label [id^=gpt-slot-]', //gallery

    //After Load More
    ad_LoadMoreMrecRhs: '.bottom-news-feed:nth-child(2) .ad--section-mrec [id^=gpt-slot-]', //homepage, index, brand

    //Body
    ad_MrecAfterSlide3: '.gallery__feed-item--ad:nth-child(4)  .gallery__ad [id^=gpt-slot-]', //gallery
    ad_MrecAfterSlide7: '.gallery__feed-item--ad:nth-child(9)  .gallery__ad [id^=gpt-slot-]', //gallery

    //Mobile
    ad_MrecUnderHeroTeaser: '.hero-wrapper [id^=gpt-slot-]', //mobile homepage, index, brand
    ad_MrecInBottomFeed: '.bottom-news-feed .teaser__list-item--ad [id^=gpt-slot-]', //mobile homepage, index, brand
    ad_LoadMoreMrecInBottomFeed: '.bottom-news-feed:nth-child(2) .teaser__list-item--ad [id^=gpt-slot-]', //mobile homepage, index, brand
    ad_MrecBeforeRecommendation: '.ad--article-before-recommendations [id^=gpt-slot-]', //mobile gallery
    ad_MrecUnderHeroImage: '.ad--beneath-hero [id^=gpt-slot-]', //mobile article
    ad_MrecAfterParagraph6: 'article .content-body:nth-child(1) p.content-body__paragraph:nth-child(6) + .ad--content-body [id^=gpt-slot]',//mobile article
    ad_MrecAfterParagraph12: 'article .content-body:nth-child(1) p.content-body__paragraph:nth-child(13) + .ad--content-body [id^=gpt-slot]',//mobile article
    ad_MrecAfterParagraph18: 'article .content-body:nth-child(3) p.content-body__paragraph:nth-child(2) + .ad--content-body [id^=gpt-slot]',//mobile article
    ad_MrecAfterParagraph24: 'article .content-body:nth-child(4) p.content-body__paragraph:nth-child(2) + .ad--content-body [id^=gpt-slot]',//mobile article

    //For non-ad element
    topFeedItem6: '.top-news-feed .teaser__list-item:nth-child(6)', //for 'I should see sticky MREC ad next to the top news feed'
    bottomFeedItem1: '.teaser-view-list .teaser__list-item:nth-child(1)', //for 'I should see sticky MREC ad next to the bottom news feed'
    bottomFeedItem4: '.teaser-view-list .teaser__list-item:nth-child(4)', //for 'I should see sticky MREC ad next to the bottom news feed'
    bottomFeedItem7: '.teaser-view-list .teaser__list-item:nth-child(7)', //for 'I should see sticky MREC ad next to the bottom news feed'
    gallerySlide3: '.gallery__feed-item:nth-child(3)', //for 'I should see MREC ad between images'
    gallerySlide7: '.gallery__feed-item:nth-child(8)', //for 'I should see MREC ad between images'

    // Vertical Gallery
    galleryNativeAd: '.ad--article-native',
    galleryNativeAdDfp: '.ad--article-native [id^=gpt-slot-]',

    // For sticky ad
    stickyTopBanner: '.sticky-block--at-top',
    stickyBottomBanner: '.sticky-block--at-bottom',

    // For AMP elements
    ampTopLeaderBoard: 'amp-ad.ad-top-leaderboard',
    ampMrecList: '.content-body-container .content-body__ad amp-ad iframe',
    ampBottomLeaderboard: 'amp-sticky-ad>amp-ad'

};
module.exports = ads_widget;
