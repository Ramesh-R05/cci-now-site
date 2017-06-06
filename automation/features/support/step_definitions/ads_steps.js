var wn_ads = require('../page_objects/ads_widget');
var gallery = require('../page_objects/gallery_widget');
var wait = require('../utils/wait');

module.exports = function() {

    this.Given(/^I should see sticky MREC ad next to the top news feed$/, function () {
        //Always scroll to the top first to allow this scenario can be reused for tablet landscape after testing desktop
        browser.scroll(0,0);
        //Verify the ad is appearing
        expect(browser.isVisible(wn_ads.adMrecNextToTopFeed)).toBe(true);
        //Verify the ad is a sticky ad after scrolling down
        browser.scroll(0,1500);
        expect(browser.isVisible(wn_ads.adMrecNextToTopFeed)).toBe(true);
        expect(browser.getAttribute(wn_ads.adMrecNextToTopFeedSticky, 'style')).toContain("fixed");
    });

    this.Given(/^I should see sticky MREC ad next to the bottom news feed$/, function () {
        //Always scroll to the beginning of the bottom news feed to allow this scenario can be reused for tablet landscape after testing desktop
        browser.scroll(0,2000);
        //Verify the ad is appearing
        browser.waitForVisible(wn_ads.adMrecNextToBottomFeed,3000);
        expect(browser.isVisible(wn_ads.adMrecNextToBottomFeed)).toBe(true);
        //Verify the ad is a sticky ad after scrolling down
        browser.scroll(0,2700);
        expect(browser.isVisible(wn_ads.adMrecNextToBottomFeed)).toBe(true);
        //expect(browser.getAttribute(wn_ads.adMrecNextToBottomFeedSticky, 'style')).toContain("fixed"); //Unstable result - Will find a solution later
    });

    this.Then(/^I should see MREC ad under the hero teaser$/, function () {
        expect(browser.isVisible(wn_ads.adMrecUnderHero)).toBe(true);
    });

    this.Then(/^I should not see MREC ad under the hero teaser$/, function () {
        expect(browser.isVisible(wn_ads.adMrecUnderHero)).toBe(false);
    });

    this.Then(/^I should see the top leaderboard ad under navigation$/, function () {
        browser.waitForVisible(wn_ads.adTopLeaderboard, 15000); // long wait due to browser stack load times over the cloud
        expect(browser.isVisible(wn_ads.adTopLeaderboard)).toBe(true);
    });

    this.Then(/^I should see the middle leaderboard ad under the top news feed$/, function () {
        expect(browser.isVisible(wn_ads.adMiddleLeaderboard)).toBe(true);
    });

    this.Then(/^I should see the bottom leaderboard ad above the footer$/, function () {
        browser.moveToObject(wn_ads.adBottomLeaderboard);
        expect(browser.isVisible(wn_ads.adBottomLeaderboard)).toBe(true);
    });

    this.Then(/^I should not see the bottom leaderboard ad above the footer$/, function () {
        expect(browser.isVisible(wn_ads.adBottomLeaderboard)).toBe(false);
    });

    this.Then(/^I should see MREC ad in the bottom news feed$/, function () {
        expect(browser.isVisible(wn_ads.adMrecInBottomNewsFeed)).toBe(true);
    });

    this.Then(/^I should not see MREC ad in the bottom news feed$/, function () {
        expect(browser.isVisible(wn_ads.adMrecInBottomNewsFeed)).toBe(false);
    });

    //BELOW ARE STEPS FOR GALLERY
    this.Then(/^I should see the top leaderboard ad above the gallery slide$/, function () {
        expect(browser.isVisible(wn_ads.adTopLeaderboardGallery)).toBe(true);
    });

    this.Then(/^I should not see the bottom leaderboard ad under the gallery slide$/, function () {
        expect(browser.isVisible(wn_ads.adBottomLeaderboardGallery)).toBe(false);
    });

    this.Then(/^I should see the MREC ad at the bottom right of the gallery$/, function () {
        expect(browser.isVisible(wn_ads.adMrecBottomRightGallery)).toBe(true);
    });

    this.Then(/^I should not see the MREC ad at the bottom right of the gallery$/, function () {
        expect(browser.isVisible(wn_ads.adMrecBottomRightGallery)).toBe(false);
    });

    this.Then(/^I should see the MREC ad after the (\d+) slide$/, function (slide) {
        //Go to the MREC slide
        for (var i=0; i<slide; i++){
            browser.click(gallery.galleryNextButton);
        }
        //Validate
        browser.waitForVisible(wn_ads.adMrecInSlideGallery,3000);
        expect(browser.isVisible(wn_ads.adMrecInSlideGallery)).toBe(true);
    });

    //BELOW ARE STEPS FOR ARTICLE
    this.Then(/^I should see the native ad above the hero image$/, function () {
        expect(browser.isVisible(wn_ads.adNativeAboveHeroImage)).toBe(true);
    });

    this.Then(/^I should see the bottom leaderboard ad above the footer on article$/, function () {
        browser.moveToObject(wn_ads.adBottomLeaderboard);
        expect(browser.isVisible(wn_ads.adBottomLeaderboard)).toBe(true);
    });

    this.Then(/^I should see MREC ad between images$/, function () {
        browser.moveToObject(wn_ads.adMrecBetweenGalleryImages1);
        expect(browser.isVisible(wn_ads.adMrecBetweenGalleryImages1)).toBe(true);
        browser.moveToObject(wn_ads.adMrecBetweenGalleryImages2);
        expect(browser.isVisible(wn_ads.adMrecBetweenGalleryImages2)).toBe(true);
    });

    this.Then(/^I should see four MREC ads in the RHR feed$/, function () {
        browser.moveToObject(wn_ads.adMrecRHRFeed1);
        browser.moveToObject(wn_ads.adMrecRHRFeed2);
        browser.moveToObject(wn_ads.adMrecRHRFeed3);
        browser.moveToObject(wn_ads.adMrecRHRFeed4);
    });

    this.Then(/^I should see MREC ad under the hero image$/, function () {
        expect(browser.isVisible(wn_ads.adMrecUnderHeroArticle)).toBe(true);
    });

    this.Then(/^I should not see MREC ad under the hero image$/, function () {
        expect(browser.isVisible(wn_ads.adMrecUnderHeroArticle)).toBe(false);
    });

    this.Then(/^I should see MREC ad above recommendation$/, function () {
        browser.moveToObject(wn_ads.adMrecAboveRecommendation);
        expect(browser.isVisible(wn_ads.adMrecAboveRecommendation)).toBe(true);
    });

    this.Then(/^I should not see MREC ad above recommendation$/, function () {
        expect(browser.isVisible(wn_ads.adMrecAboveRecommendation)).toBe(false);
    });

    //BELOW ARE THE STEPS TO TEST WALLPAPER, SIDE PANEL, OUT OF PAGE ADs
    this.Then(/^I should "([^"]*)" the wallpaper ad slot on "([^"]*)"$/, function (visibility, page) {
        var valueVisible, adWallpaper;

        //Identify the element
        switch(visibility) {
            case 'see':
                valueVisible = true;
                break;
            case 'not see':
                valueVisible = false;
                break;
        }
        switch(page) {
            case 'homepage':
            case 'section':
                adWallpaper = wn_ads.adWallpaperHomepageSection;
                break;
            case 'article':
                adWallpaper = wn_ads.adWallpaperArticle;
                break;
            case 'gallery':
                adWallpaper = wn_ads.adWallpaperGallery;
                break;
        }

        //Validate
        expect(browser.isVisible(adWallpaper)).toBe(valueVisible);
    });

    this.Then(/^I should "([^"]*)" the left and right side ad slot on "([^"]*)"$/, function (visibility, page) {
        var valueVisible, adLeftSide, adRightSide;
        //Identify the element
        switch(visibility) {
            case 'see':
                valueVisible = true;
                break;
            case 'not see':
                valueVisible = false;
                break;
        }
        switch(page) {
            case 'homepage':
            case 'section':
                adLeftSide = wn_ads.adLeftSideHomepageSection;
                adRightSide = wn_ads.adRightSideHomepageSection;
                break;
            case 'article':
                adLeftSide = wn_ads.adLeftSideArticle;
                adRightSide = wn_ads.adRightSideArticle;
                break;
            case 'gallery':
                adLeftSide = wn_ads.adLeftSideGallery;
                adRightSide = wn_ads.adRightSideGallery;
                break;
        }

        //Validate
        expect(browser.isVisible(adLeftSide)).toBe(valueVisible);
        expect(browser.isVisible(adRightSide)).toBe(valueVisible);
    });

    this.Then(/^I should "([^"]*)" the out of page ad slot on "([^"]*)"$/, function (visibility, page) {
        var valueVisible;
        //Identify the element
        switch(visibility) {
            case 'see':
                valueVisible = true;
                break;
            case 'not see':
                valueVisible = false;
                break;
        }
        //Validate
        browser.waitForVisible(wn_ads.adOutOfPage, 10000);
        expect(browser.isVisible(wn_ads.adOutOfPage)).toBe(valueVisible);
    });

    this.Then(/^I can see last RHR add is sticky$/, function () {

        // Scrolling down to the last RHR feed with keeping ad in view
        var x = browser.getLocation(wn_ads.lastFeed, 'x');
        var y = browser.getLocation(wn_ads.lastFeed, 'y');
        browser.scroll(x-50,y-50);
        // ad will auto refresh once in view on the screen
        browser.waitForVisible(wn_ads.lastFeed, 2000);

    });

    this.Then(/^the sticky add will auto refresh every (\d+) seconds when is in View$/, function (seconds) {

        browser.isVisible(wn_ads.adMrecRHRFeed5);
        // scrolling down a little makes the ad appear on the screen
        var x = browser.getLocation(wn_ads.adMrecRHRFeed5, 'x');
        var y = browser.getLocation(wn_ads.adMrecRHRFeed5, 'y');
        browser.scroll(x-1,y-1);
        // check the iframe ID before change
        var first_googleId = browser.getAttribute(wn_ads.adMrecRHRFeed5,"data-google-query-id");
        wait(6000);
        // check the iframe ID after change
        var second_googleId = browser.getAttribute(wn_ads.adMrecRHRFeed5,"data-google-query-id");
        expect(first_googleId).not.toEqual(second_googleId);

    });

    this.Then(/^I should see each outside ad slot element containing proper class name$/, function (dataTable) {
        var rows = dataTable.hashes();
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            switch(row['ad']) {
                case 'Top Leaderboard':
                    var adElement = wn_ads.ad_TopLeaderboard;
                    break;
                case 'Middle Leaderboard':
                    var adElement = wn_ads.ad_MiddleLeaderboard;
                    break;
                case 'Bottom Leaderboard':
                    var adElement = wn_ads.ad_BottomLeaderboard;
                    break;
                case 'Teads':
                    var adElement = wn_ads.ad_Teads;
                    break;
                case 'MREC Under Hero Teaser': //mobile
                    var adElement = wn_ads.ad_MrecUnderHeroTeader;
                    break;
            }
            var className = browser.getAttribute(adElement,'class');
            expect(className).toEqual(row['class-name']);
        }
    });

    this.Then(/^I should see each body ad slot element containing proper class name$/, function (dataTable) {
        var rows = dataTable.hashes();
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            switch(row['ad']) {
                case 'MREC After Slide 3':
                    var adElement = wn_ads.ad_MrecAfterSlide3;
                    break;
                case 'MREC After Slide 7':
                    var adElement = wn_ads.ad_MrecAfterSlide7;
                    break;
                case 'MREC In Bottom Feed': //mobile
                    var adElement = wn_ads.ad_MrecInBottomFeed;
                    break;
                case 'MREC Before Recommendation': //mobile
                    var adElement = wn_ads.ad_MrecBeforeRecommendation;
                    break;
                case 'MREC Under Hero Image': //mobile
                    var adElement = wn_ads.ad_MrecUnderHeroImage;
                    break;
            }
            var className = browser.getAttribute(adElement,'class');
            expect(className).toEqual(row['class-name']);
        }
    });

    this.Then(/^I should see each RHS ad slot element containing proper class name$/, function (dataTable) {
        var rows = dataTable.hashes();
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            switch(row['ad']) {
                case 'Top MREC RHS':
                    var adElement = wn_ads.ad_TopMrecRhs;
                    break;
                case 'Bottom MREC RHS':
                    var adElement = wn_ads.ad_BottomMrecRhs;
                    break;
                case 'MREC RHS 1':
                    var adElement = wn_ads.ad_MrecRhs1;
                    break;
                case 'MREC RHS 2':
                    var adElement = wn_ads.ad_MrecRhs2;
                    break;
                case 'MREC RHS 3':
                    var adElement = wn_ads.ad_MrecRhs3;
                    break;
                case 'MREC RHS 4':
                    var adElement = wn_ads.ad_MrecRhs4;
                    break;
                case 'Sticky MREC RHS':
                    var adElement = wn_ads.ad_StickyMrecRhs;
                    break;
            }
            var className = browser.getAttribute(adElement,'class');
            expect(className).toEqual(row['class-name']);
        }
    });

    this.Then(/^I should see each additional ad slot element containing proper class name$/, function (dataTable) {
        var rows = dataTable.hashes();
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            switch(row['ad']) {
                case 'Out Of Page':
                    var adElement = wn_ads.ad_OutOfPage;
                    break;
                case 'Left Side Panel':
                    var adElement = wn_ads.ad_LeftSidePanel;
                    break;
                case 'Right Side Panel':
                    var adElement = wn_ads.ad_RightSidePanel;
                    break;
                case 'Wallpaper':
                    var adElement = wn_ads.ad_Wallpaper;
                    break;
            }
            var className = browser.getAttribute(adElement,'class');
            expect(className).toEqual(row['class-name']);
        }
    });

    this.Then(/^I should see each load more ad slot element containing proper class name$/, function (dataTable) {
        var rows = dataTable.hashes();
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            switch (row['ad']) {
                case 'Load More MREC RHS':
                    var adElement = wn_ads.ad_LoadMoreMrecRhs;
                    break;
                case 'Load More MREC In Bottom Feed': //mobile
                    var adElement = wn_ads.ad_LoadMoreMrecInBottomFeed;
                    break;
            }
            var className = browser.getAttribute(adElement, 'class');
            expect(className).toEqual(row['class-name']);
        }
    });

};
