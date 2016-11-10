var home = require('../page_objects/homepage_widget');
var world = require('../world');

module.exports = function(){

    this.When(/^I should see the homepage hero element$/, function () {
        expect(browser.isVisible(home.heroImg)).toBe(true);
    });
    this.When(/^I should see the homepage hero image$/, function () {
        var heroImgUrl = browser.getAttribute(home.heroImgUrl, 'data-srcset');
        expect(heroImgUrl).not.toBeUndefined();
        console.log(heroImgUrl);
    });
    this.When(/^The homepage hero image should be clickable to open its page$/, function () {
        var heroImgLink = browser.getAttribute(home.heroImgLink, 'href');
        expect(heroImgLink).not.toBeUndefined();
        console.log(heroImgLink);
    });
    this.When(/^I should see the homepage hero custom label in the right side$/, function () {
        var heroLabelPosition = browser.getCssProperty(home.heroLabelPosition, 'position').value;
        console.log("Position of hero custom Label for desktop is" + "::" + heroLabelPosition);
        expect(heroLabelPosition).toEqual("relative");
        var heroCustomLabel = browser.getText(home.heroCustomLabel);
       expect(heroCustomLabel).not.toBeUndefined();
        console.log(heroCustomLabel);
    });
    this.When(/^I should see the homepage hero custom label at the bottom edge of hero image$/, function () {
        var heroLabelPosition = browser.getCssProperty(home.heroLabelPosition, 'position').value;
        console.log("Position of hero custom Label for desktop is" + "::" + heroLabelPosition);
        expect(heroLabelPosition).toEqual("absolute");
        var heroCustomLabel = browser.getText(home.heroCustomLabel);
        expect(heroCustomLabel).not.toBeUndefined();
        console.log(heroCustomLabel);
    });
    this.When(/^I should see the homepage hero custom label below the hero image$/, function () {
        var heroLabelPosition = browser.getCssProperty(home.heroLabelPosition, 'position').value;
        console.log("Position of hero custom Label for desktop is" + "::" + heroLabelPosition);
        expect(heroLabelPosition).toEqual("static");
        var heroCustomLabel = browser.getText(home.heroCustomLabel);
        expect(heroCustomLabel).not.toBeUndefined();
        console.log(heroCustomLabel);
    });
    this.When(/^I should see the homepage hero title$/, function () {
        var heroImgTitle = browser.getText(home.heroTitle);
        expect(heroImgTitle).not.toBeUndefined();
        console.log(heroImgTitle);
    });
    this.When(/^The homepage hero title should be clickable to open its page$/, function () {
        var heroTitleLink = browser.getAttribute(home.heroTitle, 'href');
        expect(heroTitleLink).not.toBeUndefined();
        var heroImgLink = browser.getAttribute(home.heroImgLink, 'href');
        expect(heroTitleLink).toEqual(heroImgLink);
        console.log(heroTitleLink);
    });

    this.When(/^I should see the homepage hero border in desktop style$/, function () {
    var heroBorderDesktop = browser.getCssProperty(home.heroStyle, 'background-image').value;
        expect(heroBorderDesktop).toMatch("/assets/backgrounds/line-light-pink.svg");
    });
    this.When(/^I should see the homepage hero border in tablet style$/, function () {
        var heroBorderTablet = browser.getCssProperty(home.heroStyle, 'background-image').value;
        expect(heroBorderTablet).toMatch("/assets/backgrounds/line-light-pink-ipad.svg");
    });
    this.When(/^I should see the homepage hero border in mobile style$/, function () {
        var heroBorderMobile = browser.getCssProperty(home.heroStyle, 'background-image').value;
        expect(heroBorderMobile).toMatch("/assets/backgrounds/line-light-pink.svg");
    });
    this.When(/^I should see the homepage hero striped background$/, function () {
       var heroBackground = browser.getCssProperty(home.heroImg, 'background').value;
        expect(heroBackground).toMatch("/assets/backgrounds/hero.png");
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
        for (var i=0; i<topFeedTeaserImg.length; i++){
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
        console.log(browser.elements(home.topFeedTeaserSourc).value.length);
        var topFeedTeaserSource = browser.getText(home.topFeedTeaserSource);
        for (var i=0; i<topFeedTeaserSource.length; i++){
            console.log( i + ":" + topFeedTeaserSource[i]);
            expect(topFeedTeaserSource[i]).not.toEqual('');
        }
    });

    this.When(/^I should see a custom label "([^"]*)" on top feed item if it has a custom label$/, function (labelName) {
        var topCustomLabels = browser.getText(home.topCustomLabel);
        expect(topCustomLabels[0]).toEqual(labelName);
    });

    this.When(/^I should see a section name "([^"]*)" on top feed item if it does not have a custom label$/, function (sectionName) {
        var topCustomLabels = browser.getText(home.topCustomLabel);
        expect(topCustomLabels[3]).toEqual(sectionName);
    });

    this.When(/^Image and long title in each top feed item are clickable to open its page with first top teaser page as "([^"]*)"$/, function (teaserPage) {
        var topTeaserImg = browser.getAttribute(home.topFeedImg,'href');
        var topTeaserTitle = browser.getAttribute(home.topFeedTeaserTitle, 'href');
        expect(topTeaserImg).toEqual(topTeaserTitle);
        console.log(topTeaserImg);
        expect(topTeaserImg[0]).toMatch(teaserPage);
    });

     this.Given(/^I should see (\d+) bottom half feed$/, function (number) {
      var bottomeFeedItems = browser.elements(home.bottomFeedNumber).value.length;
      console.log(bottomeFeedItems);
      expect(bottomeFeedItems).toEqual(parseInt(number,10));
      //parsing string to integer using parseInt func
    });

   this.Given(/^I should see each bottom feed item containing images$/, function () {
       var BottomFeedTeaserImgUrlCount = browser.elements(home.bottomFeedImgUrls).value.length;
        console.log(BottomFeedTeaserImgUrlCount);
       var BottomFeedTeaserImgUrl = browser.getAttribute(home.bottomFeedImgUrls ,'data-srcset');
       for (var i=0; i<BottomFeedTeaserImgUrl.length; i++){
           expect(BottomFeedTeaserImgUrl[i]).not.toBeUndefined();
           console.log(BottomFeedTeaserImgUrl[i]);
       }
    });

    this.Given(/^I should see each bottom feed item containing custom label$/, function () {
        var bottomeFeedItems = browser.elements(home.bottomFeedNumber).value.length;
        var bottomCustomLabelCount = browser.elements(home.bottomCustomLabel).value.length;
        expect(bottomCustomLabelCount).toEqual(bottomeFeedItems);
        var bottomCustomLabels = browser.getText(home.bottomCustomLabel);
        for (var i=0; i<bottomCustomLabels.length; i++){
            expect(bottomCustomLabels[i]).not.toBeUndefined();
            console.log(bottomCustomLabels[i]);
        }
    });
    this.Given(/^I should see a custom label "([^"]*)" on bottom feed item if it has a custom label$/, function (labelName) {
        var bottomCustomLabels = browser.getText(home.bottomCustomLabel);
        expect(bottomCustomLabels[0]).toEqual(labelName);
    });

    this.Given(/^I should see a section name "([^"]*)" on bottom feed item if it does not have a custom label$/, function (sectionName) {
        var bottomCustomLabels = browser.getText(home.bottomCustomLabel);
        expect(bottomCustomLabels[6]).toEqual(sectionName);
    });

    this.Given(/^I should see each bottom feed item containing long title with first long title as "([^"]*)"$/, function (longTitle) {
        var teaserTitleCount = browser.elements(home.bottomFeedLongTitles).value.length;
        var bottomeFeedItems = browser.elements(home.bottomFeedNumber).value.length;
        expect(teaserTitleCount).toEqual(bottomeFeedItems);
        var teaserTitle = browser.getText(home.bottomFeedLongTitles);
        for (var i=0; i<teaserTitle.length; i++){
            expect(teaserTitle[i]).not.toBeUndefined();
            console.log("Bottom feed Long Titles are::" + teaserTitle[i]);
        }
        expect(teaserTitle[0]).toMatch(longTitle);
    });

    this.Given(/^I should see each bottom feed item containing short teaser with first short teaser as "([^"]*)"$/, function (shortTeaser) {
        var bottomFeedTeaserCount = browser.elements(home.bottomFeedShortTeasers).value.length;
        var bottomeFeedItems = browser.elements(home.bottomFeedNumber).value.length;
        expect(bottomFeedTeaserCount).toEqual(bottomeFeedItems);
        var bottomFeedTeaser = browser.getText(home.bottomFeedShortTeasers);
        for (var i=0; i<bottomFeedTeaser.length; i++){
            expect(bottomFeedTeaser[i]).not.toBeUndefined();
            console.log(bottomFeedTeaser[i]);
        }
        expect(bottomFeedTeaser[0]).toEqual(shortTeaser);
    });
    this.Given(/^Image and long title in each bottom feed item are clickable to open its page with first bottom teaser page as "([^"]*)"$/, function (teaserPage) {
        var bottomTeaserImg = browser.getAttribute(home.bottomFeedImg,'href');
        var bottomTeaserTitle = browser.getAttribute(home.bottomFeedTeaserTitle, 'href');
        expect(bottomTeaserImg).toEqual(bottomTeaserTitle);
        console.log(bottomTeaserImg);
       expect(bottomTeaserImg[0]).toMatch(teaserPage);
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
