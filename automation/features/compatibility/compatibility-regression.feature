Feature: Users can navigate the site using different device

    @mobile
    Scenario: Verify ads on article page in different devices
        Given I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        * I should see the top leaderboard ad under navigation
        * I should see native ad below author
        * I should see MREC ad above recommendation
        * I can see the sticky ad when the top banner disappears from view

    @mobile
    Scenario: Verify ads on gallery page in the different devices
        Given I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        * I should see the top leaderboard ad under navigation
        * I should see native ad below author
        * I should see MREC ad above recommendation

    @mobile
    Scenario: Verify the ads on AMP enabled page
        Given I am currently viewing "amp/news/latest-news/tony-abbott-says-climate-change-good-thing-41200"
        * I should see the top leaderboard ad under hero image on AMP page
        * I should see first MREC in the body on AMP page
        * I should see second MREC in the body on AMP page
        * I should see the sticky bottom leaderboard on AMP page

    @desktop
    Scenario: Verify ads on article page in different browsers
        Given I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        * I should see the top leaderboard ad under navigation
        * I should see native ad below author
        * I should see the bottom leaderboard ad above the footer on article

    @desktop
    Scenario: Verify ads on gallery page in the different browsers
        Given I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        * I should see the top leaderboard ad under navigation
        * I should see native ad below author
        * I should see the bottom leaderboard ad above the footer on article



