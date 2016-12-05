@ad @now
Feature: Ad
    As a user
    I should be able to see the relevant Ads on the site

    @DAW-1070
    Scenario: Add sticky mobile banner to bottom of the article
        Given I switch to "mobile portrait" view
        When I am currently viewing "fashion/models/automation-test-article-with-hero-image-3663"
        Then I can see the sticky ad when the top banner disappears from view

    @homepage @BXMA-90
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

    @homepage @BXMA-90
    Scenario: Ads on homepage in the tablet landscape view
        Given I switch to "tablet landscape" view
        When I am currently viewing the homepage
        * I should see the top leaderboard ad under navigation
        * I should see sticky MREC ad next to the top news feed
        * I should not see MREC ad under the hero teaser
        * I should see sticky MREC ad next to the bottom news feed
        * I should not see MREC ad in the bottom news feed
        * I should see the middle leaderboard ad under the top news feed
        * I should see the bottom leaderboard ad above the footer

    @homepage @BXMA-90
    Scenario: Ads on homepage in the tablet portrait view
        Given I switch to "tablet portrait" view
        When I am currently viewing the homepage
        * I should see the top leaderboard ad under navigation
        * I should see MREC ad under the hero teaser
        * I should see sticky MREC ad next to the bottom news feed
        * I should not see MREC ad in the bottom news feed
        * I should see the middle leaderboard ad under the top news feed
        * I should see the bottom leaderboard ad above the footer

    @homepage @BXMA-90
    Scenario: Ads on homepage in the mobile view
        Given I switch to "mobile" view
        When I am currently viewing the homepage
        * I should see the top leaderboard ad under navigation
        * I should see MREC ad under the hero teaser
        * I should see the middle leaderboard ad under the top news feed
        * I should see MREC ad in the bottom news feed
        * I should not see the bottom leaderboard ad above the footer

    @section @BXMA-34
    Scenario: Ads on section landing page in the desktop view
        Given I switch to "desktop" view
        When I am currently viewing "fashion"
        * I should see the top leaderboard ad under navigation
        * I should see sticky MREC ad next to the top news feed
        * I should not see MREC ad under the hero teaser
        * I should see sticky MREC ad next to the bottom news feed
        * I should see the middle leaderboard ad under the top news feed
        * I should see the bottom leaderboard ad above the footer

    @section @BXMA-34
    Scenario: Ads on section landing page in the tablet landscape view
        Given I switch to "tablet landscape" view
        When I am currently viewing "fashion"
        * I should see the top leaderboard ad under navigation
        * I should see sticky MREC ad next to the top news feed
        * I should not see MREC ad under the hero teaser
        * I should see sticky MREC ad next to the bottom news feed
        * I should see the middle leaderboard ad under the top news feed
        * I should see the bottom leaderboard ad above the footer

    @section @BXMA-34
    Scenario: Ads on section landing page in the tablet portrait view
        Given I switch to "tablet portrait" view
        When I am currently viewing "fashion"
        * I should see the top leaderboard ad under navigation
        * I should see MREC ad under the hero teaser
        * I should see sticky MREC ad next to the bottom news feed
        * I should not see MREC ad in the bottom news feed
        * I should see the middle leaderboard ad under the top news feed
        * I should see the bottom leaderboard ad above the footer

    @section @BXMA-34
    Scenario: Ads on section landing page in the mobile view
        Given I switch to "mobile" view
        When I am currently viewing "fashion"
        * I should see the top leaderboard ad under navigation
        * I should see MREC ad under the hero teaser
        * I should see the middle leaderboard ad under the top news feed
        * I should see MREC ad in the bottom news feed
        * I should not see the bottom leaderboard ad above the footer

    @gallery @BXMA-132
    Scenario: Ads on gallery page in the desktop view
        Given I switch to "desktop" view
        When I am currently viewing "fashion/models/automation-test-gallery-13302"
        * I should see the top leaderboard ad above the gallery slide
        * I should not see the bottom leaderboard ad under the gallery slide
        * I should see the MREC ad at the bottom right of the gallery
        * I should see the MREC ad after the 3 slide

    @gallery @BXMA-132
    Scenario: Ads on gallery page in the tablet landscape view
        Given I switch to "tablet landscape" view
        When I am currently viewing "fashion/models/automation-test-gallery-13302"
        * I should see the top leaderboard ad above the gallery slide
        * I should not see the bottom leaderboard ad under the gallery slide
        * I should see the MREC ad at the bottom right of the gallery
        * I should see the MREC ad after the 3 slide

    @gallery @BXMA-132
    Scenario: Ads on gallery page in the tablet portrait view
        Given I switch to "tablet portrait" view
        When I am currently viewing "fashion/models/automation-test-gallery-13302"
        * I should see the top leaderboard ad above the gallery slide
        * I should not see the bottom leaderboard ad under the gallery slide
        * I should not see the MREC ad at the bottom right of the gallery
        * I should see the MREC ad after the 3 slide

    @gallery @BXMA-132
    Scenario: Ads on gallery page in the mobile view
        Given I switch to "mobile" view
        When I am currently viewing "fashion/models/automation-test-gallery-13302"
        * I should see the top leaderboard ad above the gallery slide
        * I should not see the bottom leaderboard ad under the gallery slide
        * I should not see the MREC ad at the bottom right of the gallery
        * I should see the MREC ad after the 3 slide

