var wn_ads = require('../page_objects/ads_widget');
var wait = require('../utils/wait');
var visibilityFunctions = require('../utils/visibilityFunctions');
var loadAllElements = require('../utils/loadAllElements');

module.exports = function() {

    this.Given(/^I should see sticky MREC ad next to the top news feed$/, function () {
        //Always scroll to the top first to allow this scenario can be reused for tablet landscape after testing desktop
        browser.scroll(0,0);

        //Verify the ad is appearing
        expect(browser.waitForVisible(wn_ads.ad_TopMrecRhs,3000)).toBe(true);

        //Verify the ad is a sticky ad after scrolling down
        browser.scroll(wn_ads.topFeedItem6);
        expect(browser.waitForVisible(wn_ads.ad_TopMrecRhs,3000)).toBe(true);
        expect(browser.getAttribute(wn_ads.adMrecNextToTopFeedSticky, 'style')).toContain("fixed");
    });

    this.Given(/^I should see sticky MREC ad next to the bottom news feed$/, function () {
        //Always scroll to the beginning of the bottom news feed to allow this scenario can be reused for tablet landscape after testing desktop
        browser.scroll(wn_ads.bottomFeedItem1);

        //Verify the ad is appearing
        expect(browser.waitForVisible(wn_ads.ad_BottomMrecRhs,3000)).toBe(true);

        //Verify the ad is a sticky ad after scrolling down
        browser.scroll(wn_ads.bottomFeedItem4);
        browser.scroll(wn_ads.bottomFeedItem7);
        expect(browser.waitForVisible(wn_ads.ad_BottomMrecRhs,3000)).toBe(true);
        expect(browser.getAttribute(wn_ads.adMrecNextToBottomFeedSticky, 'style')).toContain("fixed");
    });

    this.Then(/^I should see MREC ad under the hero teaser$/, function () {
        expect(browser.isVisible(wn_ads.ad_MrecUnderHeroTeaser)).toBe(true);
    });

    this.Then(/^I should not see MREC ad under the hero teaser$/, function () {
        expect(browser.isVisible(wn_ads.ad_MrecUnderHeroTeaser)).toBe(false);
    });

    this.Then(/^I should see the top leaderboard ad under navigation$/, function () {
        browser.waitForVisible(wn_ads.ad_TopLeaderboard, 15000); // long wait due to browser stack load times over the cloud
        expect(browser.isVisible(wn_ads.ad_TopLeaderboard)).toBe(true);
    });

    this.Then(/^I should see native ad below author$/, function () {
        expect(browser.isVisible(wn_ads.galleryNativeAd)).toBe(true);
    });

    this.Then(/^I should see the middle leaderboard ad under the top news feed$/, function () {
        expect(browser.isVisible(wn_ads.ad_MiddleLeaderboard)).toBe(true);
    });

    this.Then(/^I should see the bottom leaderboard ad above the footer$/, function () {
        browser.scroll(wn_ads.ad_BottomLeaderboard);
        expect(browser.waitForVisible(wn_ads.ad_BottomLeaderboard,5000)).toBe(true);
    });

    this.Then(/^I should not see the bottom leaderboard ad above the footer$/, function () {
        expect(browser.isVisible(wn_ads.ad_BottomLeaderboard)).toBe(false);
    });

    this.Then(/^I should see MREC ad in the bottom news feed$/, function () {
        expect(browser.isVisible(wn_ads.ad_MrecInBottomFeed)).toBe(true);
    });

    this.Then(/^I should not see MREC ad in the bottom news feed$/, function () {
        expect(browser.isVisible(wn_ads.ad_MrecInBottomFeed)).toBe(false);
    });

    //BELOW ARE STEPS FOR ARTICLE
    this.Then(/^I should see the native ad above the hero image$/, function () {
        expect(browser.isVisible(wn_ads.adNativeAboveHeroImage)).toBe(true);
    });

    this.Then(/^I should see the bottom leaderboard ad above the footer on article$/, function () {
        browser.scroll(wn_ads.ad_BottomLeaderboard);
        wait(1500);
        browser.scroll(wn_ads.ad_BottomLeaderboard); //move to the object again after the images on gallery are loaded from the first move.
        expect(browser.isVisible(wn_ads.ad_BottomLeaderboard)).toBe(true);
    });

    this.Then(/^I should see MREC ad between images$/, function () {
        // To load all elements on the page before validating the bottom ads
        loadAllElements('gallery');

        // Verify the mrec ad after slide no. 3
        browser.scroll(wn_ads.gallerySlide3); // Scroll to the slide no.3 to make sure the header will not overlap the MREC element. This has fixed the Browser Stack issue when running on iPhone 6 plus
        expect(browser.waitForVisible(wn_ads.ad_MrecAfterSlide3,5000)).toBe(true);

        // Verify the mrec ad after slide no. 7
        browser.scroll(wn_ads.gallerySlide7);
        expect(browser.waitForVisible(wn_ads.ad_MrecAfterSlide7,5000)).toBe(true);
    });

    this.Then(/^I should see four MREC ads in the RHR feed$/, function () {
        browser.scroll(wn_ads.ad_MrecRhs1);
        browser.scroll(wn_ads.ad_MrecRhs2);
        browser.scroll(wn_ads.ad_MrecRhs3);
        browser.scroll(wn_ads.ad_MrecRhs4);
    });

    this.Then(/^I should see MREC ad under the hero image$/, function () {
        expect(browser.isVisible(wn_ads.ad_MrecUnderHeroImage)).toBe(true);
    });

    this.Then(/^I should not see MREC ad under the hero image$/, function () {
        expect(browser.isVisible(wn_ads.ad_MrecUnderHeroImage)).toBe(false);
    });

    this.Then(/^I should see MREC ad above recommendation$/, function () {
        browser.scroll(wn_ads.ad_MrecBeforeRecommendation);
        expect(browser.isVisible(wn_ads.ad_MrecBeforeRecommendation)).toBe(true);
    });

    this.Then(/^I should not see MREC ad above recommendation$/, function () {
        expect(browser.isVisible(wn_ads.ad_MrecBeforeRecommendation)).toBe(false);
    });

    //BELOW ARE THE STEPS TO TEST WALLPAPER, SIDE PANEL, OUT OF PAGE ADs
    this.Then(/^I should "([^"]*)" the wallpaper ad slot on "([^"]*)"$/, function (visibility, page) {
        visibilityFunctions.isAdVisible(page, visibility,wn_ads.ad_Wallpaper);
    });

    this.Then(/^I should "([^"]*)" the left and right side ad slot on "([^"]*)"$/, function (visibility, page) {
        visibilityFunctions.isAdVisible(page, visibility,wn_ads.ad_LeftSidePanel);
        visibilityFunctions.isAdVisible(page, visibility,wn_ads.ad_RightSidePanel);
    });

    this.Then(/^I should "([^"]*)" the out of page ad slot on "([^"]*)"$/, function (visibility, page) {
        visibilityFunctions.isAdVisible(page, visibility,wn_ads.ad_OutOfPage);
    });

    //----------------------------------------

    this.Then(/^I can see last RHR ad is sticky$/, function () {
        // Scrolling down to the last RHR feed with keeping ad in view
        var x = browser.getLocation(wn_ads.ad_StickyMrecRhs, 'x') - 50;
        var y = browser.getLocation(wn_ads.ad_StickyMrecRhs, 'y') - 50;

        browser.scroll(x, y);

        // ad will auto refresh once in view on the screen
        browser.waitForVisible(wn_ads.ad_StickyMrecRhs, 2000);
    });

    this.Then(/^the "([^"]*)" will "([^"]*)" refresh every (\d+) seconds on "([^"]*)" when is in View$/, function (ad, auto, seconds, page) {

        // Find an element of the ad
        var adElement;
        switch(ad) {
            case 'sticky MREC ad': //desktop, tablet landscape
                loadAllElements(page); // To load all elements on the page before validating the ad
                adElement = wn_ads.ad_StickyMrecRhs;
                break;
            case 'bottom leaderboard ad': //desktop, tablet landscape
                loadAllElements(page); // To load all elements on the page before validating the ad
                adElement = wn_ads.ad_BottomLeaderboard;
                break;
            case 'sticky bottom leaderboard ad': //mobile, tablet portrait
            case 'mobile banner ad': //mobile, tablet portrait
                adElement = wn_ads.ad_BottomLeaderboard;
                break;
        }

        // declare variables
        var first_googleId;
        var second_googleId;
        var loopCount = 0;

        // check the iframe ID before change and ensure the value is not NULL
        do {
            browser.scroll(adElement);
            browser.waitForVisible(adElement, 5000);
            first_googleId = browser.getAttribute(adElement, "data-google-query-id");
            console.log(loopCount, first_googleId);
            loopCount++;
        }
        while (first_googleId === null && loopCount < 10); // to exist the loop if it does more than 10 times.

        // waiting for x seconds as it is a rule of ad auto refreshing.
        // 1050 is a better number to ensure it has passed x seconds. E.g. 6 seconds is going to be 6.05 seconds.
        wait(seconds*1050);

        // check the iframe ID after change
        second_googleId = browser.getAttribute(adElement, "data-google-query-id");
        // There are a few times that the google ID hasn't changed. So we will wait one more second to get the ID again.
        if (first_googleId == second_googleId){
            wait(1000);
            second_googleId = browser.getAttribute(adElement, "data-google-query-id");
        }
        console.log('SecondID: ' + second_googleId);

        // verify if the ad is auto-refreshing
        switch(auto) {
            case 'auto':
                expect(first_googleId).not.toEqual(second_googleId);
                break;
            case 'not auto':
                expect(first_googleId).toEqual(second_googleId);
                break;
        }
    });

    this.Then(/^I should see each outside ad slot element containing proper class name$/, function (dataTable) {
        var rows = dataTable.hashes();
        var adElement;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            switch(row['ad']) {
                case 'Top Leaderboard':
                    adElement = wn_ads.ad_TopLeaderboard;
                    break;
                case 'Middle Leaderboard':
                    adElement = wn_ads.ad_MiddleLeaderboard;
                    break;
                case 'Bottom Leaderboard':
                    adElement = wn_ads.ad_BottomLeaderboard;
                    break;
                case 'Teads':
                    adElement = wn_ads.ad_Teads;
                    break;
                case 'Native':
                    adElement = wn_ads.galleryNativeAdDfp;
                    break;
                case 'MREC Under Hero Teaser': //mobile
                    adElement = wn_ads.ad_MrecUnderHeroTeaser;
                    break;
            }
            var className = browser.getAttribute(adElement,'class');
            expect(className).toEqual(row['class-name']);
        }
    });

    this.Then(/^I should see each body ad slot element containing proper class name$/, function (dataTable) {
        var rows = dataTable.hashes();
        var adElement;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            switch(row['ad']) {
                case 'MREC After Slide 3':
                    adElement = wn_ads.ad_MrecAfterSlide3;
                    break;
                case 'MREC After Slide 7':
                    adElement = wn_ads.ad_MrecAfterSlide7;
                    break;
                case 'MREC In Bottom Feed': //mobile
                    adElement = wn_ads.ad_MrecInBottomFeed;
                    break;
                case 'MREC Before Recommendation': //mobile
                    adElement = wn_ads.ad_MrecBeforeRecommendation;
                    break;
                case 'MREC Under Hero Image': //mobile
                    adElement = wn_ads.ad_MrecUnderHeroImage;
                    break;
                case 'MREC After Paragraph 6':
                    adElement = wn_ads.ad_MrecAfterParagraph6;
                    break;
                case 'MREC After Paragraph 12':
                    adElement = wn_ads.ad_MrecAfterParagraph12;
                    break;
                case 'MREC After Paragraph 18':
                    adElement = wn_ads.ad_MrecAfterParagraph18;
                    break;
                case 'MREC After Paragraph 24':
                    adElement = wn_ads.ad_MrecAfterParagraph24;
                    break;
            }
            var className = browser.getAttribute(adElement,'class');
            expect(className).toEqual(row['class-name']);
        }
    });

    this.Then(/^I should see each RHS ad slot element containing proper class name$/, function (dataTable) {
        var rows = dataTable.hashes();
        var adElement;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            switch(row['ad']) {
                case 'Top MREC RHS':
                    adElement = wn_ads.ad_TopMrecRhs;
                    break;
                case 'Bottom MREC RHS':
                    adElement = wn_ads.ad_BottomMrecRhs;
                    break;
                case 'MREC RHS 1':
                    adElement = wn_ads.ad_MrecRhs1;
                    break;
                case 'MREC RHS 2':
                    adElement = wn_ads.ad_MrecRhs2;
                    break;
                case 'MREC RHS 3':
                    adElement = wn_ads.ad_MrecRhs3;
                    break;
                case 'MREC RHS 4':
                    adElement = wn_ads.ad_MrecRhs4;
                    break;
                case 'Sticky MREC RHS':
                    adElement = wn_ads.ad_StickyMrecRhs;
                    break;
            }
            var className = browser.getAttribute(adElement,'class');
            expect(className).toEqual(row['class-name']);
        }
    });

    this.Then(/^I should see each additional ad slot element containing proper class name$/, function (dataTable) {
        var rows = dataTable.hashes();
        var adElement;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            switch(row['ad']) {
                case 'Out Of Page':
                    adElement = wn_ads.ad_OutOfPage;
                    break;
                case 'Left Side Panel':
                    adElement = wn_ads.ad_LeftSidePanel;
                    break;
                case 'Right Side Panel':
                    adElement = wn_ads.ad_RightSidePanel;
                    break;
                case 'Wallpaper':
                    adElement = wn_ads.ad_Wallpaper;
                    break;
            }
            var className = browser.getAttribute(adElement,'class');
            expect(className).toEqual(row['class-name']);
        }
    });

    this.Then(/^I should see each load more ad slot element containing proper class name$/, function (dataTable) {
        var rows = dataTable.hashes();
        var adElement;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            switch (row['ad']) {
                case 'Load More MREC RHS':
                    adElement = wn_ads.ad_LoadMoreMrecRhs;
                    break;
                case 'Load More MREC In Bottom Feed': //mobile
                    adElement = wn_ads.ad_LoadMoreMrecInBottomFeed;
                    break;
            }
            var className = browser.getAttribute(adElement, 'class');
            expect(className).toEqual(row['class-name']);
        }
    });

};
