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
        * I should see the top leaderboard ad under navigation
        * I should not see MREC ad under the hero image
        * I should see MREC ad above recommendation
        * I should see the bottom leaderboard ad above the footer on article
        * I should see MREC ad between images
