var error = require('../page_objects/error_widget');

module.exports = function() {

    this.Then(/^I should see the error title as "([^"]*)"$/, function (title) {
        var errorTitle = browser.getText(error.errorTitle);
        expect(errorTitle).toEqual(title);
    });

    this.Then(/^I should see the error giphy image$/, function () {
        var errorImage = browser.getAttribute(error.errorImage,'src');
        expect(errorImage).not.toEqual('');
    });

    this.Then(/^I should see the text clickable to homepage with gtm "([^"]*)"$/, function (gtm) {
        //Get values
        var errorText = browser.getText(error.errorLink);
        var errorLink = browser.getAttribute(error.errorLink,'href');
        var errorGTM = browser.getAttribute(error.errorLink,'class');

        //Validate text, link and gtm
        console.log(errorText);
        expect(errorText).not.toEqual('');
        console.log(errorLink);
        expect(errorLink).not.toEqual('');
        expect(errorGTM).toMatch(gtm);
    });
};
