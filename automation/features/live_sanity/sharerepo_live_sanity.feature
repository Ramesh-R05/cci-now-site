@livesharerepo
Feature: I have an automated sanity for my live environments

    @homepage @BXMA-89
    Scenario: Verify desktop WN header is functional correctly on homepage
        When I switch to "desktop" view
        Given I am currently viewing the homepage
        * I can navigate to all sites in the desktop list on the header
            |title                      |url                                |tag    |
            |Australian Women's Weekly  |/aww                               |gtm-uniheader-aww    |
            |Woman's Day                |/womansday                         |gtm-uniheader-wd     |
            |Good Health                |/good-health                       |gtm-uniheader-gh     |
            |OK! Magazine               |/okmagazine                        |gtm-uniheader-ok     |
            |SHOP Til You Drop          |/shop-til-you-drop                 |gtm-uniheader-shop   |
            |NW                         |/nw                                |gtm-uniheader-nw     |
            |Take 5                     |/take5mag                          |gtm-uniheader-take5  |
            |Yours                      |/yours                             |gtm-uniheader-yours  |
            |TV WEEK                    |/tvweeklogieawards                 |gtm-uniheader-tvweek |
            |Mother & Baby              |/mother-and-baby                   |gtm-uniheader-mb     |

    @hero @BXMA-40
    Scenario: Verify the hero teaser element is functional correctly in mobile view
        Given I am currently viewing the homepage
        When I switch to "mobile" view
        * I should see the homepage hero element
        * I should see the homepage hero image
        * The homepage hero image should be clickable to open its page
        * I should see the homepage hero title
        * The homepage hero title should be clickable to open its page

    @homepagefeed @BXMA-82
    Scenario: Verify the top news feed is functional correctly in mobile view
        Given I am currently viewing the homepage
        When I switch to "mobile" view
        * I should see 6 top half feed
        * I should see each top feed item containing its image and clickable to open its page
        * I should see each top feed item containing its title and clickable to open its page
        * I should see each top feed item containing source

    @homepagefeed-bottom @BXMA-60
    Scenario: Verify the bottom news feed is functional correctly in mobile view
        Given I am currently viewing the homepage
        When I switch to "mobile" view
        * I should see 6 bottom half feed
        * I should see each bottom feed item containing its image and clickable to open its page
        * I should see each bottom feed item containing its title and clickable to open its page
        * I should see each bottom feed item containing source

    @ad @BXMA-90
    Scenario: Ads on homepage in the desktop view
        Given I switch to "desktop" view
        When I am currently viewing the homepage
        * I should see sticky MREC ad next to the top news feed
        * I should not see MREC ad under the hero teaser

    @ad @BXMA-90
    Scenario: Ads on homepage in the mobile view
        Given I switch to "mobile" view
        When I am currently viewing the homepage
        * I should see MREC ad under the hero teaser

    @navigation @BXMA-65
    Scenario: I can see the brand logos in the hamburger menu
        When I switch to "mobile" view
        Given I am currently viewing the homepage
        * I can navigate to all sites in the hamburger navigation menu
            |title                      |url                                |tag                         |
            |Homes To Love              |http://homestolove.com.au/         |gtm-mobile-menu-list-homes  |
            |Food To Love               |http://foodtolove.com.au/          |gtm-mobile-menu-list-food   |
            |Elle                       |http://elle.com.au/                |gtm-mobile-menu-list-elle   |
            |Harper's Bazaar            |http://harpersbazaar.com.au/       |gtm-mobile-menu-list-hb     |
            |Gourmet Traveller          |http://gourmettraveller.com.au/    |gtm-mobile-menu-list-gt     |
            |Cosmopolitan               |http://cosmopolitan.com.au/        |gtm-mobile-menu-list-cosmo  |
            |Dolly                      |http://dolly.com.au/               |gtm-mobile-menu-list-dolly  |

