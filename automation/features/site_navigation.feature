@navigation @now
Feature: Build and Style the Header, Top Site Navigation and Hamburger Menu to be used across all devices

    @BXMA-117 @BXMA-172
    Scenario Outline: I can see the navigation widget on the homepage "<device>"
        Given I switch to "<device>" view
        When I am currently viewing the homepage
        Then I should see the site header banner
        And I should see the theme nav background
        And I should see the site header logo clickable to open homepage and contain "gtm-navbar-now" class name
        And I should see the site navigation links and "gtm-navigation-section nav-item" class name in "header"
        And I should see the site navigation links and "gtm-navigation-section nav-item" class name in "hamburger"
        @high
        Examples:
            | device            |
            | desktop           |
        @med
        Examples:
            | device            |
            | tablet portrait   |
            | tablet landscape  |

    @BXMA-117 @high
    Scenario: I can see the navigation widget on the homepage mobile
        Given I switch to "mobile" view
        When I am currently viewing the homepage
        Then I should see the site header logo clickable to open homepage and contain "gtm-navbar-now" class name
        And I should not see the site navigation links
        And I should see the theme nav background
        And I should see the site navigation links and "gtm-navigation-section nav-item" class name in "hamburger"

    @high
    Scenario: I can see the sticky navigation on the homepage
        Given I switch to "desktop" view
        When I am currently viewing the homepage
        And when I scroll down in the page
        Then I should see the site header logo clickable to open homepage and contain "gtm-navbar-now" class name
        And I should see the site navigation links and "gtm-navigation-section nav-item" class name in "header"
        And I should see the site navigation links and "gtm-navigation-section nav-item" class name in "hamburger"

    @high
    Scenario: I can see the navigation widget on the section page
        Given I switch to "desktop" view
        When I am currently viewing "fashion"
        Then I should see the site header logo clickable to open homepage and contain "gtm-navbar-now" class name
        And I should see the site navigation links and "gtm-navigation-section nav-item" class name in "header"
        And I should see the site navigation links and "gtm-navigation-section nav-item" class name in "hamburger"
        And I can see the link "FASHION" is highlighted on the navigation links
        And I can see the link "Fashion" is highlighted on the hamburger navigation links

    @high
    Scenario: I can see the navigation widget on the article page
        Given I switch to "tablet portrait" view
        When I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        Then I should see the site header logo clickable to open homepage and contain "gtm-navbar-now" class name
        And I should see the site navigation links and "gtm-navigation-section nav-item" class name in "header"
        And I should see the site navigation links and "gtm-navigation-section nav-item" class name in "hamburger"
        And I can see the link "FASHION" is highlighted on the navigation links
        And I can see the link "Fashion" is highlighted on the hamburger navigation links

    @high
    Scenario: I can see the navigation widget on the gallery page
        Given I switch to "tablet landscape" view
        When I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        Then I should see the site header logo clickable to open homepage and contain "gtm-navbar-now" class name
        And I should see the site navigation links and "gtm-navigation-section nav-item" class name in "header"
        And I should see the site navigation links and "gtm-navigation-section nav-item" class name in "hamburger"
        And I can see the link "FASHION" is highlighted on the navigation links
        And I can see the link "Fashion" is highlighted on the hamburger navigation links

    @high
    Scenario: I can see the navigation widget on the gallery page on mobile view
        Given I switch to "mobile" view
        When I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        Then I should not see the site navigation links
        And I should see the hamburger menu

    @BXMA-65 @high
    Scenario: I can see the brand logos in the hamburger menu
        Given I switch to "mobile" view
        When I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
         * I can navigate to all sites in the hamburger navigation menu
            |title                      |url                                |gtm                        |
            |Homes To Love              |http://homestolove.com.au/         |gtm-hamburger-homes        |
            |Food To Love               |http://foodtolove.com.au/          |gtm-hamburger-food         |
            |Elle                       |http://elle.com.au/                |gtm-hamburger-elle         |
            |Harper's Bazaar            |http://harpersbazaar.com.au/       |gtm-hamburger-harpers      |
            |Gourmet Traveller          |http://gourmettraveller.com.au/    |gtm-hamburger-gt           |
            |Cosmopolitan               |http://cosmopolitan.com.au/        |gtm-hamburger-cosmo        |
            |Dolly                      |http://dolly.com.au/               |gtm-hamburger-dolly        |
            |Beauty Heaven              |http://beautyheaven.com.au/        |gtm-hamburger-beautyheaven |
