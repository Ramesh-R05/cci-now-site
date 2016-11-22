@homepage @now
Feature: Build and Style the Header, Top Site Navigation and Hamburger Menu to be used across all devices

    @DCO-64
    Scenario Outline: I can see the navigation widget on the homepage "<device>"
        Given I am currently viewing the homepage
        When I switch to "<device>" view
        Then I should see the site Header banner
        And I should see the site navigation links
        And I should see the site navigation hamburger icon

        Examples:
        | device            |
        | desktop           |
        | tablet portrait   |
        | tablet landscape  |

    Scenario: I can see the navigation widget on the homepage mobile
        Given I am currently viewing the homepage
        When I switch to "mobile portrait" view
        Then I should see the site Header logo
        And I should not see the site navigation links
        And I should see the site navigation hamburger icon

    Scenario: I can see the different sticky navigation on the homepage
        Given I am currently viewing the homepage
        When I switch to "desktop" view
        And when I scroll down in the page
        Then I should see the site Header logo
        And I should see the site navigation links
        And I should see the site navigation hamburger icon

    Scenario: I can see the navigation widget on the section page
        Given I am currently viewing "fashion"
        When I switch to "desktop" view
        Then I should see the site Header logo
        And I should see the site navigation links
        And I should see the site navigation hamburger icon
        And I can see the link "FASHION" is highlighted on the navigation links
        And I can see the link "Fashion" is highlighted on the hamburger navigation links

    Scenario: I can see the navigation widget on the article page
        Given I am currently viewing "fashion/models/automation-test-article-with-hero-image-3663"
        When I switch to "tablet portrait" view
        Then I should see the site Header logo
        And I should see the site navigation links
        And I should see the site navigation hamburger icon
        And I can see the link "FASHION" is highlighted on the navigation links
        And I can see the link "Fashion" is highlighted on the hamburger navigation links

    Scenario: I can see the navigation widget on the gallery page
        Given I am currently viewing "fashion/models/automation-test-gallery-13302"
        When I switch to "mobile portrait" view
        Then I should not see the site navigation links
        And I can not see the hamburger menu

    @BXMA-65
    Scenario: I can see the brand logos in the hamburger menu
        When I switch to "mobile" view
        Given I am currently viewing "fashion/models/automation-test-article-with-hero-image-3663"
         * I can navigate to all sites in the hamburger navigation menu
            |title                      |url                                |tag                         |
            |Homes To Love              |http://homestolove.com.au/         |gtm-mobile-menu-list-homes  |
            |Food To Love               |http://foodtolove.com.au/          |gtm-mobile-menu-list-food   |
            |Elle                       |http://elle.com.au/                |gtm-mobile-menu-list-elle   |
            |Harper's Bazaar            |http://harpersbazaar.com.au/       |gtm-mobile-menu-list-hb     |
            |Gourmet Traveller          |http://gourmettraveller.com.au/    |gtm-mobile-menu-list-gt     |
            |Cosmopolitan               |http://cosmopolitan.com.au/        |gtm-mobile-menu-list-cosmo  |
            |Dolly                      |http://dolly.com.au/               |gtm-mobile-menu-list-dolly  |
