var home = require('../page_objects/homepage_widget');
var world = require('../world');
var wait = require('../../../node_modules/@bxm/automation/lib/utils/wait');
var validatePolar = require('../../../node_modules/@bxm/automation/lib/utils/validatePolar');
var validateImageURL = require('../../../node_modules/@bxm/automation/lib/utils/validateImageURL');

module.exports = function() {
    this.When(/^I should see the main hero item containing its image and clickable to open its page$/, function() {
        const { heroImgUrl, heroImgLink } = home;

        const imgUrl = browser.$(heroImgUrl).getAttribute('data-srcset');
        const imgLink = browser.$(heroImgLink).getAttribute('href');

        validateImageURL(imgUrl);
        expect(imgLink).not.toEqual('');
    });

    this.When(/^I should see the main hero item containing its title and clickable to open its page$/, function() {
        //Verify the hero title
        var heroTitle = browser.getText(home.heroTitle);
        expect(heroTitle).not.toEqual('');
        //Verify the hero title's link
        var heroTitleLink = browser.getAttribute(home.heroTitle, 'href');
        expect(heroTitleLink).not.toEqual('');
    });

    this.When(/^I should see the main hero item containing source$/, function() {
        //Verify the hero source
        var heroSource = browser.getText(home.heroSource);
        expect(heroSource).not.toEqual('');
    });

    this.When(/^The homepage hero image should be clickable to open its page$/, function() {
        var heroImgLink = browser.getAttribute(home.heroImgLink, 'href');
        expect(heroImgLink).not.toEqual('');
    });

    this.When(/^I should see (\d+) "([^"]*)" half feed$/, function(number, part) {
        var feedItems_element;

        switch (part) {
            case 'top':
                feedItems_element = home.topFeedNumber;
                break;
            case 'bottom':
                feedItems_element = home.bottomFeedNumber;
                break;
        }
        var feedItems = browser.elements(feedItems_element).value.length;
        expect(feedItems).toEqual(parseInt(number, 10));
    });

    this.When(/^I should see a "([^"]*)" feed item containing its image and clickable to open its page$/, function(part) {
        var feedTeaserImg_element, feedTeaserImgLink_element, i;

        switch (part) {
            case 'top':
                feedTeaserImg_element = home.topFeedTeaserImg;
                feedTeaserImgLink_element = home.topFeedTeaserImgLink;
                i = 4; //Test the 5th item which is array no.4
                break;
            case 'bottom':
                feedTeaserImg_element = home.bottomFeedTeaserImg;
                feedTeaserImgLink_element = home.bottomFeedTeaserImgLink;
                i = 6; //Test the 7th item which is array no.6
                break;
        }

        //verify images of all teasers
        var feedTeaserImgUrl = browser.getAttribute(feedTeaserImg_element, 'data-srcset');
        var feedTeaserImgLink = browser.getAttribute(feedTeaserImgLink_element, 'href');
        validateImageURL(feedTeaserImgUrl[i]);
        expect(feedTeaserImgLink[i]).not.toEqual('');
    });

    this.When(/^I should see a "([^"]*)" feed item containing its title and clickable to open its page$/, function(part) {
        var feedTeaserTitle_element, i;

        switch (part) {
            case 'top':
                feedTeaserTitle_element = home.topFeedTeaserTitle;
                i = 4; //Test the 5th item which is array no.4
                break;
            case 'bottom':
                feedTeaserTitle_element = home.bottomFeedTeaserTitle;
                i = 6; //Test the 7th item which is array no.6
                break;
        }

        //verify titles of all teasers
        var feedTeaserTitle = browser.getText(feedTeaserTitle_element);
        var feedTeaserTitleLink = browser.getAttribute(feedTeaserTitle_element, 'href');
        expect(feedTeaserTitle[i]).not.toEqual('');
        expect(feedTeaserTitleLink[i]).not.toEqual('');
    });

    this.When(/^I should see a "([^"]*)" feed item containing source and date$/, function(part) {
        var feedTeaserSource_element, i;

        switch (part) {
            case 'top':
                feedTeaserSource_element = home.topFeedTeaserSource;
                i = 4; //Test the 5th item which is array no.4
                break;
            case 'bottom':
                feedTeaserSource_element = home.bottomFeedTeaserSource;
                i = 6; //Test the 7th item which is array no.6
                break;
        }

        //verify sources of all teasers
        var feedTeaserSource = browser.getText(feedTeaserSource_element);
        var valueSourceDate = feedTeaserSource[i].split('|');
        //validate the source
        expect(valueSourceDate[0]).not.toEqual('');
        //validate the date
        expect(valueSourceDate[1]).not.toEqual('');
    });

    this.When(/^I should see must read header as "([^"]*)"$/, function(name) {
        //verify the must read title
        var title = browser.getText(home.mustreadHeader);
        expect(title).toEqual(name);
    });

    this.Given(/^I should see (\d+) must read images and titles which are clickable to open their page$/, function(number) {
        const { mustReadItem } = home;
        wait(5000); //wait due to polar ads

        const allMustReadItems = browser.$$(mustReadItem);
        debugger;
        const displayedElements = allMustReadItems.filter(
            element => element.isVisible()
        );

        expect(displayedElements.length).toEqual(parseInt(number, 10));

        displayedElements.forEach(mustReadItem => {
            const mustreadTitle = mustReadItem.$('.teaser__title').getText();
            const mustreadImage = mustReadItem.$('img').getAttribute('data-srcset');
            const mustreadImageLink = mustReadItem.$('.teaser__image').getAttribute('href');
            const mustreadTitleLink = mustReadItem.$('.teaser__title a').getAttribute('href');

            validateImageURL(mustreadImage);
            expect(mustreadTitle).not.toEqual('');
            expect(mustreadImageLink).not.toEqual('');
            expect(mustreadTitleLink).toEqual(mustreadImageLink);
        });
    });

    this.When(/^I should see promoted header as "([^"]*)"$/, function(name) {
        //verify the promoted title
        var title = browser.getText(home.promotedHeader);
        expect(title).toEqual(name);
    });

    this.When(/^I should see promoted header$/, function() {
        //verify the promoted title is not blank (for live sanity)
        var title = browser.getText(home.promotedHeader);
        expect(title).not.toEqual('');
    });

    this.Given(/^I should see (\d+) promoted images and titles which are clickable to open their page$/, function(number) {
        const { promotedItems } = home;

        const displayedElements = browser.$$(promotedItems).filter(element => element.isVisible());

        expect(displayedElements.length).toEqual(parseInt(number, 10));

        displayedElements.forEach(promotedItem => {
            const promotedTitle = promotedItem.$('.teaser__title').getText();
            const promotedImage = promotedItem.$('img').getAttribute('data-srcset');
            const promotedImageLink = promotedItem.$('.teaser__image').getAttribute('href');
            const promotedTitleLink = promotedItem.$('.teaser__title a').getAttribute('href');

            validateImageURL(promotedImage);
            expect(promotedTitle).not.toEqual('');
            expect(promotedImageLink).not.toEqual('');
            expect(promotedTitleLink).toEqual(promotedImageLink);
        });
    });

    this.Then(/^I should see each promoted items containing gtm$/, function(dataTable) {
        var rows = dataTable.hashes();

        //find elements
        var promotedImageGTM = browser.getAttribute(home.promotedImageLink, 'class');
        var promotedTitleGTM = browser.getAttribute(home.promotedTitle, 'class');

        //validate gtm name
        for (var i = 0; i < promotedImageGTM.length; ++i) {
            var row = rows[i];
            expect(promotedImageGTM[i]).toMatch(row['gtm']);
            expect(promotedTitleGTM[i]).toMatch(row['gtm']);
        }
    });

    this.Given(/^I can see the social icons clickable to open its page in the RHS$/, function(dataTable) {
        var rows = dataTable.hashes();

        //below captures the array of social links to validate against the table
        var socialLink = browser.getAttribute(home.rhsSocialLink, 'href');

        for (var i = 0; i < rows.length; ++i) {
            var row = rows[i];
            //validates position of social icons on Index and their link
            if (typeof socialLink === 'string') {
                expect(socialLink).toContain(row['url']);
            } else {
                expect(socialLink[i]).toContain(row['url']);
            }
        }
    });

    this.Given(/^the below position top teasers are replaced with polar ads$/, function(table) {
        browser.waitForExist('.teaser--polar', 10000);
        var listOfItems = browser.getAttribute(home.topTeasers, 'class');
        var rows = table.hashes();
        var count = rows.length;
        validatePolar(listOfItems, rows, count);
    });

    this.Given(/^the below position bottom teasers are replaced with polar ads$/, function(table) {
        browser.waitForExist('.teaser--polar', 10000);
        var listOfItems = browser.getAttribute(home.bottomTeasers, 'class');
        var rows = table.hashes();
        var count = rows.length;
        validatePolar(listOfItems, rows, count);
    });

    this.Given(/^the below position added more teasers are replaced with polar ads$/, function(table) {
        browser.waitForExist('.teaser--polar', 10000);
        var listOfItems = browser.getAttribute(home.loadMoreFeed, 'class');
        var rows = table.hashes();
        var count = rows.length;
        validatePolar(listOfItems, rows, count);
    });

    this.When(/^I should see a load more feed item containing its image and clickable to open its page$/, function() {
        //verify images of one teaser
        var loadMoreFeedTeaserImgUrl = browser.getAttribute(home.loadMoreFeedTeaserImg, 'data-srcset');
        var loadMoreFeedTeaserImgLink = browser.getAttribute(home.loadMoreFeedTeaserImgLink, 'href');
        validateImageURL(loadMoreFeedTeaserImgUrl);
        expect(loadMoreFeedTeaserImgLink).not.toEqual('');
    });
};
