var section = require('../page_objects/section_widget');
var world = require('../world');

module.exports = function(){

    this.When(/^I should see the section title containing the default word as now$/, function () {
        //Verify the section title
        var sectionTitle = browser.getText(section.sectionTitle);
        console.log(sectionTitle);
        expect(sectionTitle).toContain("now");
    });

};
