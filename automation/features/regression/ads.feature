@ad @now
Feature: Ad
    As a user
    I should be able to see the relevant Ads on the site

# -------- Homepage Ads on desktop and mobile are High as this is an area with Commercial Value ---------------
    @homepage @BXMA-90
    Scenario Outline: Ads on homepage in the <device> view
        Given I switch to "<device>" view
        When I am currently viewing the homepage
        * I should see the top leaderboard ad under navigation
        * I should see sticky MREC ad next to the top news feed
        * I should not see MREC ad under the hero teaser
        * I should see sticky MREC ad next to the bottom news feed
        * I should not see MREC ad in the bottom news feed
        * I should see the middle leaderboard ad under the top news feed
        * I should see the bottom leaderboard ad above the footer
    @high
        Examples:
            |device             |
            |desktop            |
    @low
        Examples:
            |device             |
            |tablet landscape   |

    @homepage @BXMA-90 @low
    Scenario: Ads on homepage in the tablet portrait view
        Given I switch to "tablet portrait" view
        When I am currently viewing the homepage
        * I should see the top leaderboard ad under navigation
        * I should see MREC ad under the hero teaser
        * I should see sticky MREC ad next to the bottom news feed
        * I should not see MREC ad in the bottom news feed
        * I should see the middle leaderboard ad under the top news feed
        * I should see the bottom leaderboard ad above the footer

    @homepage @BXMA-90 @high
    Scenario: Ads on homepage in the mobile view
        Given I switch to "mobile" view
        When I am currently viewing the homepage
        * I should see the top leaderboard ad under navigation
        * I should see MREC ad under the hero teaser
        * I should see the middle leaderboard ad under the top news feed
        * I should see MREC ad in the bottom news feed
        * I should see the bottom leaderboard ad above the footer
#-------- Homepage Ads end ---------------#

# -------- Section Page Ads on desktop are High as this are areas with Commercial Value ---------------

    @section @BXMA-34
    Scenario Outline: Ads on section landing page in the <device> view
        Given I switch to "<device>" view
        When I am currently viewing "fashion"
        * I should see the top leaderboard ad under navigation
        * I should see sticky MREC ad next to the top news feed
        * I should not see MREC ad under the hero teaser
        * I should see sticky MREC ad next to the bottom news feed
        * I should see the middle leaderboard ad under the top news feed
        * I should see the bottom leaderboard ad above the footer
    @high
        Examples:
            |device             |
            |desktop            |
    @low
        Examples:
            |device             |
            |tablet landscape   |

    @section @BXMA-34 @low
    Scenario: Ads on section landing page in the tablet portrait view
        Given I switch to "tablet portrait" view
        When I am currently viewing "fashion"
        * I should see the top leaderboard ad under navigation
        * I should see MREC ad under the hero teaser
        * I should see sticky MREC ad next to the bottom news feed
        * I should not see MREC ad in the bottom news feed
        * I should see the middle leaderboard ad under the top news feed
        * I should see the bottom leaderboard ad above the footer

    @section @BXMA-34 @high
    Scenario: Ads on section landing page in the mobile view
        Given I switch to "mobile" view
        When I am currently viewing "fashion"
        * I should see the top leaderboard ad under navigation
        * I should see MREC ad under the hero teaser
        * I should see the middle leaderboard ad under the top news feed
        * I should see MREC ad in the bottom news feed
        * I should see the bottom leaderboard ad above the footer

#-------- Section Page Ads end ---------------#

# -------- Gallery Page Ads on desktop are High as this is an area with Commercial Value ---------------

    @gallery @BXMA-132
    Scenario Outline: Ads on gallery page in the <device> view
        Given I switch to "<device>" view
        When I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        * I should see the top leaderboard ad under navigation
        * I should see native ad below author
        * I should see the bottom leaderboard ad above the footer on article
        * I should see four MREC ads in the RHR feed
        * I should not see MREC ad under the hero image
        * I should not see MREC ad above recommendation
        * I should see MREC ad between images
    @high
        Examples:
            |device             |
            |desktop            |
    @low
        Examples:
            |device             |
            |tablet landscape   |

    @gallery @BXMA-132 @low
    Scenario: Ads on gallery page in the tablet portrait view
        Given I switch to "tablet portrait" view
        When I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        * I should see the top leaderboard ad under navigation
        * I should see native ad below author
        * I should see MREC ad above recommendation
        * I should see the bottom leaderboard ad above the footer on article
        * I should not see MREC ad under the hero image
        * I should see MREC ad between images

    @gallery @BXMA-132 @high
    Scenario: Ads on gallery page in the mobile view
        Given I switch to "mobile" view
        When I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        * I should see the top leaderboard ad under navigation
        * I should see native ad below author
        * I should not see MREC ad under the hero image
        * I should see MREC ad above recommendation
        * I should see the bottom leaderboard ad above the footer on article
        * I should see MREC ad between images

#-------- Gallery Page Ads end ---------------#

# -------- Article Page Ads on desktop are High as this is an area with Commercial Value ---------------
    @article @BXMA-326
    Scenario Outline: Ads on article page in the <device> view
        Given I switch to "<device>" view
        When I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        * I should see the top leaderboard ad under navigation
        * I should see the bottom leaderboard ad above the footer on article
        * I should see four MREC ads in the RHR feed
        * I should not see MREC ad under the hero image
        * I should not see MREC ad above recommendation
    @high
        Examples:
            |device             |
            |desktop            |
    @low
        Examples:
            |device             |
            |tablet landscape   |

    @article @BXMA-326 @low
    Scenario: Ads on article page in the tablet portrait view
        Given I switch to "tablet portrait" view
        When I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        * I should see the top leaderboard ad under navigation
        * I should see MREC ad above recommendation
        * I should see the bottom leaderboard ad above the footer on article
        * I should not see MREC ad under the hero image

    @article @BXMA-326 @high
    Scenario: Ads on article page in the mobile view
        Given I switch to "mobile" view
        When I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        * I should see the top leaderboard ad under navigation
        * I should not see MREC ad under the hero image
        * I should see MREC ad above recommendation
        * I should see the bottom leaderboard ad above the footer on article

#-------- Article Page Ads end ---------------#

# -------- Wall Paper Ads are High and Medium as this is an area with Commercial Value ---------------

    @BXMA-156 @high
    Scenario Outline: Wallpaper ad and side panel ad should appear on "<page>" page in the desktop view
        Given I switch to "desktop" view
        When I am currently viewing "<url>"
        * I should "see" the wallpaper ad slot on "<page>"
        * I should "see" the left and right side ad slot on "<page>"
        Examples:
            |page       |url                                                                |
            |section    |fashion                                                            |
            |article    |fashion/red-carpet/automation-test-article-with-hero-image-3663    |
            |gallery    |fashion/red-carpet/automation-test-gallery-13302                   |

#-------- Wall Paper Ads end ---------------#

# -------- Inskin Ads on desktop are High as this is an area with Commercial Value ---------------

#    @BXMA-156
#    Scenario Outline: Out of page (Inskin) ad should appear on "<page>" page in the "<device>" view
#        Given I switch to "<device>" view
#        When I am currently viewing "<url>"
#        * I should "see" the out of page ad slot on "<page>"
#    @manual
#        Examples:
#            |device             |page       |url                                                         |
#            |desktop            |section    |beauty                                                      |
#            |tablet landscape   |article    |beauty/hair/automation-test-article-with-hero-video-3664    |
#            |tablet portrait    |gallery    |beauty/hair/automation-test-gallery-inskin-13303            |
#-------- Inskin Ads end ---------------#

#-------- Test Auto-refreshing Ads for MREC in RHR -----------#

    @BXMA-415 @BXMA-406 @high
    Scenario Outline: Sticky MREC ad in RHS will autorefresh on <page> in desktop view
        Given I switch to "desktop" view
        When I am currently viewing "<pageUrl>"
        Then I can see last RHR ad is sticky
        And the "sticky MREC ad" will "auto" refresh every 6 seconds on "<page>" when is in View
        # And after 15 seconds the page will go idle and the add will no refresh anymore # This is tested manually
        Examples:
            |page     |pageUrl                                                         |
            |article  |fashion/red-carpet/automation-test-article-with-hero-image-3663 |
            |gallery  |fashion/red-carpet/automation-test-gallery-13302                |

#-------- Test Auto-refreshing ad for MREC end-----------#

#-------- Test viewability of sticky top leaderboard ad and stiky bottom leaderboard auto refreshing-----------#
    @high @BXMA-409 @BXMA-410 
    Scenario Outline: Verify the sticky top leaderboard and the autorefreshing mobile banner on <page> in mobile view
        Given I switch to "mobile" view
        When I am currently viewing "<pageUrl>"
        * I should "not see" bottom leaderboard ad sticky at the bottom of the "<page>" page
        * I should see sticky top leaderboard as I scroll down and "see" sticky bottom leaderboard once top dissapears
        * the "bottom leaderboard ad" will "<auto>" refresh every 6 seconds on "<page>" when is in View
        Examples:
            |page      |auto        |pageUrl                                                                   |
            |article   |auto        |fashion/red-carpet/automation-test-article-with-hero-image-3663           |
            |gallery   |auto        |fashion/red-carpet/automation-test-gallery-13302                          |
            |section   |not auto    |fashion                                                                   |
            |brand     |not auto    |womansday                                                                 |
            |homepage  |not auto    |                                                                          |

    @low @BXMA-409 @BXMA-41 
    Scenario Outline: Verify the sticky top leaderboard and the autorefreshing bottom leaderboard on <page> in tablet portrait view
        Given I switch to "tablet portrait" view
        When I am currently viewing "<pageUrl>"
        * I should "not see" bottom leaderboard ad sticky at the bottom of the "<page>" page
        * I should see sticky top leaderboard as I scroll down and "see" sticky bottom leaderboard once top dissapears
        * the "sticky bottom leaderboard ad" will "<auto>" refresh every 6 seconds on "<page>" when is in View
        Examples:
            |page      |auto        |pageUrl                                                                   |
            |article   |auto        |fashion/red-carpet/automation-test-article-with-hero-image-3663           |
            |gallery   |auto        |fashion/red-carpet/automation-test-gallery-13302                          |
            |section   |not auto    |fashion                                                                   |
            |brand     |not auto    |womansday                                                                 |
            |homepage  |not auto    |                                                                          |

    @low @BXMA-409 @BXMA-410 
    Scenario Outline: Verify the sticky top leaderboard and the autorefreshing bottom leaderboard on <page> in tablet landscape view
        Given I switch to "tablet landscape" view
        When I am currently viewing "<pageUrl>"
        * I should see sticky top leaderboard as I scroll down and "not see" sticky bottom leaderboard once top dissapears
        * the "bottom leaderboard ad" will "not auto" refresh every 6 seconds on "<page>" when is in View
        Examples:
            |page              |pageUrl                                                                   |
            |article           |fashion/red-carpet/automation-test-article-with-hero-image-3663           |
            |gallery           |fashion/red-carpet/automation-test-gallery-13302                          |
            |section           |fashion                                                                   |
            |brand             |womansday                                                                 |
            |homepage          |                                                                          |

    @high @BXMA-409 @BXMA-410
    Scenario Outline: Verify the sticky top leaderboard and the autorefreshing bottom leaderboard on <page> in desktop view 
        Given I switch to "desktop" view
        When I am currently viewing "<pageUrl>"
        * I should see sticky top leaderboard as I scroll down and "not see" sticky bottom leaderboard once top dissapears
        * the "bottom leaderboard ad" will "not auto" refresh every 6 seconds on "<page>" when is in View
        Examples:
            |page              |pageUrl                                                                   |
            |article           |fashion/red-carpet/automation-test-article-with-hero-image-3663           |
            |gallery           |fashion/red-carpet/automation-test-gallery-13302                          |
            |section           |fashion                                                                   |
            |brand             |womansday                                                                 |
            |homepage          |                                                                          |
#-------- Test viewability top leaderboard ad end-----------#
