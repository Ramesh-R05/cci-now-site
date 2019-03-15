const footer = require('../page_objects/footer_widget');

module.exports = function() {

    this.Given(/^I can see the social icons clickable to open its page in the footer$/,  (dataTable) => {
        const [facebook, twitter, instagram] = dataTable.hashes();
        const { footerSocialFacebook, footerSocialTwitter, footerSocialInsta } = footer;

        expect(browser.$(footerSocialFacebook).$('a').getAttribute('href')).toEqual(facebook.url);
        expect(browser.$(footerSocialTwitter).$('a').getAttribute('href')).toEqual(twitter.url);
        expect(browser.$(footerSocialInsta).$('a').getAttribute('href')).toEqual(instagram.url);
    });

    this.Given(/^I can navigate to all brands in the footer$/,  (dataTable) => {
        const rows = dataTable.hashes();
        const { footerBrandslinks } = footer;        

        browser.$$(footerBrandslinks).forEach((link, index) => {
            const {title, url} = rows[index];

            expect(link.getText()).toEqual(title);
            expect(link.getAttribute('href')).toContain(url);
        });
    });

    this.Given(/^I can navigate to all network sites in the footer$/,  (dataTable) => {
        const rows = dataTable.hashes();
        const { footerNetworkLinks } = footer;        

        browser.$$(footerNetworkLinks).forEach((link, index) => {
            const {title, url} = rows[index];

            expect(link.getText()).toEqual(title);
            expect(link.getAttribute('href')).toEqual(url);
        });
    });

    this.Given(/^I can navigate to all standard pages in the footer$/,  (dataTable) => {
        const rows = dataTable.hashes();
        const { footerCorporateLinks } = footer;        

        browser.$$(footerCorporateLinks).forEach((link, index) => {
            const {page, url} = rows[index];

            expect(link.getText()).toEqual(page);
            expect(link.getAttribute('href')).toEqual(url);
        })
    });

    this.Given(/^I can see the standard copyright text in the footer as "([^"]*)"$/,  (text) => {
        // Validate the copyright text is correct
        expect(browser.getText(footer.footerElementCopyright)).toContain(text)
    });

    this.Given(/^I can see all main elements in the footer$/,  () => {
        // Validate that the four main elements in the footer appears

        expect(browser.isVisible(footer.footerNewsletterSubscribe)).toBe(true);
        expect(browser.isVisible(footer.footerElementSocialContainer)).toBe(true);
        expect(browser.isVisible(footer.footerBrandsList)).toBe(true);
        expect(browser.isVisible(footer.footerNetworkList)).toBe(true);
        expect(browser.isVisible(footer.footerCorporateList)).toBe(true);
    });
};
