@gallery @BXMA-33 @BXMA-132 @BXMA-133 @now
Feature: Gallery
    As a user
    I should be able to see the gallery page

    @high
    Scenario: Verify a gallery page in mobile style on mobile view
        When I switch to "mobile" view
        Given I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        * I can see the logo on the gallery header
        * I can click the logo to go to homepage
        * I can see the gallery title containing "Automation Test Gallery"
        * I can see an image appearing on the gallery
        * I can see the source appearing on the gallery with gtm "gtm-brandlogotop-gallery"
        * I can see the created date on the gallery "DEC 15, 2016 2:25PM"
        * I can see the gallery description of the gallery containing "Test the second paragraph"
        * I can see the right arrow on the gallery
        * I should not see the left arrow on the gallery
        * I can see the image number "1" of total "8" on the gallery
        * I can see the image caption on the gallery containing "Fresh-faced beauty"
        * I can click MORE to see the full image caption on the gallery
        * I can click LESS to see the short image caption on the gallery
        * I can click the right arrow on the gallery to check the next image
        When I see the image no "2" on the gallery
        * I can not see the gallery title
        * I can see the left arrow on the gallery
        * I can see an image appearing on the gallery
        * I should not see the gallery description on mobile for next image
        * I can see the image caption on the gallery containing "a glossy lip!"
        * I can click the left arrow to go back to a previous image on the gallery
        When I see the video ID "3976804555001" on the gallery
        * I can see the play button and click on it
        * I can see the left arrow on the gallery
        * I can see the right arrow on the gallery
        When I see the last image on the gallery
        * I can see an image appearing on the gallery
        * I can click the right arrow on the gallery on the last slide
        When I see the next gallery slide on the gallery on mobile
        * I can see the logo on the gallery header
        * I can see the right arrow on the next gallery slide
        * I should not see the left arrow on the gallery
        * I should not see the gallery description on mobile for next image

    @high
    Scenario: Verify a gallery page in desktop style on desktop view
        When I switch to "desktop" view
        Given I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        * I can see the logo on the gallery header
        * I can click the logo to go to homepage
        * I can see the gallery title containing "Automation Test Gallery"
        * I can see an image appearing on the gallery
        * I can see the source appearing on the gallery with gtm "gtm-brandlogotop-gallery"
        * I can see the created date on the gallery "DEC 15, 2016 2:25PM"
        * I can see the gallery description of the gallery containing "Test the second paragraph"
        * I can see the right arrow on the gallery
        * I should not see the left arrow on the gallery
        * I can see the image number "1" of total "8" on the gallery
        * I can see the image caption on the gallery containing "Fresh-faced beauty"
        * I can click MORE to see the full image caption on the gallery
        * I can click LESS to see the short image caption on the gallery
        * I can click the right arrow on the gallery to check the next image
        When I see the image no "2" on the gallery
        * I can see the gallery title containing "Automation Test Gallery"
        * I can see the left arrow on the gallery
        * I can see an image appearing on the gallery
        * I can see the gallery description of the gallery containing "Test the second paragraph"
        * I can see the image caption on the gallery containing "a glossy lip!"
        * I can click the left arrow to go back to a previous image on the gallery
        When I see the video ID "3976804555001" on the gallery
        * I can see the play button and click on it
        * I can see the left arrow on the gallery
        * I can see the right arrow on the gallery
        When I see the last image on the gallery
        * I can see an image appearing on the gallery
        * I can click the right arrow on the gallery on the last slide
        When I see the next gallery slide on the gallery as "NEXT GALLERY"
        * I can see the logo on the gallery header
        * I should not see the long title on the gallery header on the next gallery slide
        * I can see the right arrow on the next gallery slide
        * I should not see the left arrow on the gallery

    @med
    Scenario: Verify a gallery page in mobile style on tablet portrait view
        When I switch to "tablet portrait" view
        Given I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        * I can click the right arrow on the gallery to check the next image
        * I should not see the gallery description on mobile for next image

    @med
    Scenario: Verify a gallery page in desktop style on tablet landscape view
        When I switch to "tablet landscape" view
        Given I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        * I can see the gallery description of the gallery containing "Test the second paragraph"
        * I can click the right arrow on the gallery to check the next image

    @DAV-80 @DAV-81 @high
    Scenario: Verify the slide of MREC ad on mobile view
        When I switch to "mobile" view
        Given I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        * I can slide to the first MREC ad
        * I cannot go to the next slide when the ad is not loaded
        * I can go to the next slide when the ad is loaded

    @DAV-80 @DAV-81 @high
    Scenario: Verify the slide of MREC ad on desktop view
        When I switch to "desktop" view
        Given I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        * I can slide to the first MREC ad
        * I cannot go to the next slide when the ad is not loaded
        * I can go to the next slide when the ad is loaded

    @BXMA-155
    Scenario Outline: Verify the share buttons on a gallery page in "<device>" view
        When I switch to "<device>" view
        Given I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        * I can see the facebook share button on gallery page
        * I can see the pinterest share button on gallery page
        @high
        Examples:
            | device            |
            | mobile            |
            | desktop           |
        @med
        Examples:
            | device            |
            | tablet portrait   |
            | tablet landscape  |




