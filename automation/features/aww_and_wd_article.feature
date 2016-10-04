@article @wd @aww
Feature: Article
    As a user
    I should be able to see the article page

    @DDO-46 @DAW-1125
    Scenario: Verify an article page which contains a hero image on mobile
        Given I switch to "mobile" view
        And I am currently viewing "royals/british-royal-family/prince-william-reveals-princess-charlotte-keeps-him-up-all-night-while-prince-george-never-stops-moving-12627"
        * I can see the created date "May 21, 2015"
        * I can see the author is "Chloe Lal"
        * I can see the long title "Prince William reveals Princess Charlotte keeps"
        * I can see the hero image
        * I should not see the hero image caption
        * I can see the short teaser "Prince William is getting into"
        * I can see the body paragraph "The Duke of Cambridge is now well and truly back"
        * I can see the body heading "body heading EOM"
        * I can see the body related content
        * I can see the body image
        * I can see the body image caption "This is inline image caption"
        * I can see the body gallery
        * I can see the body video
        * I can see the body competition
        * I can see the body Twitter embed "697199025729048577"
        * I can see the body Instagram embed with caption "https://www.instagram.com/p/BBda49yyr4J/embed/captioned/"
        * I can see the body Instagram embed without caption "https://www.instagram.com/p/BA4NkZeSr_r/embed/"
        * I can see the body Facebook embed "https://www.facebook.com/Foodtoloveau/posts/823515874446034"
        * I can see the body Playbuzz embed "/cosmopolitanmagazine10/which-harry-styles-is-your-boyfriend"
        * I can see the body Youtube embed "https://www.youtube.com/embed/4GpnNxjy6m0"
        * I can see the body Vimeo embed "https://player.vimeo.com/video/181027959"
        * I can see the related tag "PRINCE WILLIAM DUKE OF CAMBRIDGE"

    @DDO-46 @DAW-1125
    Scenario: Verify an article page which contains a hero video on tablet portrait
        Given I switch to "tablet portrait" view
        And I am currently viewing "celebrity/australian-celebrities/hugh-jackman-as-blackbeard-15156"
        * I can see the created date "May 19, 2015"
        * I can see the author is "Chloe Lal"
        * I can see the long title "Hugh Jackman as Blackbeard in the new Pan"
        * I can see the hero video instead of the main image
        * I should not see the hero image caption
        * I can see the short teaser "Welcome to Neverland"
        * I can see the body paragraph "The Duke of Cambridge is now well and truly back"
        * I can see the body heading "body heading EOM"
        * I can see the body related content
        * I can see the body image
        * I can see the body image caption "This is inline image caption"
        * I can see the body gallery
        * I can see the body video
        * I can see the body competition
        * I can see the body Twitter embed "697199025729048577"
        * I can see the body Instagram embed with caption "https://www.instagram.com/p/BBda49yyr4J/embed/captioned/"
        * I can see the body Instagram embed without caption "https://www.instagram.com/p/BA4NkZeSr_r/embed/"
        * I can see the body Facebook embed "https://www.facebook.com/Foodtoloveau/posts/823515874446034"
        * I can see the body Playbuzz embed "/cosmopolitanmagazine10/which-harry-styles-is-your-boyfriend"
        * I can see the body Youtube embed "https://www.youtube.com/embed/4GpnNxjy6m0"
        * I can see the body Vimeo embed "https://player.vimeo.com/video/181027959"
        * I can see the related tag "FILM"

    @DDO-46 @DAW-1125
    Scenario: Verify an article page which contains a hero image on desktop
        Given I switch to "desktop" view
        And I am currently viewing "royals/british-royal-family/prince-william-reveals-princess-charlotte-keeps-him-up-all-night-while-prince-george-never-stops-moving-12627"
        * I can see the created date "May 21, 2015"
        * I can see the author is "Chloe Lal"
        * I can see the long title "Prince William reveals Princess Charlotte keeps"
        * I can see the hero image
        * I should not see the hero image caption
        * I can see the short teaser "Prince William is getting into"
        * I can see the body paragraph "The Duke of Cambridge is now well and truly back"
        * I can see the body heading "body heading EOM"
        * I can see the body related content
        * I can see the body image
        * I can see the body image caption "This is inline image caption"
        * I can see the body gallery
        * I can see the body video
        * I can see the body competition
        * I can see the body Twitter embed "697199025729048577"
        * I can see the body Instagram embed with caption "https://www.instagram.com/p/BBda49yyr4J/embed/captioned/"
        * I can see the body Instagram embed without caption "https://www.instagram.com/p/BA4NkZeSr_r/embed/"
        * I can see the body Facebook embed "https://www.facebook.com/Foodtoloveau/posts/823515874446034"
        * I can see the body Playbuzz embed "/cosmopolitanmagazine10/which-harry-styles-is-your-boyfriend"
        * I can see the body Youtube embed "https://www.youtube.com/embed/4GpnNxjy6m0"
        * I can see the body Vimeo embed "https://player.vimeo.com/video/181027959"
        * I can see the related tag "PRINCE WILLIAM DUKE OF CAMBRIDGE"

#    @ads
#    Scenario: Ads on the article page
#        Given I switch to "desktop" view
#        And I am currently viewing "royals/british-royal-family/prince-william-reveals-princess-charlotte-keeps-him-up-all-night-while-prince-george-never-stops-moving-12627"
#        * I can see the billboard top and bottom ad
#        When I switch to "tablet landscape" view
#        * I can see the leaderboard top and bottom ad
#        When I switch to "mobile" view
#        * I can see the banner top and bottom ad

    @DAW-1129 @DAW-1128
    Scenario: Verify LHR on different screensize
        Given I am currently viewing "fashion/automation-test-article-with-hero-image-3663"
        When I switch to "desktop" view
        * I can see the LHR
        * I should not see the LATEST header in LHR
        * I should see image of each item in LHR
        * I should be able to click on image in LHR to go to its page
        * I should see long title of each item in LHR
        * I should be able to click on long title in LHR to go to its page
        * I should see subsection of each item in LHR
        * I should be able to click on subsection in LHR to go to its page
        * I should see created date of each item in LHR

        When I switch to "tablet landscape" view
        * I can see the LHR
        * I should not see the LATEST header in LHR
        * I should see image of each item in LHR
        * I should be able to click on image in LHR to go to its page
        * I should see long title of each item in LHR
        * I should be able to click on long title in LHR to go to its page
        * I should see subsection of each item in LHR
        * I should be able to click on subsection in LHR to go to its page
        * I should see created date of each item in LHR

        When I switch to "tablet portrait" view
        * I should not see the LHR

        When I switch to "mobile" view
        * I should not see the LHR

