var ads_widget = {
    adTopLeaderboard: '.side-menu-wrapper > .ad--section-top-leaderboard [id^=gpt-slot-]', //homepage, section, article
    //adTopLeaderboard: '.side-menu-wrapper > .ad--section-top-leaderboard .home_outside_1 iframe',
    adMrecUnderHero: '.hero-wrapper [id^=gpt-slot-]', //homepage, section
    adMrecNextToTopFeed: '.page__top-container [id^=gpt-slot-]', //homepage, section
    adMrecNextToTopFeedSticky: '.page__top-container .page__social-wrapper > div > div > span', //homepage, section
    adMiddleLeaderboard: '.ad--section-leaderboard [id^=gpt-slot-]', //homepage, section
    adMrecInBottomNewsFeed: '.ad--teaser-list [id^=gpt-slot-]', //homepage, section
    adMrecNextToBottomFeed: '.bottom-news-feed [id^=gpt-slot-]', //homepage, section
    adMrecNextToBottomFeedSticky: '.bottom-news-feed div.carriage', //homepage, section

    adWallpaperHomepageSection: '.ad--wallpaper [id^=gpt-slot-]', //homepage, section
    adLeftSideHomepageSection: '.ad--sidepanel-left [id^=gpt-slot-]', //homepage, section
    adRightSideHomepageSection: '.ad--sidepanel-right [id^=gpt-slot-]', //homepage, section
    adOutOfPage: '#inskinanchor', //all
    adBottomLeaderboard: '.content-wrapper .ad--section-top-leaderboard > [id^=gpt-slot-]', //homepage, section, article

    adMrecBetweenGalleryImages1: '.gallery__feed-item--ad:nth-child(4)', //vertical gallery,
    adMrecBetweenGalleryImages2: '.gallery__feed-item--ad:nth-child(9)', //vertical gallery
    adTopLeaderboardGallery: '.ad.gallery__mobile-ad.ad--bottom-label [id^=gpt-slot-]', //gallery
    adMrecBottomRightGallery: '.ad.gallery__aside-ad.ad--top-label [id^=gpt-slot-]', //gallery
    adMrecInSlideGallery: '.ad.gallery__slide-ad.ad--bottom-label [id^=gpt-slot-]', //gallery
    adBottomLeaderboardGallery: '.ad.gallery__footer-ad.ad--top-label', //gallery

    adMrecRHRFeed1: 'ul.feed__items li.feed-ad:nth-child(3) [id^=gpt-slot-] iframe', //article and vertical gallery
    adMrecRHRFeed2: 'ul.feed__items li.feed-ad:nth-child(9) [id^=gpt-slot-] iframe', //article and vertical gallery
    adMrecRHRFeed3: 'ul.feed__items li.feed-ad:nth-child(15) [id^=gpt-slot-] iframe', //article and vertical gallery
    adMrecRHRFeed4: 'ul.feed__items li.feed-ad:nth-child(21) [id^=gpt-slot-] iframe', //article and vertical gallery
    adMrecRHRFeed5: '.carriage [id^=gpt-slot-]', //article and vertical gallery
    lastFeed: '.feed__items .feed-item:nth-child(24)', //recorded for reference to auto ad
    adMrecUnderHeroArticle: '.ad--beneath-hero [id^=gpt-slot-]', //article
    adMrecAboveRecommendation: '.ad--article-before-recommendations [id^=gpt-slot-]', //article

    adWallpaperArticle: '.ad--wallpaper [id^=gpt-slot-]', //article
    adLeftSideArticle: '.ad--sidepanel-left [id^=gpt-slot-]', //article
    adRightSideArticle: '.ad--sidepanel-right [id^=gpt-slot-]', //article
    adWallpaperGallery: '.ad--wallpaper [id^=gpt-slot-]', //gallery
    adLeftSideGallery: '.ad--sidepanel-left [id^=gpt-slot-]', //gallery
    adRightSideGallery: '.ad--sidepanel-right [id^=gpt-slot-]', //gallery

    //For Ads Location
    ad_TopLeaderboard: '.side-menu-wrapper > .ad--section-top-leaderboard [id^=gpt-slot-]', //homepage, index, brand, gallery, article
    ad_MiddleLeaderboard: '.content-wrapper .ad--section-leaderboard [id^=gpt-slot-]', //homepage, index, brand
    ad_BottomLeaderboard: '.content-wrapper .ad--section-top-leaderboard [id^=gpt-slot-]', //homepage, index, brand, gallery, article

    ad_TopMrecRhs: '.page__top-container .ad--section-mrec [id^=gpt-slot-]', //homepage, index, brand
    ad_BottomMrecRhs: '.bottom-news-feed .ad--section-mrec [id^=gpt-slot-]', //homepage, index, brand

    ad_OutOfPage: '.ad--out-of-page [id^=gpt-slot-]', //homepage, index, brand
    ad_LeftSidePanel: '.ad--sidepanel-left [id^=gpt-slot-]', //homepage, index, brand
    ad_RightSidePanel: '.ad--sidepanel-right [id^=gpt-slot-]', //homepage, index, brand
    ad_Wallpaper: '.ad--wallpaper [id^=gpt-slot-]', //homepage, index, brand

    ad_LoadMoreMrecRhs: '.bottom-news-feed:nth-child(2) .ad--section-mrec [id^=gpt-slot-]', //homepage, index, brand

    ad_Teads: '.ad--slot-teads [id^=gpt-slot-]', //gallery, article

    ad_MrecRhs1: '.feed-ad:nth-child(3) [id^=gpt-slot-]', //gallery, article
    ad_MrecRhs2: '.feed-ad:nth-child(9) [id^=gpt-slot-]', //gallery, article
    ad_MrecRhs3: '.feed-ad:nth-child(15) [id^=gpt-slot-]', //gallery, article
    ad_MrecRhs4: '.feed-ad:nth-child(21) [id^=gpt-slot-]', //gallery, article
    ad_StickyMrecRhs: '.sticky-block.rhs-ads [id^=gpt-slot-]', //gallery

    ad_MrecAfterSlide3: '.gallery__feed-item--ad:nth-child(4) [id^=gpt-slot-]', //gallery
    ad_MrecAfterSlide7: '.gallery__feed-item--ad:nth-child(9) [id^=gpt-slot-]', //gallery

    ad_MrecUnderHeroTeader: '.hero-wrapper [id^=gpt-slot-]', //mobile homepage, index, brand
    ad_MrecInBottomFeed: '.bottom-news-feed [id^=gpt-slot-]', //mobile homepage, index, brand
    ad_LoadMoreMrecInBottomFeed: '.bottom-news-feed:nth-child(2) [id^=gpt-slot-]', //mobile homepage, index, brand
    ad_MrecBeforeRecommendation: '.ad--article-before-recommendations [id^=gpt-slot-]', //mobile gallery
    ad_MrecUnderHeroImage: '.ad--beneath-hero [id^=gpt-slot-]', //mobile article

};
module.exports = ads_widget;
