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
