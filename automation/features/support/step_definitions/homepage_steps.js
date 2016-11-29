var home = require('../page_objects/homepage_widget');
var world = require('../world');

module.exports = function(){

    this.When(/^I should see the main hero item containing its image and clickable to open its page$/, function () {
        //Verify the hero image
        var heroImgUrl = browser.getAttribute(home.heroImgUrl, 'data-srcset');
        console.log(heroImgUrl);
        expect(heroImgUrl).not.toBeUndefined();
        //Verify the hero image's link
        var heroImgLink = browser.getAttribute(home.heroImgLink, 'href');
        console.log(heroImgLink);
        expect(heroImgLink).not.toBeUndefined();
    });

    this.When(/^I should see the main hero item containing its title and clickable to open its page$/, function () {
        //Verify the hero title
        var heroTitle = browser.getText(home.heroTitle);
        console.log(heroTitle);
        expect(heroTitle).not.toBeUndefined();
        //Verify the hero title's link
        var heroTitleLink = browser.getAttribute(home.heroTitle, 'href');
        console.log(heroTitleLink);
        expect(heroTitleLink).not.toBeUndefined();
    });

    this.When(/^I should see the main hero item containing source$/, function () {
        //Verify the hero source
        var heroSource = browser.getText(home.heroSource);
        console.log(heroSource);
        expect(heroSource).not.toBeUndefined();
    });

    this.When(/^The homepage hero image should be clickable to open its page$/, function () {
        var heroImgLink = browser.getAttribute(home.heroImgLink, 'href');
        expect(heroImgLink).not.toBeUndefined();
        console.log(heroImgLink);
    });

    this.When(/^I should see (\d+) top half feed$/, function (number) {
        var topFeedItems = browser.elements(home.topFeedNumber).value.length;
        console.log(topFeedItems);
        expect(topFeedItems).toEqual(parseInt(number,10));
    });

    this.When(/^I should see each top feed item containing its image and clickable to open its page$/, function () {
        //verify images of all teasers
        console.log(browser.elements(home.topFeedTeaserImg).value.length);
        var topFeedTeaserImgUrl = browser.getAttribute(home.topFeedTeaserImg,'data-srcset');
        var topFeedTeaserImgLink = browser.getAttribute(home.topFeedTeaserImgLink,'href');
        for (var i=0; i<topFeedTeaserImgUrl.length; i++){
            console.log( i + ":" + topFeedTeaserImgUrl[i] + " => " + topFeedTeaserImgLink[i]);
            expect(topFeedTeaserImgUrl[i]).not.toEqual('');
            expect(topFeedTeaserImgLink[i]).not.toEqual('');
        }
    });

    this.When(/^I should see each top feed item containing its title and clickable to open its page$/, function () {
        //verify titles of all teasers
        console.log(browser.elements(home.topFeedTeaserTitle).value.length);
        var topFeedTeaserTitle = browser.getText(home.topFeedTeaserTitle);
        var topFeedTeaserTitleLink = browser.getAttribute(home.topFeedTeaserTitle,'href');
        for (var i=0; i<topFeedTeaserTitle.length; i++){
            console.log( i + ":" + topFeedTeaserTitle[i] + " => " + topFeedTeaserTitleLink[i]);
            expect(topFeedTeaserTitle[i]).not.toEqual('');
            expect(topFeedTeaserTitleLink[i]).not.toEqual('');
        }
    });

    this.When(/^I should see each top feed item containing source$/, function () {
        //verify sources of all teasers
        console.log(browser.elements(home.topFeedTeaserSource).value.length);
        var topFeedTeaserSource = browser.getText(home.topFeedTeaserSource);
        for (var i=0; i<topFeedTeaserSource.length; i++){
            console.log( i + ":" + topFeedTeaserSource[i]);
            expect(topFeedTeaserSource[i]).not.toEqual('');
        }
    });

    this.When(/^I should see (\d+) bottom half feed$/, function (number) {
        var bottomFeedItems = browser.elements(home.bottomFeedNumber).value.length;
        console.log(bottomFeedItems);
        expect(bottomFeedItems).toEqual(parseInt(number,10));
    });

    this.When(/^I should see each bottom feed item containing its image and clickable to open its page$/, function () {
        //verify images of all teasers
        console.log(browser.elements(home.bottomFeedTeaserImg).value.length);
        var bottomFeedTeaserImgUrl = browser.getAttribute(home.bottomFeedTeaserImg,'data-srcset');
        var bottomFeedTeaserImgLink = browser.getAttribute(home.bottomFeedTeaserImgLink,'href');
        for (var i=0; i<bottomFeedTeaserImgUrl.length; i++){
            console.log( i + ":" + bottomFeedTeaserImgUrl[i] + " => " + bottomFeedTeaserImgLink[i]);
            expect(bottomFeedTeaserImgUrl[i]).not.toEqual('');
            expect(bottomFeedTeaserImgLink[i]).not.toEqual('');
        }
    });

    this.When(/^I should see each bottom feed item containing its title and clickable to open its page$/, function () {
        //verify titles of all teasers
        console.log(browser.elements(home.bottomFeedTeaserTitle).value.length);
        var bottomFeedTeaserTitle = browser.getText(home.bottomFeedTeaserTitle);
        var bottomFeedTeaserTitleLink = browser.getAttribute(home.bottomFeedTeaserTitle,'href');
        for (var i=0; i<bottomFeedTeaserTitle.length; i++){
            console.log( i + ":" + bottomFeedTeaserTitle[i] + " => " + bottomFeedTeaserTitleLink[i]);
            expect(bottomFeedTeaserTitle[i]).not.toEqual('');
            expect(bottomFeedTeaserTitleLink[i]).not.toEqual('');
        }
    });

    this.When(/^I should see each bottom feed item containing source$/, function () {
        //verify sources of all teasers
        console.log(browser.elements(home.bottomFeedTeaserSource).value.length);
        var bottomFeedTeaserSource = browser.getText(home.bottomFeedTeaserSource);
        for (var i=0; i<bottomFeedTeaserSource.length; i++){
            console.log( i + ":" + bottomFeedTeaserSource[i]);
            expect(bottomFeedTeaserSource[i]).not.toEqual('');
        }
    });

    this.Given(/^I should see the trending title at the "([^"]*)"$/, function(position) {
        //find the display value of the trending title
        switch(position) {
            case 'top':
                var trendingTitleDisplay = browser.getCssProperty(home.trendingTitleTop, 'display').value;
                var trendingTitleHidden = browser.getCssProperty(home.trendingTitleFront, 'display').value;
                break;
            case 'front':
                var trendingTitleDisplay = browser.getCssProperty(home.trendingTitleFront, 'display').value;
                var trendingTitleHidden = browser.getCssProperty(home.trendingTitleTop, 'display').value;
                break;
        }

        //validate the trending title
        expect(trendingTitleDisplay).toContain('block');
        expect(trendingTitleHidden).toContain('none');
    });

    this.Given(/^I should see (\d+) trending teaser images and titles which are clickable to open their page$/, function(number) {
        //find elements of image and title of all trending teasers
        var trendingTeaserImage = browser.getAttribute(home.trendingTeaserImage,'data-srcset');
        var trendingTeaserImageLink = browser.getAttribute(home.trendingTeaserImageLink,'href');
        var trendingTeaserTitle = browser.getText(home.trendingTeaserTitle);
        var trendingTeaserTitleLink = browser.getAttribute(home.trendingTeaserTitle,'href');

        //validate image and title and their links
        for (var i=0; i<number; i++){
            expect(trendingTeaserImage[i]).not.toEqual('');
            expect(trendingTeaserImageLink[i]).not.toEqual('');
            expect(trendingTeaserTitle[i]).not.toEqual('');
            expect(trendingTeaserTitleLink[i]).toEqual(trendingTeaserImageLink[i]);
            console.log( i + ":" + trendingTeaserImage[i] + " => " + trendingTeaserTitle[i] + " => " + trendingTeaserImageLink[i]);
        }
    });
};
