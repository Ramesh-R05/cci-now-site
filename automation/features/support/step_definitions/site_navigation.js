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

    this.Then(/^I should see the site header logo clickable to open homepage and contain "([^"]*)" class name$/, function (gtm) {
        browser.waitForVisible(site_nav.siteNavHeaderLogo, 3000);
        //Validate the existence of the logo
        var headerLogo = browser.getCssProperty(site_nav.siteNavHeaderLogo, 'background-image').value;
        expect(headerLogo).toMatch("/assets/logos/header-logo.svg");
        //Validate the logo is clickable to open homepage
        var headerLogoLink = browser.getAttribute(site_nav.siteNavHeaderLogo,'href');
        expect(headerLogoLink).not.toEqual('');
        //Validate GTM
        var headerLogoClass = browser.getAttribute(site_nav.siteNavHeaderLogo,'class');
        expect(headerLogoClass).toContain(gtm);
    });

    this.Then(/^I should see the site navigation "([^"]*)" links and "([^"]*)" class name in "([^"]*)"$/, function (section, gtm, position) {

        var sectionDetail = null;

        //Identify the element
        switch(position) {
            case 'header':
                switch (section) {
                    case 'section':
                        sectionDetail = site_nav.siteNavSectionDetail;
                        break;
                    case 'subsection':
                        sectionDetail = site_nav.siteNavSubSectionListDetail;
                        break;
                }
                break;
            case 'hamburger':
                browser.click(site_nav.siteHamburger);
                browser.waitForVisible(site_nav.siteHamburgerDetail, 3000);
                sectionDetail = site_nav.siteHamburgerDetail;
                break;
        }

        //Get values of class, href, and name
        var navClass = browser.getAttribute(sectionDetail,'class');
        var navLink = browser.getAttribute(sectionDetail,'href');
        var navName = browser.getAttribute(sectionDetail,'textContent');

        //Validate the values
        for (var i=0; i<navName.length; i++){
            console.log( i + ":" + navClass[i] + " => " + navLink[i] + " => " + navName[i]);
            expect(navClass[i]).toContain(gtm);
            expect(navLink[i]).not.toEqual('');
            expect(navName[i]).not.toEqual('');
        }

        //Close the hamburger menu
        if (position == 'hamburger') {
            wait(500); // ensure it waits for transition effect to complete
            browser.click(site_nav.siteHamburgerClose);
        }
    });

    this.Then(/^I should not see the site navigation links$/, function () {
        expect(browser.isVisible(site_nav.siteNavSection)).toEqual(false);
    });

    this.Then(/^I can see the link "([^"]*)" is highlighted on the navigation links$/, function (section) {
        var activeLink = (browser.getText(site_nav.siteNavActiveLink));
        expect(activeLink).toEqual(section);
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

    this.Then(/^I can navigate to all sites in the hamburger navigation menu/, function(dataTable){
        browser.click(site_nav.siteHamburger);
        browser.waitForVisible(site_nav.siteHamburgerDetail, 3000);
        wait(500); // ensure it waits for transition effect to complete
        var rows = dataTable.hashes();

        var menuTitle = browser.getAttribute(site_nav.siteNavLogos, 'title');
        var menuhref = browser.getAttribute(site_nav.siteNavLogos, 'href');
        var menuGTM = browser.getAttribute(site_nav.siteNavLogos, 'class');
        //end

        for (var i = 0; i < rows.length; ++i) {
            var row = rows[i];
            //validates position of menu base on Index
            expect(menuTitle[i]).toEqual(row['title']);
            expect(menuhref[i]).toMatch(row['url']);
            expect(menuGTM[i]).toEqual(row['gtm']);
        }
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
};
