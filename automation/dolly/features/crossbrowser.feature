@manual @local @javascript @crossbrowser
Feature: Cross Browser Testing
    As a user
    I should be able to see all pages working correctly on both desktop and mobile

    Scenario: Verify homepage
        Given I am currently viewing the homepage
        * I can see the WN header
        * I can see the dolly header and navigation on "homepage"
        * I should see the trending element
        * I should see the homepage hero element
        * The homepage hero image should be clickable to open its page
        * I should see the homepage hero title
        * The homepage hero title should be clickable to open its page
        * I should see the homepage hero short teaser
        * I should see the homepage hero striped background
        * I should see 7 top half feed
        * I should see each top feed item containing custom label
        * I should see each top feed item containing long title and the first one is "Joe Manual Test Gallery long title long title long title"
        * I should see each top feed item containing short teaser and the first one is "Joe Manual Test Gallery Short Teaser Short Teaser Short Teaser"
        * Image and long title in each top feed item are clickable to open its page
        * I should see 7 bottom half feed
        * I should see each bottom feed item containing custom label
        * I should see each bottom feed item containing long title with first long title as "You can now dress like Ariana Grande without going broke"

    Scenario: Verify an article page which contains a hero image
        Given I am currently viewing "fashion/automation-test-article-with-hero-image-3663"
        * I can see the WN header
        * I can see the dolly header and navigation on "article"
        * I can see the created date
        * I can see the long title "Long Title Long Title EOM"
        * I can see the image alt text in the hero image element "Image ALT TEXT"
        * I should not see the hero image caption
        * I can see the short teaser "Short Teaser EOM"
        * I can see the body paragraph "Test body paragraph"
        * I can see the body heading "body heading EOM"
        * I can see the body related content
        * I can see the body image
        * I can see the body image caption "Photography by"
        * I can see the body gallery
        * I can see the body video
        * I can see the body tips "body tips body tips EOM"
        * I can see the body competition
        * I can see the body Twitter embed "697199025729048577"
        * I can see the body Instagram embed with caption "https://www.instagram.com/p/BBda49yyr4J/embed/captioned/"
        * I can see the body Instagram embed without caption "https://www.instagram.com/p/BA4NkZeSr_r/embed/"
        * I can see the related tags "Gossip Girl," "Dolly Doctor"
        * I can see the author "Emily Kerr"

    Scenario: Verify an article page which contains a hero video
        Given I am currently viewing "fashion/automation-test-article-with-hero-video-3664"
        * I can see the long title "Long Title Long Title EOM"
        * I can see the hero video instead of the main image
        * I should not see the hero image caption

    Scenario: Verify a gallery page
        Given I am currently viewing "fashion/automation-test-gallery-13302"
        * I can not see the WN header
        * I can see the dolly logo on the gallery header
        * I can click the dolly logo to go to homepage
        * I can see the long title on the gallery header "Automation Test Gallery long title"
        * I can see an image appearing on the gallery
        #* I can see the custom label of the gallery #will cover when DDO-305 is implemented
        * I can see the created date of this gallery
        * I can see the gallery description of the gallery containing "Test the second paragraph"
        * I can see the right arrow on the gallery
        * I should not see the left arrow on the gallery
        * I can see the image number "1" of total "8" on the gallery
        * I can see the image caption on the gallery containing "Fresh-faced beauty"
        * I can click MORE to see the full image caption on the gallery
        * I can click LESS to see the short image caption on the gallery
        * I can click the right arrow on the gallery
        When I see the image no "2" on the gallery
        * I can see the left arrow on the gallery
        * I can see an image appearing on the gallery
        * I can see the image caption on the gallery containing "a glossy lip!"
        * I can click the left arrow to go back to a previous image on the gallery
        When I see the video ID "3976804555001" on the gallery
        * I can see the left arrow on the gallery
        * I can see the right arrow on the gallery
        * I can click the left and right arrows on the gallery
        When I see the last image on the gallery
        * I can see an image appearing on the gallery
        * I can click the right arrow on the gallery on the last slide
        Then I can see the dolly logo on the gallery header
        * I can see the right arrow on the next gallery slide
        * I should not see the left arrow on the gallery


