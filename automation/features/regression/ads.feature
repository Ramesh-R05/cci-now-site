@ad @now
Feature: Ad
    As a user
    I should be able to see the relevant Ads on the site

# -------- Homepage Ads on desktop and mobile are High as this is an area with Commercial Value ---------------
    @homepage
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

    @homepage @low
    Scenario: Ads on homepage in the tablet portrait view
        Given I switch to "tablet portrait" view
        When I am currently viewing the homepage
        * I should see the top leaderboard ad under navigation
        * I should see MREC ad under the hero teaser
        * I should see sticky MREC ad next to the bottom news feed
        * I should not see MREC ad in the bottom news feed
        * I should see the middle leaderboard ad under the top news feed
        * I should see the bottom leaderboard ad above the footer

    @homepage @med
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

    @section
    Scenario Outline: Ads on section landing page in the <device> view
        Given I switch to "<device>" view
        When I am currently viewing "fashion"
        * I should see the top leaderboard ad under navigation
        * I should see sticky MREC ad next to the top news feed
        * I should not see MREC ad under the hero teaser
        * I should see sticky MREC ad next to the bottom news feed
        * I should see the middle leaderboard ad under the top news feed
        * I should see the bottom leaderboard ad above the footer
        @med
        Examples:
            |device             |
            |desktop            |
        @low
        Examples:
            |device             |
            |tablet landscape   |

    @section @low
    Scenario: Ads on section landing page in the tablet portrait view
        Given I switch to "tablet portrait" view
        When I am currently viewing "fashion"
        * I should see the top leaderboard ad under navigation
        * I should see MREC ad under the hero teaser
        * I should see sticky MREC ad next to the bottom news feed
        * I should not see MREC ad in the bottom news feed
        * I should see the middle leaderboard ad under the top news feed
        * I should see the bottom leaderboard ad above the footer

    @section @high
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

    @gallery
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

    @gallery @low
    Scenario: Ads on gallery page in the tablet portrait view
        Given I switch to "tablet portrait" view
        When I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        * I should see the top leaderboard ad under navigation
        * I should see native ad below author
        * I should see MREC ad above recommendation
        * I should see the bottom leaderboard ad above the footer on article
        * I should not see MREC ad under the hero image
        * I should see MREC ad between images

    @gallery @med
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
    @article
    Scenario Outline: Ads on article page in the <device> view
        Given I switch to "<device>" view
        When I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        * I should see the top leaderboard ad under navigation
        * I should see the bottom leaderboard ad above the footer on article
        * I should see four MREC ads in the RHR feed
        * I should not see MREC ad under the hero image
        * I should not see MREC ad above recommendation
        @med
        Examples:
            |device             |
            |desktop            |
        @low
        Examples:
            |device             |
            |tablet landscape   |

    @article @low
    Scenario: Ads on article page in the tablet portrait view
        Given I switch to "tablet portrait" view
        When I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        * I should see the top leaderboard ad under navigation
        * I should see MREC ad above recommendation
        * I should see the bottom leaderboard ad above the footer on article
        * I should not see MREC ad under the hero image

    @article @high
    Scenario: Ads on article page in the mobile view
        Given I switch to "mobile" view
        When I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        * I should see the top leaderboard ad under navigation
        * I should not see MREC ad under the hero image
        * I should see MREC ad above recommendation
        * I should see the bottom leaderboard ad above the footer on article

#-------- Article Page Ads end ---------------#

# -------- Wall Paper Ads are High and Medium as this is an area with Commercial Value ---------------
    @med
    Scenario Outline: Wallpaper ad and side panel ad should appear on "<page>" page in the desktop view
        Given I switch to "desktop" view
        When I am currently viewing "<url>"
        * I should "see" the wallpaper ad slot on "<page>"
        * I should "see" the left and right side ad slot on "<page>"
        @section
        Examples:
            |page       |url                                                                |
            |section    |fashion                                                            |
        @article
        Examples:
            |page       |url                                                                |
            |article    |fashion/red-carpet/automation-test-article-with-hero-image-3663    |
        @gallery
        Examples:
            |page       |url                                                                |
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

    @med
    Scenario Outline: Sticky MREC ad in RHS will autorefresh on <page> in desktop view
        Given I switch to "desktop" view
        When I am currently viewing "<pageUrl>"
        Then I can see last RHR ad is sticky
        And the "sticky MREC ad" will "auto" refresh every 30 seconds on "<page>" when is in View
        # And after 15 seconds the page will go idle and the add will no refresh anymore # This is tested manually
        @article
        Examples:
            |page     |pageUrl                                                         |
            |article  |fashion/red-carpet/automation-test-article-with-hero-image-3663 |
        @gallery
        Examples:
            |page     |pageUrl                                                         |
            |gallery  |fashion/red-carpet/automation-test-gallery-13302                |

#-------- Test Auto-refreshing ad for MREC end-----------#

#-------- Test viewability of sticky top leaderboard ad and sticky bottom leaderboard-----------#
    @med
    Scenario Outline: Verify the sticky top leaderboard on <page> in mobile view
        Given I switch to "mobile" view
        When I am currently viewing "<pageUrl>"
        * I should "not see" bottom leaderboard ad sticky at the bottom of the "<page>" page
        * I should see sticky top leaderboard as I scroll down and "see" sticky bottom leaderboard once top disappears
        @gallery
        Examples:
            |page              |pageUrl                                                                   |
            |gallery           |fashion/red-carpet/automation-test-gallery-13302                          |
        @section
        Examples:
            |page              |pageUrl                                                                   |
            |section           |fashion                                                                   |
        @brand
        Examples:
            |page              |pageUrl                                                                   |
            |brand             |womansday                                                                 |

    @low
    Scenario Outline: Verify the sticky top leaderboard on <page> in tablet portrait view
        Given I switch to "tablet portrait" view
        When I am currently viewing "<pageUrl>"
        * I should "not see" bottom leaderboard ad sticky at the bottom of the "<page>" page
        * I should see sticky top leaderboard as I scroll down and "see" sticky bottom leaderboard once top disappears
        @article
        Examples:
            |page              |pageUrl                                                                   |
            |article           |fashion/red-carpet/automation-test-article-with-hero-image-3663           |
        @section
        Examples:
            |page              |pageUrl                                                                   |
            |section           |fashion                                                                   |
        @homepage
        Examples:
            |page              |pageUrl                                                                   |
            |homepage          |                                                                          |

    @low
    Scenario Outline: Verify the sticky top leaderboard on <page> in tablet landscape view
        Given I switch to "tablet landscape" view
        When I am currently viewing "<pageUrl>"
        * I should see sticky top leaderboard as I scroll down and "not see" sticky bottom leaderboard once top disappears
        @gallery
        Examples:
            |page              |pageUrl                                                                   |
            |gallery           |fashion/red-carpet/automation-test-gallery-13302                          |
        @brand
        Examples:
            |page              |pageUrl                                                                   |
            |brand             |womansday                                                                 |
        @homepage
        Examples:
            |page              |pageUrl                                                                   |
            |homepage          |                                                                          |

    @med
    Scenario Outline: Verify the sticky top leaderboard on <page> in desktop view
        Given I switch to "desktop" view
        When I am currently viewing "<pageUrl>"
        * I should see sticky top leaderboard as I scroll down and "not see" sticky bottom leaderboard once top disappears
        @article
        Examples:
            |page              |pageUrl                                                                   |
            |article           |fashion/red-carpet/automation-test-article-with-hero-image-3663           |
        @section
        Examples:
            |page              |pageUrl                                                                   |
            |section           |fashion                                                                   |
        @brand
        Examples:
            |page              |pageUrl                                                                   |
            |brand             |womansday                                                                 |
#-------- Test viewability top leaderboard ad end-----------#


#-------- Test viewability of sticky top leaderboard ad and stiky bottom leaderboard auto refreshing-----------#
    @med
    Scenario Outline: Verify the autorefreshing mobile banner on <page> in mobile view
        Given I switch to "mobile" view
        When I am currently viewing "<pageUrl>"
        * I should see sticky top leaderboard as I scroll down and "see" sticky bottom leaderboard once top disappears
        * the "mobile banner ad" will "<auto>" refresh every 30 seconds on "<page>" when is in View
        @article
        Examples:
            |page      |auto        |pageUrl                                                                   |
            |article   |auto        |fashion/red-carpet/automation-test-article-with-hero-image-3663           |
        @homepage
        Examples:
            |page      |auto        |pageUrl                                                                   |
            |homepage  |not auto    |                                                                          |

    @low
    Scenario Outline: Verify the autorefreshing bottom leaderboard on <page> in tablet portrait view
        Given I switch to "tablet portrait" view
        When I am currently viewing "<pageUrl>"
        * I should see sticky top leaderboard as I scroll down and "see" sticky bottom leaderboard once top disappears
        * the "sticky bottom leaderboard ad" will "<auto>" refresh every 30 seconds on "<page>" when is in View
        @gallery
        Examples:
            |page      |auto        |pageUrl                                                                   |
            |gallery   |auto        |fashion/red-carpet/automation-test-gallery-13302                          |
        @brand
        Examples:
            |page      |auto        |pageUrl                                                                   |
            |brand     |not auto    |womansday                                                                 |

    @low
    Scenario Outline: Verify the autorefreshing bottom leaderboard on <page> in tablet landscape view
        Given I switch to "tablet landscape" view
        When I am currently viewing "<pageUrl>"
        * I should see sticky top leaderboard as I scroll down and "not see" sticky bottom leaderboard once top disappears
        * the "bottom leaderboard ad" will "not auto" refresh every 30 seconds on "<page>" when is in View
        @article
        Examples:
            |page              |pageUrl                                                                   |
            |article           |fashion/red-carpet/automation-test-article-with-hero-image-3663           |
        @section
        Examples:
            |page              |pageUrl                                                                   |
            |section           |fashion                                                                   |

    @med
    Scenario Outline: Verify the autorefreshing bottom leaderboard on <page> in desktop view
        Given I switch to "desktop" view
        When I am currently viewing "<pageUrl>"
        * I should see sticky top leaderboard as I scroll down and "not see" sticky bottom leaderboard once top disappears
        * the "bottom leaderboard ad" will "not auto" refresh every 30 seconds on "<page>" when is in View
        @gallery
        Examples:
            |page              |pageUrl                                                                   |
            |gallery           |fashion/red-carpet/automation-test-gallery-13302                          |
        @homepage
        Examples:
            |page              |pageUrl                                                                   |
            |homepage          |                                                                          |
#-------- Test sticky bottom leaderboard auto refreshing end-----------#

