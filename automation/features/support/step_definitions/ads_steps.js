var wn_ads = require('../page_objects/ads_widget');
var home = require('../page_objects/homepage_widget');
module.exports = function() {

    this.Given(/^I should see sticky MREC ad next to the top news feed$/, function () {
        //Always scroll to the top first to allow this scenario can be reused for tablet landscape after testing desktop
        browser.scroll(0,0);
        //Verify the ad is appearing
        expect(browser.isVisible(home.adMrecNextToTopFeed)).toBe(true);
        //Verify the ad is a sticky ad after scrolling down
        browser.scroll(0,1500);
        expect(browser.isVisible(home.adMrecNextToTopFeed)).toBe(true);
        expect(browser.getAttribute(home.adMrecNextToTopFeedSticky, 'style')).toContain("fixed");
    });

    this.Then(/^I should see MREC ad under the hero teaser$/, function () {
        expect(browser.isVisible(home.adMrecUnderHero)).toBe(true);
    });

    this.Then(/^I should not see MREC ad under the hero teaser$/, function () {
        expect(browser.isVisible(home.adMrecUnderHero)).toBe(false);
    });

    //BELOW ARE THE STEPS FROM OTHER SITES. I WILL DECIDE TO KEEP OR DELETE LATER

    this.Then(/^I should see (\d+) leaderboard ad slots$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.leaderBoard, 5000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });
    this.Then(/^I should see (\d+) mrec ad slots$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.mrec, 5000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });
    this.Then(/^I should see (\d+) middle leaderboard ad slots$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.middleLeaderBoard, 5000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });
    this.Then(/^I should see (\d+) middle mrec ad slots$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.middleMrec, 5000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });
    this.Then(/^I should see (\d+) top leaderboard ad slots$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.articleTopLeaderBoard, 5000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });
    this.Then(/^I should see (\d+) bottom leaderboard ad slots$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.articleBottomLeaderBoard, 5000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });
    this.Then(/^I should see (\d+) mrec ad slots in LHS feed$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.articleLHSMrec, 6000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });
    this.Then(/^I should see (\d+) mrec ad slots above recommendation$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.articleBottomMrec, 5000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });
    this.Then(/^I should see (\d+) top mobile banner ad slots$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.topMobileBanner, 5000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });
    this.Then(/^I should see (\d+) top mobile banner ad slots under short teaser$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.homesTopMobileBanner, 5000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });
    this.Then(/^I should see (\d+) bottom leaderboard ad slots above recommendation$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.homesBottomMobileBanner, 5000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });


};
