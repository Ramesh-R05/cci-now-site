var search = require('../page_objects/search_widget');
var wait = require('../../../node_modules/@bxm/automation/lib/utils/wait');
var world = require('../world');

module.exports = function() {
    this.Then(/^I should see the search icon in the navigation bar$/,  () => {
        const { searchNavIcon } = search
        
        browser.scroll(0,0);

        expect(browser.waitForVisible(searchNavIcon, 6000)).toBe(true)
    });

    this.Then(/^I should see the search box after clicking the icon$/,  () => {
        const { searchNavIcon, searchNavBox} = search
    
        browser.$(searchNavIcon).click()
        expect(browser.waitForExist(searchNavBox, 10000)).toBe(true);
    });

    this.Then(/^I should still see the search box after scrolling the page down$/, function () {
        const { searchNavBox, searchNavIcon } = search;
        
        browser.scroll(0,1500);
        wait(3000);
        
        const searchBox = browser.$(searchNavBox)
        
        expect(searchBox.isVisible()).toBe(true);
    });

    this.Then(/^I should be able to search a keyword "([^"]*)" on "([^"]*)" and see the result page$/, function (keyword, position) {
        let searchBox
        let searchSubmit;

        browser.scroll(0,0);

        switch (position){
            case 'navigation bar' :
                searchBox = search.searchNavBox;
                searchSubmit = search.searchNavSubmit;
                if (browser.isVisible(search.searchNavBox) === false) {
                    browser.click(search.searchNavIcon);
                    browser.waitForVisible(searchBox,6000);
                }
                break;
            case 'search result page' :
                browser.url(world.Urls.home_page + 'search/wedding');
                searchBox = search.searchResultPageBox;
                searchSubmit = search.searchResultPageSubmit;
                break;
        }

        browser.$(searchBox).setValue(keyword); 
        browser.click(searchSubmit);
        wait(1000);

        //Check the search result title
        browser.waitForVisible(search.searchResultPageTitle, 5000);
        var searchTitle = browser.getText(search.searchResultPageTitle);

        const capitalisedKeyword = keyword[0].toUpperCase() + keyword && keyword.slice(1)

        expect(searchTitle).toContain(`${capitalisedKeyword} Results`);

        //Check the first teaser containing the keyword in the teaser title
        var searchTeaserTitle = browser.getText(search.searchResultPageTeaserTitle);
        expect(searchTeaserTitle.toLowerCase()).toContain(keyword);
    });

    this.Then(/^I should not see the search bar on the search result page in mobile version$/, function () {
        var searchBox = browser.isVisible(search.searchResultPageBox);
        expect(searchBox).toBe(false);
    });

};
