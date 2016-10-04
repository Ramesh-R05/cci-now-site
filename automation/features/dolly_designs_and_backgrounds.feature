@homepage @dolly
Feature: I can validate dolly backgrounds and designs

    Scenario: I can validate the backgrounds of my homepage
        Given I am currently viewing the homepage
        When I switch to "mobile" view
        * I should see the homepage hero border in mobile style
        * I should see the homepage hero striped background
        When I switch to "tablet portrait" view
        * I should see the homepage hero border in tablet style
        * I should see the homepage hero striped background
        When I switch to "tablet landscape" view
        * I should see the homepage hero border in tablet style
        * I should see the homepage hero striped background
        When I switch to "desktop" view
        * I should see the homepage hero border in desktop style
        * I should see the homepage hero striped background

    Scenario: I can verify article text styling on article page with hero image
        Given I am currently viewing "fashion/automation-test-article-with-hero-image-3663"
        * I can see the long title "Long Title Long Title EOM"
        * I can see the body heading "body heading EOM"

    Scenario: I can verify article text styling on article page with hero video
        Given I am currently viewing "fashion/automation-test-article-with-hero-video-3664"
        * I can see the long title "Long Title Long Title EOM"
        * I can see the body heading "body heading EOM"

    Scenario: Verify a gallery page in desktop style on desktop view for
        When I switch to "desktop" view
        Given I am currently viewing "fashion/automation-test-gallery-13302"
        Then I can see the long title on the gallery header "Automation Test Gallery long title"
        When I see the last image on the gallery
        And I can click the right arrow on the gallery on the last slide
        Then I can see the next gallery name "Test Gallery long title"

    Scenario: Verify a gallery page in mobile style on mobile view
        When I switch to "mobile" view
        Given I am currently viewing "fashion/automation-test-gallery-13302"
        Then I can see the long title on the gallery header "Automation Test Gallery long title"
        When I see the last image on the gallery
        And I can click the right arrow on the gallery on the last slide
        * I can see the next gallery name on mobile "Test Gallery long title"

    Scenario: Verify the hero teaser element is functional correctly in mobile view
        Given I am currently viewing the homepage
        When I switch to "mobile" view
        * I should see the homepage hero custom label at the bottom edge of hero image
        * I should see each top feed item containing long title and the first one is "Joe Manual Test Gallery long title long title long title"
        * I should see each bottom feed item containing long title with first long title as "You can now dress like Ariana Grande without going broke"
        When I switch to "tablet landscape" view
        * I should see the homepage hero custom label at the bottom edge of hero image
        * I should see each top feed item containing long title and the first one is "Joe Manual Test Gallery long title long title long title"
        * I should see each bottom feed item containing long title with first long title as "You can now dress like Ariana Grande without going broke"

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
        * I can see the long title on the gallery header "Automation Test Gallery long title"


