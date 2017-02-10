var home = require('../page_objects/homepage_widget');
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

    this.When(/^I should see the main hero item containing "([^"]*)" source without date$/, function (name) {
        //verify source and date of the main hero item
        var heroSource = browser.getText(brand.heroSource);
        console.log(heroSource);
        var valueSourceDate = heroSource.split("|");
        console.log("Source: " + valueSourceDate[0]);
        console.log("Date: " + valueSourceDate[1]);
        //validate the source
        expect(valueSourceDate[0]).toEqual(name);
        //validate the date is not appearing
        expect(valueSourceDate[1]).toBeUndefined();
    });

    this.When(/^I should see each top feed item containing source without date$/, function () {
        //verify sources of all teasers
        console.log(browser.elements(home.topFeedTeaserSource).value.length);
        var topFeedTeaserSource = browser.getText(home.topFeedTeaserSource);
        for (var i=0; i<topFeedTeaserSource.length; i++){
            var valueSourceDate = topFeedTeaserSource[i].split("|");
            console.log( i + ":Source:" + valueSourceDate[0]);
            console.log( i + ":Date:" + valueSourceDate[1]);
            //validate the source
            expect(valueSourceDate[0]).not.toEqual('');
            //validate the date is not existing
            expect(valueSourceDate[1]).toBeUndefined();
        }
    });

    this.When(/^I should see each bottom feed item containing source without date$/, function () {
        //verify sources of all teasers
        console.log(browser.elements(home.bottomFeedTeaserSource).value.length);
        var bottomFeedTeaserSource = browser.getText(home.bottomFeedTeaserSource);
        for (var i=0; i<bottomFeedTeaserSource.length; i++){
            var valueSourceDate = bottomFeedTeaserSource[i].split("|");
            console.log( i + ":Source:" + valueSourceDate[0]);
            console.log( i + ":Date:" + valueSourceDate[1]);
            //validate the source
            expect(valueSourceDate[0]).not.toEqual('');
            //validate the date is not existing
            expect(valueSourceDate[1]).toBeUndefined();
        }
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

        //Some brands do not require to have subscribe button
        if (link != 'none'){
            //Get value of href
            var brandElementLink = browser.getAttribute(brandElement,'href');
            console.log(brandElementLink);
            //Validate the values [This is to check the link on both two positions as we show/hide on different breakpoints]
            for (var i=0; i<brandElementLink.length; i++){
                console.log(i + ":" +brandElementLink[i]);
                expect(brandElementLink[i]).toContain(link);
            }
        } else {
            //To ensure that the subscribe link is not showing
            expect(browser.isExisting(brandElement)).toBe(false);
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
        //Some brands do not require to have subscribe button
        if (gtm != 'none'){
            //Identify the element
            var brandSubscribeGTM = browser.getAttribute(brand.brandSubscribeLink, 'class');

            //Validate the element is existing
            for (var i=0; i<brandSubscribeGTM.length; i++){
                console.log(i + ":" + brandSubscribeGTM[i]);
                expect(brandSubscribeGTM[i]).toContain(gtm);
            }
        } else {
            //To ensure that the GTM is not required
            expect(browser.isExisting(brand.brandSubscribeLink)).toBe(false);
        }
    });
};
