var gallery = require('../page_objects/gallery_widget');
var world = require('../world');
var wait = require('../utils/wait');
var findValue = require('../utils/findValue');

module.exports = function() {

    this.Given(/^I can see the logo on the gallery header$/, function() {
        browser.waitForVisible(gallery.headerLogo, 10000);
        expect(browser.isVisible(gallery.headerLogo)).toBe(true);
    });

    this.Given(/^I can click the logo to go to homepage$/, function() {
        var logoLink = browser.getAttribute(gallery.headerLogo, 'href');
        expect(logoLink).toEqual(world.Urls.home_page);
    });

    this.Given(/^I can see an image appearing on the gallery$/, function() {
        var img = browser.getAttribute(gallery.galleryImg, 'src');
        expect(img).not.toBe(null);
        console.log("IMAGE SRC =" + " " + img);
    });

    this.Given(/^I can see the source appearing on the gallery with gtm "([^"]*)"$/, function (gtm) {
        //Get values
        var sourceHref = browser.getAttribute(gallery.gallerySource, 'href');
        var sourceGTM = browser.getAttribute(gallery.gallerySource,'class');
        var sourceLogo = browser.getAttribute(gallery.gallerySourceImg,'src');

        //Validate the values
        console.log(sourceHref);
        expect(sourceHref).not.toEqual('');
        console.log(sourceGTM);
        expect(sourceGTM).toEqual(gtm);
        console.log(sourceLogo);
        expect(sourceLogo).not.toEqual('');
    });

    this.Given(/^I can see the created date on the gallery "([^"]*)"$/, function(date) {
        wait(2000);
        browser.waitForExist(gallery.galleryDate,5000);
        browser.scroll(gallery.galleryDate);
        var galleryDate = browser.getText(gallery.galleryDate);
        console.log(galleryDate);
        expect(galleryDate).toContain(date);
        console.log('gallery date is:' + galleryDate)
    });

    this.Given(/^I can see the gallery title containing "([^"]*)"$/, function(longTitle) {
        var galleryTitle = browser.getText(gallery.galleryLongTitle);
        expect(galleryTitle).toContain(longTitle);
    });

    this.Given(/^I can not see the gallery title$/, function() {
        expect(browser.isVisible(gallery.galleryLongTitle)).toBe(false);
    });

    this.Given(/^I should see the long title on the gallery header on the next gallery slide$/, function() {
        expect(browser.isVisible(gallery.galleryLongTitle)).toBe(true);
    });

    this.Given(/^I should not see the long title on the gallery header on the next gallery slide$/, function() {
        expect(browser.isVisible(gallery.galleryLongTitle)).toBe(false);
    });

    this.Given(/^I can see the gallery description of the gallery containing "([^"]*)"$/, function(description) {
        var galleryDescription = browser.getText(gallery.galleryDescription);
        expect(galleryDescription).toContain(description);
    });

    this.Given(/^I can see the image number "([^"]*)" of total "([^"]*)" on the gallery$/, function(num, total) {
        var imageCount = browser.getText(gallery.imageCount);
        expect(imageCount[0]).toEqual(num + " / " + total);
        console.log(imageCount[0]);
    });

    this.Given(/^I can see the image caption on the gallery containing "([^"]*)"$/, function(caption) {
        browser.waitForVisible(gallery.imgCaption);
        var imgCaption = browser.getText(gallery.imgCaption);
        expect(imgCaption[0]).toMatch(caption);
        console.log(imgCaption[0]);
    });

    this.When(/^I see the image no "([^"]*)" on the gallery$/, function(imgNum) {
        expect(browser.getText(gallery.currentImgNum)).toMatch(imgNum);
    });

    this.When(/^I see the video ID "([^"]*)" on the gallery$/, function(videoId) {
        browser.waitForVisible(gallery.videoWrapper, 3000);
        browser.moveToObject(gallery.videoWrapper);
        expect(browser.getAttribute(gallery.videoWrapper, gallery.videoId)).toEqual(videoId)
    });

    this.When(/^I can see the play button and click on it$/, function() {
        browser.waitForVisible(gallery.playButton, 3000);
        browser.click(gallery.playButton);
        expect(browser.isVisible(gallery.videoPlayWrap, gallery.videoAdPlay)).toBe(true);
    });

    this.When(/^I can see the facebook share button on gallery page$/, function () {
        var facebook = browser.isVisible(gallery.galleryFacebook);
        var facebookButton = browser.getText(gallery.galleryFacebook);
        expect(facebook).toBe(true);
        expect(facebookButton).toEqual('SHARE');
    });

    this.When(/^I can see the pinterest share button on gallery page$/, function () {
        var pinterest = browser.isVisible(gallery.galleryPinterest);
        var pinterestButton = browser.getText(gallery.galleryPinterest);
        expect(pinterest).toBe(true);
        expect(pinterestButton).toEqual('PIN');
    });

    this.Given(/^I can see the author "([^"]*)" on the gallery$/, function (authorName) {
        var author = browser.getText(gallery.authorText);
        expect(author).toContain(authorName);
    });
};