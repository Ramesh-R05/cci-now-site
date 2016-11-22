var uniheader = require('../page_objects/uniheader_widget');

module.exports = function() {

     this.Given(/^I can navigate to all sites in the desktop list on the header$/, function (dataTable) {
         var rows = dataTable.hashes();
        //below captures the array of menu items to validate agains the table

        var menuTitle = browser.getAttribute(uniheader.uniHeader, 'title');
        var menuhref = browser.getAttribute(uniheader.uniHeader, 'href');
        var menuTag = browser.getAttribute(uniheader.uniHeader, 'class');
        //end

        for (var i = 0; i < rows.length; ++i) {
            var row = rows[i];
            //validates position of menu base on Index
            expect(menuTitle[i]).toEqual(row['title']);
            expect(menuhref[i]).toMatch(row['url']);
            expect(menuTag[i]).toEqual(row['tag']);
        }
    });
};
