var site_nav = require('../page_objects/site_navigation_widget');
var wn_ads = require('../page_objects/ads_widget');
var wait = require('../../../node_modules/@bxm/automation/lib/utils/wait');

module.exports = function() {
    this.Then(/^I should see the site header banner$/, function () {
        browser.waitForVisible(site_nav.siteNavHeader, 3000);
    });

    this.Then(/^I should see the theme nav background$/, function () {
        var headerBackground = browser.getAttribute(site_nav.siteNavHeaderBackground,'style');
        expect(headerBackground).toContain('background-color');
        expect(headerBackground).toContain('background-image: url');
    });

    this.Then(/^I should see the site header logo clickable to open homepage$/, function () {
        const { siteNavHeaderLogo } = site_nav;

        browser.waitForVisible(siteNavHeaderLogo, 3000);
        const headerLogo = browser.$(siteNavHeaderLogo);
        const headerLogoLink = headerLogo.getAttribute('href');
        expect(headerLogoLink).not.toEqual('');
    });

    this.Then(/^I should see the site header logo in sticky nav clickable to open homepage$/, function () {
        const { siteNavStickyLogo } = site_nav;

        browser.waitForVisible(siteNavStickyLogo, 3000);
        const headerLogo = browser.$(siteNavStickyLogo);
        const headerLogoLink = headerLogo.getAttribute('href');
        expect(headerLogoLink).not.toEqual('');
    });

    this.Then(/^I should see the site navigation in hamburger menu$/, function () {
        browser.waitForVisible(site_nav.siteHamburger, 1000);
        browser.click(site_nav.siteHamburger);
        browser.waitForVisible(site_nav.siteHamburgerDetail, 3000);

        wait(500); // ensure it waits for transition effect to complete
        browser.click(site_nav.siteHamburgerClose);

    });

    this.Then(/^I should not see the site navigation links$/, function () {
        expect(browser.isVisible(site_nav.siteNavSection)).toEqual(false);
    });

    this.Then(/^I can see the link "([^"]*)" is highlighted on the navigation links$/, function (section) {
        const { siteNavActiveLink } = site_nav;
        expect(browser.$(siteNavActiveLink).getText()).toEqual(section);
    });

    this.Then(/^I can see the link "([^"]*)" is highlighted on the hamburger navigation links$/, function (section) {
        browser.waitForVisible(site_nav.siteHamburger,3000); //to ensure the hamburger menu is visible before clicking
        browser.click(site_nav.siteHamburger);
        browser.waitForVisible(site_nav.siteHamburgerDetail, 3000);
        var activeLink = (browser.getText(site_nav.siteHamburgerActiveLink));
        expect(activeLink).toEqual(section);
        wait(500); // ensure it waits for transition effect to complete
        browser.click(site_nav.siteHamburgerClose);
    });

    this.Then(/^when I scroll down in the page$/, function () {
        browser.scroll(0, 1000);

        // Wait to make sure the top sticky banner appear and then disappear before verifying the nav bar in the next step
        browser.waitUntil(function () {
            return browser.isVisible(wn_ads.stickyTopBanner) === true
        }, 5000, 'expected the sticky top banner appears')
        browser.waitUntil(function () {
            return browser.isVisible(wn_ads.stickyTopBanner) === false
        }, 5000, 'expected the sticky top banner disappears');
    });

    this.Then(/^I should see the hamburger menu$/, function () {
        expect(browser.isVisible(site_nav.siteHamburger)).toEqual(true);
    });

    this.Then(/^I should not see the hamburger menu$/, function () {
        expect(browser.isVisible(site_nav.siteHamburger)).toEqual(false);
    });

    this.Then(/^I should see the large header banner clickable to open homepage$/, function () {
        expect(browser.isVisible(site_nav.siteHeaderBanner)).toEqual(true);

        //Validate the logo is clickable to open homepage
        var headerLogoLink = browser.getAttribute(site_nav.siteHeaderBanner,'href');
        expect(headerLogoLink).not.toEqual('');
    });

    this.Then(/^the menu fades out as I scroll down the page$/, function () {
        expect(browser.isVisible(site_nav.menuHeader)).toBe(true);
        browser.scroll(0,1000);
        wait(500);
        expect(browser.getAttribute(site_nav.menuHeader,'class')).toContain('header--hide');
    });

    this.When(/^I click on the brands modal button$/, () => {
        browser.waitForExist(site_nav.brandsModalButton, 3000);
        expect(browser.isVisible(site_nav.brandsModalButton)).toBe(true);        
        browser.click(site_nav.brandsModalButton);
    });

    this.Then(/^I can navigate to the brands in the modal$/, (dataTable) => {
        const rows = dataTable.hashes();
        expect(browser.isVisible(site_nav.brandsModal)).toBe(true);

        browser.$$(site_nav.brandsModalLink).forEach((el, index) => {
            const { title, url } = rows[index];
            
            expect(el.getAttribute('href')).toContain(url);
            expect(el.$('img').getAttribute('alt')).toEqual(title);
        });
    });    

    this.When(/^I close the brands modal$/, function () {
        browser.$(site_nav.brandsModalCloseButton).click();
      });

    this.Then(/^I can no longer see the brands modal$/, () => {
        expect(browser.isVisible(site_nav.brandsModal)).toBe(false);
      })
};
