var home = require('../page_objects/homepage_widget');
var world = require('../world');
var wait = require('../../../node_modules/@bxm/automation/lib/utils/wait');
var validatePolar = require('../../../node_modules/@bxm/automation/lib/utils/validatePolar');
var validateImageURL = require('../../../node_modules/@bxm/automation/lib/utils/validateImageURL');

module.exports = function(){

    this.When(/^I should see the main hero item containing its image and clickable to open its page$/, function () {
        //Verify the hero image
        var heroImgUrl = browser.getAttribute(home.heroImgUrl, 'data-srcset');
        console.log(heroImgUrl);
        validateImageURL(heroImgUrl);
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
            validateImageURL(topFeedTeaserImgUrl[i]);
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

    this.When(/^I should see each top feed item containing source and date$/, function () {
        //verify sources of all teasers
        console.log(browser.elements(home.topFeedTeaserSource).value.length);
        var topFeedTeaserSource = browser.getText(home.topFeedTeaserSource);
        for (var i=0; i<topFeedTeaserSource.length; i++){
            var valueSourceDate = topFeedTeaserSource[i].split("|");
            console.log( i + ":Source:" + valueSourceDate[0]);
            //validate the source
            expect(valueSourceDate[0]).not.toEqual('');
            if (i != 0 && i != 5){ //Skip the polar ad spot as no date is required
                console.log( i + ":Date:" + valueSourceDate[1]);
                //validate the date
                expect(valueSourceDate[1]).not.toEqual('');
                expect(valueSourceDate[1]).not.toMatch('ago');
                expect(valueSourceDate[1]).toEqual(valueSourceDate[1].toUpperCase());
            }
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
            validateImageURL(bottomFeedTeaserImgUrl[i]);
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

    this.When(/^I should see each bottom feed item containing source and date$/, function () {
        //verify sources of all teasers
        console.log(browser.elements(home.bottomFeedTeaserSource).value.length);
        var bottomFeedTeaserSource = browser.getText(home.bottomFeedTeaserSource);
        for (var i=0; i<bottomFeedTeaserSource.length; i++){
            var valueSourceDate = bottomFeedTeaserSource[i].split("|");
            console.log( i + ":Source:" + valueSourceDate[0]);
            //validate the source
            expect(valueSourceDate[0]).not.toEqual('');
            if (i != 1 && i != 5){ //Skip the polar ad spot as no date is required
                console.log( i + ":Date:" + valueSourceDate[1]);
                //validate the date
                expect(valueSourceDate[1]).not.toEqual('');
                expect(valueSourceDate[1]).not.toMatch('ago');
                expect(valueSourceDate[1]).toEqual(valueSourceDate[1].toUpperCase());
            }
        }
    });

    this.When(/^I should see must read header as "([^"]*)"$/, function (name) {
        //verify the must read title
        var title = browser.getText(home.mustreadHeader);
        expect(title).toEqual(name);
    });

    this.Given(/^I should see (\d+) must read images and titles which are clickable to open their page$/, function(number) {
        //find elements of image and title of all must read items
        wait(5000); //wait due to polar ads
        var mustreadImage = browser.getAttribute(home.mustreadImage,'data-srcset');
        var mustreadImageLink = browser.getAttribute(home.mustreadImageLink,'href');
        var mustreadTitle = browser.getText(home.mustreadTitle);
        var mustreadTitleLink = browser.getAttribute(home.mustreadTitle,'href');

        //validate image and title and their links
        for (var i=0; i<number; i++){
            console.log( i + ":" + mustreadImage[i] + " => " + mustreadTitle[i] + " => " + mustreadImageLink[i]);
            validateImageURL(mustreadImage[i]);
            expect(mustreadImageLink[i]).not.toEqual('');
            expect(mustreadTitle[i]).not.toEqual('');
            expect(mustreadTitleLink[i]).toEqual(mustreadImageLink[i]);
        }
    });

    this.Then(/^I should see each must read items containing gtm$/, function(dataTable){
        var rows = dataTable.hashes();

        //find elements
        var mustreadImageGTM = browser.getAttribute(home.mustreadImageLink,'class');
        var mustreadTitleGTM = browser.getAttribute(home.mustreadTitle,'class');

        //validate gtm name
        for (var i = 0; i < mustreadImageGTM.length; ++i) {
            var row = rows[i];
            expect(mustreadImageGTM[i]).toMatch(row['gtm']);
            expect(mustreadTitleGTM[i]).toMatch(row['gtm']);
        }
    });

    this.When(/^I should see promoted header as "([^"]*)"$/, function (name) {
        //verify the promoted title
        var title = browser.getText(home.promotedHeader);
        expect(title).toEqual(name);
    });

    this.When(/^I should see promoted header$/, function () {
        //verify the promoted title is not blank (for live sanity)
        var title = browser.getText(home.promotedHeader);
        expect(title).not.toEqual('');
    });

    this.Given(/^I should see (\d+) promoted images and titles which are clickable to open their page$/, function(number) {
        //find elements of image and title of all promoted items
        var promotedImage = browser.getAttribute(home.promotedImage,'data-srcset');
        var promotedImageLink = browser.getAttribute(home.promotedImageLink,'href');
        var promotedTitle = browser.getText(home.promotedTitle);
        var promotedTitleLink = browser.getAttribute(home.promotedTitle,'href');

        //validate image and title and their links
        for (var i=0; i<number; i++){
            console.log( i + ":" + promotedImage[i] + " => " + promotedTitle[i] + " => " + promotedImageLink[i]);
            validateImageURL(promotedImage[i]);
            expect(promotedImageLink[i]).not.toEqual('');
            expect(promotedTitle[i]).not.toEqual('');
            expect(promotedTitleLink[i]).toEqual(promotedImageLink[i]);
        }
    });

    this.Then(/^I should see each promoted items containing gtm$/, function(dataTable){
        var rows = dataTable.hashes();

        //find elements
        var promotedImageGTM = browser.getAttribute(home.promotedImageLink,'class');
        var promotedTitleGTM = browser.getAttribute(home.promotedTitle,'class');

        //validate gtm name
        for (var i = 0; i < promotedImageGTM.length; ++i) {
            var row = rows[i];
            expect(promotedImageGTM[i]).toMatch(row['gtm']);
            expect(promotedTitleGTM[i]).toMatch(row['gtm']);
        }
    });

    this.Given(/^I can see the social icons clickable to open its page in the RHS$/, function (dataTable) {
        var rows = dataTable.hashes();

        //below captures the array of social links to validate against the table
        var socialLink = browser.getAttribute(home.rhsSocialLink, 'href');

        for (var i = 0; i < rows.length; ++i) {
            var row = rows[i];
            //validates position of social icons on Index and their link
            console.log(row['social'] + ' : ' + socialLink[i]);
            expect(socialLink[i]).toContain(row['url']);
        }
    });

    this.Given(/^the below position top teasers are replaced with polar ads$/, function (table) {
        browser.waitForExist('.teaser--polar', 10000);
        var listOfItems = browser.getAttribute(home.topTeasers, 'class');
        var rows = table.hashes();
        var count = rows.length;
        validatePolar(listOfItems, rows, count);
    });

    this.Given(/^the below position bottom teasers are replaced with polar ads$/, function (table) {
        browser.waitForExist('.teaser--polar', 10000);
        var listOfItems = browser.getAttribute(home.bottomTeasers, 'class');
        console.log(listOfItems.length);
        var rows = table.hashes();
        var count = rows.length;
        validatePolar(listOfItems, rows, count);
    });

    this.Given(/^the below position added more teasers are replaced with polar ads$/, function (table) {
        browser.waitForExist('.teaser--polar', 10000);
        var listOfItems = browser.getAttribute(home.loadMoreFeed, 'class');
        console.log(listOfItems.length);
        var rows = table.hashes();
        var count = rows.length;
        validatePolar(listOfItems, rows, count);
    });

    this.When(/^I should see each load more feed item containing its image and clickable to open its page$/, function () {
        //verify images of all teasers
        console.log(browser.elements(home.loadMoreFeedTeaserImg).value.length);
        var loadMoreFeedTeaserImgUrl = browser.getAttribute(home.loadMoreFeedTeaserImg,'data-srcset');
        var loadMoreFeedTeaserImgLink = browser.getAttribute(home.loadMoreFeedTeaserImgLink,'href');
        for (var i=0; i<loadMoreFeedTeaserImgUrl.length; i++){
            console.log( i + ":" + loadMoreFeedTeaserImgUrl[i] + " => " + loadMoreFeedTeaserImgLink[i]);
            validateImageURL(loadMoreFeedTeaserImgUrl[i]);
            expect(loadMoreFeedTeaserImgLink[i]).not.toEqual('');
        }
    });

};
