var world = require('../world');
var waitUtl = require('../../../node_modules/@bxm/automation/lib/utils/wait');
var wn_article = require('../page_objects/article_widget');
var wn_social = require('../page_objects/social_widget');
var food_search = require('../page_objects/search_widget');
var nconf = require('nconf');

module.exports = function(){

        this.Given(/^I navigate to an article page$/, function () {
            browser.url(world.Urls.home_page);
            browser.click("li.article-container-item");
        });

        this.Then(/^I can see the social share icons$/, function () {
            browser.isVisibleWithinViewport(wn_social.facebookBtn);
            browser.isVisibleWithinViewport(wn_social.tweeterBtn);
            browser.isVisibleWithinViewport(wn_social.pinterestBtn);
            browser.isVisibleWithinViewport(wn_social.emailBtn);
        });

        this.Then(/^see the publishing date$/, function () {
                console.log(browser.getText(wn_article.dateText));
        });

        this.Then(/^I can see the reactions to this article$/, function () {
            browser.scroll(wn_article.smileBtn);
            browser.click(wn_article.smileBtn);
            console.log(browser.getText(wn_article.reactionText));
        });

        this.Given(/^the user lands on the "([^"]*)" tage page$/, function (tag) {
            browser.url(world.Urls.home_page+"tags/"+tag);
            global.tagText = tag;
        });

        this.Then(/^the results are presented on the page$/, function () {
            var header = browser.getText(".search-results__header");
            expect(header).toContain(tagText);
            console.log(header);
        });

        this.When(/^I search for "([^"]*)" using the search box$/, function (tag) {
            browser.click('button.search__button');
            browser.setValue(".search__input",tag);
            browser.click('.button--submit');
            global.tagText = tag;
        });

        this.When(/^I click on Load More$/, function () {
            browser.click(".button--loadmore");
        });

        this.Given(/^I can see the version of the site$/, function () {
            browser.url(world.Urls.home_page+"version");
            browser.waitUntil(function () {
                return browser.getUrl() === world.Urls.home_page+"version";
            }, 20000, 1000);
            console.log(browser.getSource());
            expect(browser.getSource()).toContain('buildNumber')
        });

        this.Given(/^I can validate that "([^"]*)" is NOT present$/, function (tag) {
            expect(browser.getSource()).not.toContain('"targets":{"env":"test"}}');
        });

        this.Given(/^I am currently viewing a gallery page$/, function () {
            // use the site domain to select different URL
            browser.url(world.Urls.home_page + "beauty/12-beauty-buys-under-8-dollars-12381");
        });

        this.Given(/^I am currently viewing an article page$/, function () {
            // use the site domain to select different URL
            browser.url(world.Urls.home_page + "celebrity/emma-watson-splits-from-beau-will-adamowicz-3207");
        });

};
