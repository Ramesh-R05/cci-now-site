@devices
Feature: Users can navigate the site using a mobile device

    Scenario: Verify sticky ad on article page
        Given I am currently viewing "fashion/models/kendall-jenners-skin-doctor-tells-us-what-mistake-3640"
        Then I can see the long title "Kendall Jenner's skin doctor tells us what mistake you're making when washing your face"
        * I should see the top leaderboard ad under navigation
        * I should see MREC ad above recommendation
        * I should see the bottom leaderboard ad above the footer on article
        * I can see the sticky ad when the top banner disappears from view

    Scenario: Ads on gallery page in the mobile view
        Given I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        * I can see the logo on the gallery header
        * I should see the top leaderboard ad above the gallery slide
        * I should not see the bottom leaderboard ad under the gallery slide
        * I should not see the MREC ad at the bottom right of the gallery
        * I should see the MREC ad after the 3 slide
