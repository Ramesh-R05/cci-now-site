var section = require('../page_objects/section_widget');
var world = require('../world');

module.exports = function(){

    this.When(/^I should see the page load correctly$/, function(){
        var title = browser.getTitle();
        expect(title).not.toContain('Page not found');
    });

    this.When(/^I should not see the section title containing the default word as now$/, function () {
        //Verify the section title
        var sectionTitle = browser.getText(section.sectionTitle);
        expect(sectionTitle).not.toContain("now");
    });

    this.When(/^I should see the drop down list of subsections with the text as "([^"]*)"$/, function (text) {
        expect(browser.isVisible(section.subsectionList)).toEqual(true);
        expect(browser.getText(section.subsectionList)).toEqual(text);
    });

    this.Then(/^I should see the title changes to "([^"]*)"$/, function (subsectionName) {
        var sectionTitle = browser.getText(section.sectionTitle);
        expect(sectionTitle).toEqual(subsectionName);
    });

    //Load More content
    this.Then(/^I should see extra (\d+) teasers after loading more$/, function (teaserCount) {
        var extraTeasers = browser.elements(section.sectionRepeatableSectionTeaserAfterLoadMore).value.length;

        expect(extraTeasers).toEqual(parseInt(teaserCount),10);
    });

};
