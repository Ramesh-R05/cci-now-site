var ads_widget = {


    adTopLeaderboard: '.ad--section-top-leaderboard #gpt-slot-0', //homepage, section
    adMrecUnderHero: '.hero-wrapper #gpt-slot-1', //homepage, section
    adMrecNextToTopFeed: '.page__top-container #gpt-slot-2', //homepage, section
    adMrecNextToTopFeedSticky: '.page__top-container .page__social-wrapper > div > div > span', //homepage, section
    adMiddleLeaderboard: '.ad--section-leaderboard #gpt-slot-3', //homepage, section
    adMrecInBottomNewsFeed: '.ad--teaser-list #gpt-slot-4', //homepage, section
    adMrecNextToBottomFeed: '.bottom-news-feed #gpt-slot-5', //homepage, section
    adMrecNextToBottomFeedSticky: '.bottom-news-feed div.carriage', //homepage, section
    adBottomLeaderboard: '.ad--section-top-leaderboard #gpt-slot-6', //homepage, section
    adTopLeaderboardGallery: '.ad.gallery__mobile-ad.ad--bottom-label #gpt-slot-0', //gallery
    adMrecBottomRightGallery: '.ad.gallery__aside-ad.ad--top-label #gpt-slot-5', //gallery
    adMrecInSlideGallery: '.ad.gallery__slide-ad.ad--bottom-label #gpt-slot-6', //gallery
    adBottomLeaderboardGallery: '.ad.gallery__footer-ad.ad--top-label', //gallery

    adWallpaperHomepageSection: '.ad--wallpaper #gpt-slot-10', //homepage, section
    adLeftSideHomepageSection: '.ad--sidepanel-left #gpt-slot-8', //homepage, section
    adRightSideHomepageSection: '.ad--sidepanel-right #gpt-slot-9', //homepage, section
    adOutOfPageHomepageSection: '.ad--out-of-page #gpt-slot-7', //homepage, section
    adWallpaperArticle: '.ad--wallpaper #gpt-slot-12', //article
    adLeftSideArticle: '.ad--sidepanel-left #gpt-slot-10', //article
    adRightSideArticle: '.ad--sidepanel-right #gpt-slot-11', //article
    adOutOfPageArticle: '.ad--out-of-page #gpt-slot-9', //article
    adWallpaperGallery: '.ad--wallpaper #gpt-slot-4', //gallery
    adLeftSideGallery: '.ad--sidepanel-left #gpt-slot-2', //gallery
    adRightSideGallery: '.ad--sidepanel-right #gpt-slot-3', //gallery
    adOutOfPageGallery: '.ad--out-of-page #gpt-slot-1', //gallery

    //Below are the widget from the other sites. We will delete later.
    leaderBoard: '.ad--section-top-leaderboard',
    mrec: '.ad--section-mrec',
    middleLeaderBoard: '.ad--section-leaderboard',
    middleMrec: '.ad--teaser-list',
    articleTopLeaderBoard: '.ad--article-top',
    articleBottomLeaderBoard: '.ad--article-beneath-recommendations',
    articleLHSMrec: '.article-feed-container .ad--bottom-label',//verifying MRECS in RHS, using article feed container to uniquely identify
    articleBottomMrec: '.ad--article-before-recommendations',
    topMobileBanner: '.ad--beneath-hero',
    homesTopMobileBanner: '.ad--beneath-short-teaser',
    homesBottomMobileBanner: '.ad--article-beneath-recommendations'
};
module.exports = ads_widget;
