Feature: Users can navigate the site using different device

    @mobile
    Scenario: Verify ads on article page in different devices
        Given I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        * I should see the top leaderboard ad under navigation
        * I should see native ad below author
        * I should see MREC ad above recommendation
        * I should see the bottom leaderboard ad above the footer on article
        * I can see the sticky ad when the top banner disappears from view

    @mobile
    Scenario: Verify ads on gallery page in the different devices
        Given I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        * I should see the top leaderboard ad under navigation
        * I should see native ad below author
        * I should see MREC ad above recommendation
        * I should see the bottom leaderboard ad above the footer on article
        #* I should see MREC ad between images #This step is disabled because the result is inconsistent and this step has been covered in regression test

    @mobile
    Scenario: Verify the ads on AMP enabled page
        Given I am currently viewing "amp/news/latest-news/tony-abbott-says-climate-change-good-thing-41699"
        * I can see the long title "Automation Test Article With Hero Image Test Title Long Title"
        * I can see the amp hero image
        * I can see the related tags "Gossip Girl," "Dolly Doctor"
        * I can see the standard copyright text in the footer as "COPYRIGHT BAUER MEDIA PTY LTD ALL RIGHTS RESERVED"
# ------> Currenlty Ads are not displaying on automation, but manually they do. Need to investigate and raise with Browser Stack
#        * I should see the top leaderboard ad under hero image on AMP page
#        * I should see first MREC in the body on AMP page
#        * I should see second MREC in the body on AMP page
#        * I should see the sticky bottom leadrboard on AMP page

    @browser
    Scenario: Verify ads on article page in different browsers
        Given I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        * I should see the top leaderboard ad under navigation
        * I should see native ad below author
        * I should see the bottom leaderboard ad above the footer on article

    @browser
    Scenario: Verify ads on gallery page in the different browsers
        Given I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        * I should see the top leaderboard ad under navigation
        * I should see native ad below author
        * I should see the bottom leaderboard ad above the footer on article



