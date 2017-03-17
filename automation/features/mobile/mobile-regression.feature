@mobile
Feature: Users can navigate the site using a mobile device

    Scenario: I can see the 404 error page in the mobile style
        Given I am currently viewing "404"
        * I should see the site header logo clickable to open homepage and contain "gtm-navbar-now" class name
        * I should see the hamburger menu
        * I should see the error title as "Sorry, this page is broken."
        * I should see the error giphy image
        * I should see the text clickable to homepage with gtm "gtm-error-goback"

    Scenario: Verify sticky ad on article page
        Given I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        Then I can see the sticky ad when the top banner disappears from view

    Scenario: Ads on gallery page in the mobile view
        Given I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        Then I should see the MREC ad after the 3 slide
