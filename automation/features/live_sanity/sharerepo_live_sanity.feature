@livesharerepo
Feature: I have an automated sanity for my live environments

    @homepage @BXMA-89
    Scenario: Verify desktop WN header is functional correctly on homepage
        Given I switch to "desktop" view
        When I am currently viewing the homepage
        * I can navigate to all sites in the desktop list on the header
            |title                      |url                                |gtm    |
            |Australian Women's Weekly  |/aww                               |gtm-uniheader-aww    |
            |Woman's Day                |/womansday                         |gtm-uniheader-wd     |
            |Good Health                |/good-health                       |gtm-uniheader-gh     |
            |OK! Magazine               |/okmagazine                        |gtm-uniheader-ok     |
            |SHOP Til You Drop          |/shop-til-you-drop                 |gtm-uniheader-shop   |
            |NW                         |/nw                                |gtm-uniheader-nw     |
            |Take 5                     |/take5mag                          |gtm-uniheader-take5  |
            |Yours                      |/yours                             |gtm-uniheader-yours  |
            |Mother & Baby              |/mother-and-baby                   |gtm-uniheader-mb     |

    @mustread @BXMA-81
    Scenario Outline: Verify the must read module is functional correctly in "<device>" view
        Given I switch to "<device>" view
        When I am currently viewing the homepage
        * I should see must read header as "MUST READ"
        * I should see <number> must read images and titles which are clickable to open their page
        * I should see each must read items containing gtm
            |no |gtm                    |
            |1  |gtm-mustread1-homepage |
            |2  |gtm-mustread2-homepage |
            |3  |gtm-mustread3-homepage |
            |4  |gtm-mustread4-homepage |
            |5  |gtm-mustread5-homepage |
            |6  |gtm-mustread6-homepage |
        Examples:
            |device             | number |
            | mobile            | 2      |
            | desktop           | 6      |

    @hero @BXMA-40
    Scenario: Verify the hero teaser element is functional correctly in mobile view
        Given I switch to "mobile" view
        When I am currently viewing the homepage
        * I should see the main hero item containing its image and clickable to open its page
        * I should see the main hero item containing its title and clickable to open its page
        * I should see the main hero item containing source

    @homepagefeed @BXMA-82
    Scenario: Verify the top news feed is functional correctly in mobile view
        Given I switch to "mobile" view
        When I am currently viewing the homepage
        * I should see 6 top half feed
        * I should see each top feed item containing its image and clickable to open its page
        * I should see each top feed item containing its title and clickable to open its page
        * I should see each top feed item containing source

    @homepagefeed-bottom @BXMA-60
    Scenario: Verify the bottom news feed is functional correctly in mobile view
        Given I switch to "mobile" view
        When I am currently viewing the homepage
        * I should see 6 bottom half feed
        * I should see each bottom feed item containing its image and clickable to open its page
        * I should see each bottom feed item containing its title and clickable to open its page
        * I should see each bottom feed item containing source

    @ad @BXMA-90
    Scenario: Ads on homepage in the desktop view
        Given I switch to "desktop" view
        When I am currently viewing the homepage
        * I should see the top leaderboard ad under navigation
        * I should see sticky MREC ad next to the top news feed
        * I should not see MREC ad under the hero teaser
        * I should see sticky MREC ad next to the bottom news feed
        * I should not see MREC ad in the bottom news feed
        * I should see the middle leaderboard ad under the top news feed
        * I should see the bottom leaderboard ad above the footer

    @ad @BXMA-90
    Scenario: Ads on homepage in the mobile view
        Given I switch to "mobile" view
        When I am currently viewing the homepage
        * I should see the top leaderboard ad under navigation
        * I should see MREC ad under the hero teaser
        * I should see the middle leaderboard ad under the top news feed
        * I should see MREC ad in the bottom news feed
        * I should not see the bottom leaderboard ad above the footer

    @navigation @BXMA-65
    Scenario: I can see the brand logos in the hamburger menu
        Given I switch to "mobile" view
        When I am currently viewing the homepage
        * I can navigate to all sites in the hamburger navigation menu
            |title                      |url                                |gtm                         |
            |Homes To Love              |http://homestolove.com.au/         |gtm-mobile-menu-list-homes  |
            |Food To Love               |http://foodtolove.com.au/          |gtm-mobile-menu-list-food   |
            |Elle                       |http://elle.com.au/                |gtm-mobile-menu-list-elle   |
            |Harper's Bazaar            |http://harpersbazaar.com.au/       |gtm-mobile-menu-list-hb     |
            |Gourmet Traveller          |http://gourmettraveller.com.au/    |gtm-mobile-menu-list-gt     |
            |Cosmopolitan               |http://cosmopolitan.com.au/        |gtm-mobile-menu-list-cosmo  |
            |Dolly                      |http://dolly.com.au/               |gtm-mobile-menu-list-dolly  |

    @navigation @BXMA-117
    Scenario: I can see the navigation widget on the homepage desktop
        Given I switch to "desktop" view
        When I am currently viewing the homepage
        * I should see the site header banner
        * I should see the site header logo clickable to open homepage
        * I should see the site navigation links and "gtm-navigation-section nav-item" class name in "header"
        * I should see the site navigation links and "gtm-navigation-section nav-item" class name in "hamburger"

    @navigation @BXMA-117
    Scenario: I can see the navigation widget on the homepage mobile
        Given I switch to "mobile" view
        When I am currently viewing the homepage
        * I should see the site header logo clickable to open homepage
        * I should not see the site navigation links
        * I should see the site navigation links and "gtm-navigation-section nav-item" class name in "hamburger"

    @footer @BXMA-145
    Scenario: Verify the footer in the mobile view
        Given I switch to "mobile" view
        When I am currently viewing the homepage
        * I can see the social logo in the footer
        * I can see the social icons clickable to open its page in the footer
            |social     |url                                    |
            |Facebook   |https://www.facebook.com/nowtolove     |
            |Twitter    |https://twitter.com/NowToLove          |
            |Instagram  |https://www.instagram.com/NowToLove   |
        * I can see the brands title in the footer as "CONTENT SUPPORTED BY"
        * I can navigate to all sites in the footer
            |title                      |url                |gtm                           |
            |Australian Women's Weekly  |/aww               |gtm-footer__logos-list-aww    |
            |Woman's Day                |/womansday         |gtm-footer__logos-list-wd     |
            |Good Health                |/good-health       |gtm-footer__logos-list-gh     |
            |OK! Magazine               |/okmagazine        |gtm-footer__logos-list-ok     |
            |SHOP Til You Drop          |/shop-til-you-drop |gtm-footer__logos-list-shop   |
            |NW                         |/nw                |gtm-footer__logos-list-nw     |
            |Take 5                     |/take5mag          |gtm-footer__logos-list-take5  |
            |Yours                      |/yours             |gtm-footer__logos-list-yours  |
            |Mother & Baby              |/mother-and-baby   |gtm-footer__logos-list-mb     |
        * I can navigate to all standard pages in the footer
            |page           |url                                                            |
            |PRIVACY POLICY |http://www.bauer-media.com.au/privacy                          |
            |ADVERTISE      |http://www.bauer-media.com.au/advertising/advertise-with-us    |
            |TERMS OF USE   |http://www.bauer-media.com.au/terms/website-terms              |
            |CONTACT US     |contact-us                                                     |
        * I can see the standard copyright text in the footer as "COPYRIGHT BAUER MEDIA PTY LTD ALL RIGHTS RESERVED"

    @error @BXMA-139
    Scenario: I can see the 404 error page in the mobile style
        Given I switch to "mobile" view
        When I am currently viewing "404"
        * I should see the site header logo clickable to open homepage
        * I should see the hamburger menu
        * I should see the error title as "This page is under construction"
        * I should see the error giphy image
        * I should see the text clickable to homepage with gtm "gtm-error-goback"
