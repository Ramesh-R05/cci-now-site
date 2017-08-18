var world = require('../world');

module.exports = function(){

    this.Then(/^I should see correct meta tag in view source$/, function (dataTable) {
        var rows = dataTable.hashes();
        rows.forEach((row) => {
            // Find a value in content attribute
            var content = browser.getAttribute('meta[' + row['field'] + '="' + row['value'] + '"]', "content");

            // Validate content value to not be empty
            if (content.constructor === Array) {
                content.forEach((c) => {
                    expect(c).not.toEqual('');
                });
            } else {
                expect(content).not.toEqual('');
            }
        });
    });
}

