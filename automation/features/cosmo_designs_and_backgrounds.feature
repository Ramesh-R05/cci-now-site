@homepage @cosmo
Feature: I can validate cosmo backgrounds and designs

     Scenario: I can verify article text styling on article page with hero image
        Given I am currently viewing "fashion/automation-test-article-with-hero-image-3663"
        * I can see the long title "LONG TITLE LONG TITLE EOM"
        * I can see the body heading "BODY HEADING EOM"

    Scenario: I can verify article text styling on article page with hero video
        Given I am currently viewing "fashion/automation-test-article-with-hero-video-3664"
        * I can see the long title "LONG TITLE LONG TITLE EOM"
        * I can see the body heading "BODY HEADING EOM"

    Scenario: Verify a gallery page in desktop style on desktop view for
        When I switch to "desktop" view
        Given I am currently viewing "fashion/automation-test-gallery-13302"
        Then I can see the long title on the gallery header "AUTOMATION TEST GALLERY LONG TITLE LONG TITLE LONG TITLE LONG TITLE LONG TITLE LONG TITLE EOM"
        When I see the last image on the gallery
        And I can click the right arrow on the gallery on the last slide
        Then I can see the next gallery name "JOE MANUAL TEST GALLERY LONG TITLE LONG TITLE LONG TITLE LONG TITLE LONG TITLE LONG TITLE EOM"

    Scenario: Verify a gallery page in mobile style on mobile view
        When I switch to "mobile" view
        Given I am currently viewing "fashion/automation-test-gallery-13302"
        Then I can see the long title on the gallery header "AUTOMATION TEST GALLERY LONG TITLE LONG TITLE LONG TITLE LONG TITLE LONG TITLE LONG TITLE EOM"
        When I see the last image on the gallery
        And I can click the right arrow on the gallery on the last slide
        Then I can see the next gallery name on mobile "TEST GALLERY LONG TITLE"

    Scenario: Verify the hero teaser element is functional correctly in mobile view
        Given I am currently viewing the homepage
        When I switch to "mobile" view
        * I should see the homepage hero custom label below the hero image
        * I should see each top feed item containing long title and the first one is "TEST GALLERY LONG TITLE"
        * I should see each bottom feed item containing long title with first long title as "YOU CAN NOW DRESS"
        When I switch to "tablet landscape" view
        * I should see the homepage hero custom label below the hero image
        * I should see each top feed item containing long title and the first one is "TEST GALLERY LONG TITLE"
        * I should see each bottom feed item containing long title with first long title as "YOU CAN NOW DRESS"

    Scenario: I can see the created date on the gallery
        When I switch to "mobile" view
        Given I am currently viewing "fashion/automation-test-gallery-13302"
        * I can see the created date of the gallery "Jun 11, 2015"
        When I switch to "tablet portrait" view
        * I can see the created date of the gallery "Jun 11, 2015"
        When I switch to "tablet landscape" view
        * I can see the created date of the gallery "Jun 11, 2015"
        When I switch to "desktop" view
        * I can see the created date of the gallery "Jun 11, 2015"

    Scenario: Verify a gallery page in desktop style on tablet landscape view
        When I switch to "tablet landscape" view
        Given I am currently viewing "fashion/automation-test-gallery-13302"
        * I can see the long title on the gallery header "AUTOMATION TEST GALLERY LONG TITLE LONG TITLE LONG TITLE LONG TITLE LONG TITLE LONG TITLE EOM"
