var world = require('../world');
var window_handler = require('../../../node_modules/@bxm/automation/lib/utils/window_handler');
var wait = require('../../../node_modules/@bxm/automation/lib/utils/wait');
var loadMore = require('../page_objects/loadmore_widget');

module.exports = function() {
    this.When(/^I switch to "([^"]*)" view$/, function(device) {
        var window = new window_handler(browser);
        window.windowResize(device);

        browser.waitUntil(
            () => {
                const isDocumentReady = browser.execute(() => document.readyState);

                return isDocumentReady.value === 'complete';
            },
            10000,
            'page not fully loaded',
            500
        );
    });

    this.Given(/^I am currently viewing the homepage$/, function() {
        var pageUrl = world.Urls.home_page;
        browser.url(pageUrl);
        browser.waitUntil(
            function() {
                const isDocumentReady = browser.execute(() => document.readyState);
                return browser.getUrl() === pageUrl && isDocumentReady.value === 'complete';
            },
            10000,
            500
        );

        expect(browser.getUrl() === pageUrl);
    });

    this.Given(/^I am currently viewing "([^"]*)"$/, function(pagename) {
        var pageUrl = world.Urls.home_page + pagename;
        browser.url(pageUrl);
        browser.waitUntil(
            function() {
                return browser.getUrl() === pageUrl;
            },
            20000,
            10000
        );
    });

    this.When(/^I scroll the page down$/, function() {
        browser.scroll(0, 250);
    });

    this.When(/^I scroll the page up$/, function() {
        browser.scroll(250, 0);
    });

    this.When(/^I click on the Load More button$/, function() {
        const { loadMoreButton } = loadMore;

        function scrollAndCentreLoadMore() {
            const x = browser.getLocation(loadMore.loadMoreButton, 'x');
            const y = browser.getLocation(loadMore.loadMoreButton, 'y');

            browser.scroll(x, y - 150);
        }

        browser.$(loadMoreButton).waitForVisible(5000);
        scrollAndCentreLoadMore();
        browser.$(loadMoreButton).waitForVisible(8000);
        scrollAndCentreLoadMore();
        browser.$(loadMoreButton).waitForVisible(8000);
        scrollAndCentreLoadMore();

        browser.click(loadMore.loadMoreButton);

        wait(5000);
    });
};
