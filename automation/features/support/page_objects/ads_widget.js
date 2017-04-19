var ads_widget = {
    adTopLeaderboard: '.side-menu-wrapper > .ad--section-top-leaderboard [id^=gpt-slot-]', //homepage, section, article
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

    adTopLeaderboardGallery: '.ad.gallery__mobile-ad.ad--bottom-label [id^=gpt-slot-]', //gallery
    adMrecBottomRightGallery: '.ad.gallery__aside-ad.ad--top-label [id^=gpt-slot-]', //gallery
    adMrecInSlideGallery: '.ad.gallery__slide-ad.ad--bottom-label [id^=gpt-slot-]', //gallery
    adBottomLeaderboardGallery: '.ad.gallery__footer-ad.ad--top-label', //gallery

    adMrecRHRFeed1: '.feed-ad #gpt-slot-4', //article
    adMrecRHRFeed2: '.feed-ad #gpt-slot-5', //article
    adMrecRHRFeed3: '.feed-ad #gpt-slot-6', //article
    adMrecRHRFeed4: '.feed-ad #gpt-slot-7', //article
    adMrecUnderHeroArticle: '.ad--beneath-hero [id^=gpt-slot-]', //article
    adMrecAboveRecommendation: '.ad--article-before-recommendations [id^=gpt-slot-]', //article

    adWallpaperArticle: '.ad--wallpaper [id^=gpt-slot-]', //article
    adLeftSideArticle: '.ad--sidepanel-left [id^=gpt-slot-]', //article
    adRightSideArticle: '.ad--sidepanel-right [id^=gpt-slot-]', //article
    adWallpaperGallery: '.ad--wallpaper [id^=gpt-slot-]', //gallery
    adLeftSideGallery: '.ad--sidepanel-left [id^=gpt-slot-]', //gallery
    adRightSideGallery: '.ad--sidepanel-right [id^=gpt-slot-]' //gallery
};
module.exports = ads_widget;
