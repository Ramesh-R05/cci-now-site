@ad @now
Feature: Ad
    As a user
    I should be able to see the relevant Ads on the site

    @DAW-1070
    Scenario: Add sticky mobile banner to bottom of the article
        Given I switch to "mobile portrait" view
        When I am currently viewing "fashion/models/automation-test-article-with-hero-image-3663"
        Then I can see the sticky ad when the top banner disappears from view

    @BXMA-90
    Scenario: Ads on homepage in the desktop view
        Given I switch to "desktop" view
        When I am currently viewing the homepage
        * I should see sticky MREC ad next to the top news feed
        * I should not see MREC ad under the hero teaser

    @BXMA-90
    Scenario: Ads on homepage in the tablet landscape view
        Given I switch to "tablet landscape" view
        When I am currently viewing the homepage
        * I should see sticky MREC ad next to the top news feed
        * I should not see MREC ad under the hero teaser

    @BXMA-90
    Scenario: Ads on homepage in the tablet portrait view
        Given I switch to "tablet portrait" view
        When I am currently viewing the homepage
        * I should see MREC ad under the hero teaser

    @BXMA-90
    Scenario: Ads on homepage in the mobile view
        Given I switch to "mobile" view
        When I am currently viewing the homepage
        * I should see MREC ad under the hero teaser
