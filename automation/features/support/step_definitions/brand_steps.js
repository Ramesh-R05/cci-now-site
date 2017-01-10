var brand = require('../page_objects/brand_widget');
var world = require('../world');

module.exports = function(){

    this.When(/^I should see the brand title logo on the brand landing page$/, function () {
        //Verify the brand title logo
        var brandTitleLogo = browser.getAttribute(brand.brandTitleLogo, 'src');
        console.log(brandTitleLogo);
        expect(brandTitleLogo).not.toBeUndefined();
    });

    this.When(/^I should see the breadcrumb of "([^"]*)" on the brand landing page$/, function (name) {
        //Verify the breadcrumb
        var brandBreadcrumb = browser.getText(brand.brandBreadcrumb);
        console.log(brandBreadcrumb);
        var valueBreadcrumb = brandBreadcrumb.split(">");
        console.log("Site: " + valueBreadcrumb[0]);
        console.log("Brand: " + valueBreadcrumb[1]);
        //validate the site
        expect(valueBreadcrumb[0]).toEqual("NOW TO LOVE ");
        //validate the brand
        expect(valueBreadcrumb[1]).toMatch(name);
    });

    this.When(/^I should not see the breadcrumb on the brand landing page$/, function () {
        //Verify the breadcrumb is not visible
        var brandBreadcrumb = browser.isVisible(brand.brandBreadcrumb);
        expect(brandBreadcrumb).toBe(false);
    });

    this.When(/^I should see the main hero item containing "([^"]*)" source and date$/, function (name) {
        //verify source and date of the main hero item
        var heroSource = browser.getText(brand.heroSource);
        console.log(heroSource);
        var valueSourceDate = heroSource.split("|");
        console.log("Source: " + valueSourceDate[0]);
        console.log("Date: " + valueSourceDate[1]);
        //validate the source
        expect(valueSourceDate[0]).toEqual(name);
        //validate the date
        expect(valueSourceDate[1]).not.toEqual('');
        expect(valueSourceDate[1]).toEqual(valueSourceDate[1].toUpperCase());
    });


    this.When(/^I should see the correct brand "([^"]*)" link as "([^"]*)"$/, function (element,link) {
        //Identify the element
        switch(element) {
            case 'subscribe':
                var brandElement = brand.brandSubscribeLink
                break;
            case 'facebook':
                var brandElement = brand.brandFacebookLink
                break;
            case 'twitter':
                var brandElement = brand.brandTwitterLink
                break;
            case 'instagram':
                var brandElement = brand.brandInstagramLink
                break;
        }

        //Get value of href
        var brandElementLink = browser.getAttribute(brandElement,'href');
        console.log(brandElementLink);
        //Validate the values [This is to check the link on both two positions as we show/hide on different breakpoints]
        for (var i=0; i<brandElementLink.length; i++){
            console.log(i + ":" +brandElementLink[i]);
            expect(brandElementLink[i]).toContain(link);
        }
    });

    this.When(/^I should see the subscribe element under "([^"]*)" and containing title "([^"]*)" and image$/, function (position,title) {
        //Identify the element
        switch(position) {
            case 'MREC':
                var brandSubscribeTitle = brand.brandSubscribeTitleDesktop
                var brandSubscribeImage = brand.brandSubscribeImageDesktop
                break;
            case 'hero teaser':
                var brandSubscribeTitle = brand.brandSubscribeTitleMobile
                var brandSubscribeImage = brand.brandSubscribeImageMobile
                break;
        }

        //Get value of title and image
        var subscribeTitle = browser.getText(brandSubscribeTitle);
        var subscribeImage = browser.getAttribute(brandSubscribeImage,'srcset');

        //Validate title and image
        console.log(subscribeTitle);
        expect(subscribeTitle).toEqual(title);
        console.log(subscribeImage);
        expect(subscribeImage).not.toEqual('');
    });

    this.When(/^I should see the follow us element under "([^"]*)"$/, function (position) {
        //Identify the element
        switch(position) {
            case 'MREC':
                var brandSocialTitle = brand.brandSocialTitleDesktop
                break;
            case 'hero teaser':
                var brandSocialTitle = brand.brandSocialTitleMobile
                break;
        }

        //Validate the element is existing
        expect(browser.isVisible(brandSocialTitle)).toEqual(true);
    });

    this.When(/^I should see the subscribe button containing GTM "([^"]*)"$/, function (gtm) {
        //Identify the element
        var brandSubscribeGTM = browser.getAttribute(brand.brandSubscribeLink, 'class');

        //Validate the element is existing
        for (var i=0; i<brandSubscribeGTM.length; i++){
            console.log(i + ":" + brandSubscribeGTM[i]);
            expect(brandSubscribeGTM[i]).toContain(gtm);
        }
    });
};
