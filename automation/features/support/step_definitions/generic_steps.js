var world = require('../world');
var window_handler = require('../utils/window_handler');
var wait = require('../utils/wait');
var loadMore = require('../page_objects/loadmore_widget');

module.exports = function() {

    //I switch to mobile|desktop|tablet view
    this.When(/^I switch to "([^"]*)" view$/, function (device) {
        var window = new window_handler();
        window.windowResize(device);
    });

    this.Given(/^I am currently viewing the homepage$/, function () {
        browser.url(world.Urls.home_page);
        browser.waitUntil(function () {
            return browser.getUrl() === world.Urls.home_page;
        }, 20000, 1000);
    });

    this.Given(/^I am currently viewing "([^"]*)"$/, function (pagename) {
        browser.url(world.Urls.home_page+pagename);
    });

    this.When(/^I scroll the page down$/, function () {
        browser.scroll(0,250)
    });

    this.When(/^I scroll the page up$/, function () {
        browser.scroll(250,0)
    });

    this.When(/^I click on the Load More button$/, function () {
        //static wait due to elements loading move the load more button and creates error in the script
        wait(3000);

        //scroll to element and a few pixels up to center the button on the screen
        var x = browser.getLocation(loadMore.loadMoreButton, 'x');
        var y = browser.getLocation(loadMore.loadMoreButton, 'y');
        browser.scroll(x-50,y-50);
        browser.waitForVisible(loadMore.loadMoreButton,3000);
        browser.click(loadMore.loadMoreButton);

        //static wait due to elements loading move the load more button and creates error in the script
        wait(5000);
    });
};
