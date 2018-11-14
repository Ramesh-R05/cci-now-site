@gallery @now
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
        * I can see the source appearing on the gallery with gtm "gtm-brandlogotop-article"

    @med
    Scenario: Verify a gallery page with the secondary content on mobile view
        When I switch to "mobile" view
        Given I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        * I can see the gallery title containing "Automation Test Gallery"
        * I can see the image number "1" on the gallery
        * I can see the image caption on the gallery containing "Fresh-faced beauty"

    @low
    Scenario: Verify a gallery page with the optional content on mobile view
        When I switch to "mobile" view
        Given I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        * I can see the author "EMILY JABOUR" on the gallery
        * I can see the play button and click on it
        * I can see the youtube item in the gallery

    @med
    Scenario: Verify a gallery page in desktop style on desktop view
        When I switch to "desktop" view
        Given I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        * I can see the logo on the gallery header
        * I can click the logo to go to homepage
        * I can see the gallery title containing "Automation Test Gallery"
        * I can see the source appearing on the gallery with gtm "gtm-brandlogotop-article"
        * I can see the author "EMILY JABOUR" on the gallery
        * I can see the image number "1" on the gallery
        * I can see the image caption on the gallery containing "Fresh-faced beauty"
        * I can see the play button and click on it





