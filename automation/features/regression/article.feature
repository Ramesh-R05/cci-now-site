@article @now 
Feature: Article
    As a user
    I should be able to see the article page

# -------- Creation Date is low priority   ---------------#
    #--- time validation will need to be reviewed as testing with Shippable the server is on a different TimeZone
    @low
    Scenario Outline: Users can see the created date of content
        When I switch to "<device>" view
        Given I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        * I can see the created date "FEB 12, 2016"

        Examples:
            | device            |
            | mobile            |
            | desktop           |
            | tablet portrait   |
            | tablet landscape  |
# -------- Creation Date end   ---------------#

# -------- Hero Image is Med ---------------#
    Scenario Outline: Editorial team can create content with hero image
        When I switch to "<device>" view
        Given I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        * I can see the hero image
        * I should not see the hero image caption
        * I can see the image alt text in the hero image element "Image ALT TEXT"
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
# -------- Hero Image end   ---------------#

# -------- Hero Video on mobile is low (Pre-roll ad is not important). ---------------#
    @low
    Scenario Outline: Editorial team can create content with hero video
        When I switch to "<device>" view
        Given I am currently viewing "beauty/hair/automation-test-article-with-hero-video-3664"
        * I can see the hero video instead of the main image
        * I should not see the hero image caption

        Examples:
            | device            |
            | mobile            |
            | desktop           |
            | tablet portrait   |
            | tablet landscape  |
# -------- Hero Video end   ---------------#

# -------- primary content is High  ---------------#
    @DDO-46 @DAW-1125
    Scenario Outline: Verify an article page with the primary content on <device>
        When I switch to "<device>" view
        Given I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        * I can see the long title "Automation Test Article With Hero Image Test Title Long Title"
        * I can see the short teaser "Short Teaser EOM"
        * I can see the body paragraph "Test body paragraph"
        * I can see the body list "a list item"
    @high
        Examples:
            | device            |
            | mobile            |
    @med
        Examples:
            | device            |
            | desktop           |
    @low
        Examples:
            | device            |
            | tablet portrait   |
            | tablet landscape  |
# -------- primary content end  ---------------#

# -------- secondary content is Med   ---------------#
    Scenario Outline: Verify an article page with the secondary content on <device>
        When I switch to "<device>" view
        Given I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        * I can see the author "EMILY KERR"
        * I can see the body image
        * I can see the body image caption "Photography by"
        * I can see the body video
        * I can see the body competition
        * I can see the related tags "Gossip Girl," "Dolly Doctor"
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
# -------- secondary content end   ---------------#

# -------- optional content is Low   ---------------#
    Scenario Outline: Verify an article page with the optional content on <device>
        When I switch to "<device>" view
        Given I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        * I can see the body gallery
        * I can see the body tips "body tips body tips EOM"
    @low
        Examples:
            | device            |
            | mobile            |
            | desktop           |
            | tablet portrait   |
            | tablet landscape  |
# -------- optional content end   ---------------#

# -------- LHR are High and Medium as this Helps recirculate users ---------------#
    Scenario Outline: Verify LHR on different screen sizes "<device>"
        Given I switch to "<device>" view
        When I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        * I can see 20 items in the list of items in LHR
        * I can see the 20 images of each item in LHR
        * Image in LHR is clickable to open its page
        * I can see the long title of each item in LHR
        * Long title in LHR is clickable to open its page
        * I can see each item in LHR containing source and date
    @high
        Examples:
            | device            |
            | desktop           |
    @low
        Examples:
            | device            |
            | tablet landscape  |

# -------- Social share is Medium as this Helps recirculate users ---------------#
    Scenario Outline: Verify the share buttons on an article page in "<device>" view
        Given I switch to "<device>" view
        When I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        * I can see the facebook share button on article page
        * I can see the pinterest share button on article page
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
#-------- Social share end ---------------#

# -------- Social embed is Medium ---------------#
    Scenario Outline: Editorial team can add social feeds to the article body
        Given I switch to "<device>" view
        When I am currently viewing "fashion/red-carpet/automation-test-article-with-social-embed-3663"
        Then I can see the body Twitter embed "697199025729048577"
        * I can see the body Instagram embed with caption "https://www.instagram.com/p/BBda49yyr4J/embed/captioned/"
        * I can see the body Instagram embed without caption "https://www.instagram.com/p/BA4NkZeSr_r/embed/"
        * I can see the body Facebook embed "https://www.facebook.com/Foodtoloveau/posts/823515874446034"
        * I can see the body Playbuzz embed "/cosmopolitanmagazine10/which-harry-styles-is-your-boyfriend"
        * I can see the body Youtube embed "https://www.youtube.com/embed/4GpnNxjy6m0"
        * I can see the body Vimeo embed "https://player.vimeo.com/video/181027959"
        * I can see the body Whooshka embed "https://www.whooshkaa.com/player/episode/id/90704?visual=true"
        * I can see the body Wirewax embed "https://embed.wirewax.com/8037657/ff0044/"
        * I can see the body Linklay embed "//www.linklay.com/app/linklay/embed/linklay59151f750e2a94.81058944"
        * I can see the body Giphy embed "https://i.giphy.com/sLs8Ll8Qx51xm.gif"
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
#-------- Social embed end ---------------#

# -------- Outbrain is High  ---------------#
    Scenario Outline: Users can see Outbrain on the article page
        Given I switch to "<device>" view
        When I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        * I can see the outbrain frame with "NowtoLove" template
    @high
        Examples:
            | device            |
            | mobile            |
    @med
        Examples:
            | device            |
            | desktop           |
    @low
        Examples:
            | device            |
            | tablet portrait   |
            | tablet landscape  |
# -------- Outbrain end   ---------------#

    Scenario Outline: Users can see the Image Revealer component on the article page
        When I switch to "<device>" view
        Given I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        * I can see the Image Revealer component
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

