@ad @now
Feature: Ad
    As a user
    I should be able to see the relevant Ads on the site

#--------Index page ads (Homepage, Section, Brand)--------#
    Scenario Outline: Ads on index page in the <device> view (Test on <page>)
        Given I switch to "<device>" view
        When I am currently viewing "<pageUrl>"
        * I should see the top leaderboard ad under navigation
        * I should see sticky MREC ad next to the top news feed
        * I should not see MREC ad under the hero teaser
        * I should see sticky MREC ad next to the bottom news feed
        * I should not see MREC ad in the bottom news feed
        * I should see the middle leaderboard ad under the top news feed
        * I should see the bottom leaderboard ad above the footer
        @homepage @high
        Examples:
            |device             |page       |pageUrl    |
            |desktop            |homepage   |           |
        @section @low
        Examples:
            |device             |page       |pageUrl    |
            |tablet landscape   |section    |fashion    |

    @brand @low
    Scenario: Ads on index page in the tablet portrait view (Test on brand page)
        Given I switch to "tablet portrait" view
        When I am currently viewing "aww"
        * I should see the top leaderboard ad under navigation
        * I should see MREC ad under the hero teaser
        * I should see sticky MREC ad next to the bottom news feed
        * I should not see MREC ad in the bottom news feed
        * I should see the middle leaderboard ad under the top news feed
        * I should see the bottom leaderboard ad above the footer

    @homepage @high
    Scenario: Ads on index page in the mobile view (Test on homepage)
        Given I switch to "mobile" view
        When I am currently viewing the homepage
        * I should see the top leaderboard ad under navigation
        * I should see MREC ad under the hero teaser
        * I should see the middle leaderboard ad under the top news feed
        * I should see MREC ad in the bottom news feed
        * I should see the bottom leaderboard ad above the footer
#--------Index page ads (Homepage, Section, Brand) end--------#

#--------Content page ads (Article, Gallery)--------#
    Scenario Outline: Ads on content page in the <device> view (Test on <page>)
        Given I switch to "<device>" view
        When I am currently viewing "<pageUrl>"
        * I should see the top leaderboard ad under navigation
        * I should see native ad below author
        * I should see the bottom leaderboard ad above the footer on article
        * I should see 4 MREC ads in the RHR feed
        * I should not see MREC ad under the hero image
        * I should not see MREC ad above recommendation
        @gallery @high
        Examples:
            |device             |page       |pageUrl                                                            |
            |desktop            |gallery    |fashion/red-carpet/automation-test-gallery-13302                   |
        @article @low
        Examples:
            |device             |page       |pageUrl                                                            |
            |tablet landscape   |article    |fashion/red-carpet/automation-test-article-with-hero-image-3663    |

    @gallery @low
    Scenario: Ads on content page in the tablet portrait view (Test on gallery)
        Given I switch to "tablet portrait" view
        When I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        * I should see the top leaderboard ad under navigation
        * I should see native ad below author
        * I should see MREC ad above recommendation
        * I should see the bottom leaderboard ad above the footer on article
        * I should not see MREC ad under the hero image

    @article @high
    Scenario: Ads on content page in the mobile view (Test on article)
        Given I switch to "mobile" view
        When I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        * I should see the top leaderboard ad under navigation
        * I should see native ad below author
        * I should not see MREC ad under the hero image
        * I should see MREC ad above recommendation
        * I should see the bottom leaderboard ad above the footer on article

    @gallery
    Scenario Outline: Special ads in content body copy on gallery page in the <device> view
        Given I switch to "<device>" view
        When I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        Then I should see MREC ad between images
        @high
        Examples:
            |device             |
            |mobile             |
        @low
        Examples:
            |device             |
            |tablet portrait    |
#--------Article/Gallery page ads end--------#

#--------Wallpaper and side panel ads--------#
    @med
    Scenario Outline: Wallpaper ad and side panel ad should appear in the desktop view (Test on <page>)
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
#--------Wallpaper and side panel ads end--------#

#--------Inskin ad--------#
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
#--------Inskin ad end--------#

#--------Sticky and auto-refreshing MREC ad in RHS--------#
    @med
    Scenario Outline: Sticky MREC ad in RHS will autorefresh on content page in desktop view (Test on article)
        Given I switch to "desktop" view
        When I am currently viewing "<pageUrl>"
        Then I can see last RHR ad is sticky
        And the "sticky MREC ad" will "auto" refresh every 30 seconds on "<page>" when is in View
        # And after 15 seconds the page will go idle and the ad will not refresh anymore # This is tested manually
        @article
        Examples:
            |page     |pageUrl                                                         |
            |article  |fashion/red-carpet/automation-test-article-with-hero-image-3663 |
#--------Sticky and auto-refreshing MREC ad in RHS end--------#

#--------Sticky top leaderboard ad and sticky bottom leaderboard-----------#
    @med
    Scenario Outline: Verify the sticky top leaderboard in mobile view (Test on <page>)
        Given I switch to "mobile" view
        When I am currently viewing "<pageUrl>"
        * I should "not see" bottom leaderboard ad sticky at the bottom of the "<page>" page
        * I should see sticky top leaderboard as I scroll down and "see" sticky bottom leaderboard once top disappears
        @gallery
        Examples:
            |page              |pageUrl                                                                   |
            |gallery           |fashion/red-carpet/automation-test-gallery-13302                          |

    @low
    Scenario Outline: Verify the sticky top leaderboard in tablet portrait view (Test on <page>)
        Given I switch to "tablet portrait" view
        When I am currently viewing "<pageUrl>"
        * I should "not see" bottom leaderboard ad sticky at the bottom of the "<page>" page
        * I should see sticky top leaderboard as I scroll down and "see" sticky bottom leaderboard once top disappears
        @homepage
        Examples:
            |page              |pageUrl                                                                   |
            |homepage          |                                                                          |

    @low
    Scenario Outline: Verify the sticky top leaderboard in tablet landscape view (Test on <page>)
        Given I switch to "tablet landscape" view
        When I am currently viewing "<pageUrl>"
        * I should see sticky top leaderboard as I scroll down and "not see" sticky bottom leaderboard once top disappears
        @brand
        Examples:
            |page              |pageUrl                                                                   |
            |brand             |womansday                                                                 |

    @med
    Scenario Outline: Verify the sticky top leaderboard in desktop view (Test on <page>)
        Given I switch to "desktop" view
        When I am currently viewing "<pageUrl>"
        * I should see sticky top leaderboard as I scroll down and "not see" sticky bottom leaderboard once top disappears
        @article
        Examples:
            |page              |pageUrl                                                                   |
            |article           |fashion/red-carpet/automation-test-article-with-hero-image-3663           |
#--------Sticky top leaderboard ad and sticky bottom leaderboard end-----------#

#--------Auto-refreshing mobile banner and bottom leaderboard ad--------#
    @med
    Scenario Outline: Verify the autorefreshing mobile banner in mobile view (Test on <page>)
        Given I switch to "mobile" view
        When I am currently viewing "<pageUrl>"
        * the "mobile banner ad" will "<auto>" refresh every 30 seconds on "<page>" when is in View
        @article
        Examples:
            |page      |auto        |pageUrl                                                            |
            |article   |auto        |fashion/red-carpet/automation-test-article-with-hero-image-3663    |
        @homepage
        Examples:
            |page      |auto        |pageUrl    |
            |homepage  |not auto    |           |

    @low
    Scenario Outline: Verify the autorefreshing bottom leaderboard in tablet portrait view (Test on <page>)
        Given I switch to "tablet portrait" view
        When I am currently viewing "<pageUrl>"
        * the "sticky bottom leaderboard ad" will "<auto>" refresh every 30 seconds on "<page>" when is in View
        @gallery
        Examples:
            |page      |auto        |pageUrl                                            |
            |gallery   |auto        |fashion/red-carpet/automation-test-gallery-13302   |

    @low
    Scenario Outline: Verify the autorefreshing bottom leaderboard in tablet landscape view (Test on <page>)
        Given I switch to "tablet landscape" view
        When I am currently viewing "<pageUrl>"
        * the "bottom leaderboard ad" will "not auto" refresh every 30 seconds on "<page>" when is in View
        @section
        Examples:
            |page              |pageUrl      |
            |section           |fashion      |

    @med
    Scenario Outline: Verify the autorefreshing bottom leaderboard in desktop view (Test on <page>)
        Given I switch to "desktop" view
        When I am currently viewing "<pageUrl>"
        * the "bottom leaderboard ad" will "not auto" refresh every 30 seconds on "<page>" when is in View
        @gallery
        Examples:
            |page              |pageUrl                                             |
            |gallery           |fashion/red-carpet/automation-test-gallery-13302    |
#--------Auto-refreshing mobile banner and bottom leaderboard ad end--------#

