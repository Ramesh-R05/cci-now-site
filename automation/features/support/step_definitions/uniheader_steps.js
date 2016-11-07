var wn_menu = require('../page_objects/wn_header_widget');

module.exports = function() {

     this.Given(/^I can navigate to all sites in the desktop list on the header$/, function (dataTable) {
         var rows = dataTable.hashes();
        //below captures the array of menu items to validate agains the table
  
        var menuTitle = browser.getAttribute('nav.uniheader__nav ul li a', 'title');
        var menuhref = browser.getAttribute('nav.uniheader__nav ul li a', 'href');
        var menuTag = browser.getAttribute('nav.uniheader__nav ul li a', 'class');
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

