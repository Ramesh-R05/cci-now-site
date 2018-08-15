var home = require('../page_objects/homepage_widget');
var brand = require('../page_objects/brand_widget');
var world = require('../world');

module.exports = function(){

    this.When(/^I should see the brand title logo on the brand landing page$/, function () {
        //Verify the brand title logo
        var brandTitleLogo = browser.getAttribute(brand.brandTitleLogo, 'src');
        expect(brandTitleLogo).not.toBeUndefined();
    });

    this.When(/^I should see the main hero item containing "([^"]*)" source without date$/, function (name) {
        //verify source and date of the main hero item
        var heroSource = browser.getText(brand.heroSource);
        var valueSourceDate = heroSource.split("|");
        //validate the source
        expect(valueSourceDate[0]).toEqual(name);
        //validate the date is not appearing
        expect(valueSourceDate[1]).toBeUndefined();
    });

    this.When(/^I should see a "([^"]*)" feed item containing source without date$/, function (part) {
        var feedTeaserSource_element, i;

        switch(part) {
            case 'top':
                feedTeaserSource_element = home.topFeedTeaserSource;
                i = 4; //Test the 5th item which is array no.4
                break;
            case 'bottom':
                feedTeaserSource_element = home.bottomFeedTeaserSource;
                i = 6; //Test the 7th item which is array no.6
                break;
        }

        //verify sources of all teasers
        var feedTeaserSource = browser.getText(feedTeaserSource_element);
        var valueSourceDate = feedTeaserSource[i].split("|");
        //validate the source
        expect(valueSourceDate[0]).not.toEqual('');
        //validate the date is not displaying
        expect(valueSourceDate[1]).toBeUndefined();
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
            case 'pinterest':
                var brandElement = brand.brandPinterestLink
                break;
        }

        //Some brands do not require to have subscribe button
        if (link != 'none'){
            //Get value of href
            var brandElementLink = browser.getAttribute(brandElement,'href');
            //Validate the values [This is to check the link on both two positions as we show/hide on different breakpoints]
            for (var i=0; i<brandElementLink.length; i++){
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
        expect(subscribeTitle).toEqual(title);
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
                expect(brandSubscribeGTM[i]).toContain(gtm);
            }
        } else {
            //To ensure that the GTM is not required
            expect(browser.isExisting(brand.brandSubscribeLink)).toBe(false);
        }
    });

    this.When(/^I should see the sign up button containing "([^"]*)" url in "([^"]*)" view$/, function (url, device) {
        var signUpBtn, signUpBtnLink;

        switch(device) {
            case 'mobile':
            case 'tablet portrait':
                signUpBtn = brand.newsletterSignUpBtnMobile;
                signUpBtnLink = browser.getAttribute(signUpBtn, 'href');
                break;
            case 'desktop':
            case 'tablet landscape':
                signUpBtn = brand.newsletterSignUpBtnDesktop;
                signUpBtnLink = browser.getAttribute(signUpBtn, 'href');
                break;
        }

        browser.scroll(signUpBtn);
        expect(browser.isVisible(signUpBtn)).toEqual(true);
        expect(signUpBtnLink).toContain(url);
    });
};
