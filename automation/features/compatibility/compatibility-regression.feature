Feature: Users can navigate the site using different device

    @mobile
    Scenario: Verify sticky ad on article page in different devices
        Given I am currently viewing "fashion/models/kendall-jenners-skin-doctor-tells-us-what-mistake-3640"
        Then I can see the long title "Kendall Jenner's skin doctor tells us what mistake you're making when washing your face"
        * I should see the top leaderboard ad under navigation
        * I should see MREC ad above recommendation
        * I should see the bottom leaderboard ad above the footer on article
        * I can see the sticky ad when the top banner disappears from view

    @browser
    Scenario: Verify sticky ad on article page in different browser
        Given I am currently viewing "fashion/models/kendall-jenners-skin-doctor-tells-us-what-mistake-3640"
        Then I can see the long title "Kendall Jenner's skin doctor tells us what mistake you're making when washing your face"
        * I should see the top leaderboard ad under navigation
        * I should not see MREC ad above recommendation
        * I should see the bottom leaderboard ad above the footer on article

    @mobile
    Scenario: Ads on gallery page in the different devices
        Given I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        * I should see the top leaderboard ad under navigation
        * I should not see MREC ad under the hero image
        * I should see MREC ad above recommendation
        * I should see the bottom leaderboard ad above the footer on article
        * I should see MREC ad between images

    @browser
    Scenario: Ads on gallery page in the different browser
        Given I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        * I should see the top leaderboard ad under navigation
        * I should not see MREC ad under the hero image
        * I should not see MREC ad above recommendation
        * I should see the bottom leaderboard ad above the footer on article
        * I should see MREC ad between images
