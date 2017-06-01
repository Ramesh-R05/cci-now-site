@gallery @BXMA-33 @BXMA-132 @BXMA-133 @now
Feature: Gallery
    As a user
    I should be able to see the gallery page

# -------- Creation Date is low priority   ---------------#
    #--- time validation will need to  bew reviewed as testing with Shippable the server is on a different TimeZone
    @low
    Scenario Outline: Users can see the created date of content
        When I switch to "<device>" view
        Given I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        * I can see the created date on the gallery "DEC 15, 2016"

        Examples:
            | device            |
            | mobile            |
            | desktop           |
            | tablet portrait   |
            | tablet landscape  |
# -------- Creation Date end   ---------------#

    @high
    Scenario: Verify a gallery page with the primary content on mobile view
        When I switch to "mobile" view
        Given I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        * I can see the logo on the gallery header
        * I can click the logo to go to homepage
        * I can see an image appearing on the gallery
        * I can see the source appearing on the gallery with gtm "gtm-brandlogotop-article"

    @med
    Scenario: Verify a gallery page with the secondary content on mobile view
        When I switch to "mobile" view
        Given I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        * I can see the gallery title containing "Automation Test Gallery"
        * I can see an image appearing on the gallery
        * I can see the image number "1" of total "8" on the gallery
        * I can see the image caption on the gallery containing "Fresh-faced beauty"

    @low
    Scenario: Verify a gallery page with the optional content on mobile view
        When I switch to "mobile" view
        Given I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        * I can see the gallery description of the gallery containing "Test the second paragraph"
        * I can see the author "EMILY JABOUR" on the gallery
        When I see the video ID "5066382704001" on the gallery
        * I can see the play button and click on it

    @med
    Scenario: Verify a gallery page in desktop style on desktop view
        When I switch to "desktop" view
        Given I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        * I can see the logo on the gallery header
        * I can click the logo to go to homepage
        * I can see the gallery title containing "Automation Test Gallery"
        * I can see an image appearing on the gallery
        * I can see the source appearing on the gallery with gtm "gtm-brandlogotop-article"
        * I can see the gallery description of the gallery containing "Test the second paragraph"
        * I can see the author "EMILY JABOUR" on the gallery
        * I can see the image number "1" of total "8" on the gallery
        * I can see the image caption on the gallery containing "Fresh-faced beauty"
        When I see the video ID "5066382704001" on the gallery
        * I can see the play button and click on it

    @low
    Scenario: Verify a gallery page in mobile style on tablet portrait view
        When I switch to "tablet portrait" view
        Given I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        * I can see the gallery description of the gallery containing "Test the second paragraph"
    @low
    Scenario: Verify a gallery page in desktop style on tablet landscape view
        When I switch to "tablet landscape" view
        Given I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        * I can see the gallery description of the gallery containing "Test the second paragraph"

    @BXMA-155
    Scenario Outline: Verify the share buttons on a gallery page in "<device>" view
        When I switch to "<device>" view
        Given I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        * I can see the facebook share button on gallery page
        * I can see the pinterest share button on gallery page
        @med
        Examples:
            | device            |
            | mobile            |
            | desktop           |
        @low
        Examples:
            | device            |
            | tablet portrait   |
            | tablet landscape  |




