var amp = require('../page_objects/amp_widget');
var wait = require('../../../node_modules/@bxm/automation/lib/utils/wait');
var loadAllElements = require('../../../node_modules/@bxm/automation/lib/utils/loadAllElements');

module.exports = function() {

    this.When(/^I can see the amp hero image$/, function () {
        browser.scroll(amp.ampHeroImage);
        var heroImg = browser.waitForVisible(amp.ampHeroImage,2000);
        expect(heroImg).toBe(true);
    });

    this.Given(/^I can see the amp body image$/, function () {
        var ampBodyImg = browser.isVisible(amp.ampBodyImg);
        expect(ampBodyImg).toBe(true);
    });

    this.Given(/^I can see the amp body image caption "([^"]*)"$/, function (ImgCaption) {
        var ampBodyImgCaption = browser.getText(amp.ampBodyImgCaption);
        expect(ampBodyImgCaption).toContain(ImgCaption);
    });

    this.Given(/^I can see the amp body video$/, function () {
        var ampBodyVideo = browser.isVisible(amp.ampBodyVideo);
        expect(ampBodyVideo).toBe(true);
    });

    this.When(/^I can see the facebook share button on amp article page$/, function () {
        var facebook = browser.isVisible(amp.ampArticleFacebook);
        expect(facebook).toBe(true);
    });

    this.When(/^I can see the pinterest share button on amp article page$/, function () {
        var pinterest = browser.isVisible(amp.ampArticlePinterest);
        expect(pinterest).toBe(true);
    });

    this.Given(/^I can see the amp body related content$/, function () {
        // use the site domain to select different class element for aww,wd,food and dolly,cosmo,homes
        browser.scroll(amp.relatedContentHeading);
        var rcHeading = browser.getText(amp.relatedContentHeading);
        var rcItemsImage = browser.getAttribute(amp.ampRelatedContentItemsImage, 'src');
        var rcItemsTitle = browser.getText(amp.ampRelatedContentItemsTitle);

        //Validate the heading of Related
        console.log(rcHeading);
        expect(rcHeading).not.toEqual('');

        //Loop through the related items, and Validate the body related items' image and title
        for(var i=0; i<rcItemsTitle.length; i++) {
            var image = rcItemsImage[i];
            var title = rcItemsTitle[i];
            console.log( i + ':' + image);
            expect(image === '').toBe(false);
            console.log( i + ':' + title);
            expect(title === '').toBe(false);
        }
    });

    this.Given(/^I can see the amp body Twitter embed "([^"]*)"$/, function (twitterId) {
        loadAllElements('article', browser);
        browser.waitForVisible(amp.ampTwitterEmb, 10000);
        var twitEmbed = browser.getAttribute(amp.ampTwitterEmb, 'data-tweetid');
        console.log(twitEmbed);
        expect(twitEmbed).toEqual(twitterId);
    });

    this.Given(/^I can see the amp body Facebook embed "([^"]*)"$/, function (facebookUrl) {
        browser.waitForVisible(amp.ampFacebookEmb, 3000);
        var facebookEmbed = browser.getAttribute(amp.ampFacebookEmb, 'data-href');
        console.log(facebookEmbed);
        expect(facebookEmbed).toEqual(facebookUrl);
    });

    this.Given(/^I can see the amp body Youtube embed "([^"]*)"$/, function (youtubeUrl) {
        browser.waitForVisible(amp.ampYoutubeEmb, 3000);
        var ampYoutubeEmb = browser.getAttribute(amp.ampYoutubeEmb, 'src');
        console.log(ampYoutubeEmb);
        expect(ampYoutubeEmb).toContain(youtubeUrl);
    });

    this.Given(/^I can see the amp body Vimeo embed "([^"]*)"$/, function (vimeoUrl) {
        browser.waitForVisible(amp.ampVimeoEmb, 3000);
        var ampVimeoEmb = browser.getAttribute(amp.ampVimeoEmb, 'src');
        console.log(ampVimeoEmb);
        expect(ampVimeoEmb).toEqual(vimeoUrl);
    });


};
