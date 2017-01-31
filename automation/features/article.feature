@article @now
Feature: Article
    As a user
    I should be able to see the article page

    @DDO-46 @DAW-1125
    Scenario: Verify an article page which contains a hero image on mobile
        When I switch to "mobile" view
        Given I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        * I can see the long title "Automation Test Article With Hero Image Test Title Long Title"
        * I can see the created date "FEB 12, 2016 4:00PM"
        * I can see the author "EMILY KERR"
        * I can see the hero image
        * I should not see the hero image caption
        * I can see the image alt text in the hero image element "Image ALT TEXT"
        * I can see the short teaser "Short Teaser EOM"
        * I can see the body paragraph "Test body paragraph"
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
        * I can see the body Facebook embed "https://www.facebook.com/Foodtoloveau/posts/823515874446034"
        * I can see the body Playbuzz embed "/cosmopolitanmagazine10/which-harry-styles-is-your-boyfriend"
        * I can see the body Youtube embed "https://www.youtube.com/embed/4GpnNxjy6m0"
        * I can see the body Vimeo embed "https://player.vimeo.com/video/181027959"
        * I can see the related tags "Gossip Girl," "Dolly Doctor"
        * I can see the "header" source appearing with gtm "gtm-brandlogotop-article"
        * I can see the "bottom" source appearing with gtm "gtm-brandlogobottom-article"

    @DAW-1125
    Scenario: Verify an article page which contains a hero video on tablet portrait
        When I switch to "tablet portrait" view
        Given I am currently viewing "beauty/hair/automation-test-article-with-hero-video-3664"
        * I can see the long title "Automation Test Article With Hero Image Test Title Long Title"
        * I can see the created date "FEB 12, 2016 4:00PM"
        * I can see the author "EMILY KERR"
        * I can see the hero video instead of the main image
        * I should not see the hero image caption
        * I can see the short teaser "Short Teaser EOM"
        * I can see the body paragraph "Test body paragraph"
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
        * I can see the body Facebook embed "https://www.facebook.com/Foodtoloveau/posts/823515874446034"
        * I can see the body Playbuzz embed "/cosmopolitanmagazine10/which-harry-styles-is-your-boyfriend"
        * I can see the body Youtube embed "https://www.youtube.com/embed/4GpnNxjy6m0"
        * I can see the body Vimeo embed "https://player.vimeo.com/video/181027959"
        * I can see the related tags "Gossip Girl," "Dolly Doctor"
        * I can see the "header" source appearing with gtm "gtm-brandlogotop-article"
        * I can see the "bottom" source appearing with gtm "gtm-brandlogobottom-article"

    Scenario: Verify an article page which contains a hero image on desktop
        When I switch to "desktop" view
        Given I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        * I can see the long title "Automation Test Article With Hero Image Test Title Long Title"
        * I can see the created date "FEB 12, 2016 4:00PM"
        * I can see the author "EMILY KERR"
        * I can see the hero image
        * I should not see the hero image caption
        * I can see the image alt text in the hero image element "Image ALT TEXT"
        * I can see the short teaser "Short Teaser EOM"
        * I can see the body paragraph "Test body paragraph"
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
        * I can see the body Facebook embed "https://www.facebook.com/Foodtoloveau/posts/823515874446034"
        * I can see the body Playbuzz embed "/cosmopolitanmagazine10/which-harry-styles-is-your-boyfriend"
        * I can see the body Youtube embed "https://www.youtube.com/embed/4GpnNxjy6m0"
        * I can see the body Vimeo embed "https://player.vimeo.com/video/181027959"
        * I can see the related tags "Gossip Girl," "Dolly Doctor"
        * I can see the "header" source appearing with gtm "gtm-brandlogotop-article"
        * I can see the "bottom" source appearing with gtm "gtm-brandlogobottom-article"


    @DDO-160 @DDO-48
    Scenario Outline: Verify LHR on different screen sizes "<device>"
        Given I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        When I switch to "<device>" view
        * I can see the LHR
        Examples:
        | device            |
        | desktop           |
        | tablet landscape  |

    Scenario Outline: Verify LHR on different screen sizes "<device>"
        Given I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        When I switch to "<device>" view
        * I should not see the LHR
        Examples:
        | device            |
        | tablet portrait   |
        | mobile            |

    @BXMA-174
    Scenario: Verify the LHR on an article page
        Given I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        When I switch to "desktop" view
       # * I can see 20 items in the list of items in LHR #enable again in the article polar branch
       # * I can see the 20 images of each item in LHR #enable again in the article polar branch
        * Image in LHR is clickable to open its page
        * I can see the long title of each item in LHR
        * Long title in LHR is clickable to open its page
        * I can see each item in LHR containing source and date

    @BXMA-155
    Scenario Outline: Verify the share buttons on an article page in "<device>" view
        Given I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        When I switch to "<device>" view
        * I can see the facebook share button on article page
        * I can see the pinterest share button on article page
        Examples:
            | device            |
            | mobile            |
            | tablet portrait   |
            | tablet landscape  |
            | desktop           |
