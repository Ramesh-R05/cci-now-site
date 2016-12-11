@navigation @now
Feature: Build and Style the Header, Top Site Navigation and Hamburger Menu to be used across all devices

    @BXMA-117
    Scenario Outline: I can see the navigation widget on the homepage "<device>"
        Given I switch to "<device>" view
        When I am currently viewing the homepage
        Then I should see the site header banner
        And I should see the site header logo clickable to open homepage
        And I should see the site navigation links and "gtm-navigation-section nav-item" class name in "header"
        And I should see the site navigation links and "gtm-navigation-section nav-item" class name in "hamburger"

        Examples:
        | device            |
        | desktop           |
        | tablet portrait   |
        | tablet landscape  |

    @BXMA-117
    Scenario: I can see the navigation widget on the homepage mobile
        Given I switch to "mobile" view
        When I am currently viewing the homepage
        Then I should see the site header logo clickable to open homepage
        And I should not see the site navigation links
        And I should see the site navigation links and "gtm-navigation-section nav-item" class name in "hamburger"

    Scenario: I can see the sticky navigation on the homepage
        Given I switch to "desktop" view
        When I am currently viewing the homepage
        And when I scroll down in the page
        Then I should see the site header logo clickable to open homepage
        And I should see the site navigation links and "gtm-navigation-section nav-item" class name in "header"
        And I should see the site navigation links and "gtm-navigation-section nav-item" class name in "hamburger"

    Scenario: I can see the navigation widget on the section page
        Given I switch to "desktop" view
        When I am currently viewing "fashion"
        Then I should see the site header logo clickable to open homepage
        And I should see the site navigation links and "gtm-navigation-section nav-item" class name in "header"
        And I should see the site navigation links and "gtm-navigation-section nav-item" class name in "hamburger"
        And I can see the link "FASHION" is highlighted on the navigation links
        And I can see the link "Fashion" is highlighted on the hamburger navigation links

    Scenario: I can see the navigation widget on the article page
        Given I switch to "tablet portrait" view
        When I am currently viewing "fashion/models/automation-test-article-with-hero-image-3663"
        Then I should see the site header logo clickable to open homepage
        And I should see the site navigation links and "gtm-navigation-section nav-item" class name in "header"
        And I should see the site navigation links and "gtm-navigation-section nav-item" class name in "hamburger"
        And I can see the link "FASHION" is highlighted on the navigation links
        And I can see the link "Fashion" is highlighted on the hamburger navigation links

    Scenario: I can see the navigation widget on the gallery page
        Given I switch to "mobile portrait" view
        When I am currently viewing "fashion/models/automation-test-gallery-13302"
        Then I should not see the site navigation links
        And I should see the hamburger menu

    @BXMA-65
    Scenario: I can see the brand logos in the hamburger menu
        Given I switch to "mobile" view
        When I am currently viewing "fashion/models/automation-test-article-with-hero-image-3663"
         * I can navigate to all sites in the hamburger navigation menu
            |title                      |url                                |gtm                        |
            |Homes To Love              |http://homestolove.com.au/         |gtm-mobile-menu-list-homes  |
            |Food To Love               |http://foodtolove.com.au/          |gtm-mobile-menu-list-food   |
            |Elle                       |http://elle.com.au/                |gtm-mobile-menu-list-elle   |
            |Harper's Bazaar            |http://harpersbazaar.com.au/       |gtm-mobile-menu-list-hb     |
            |Gourmet Traveller          |http://gourmettraveller.com.au/    |gtm-mobile-menu-list-gt     |
            |Cosmopolitan               |http://cosmopolitan.com.au/        |gtm-mobile-menu-list-cosmo  |
            |Dolly                      |http://dolly.com.au/               |gtm-mobile-menu-list-dolly  |
