var section = require('../page_objects/section_widget');
var world = require('../world');

module.exports = function(){

    this.When(/^I should not see the section title containing the default word as now$/, function () {
        //Verify the section title
        var sectionTitle = browser.getText(section.sectionTitle);
        expect(sectionTitle).not.toContain("now");
    });

    this.When(/^I should see (\d+) subsection buttons clickable to its subsection page/, function (subsectionAmount) {
        var subsectionHrefs = browser.getAttribute(section.subsectionButton, 'href');
        var subsectionTexts = browser.getText(section.subsectionButton);
        expect(subsectionHrefs.length).toEqual(parseFloat(subsectionAmount));

        subsectionHrefs.forEach((s) => {
            expect(s).not.toEqual('')
        })
        subsectionTexts.forEach((t) => {
            expect(t).not.toEqual('')
        })
    });

    this.Then(/^I should see the "([^"]*)" button highlighted$/, function (subsectionHref) {
        var subsectionButtonStyle = browser.getAttribute('.subsections-list a[href="' + subsectionHref + '"] > span', 'style');
        expect(subsectionButtonStyle).toContain('background');
    });

    this.Then(/^I should see the title changes to "([^"]*)"$/, function (subsectionName) {
        var sectionTitle = browser.getText(section.sectionTitle);
        expect(sectionTitle).toEqual(subsectionName);
    });

};
