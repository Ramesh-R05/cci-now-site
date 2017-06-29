@ad @now @BXMA-469 @high
Feature: Ads Location
    As a user
    I should see each ad slot containing correct class name which is a adLocation parameter in the ad call.

#--Start testing in desktop view--#
    Scenario: Ads slot elements should have proper class name on home page in desktop view
        Given I switch to "desktop" view
        When I am currently viewing the homepage
        Then I should see each outside ad slot element containing proper class name
            |ad                 |class-name        |
            |Top Leaderboard    |home_outside_1    |
            |Middle Leaderboard |home_outside_3    |
            |Bottom Leaderboard |home_outside_4    |
        And I should see each RHS ad slot element containing proper class name
            |ad              |class-name    |
            |Top MREC RHS    |home_rhs_1    |
            |Bottom MREC RHS |home_rhs_2    |
        And I should see each additional ad slot element containing proper class name
            |ad                 |class-name        |
            |Out Of Page        |home_outofpage_1  |
            |Left Side Panel    |home_panel_1      |
            |Right Side Panel   |home_panel_2      |
            |Wallpaper          |home_wallpaper_1  |
        When I click on the Load More button
        Then I should see each load more ad slot element containing proper class name
            |ad                 |class-name    |
            |Load More MREC RHS |home_rhs_3    |

    Scenario: Ads slot elements should have proper class name on index page in desktop view
        Given I switch to "desktop" view
        When I am currently viewing "fashion"
        Then I should see each outside ad slot element containing proper class name
            |ad                 |class-name        |
            |Top Leaderboard    |index_outside_1   |
            |Middle Leaderboard |index_outside_3   |
            |Bottom Leaderboard |index_outside_4   |
        And I should see each RHS ad slot element containing proper class name
            |ad              |class-name    |
            |Top MREC RHS    |index_rhs_1   |
            |Bottom MREC RHS |index_rhs_2   |
        And I should see each additional ad slot element containing proper class name
            |ad                 |class-name        |
            |Out Of Page        |index_outofpage_1 |
            |Left Side Panel    |index_panel_1     |
            |Right Side Panel   |index_panel_2     |
            |Wallpaper          |index_wallpaper_1 |
        When I click on the Load More button
        Then I should see each load more ad slot element containing proper class name
            |ad                 |class-name    |
            |Load More MREC RHS |index_rhs_3   |

    Scenario: Ads slot elements should have proper class name on brand page in desktop view
        Given I switch to "desktop" view
        When I am currently viewing "aww"
        Then I should see each outside ad slot element containing proper class name
            |ad                 |class-name        |
            |Top Leaderboard    |brand_outside_1   |
            |Middle Leaderboard |brand_outside_3   |
            |Bottom Leaderboard |brand_outside_4   |
        And I should see each RHS ad slot element containing proper class name
            |ad              |class-name    |
            |Top MREC RHS    |brand_rhs_1   |
            |Bottom MREC RHS |brand_rhs_2   |
        And I should see each additional ad slot element containing proper class name
            |ad                 |class-name        |
            |Out Of Page        |brand_outofpage_1 |
            |Left Side Panel    |brand_panel_1     |
            |Right Side Panel   |brand_panel_2     |
            |Wallpaper          |brand_wallpaper_1 |
        When I click on the Load More button
        Then I should see each load more ad slot element containing proper class name
            |ad                 |class-name    |
            |Load More MREC RHS |brand_rhs_3   |

    Scenario: Ads slot elements should have proper class name on gallery page in desktop viewd
        Given I switch to "desktop" view
        When I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        Then I should see each outside ad slot element containing proper class name
            |ad                 |class-name        |
            |Top Leaderboard    |gallery_outside_1 |
            |Teads              |gallery_outside_2 |
            |Native             |gallery_outside_3 |
            |Bottom Leaderboard |gallery_outside_5 |
        And I should see each body ad slot element containing proper class name
            |ad                 |class-name     |
            |MREC After Slide 3 |gallery_body_1 |
            |MREC After Slide 7 |gallery_body_2 |
        And I should see each RHS ad slot element containing proper class name
            |ad              |class-name     |
            |MREC RHS 1      |gallery_rhs_6  |
            |MREC RHS 2      |gallery_rhs_7  |
            |MREC RHS 3      |gallery_rhs_8  |
            |MREC RHS 4      |gallery_rhs_9  |
            |Sticky MREC RHS |gallery_rhs_10 |
        And I should see each additional ad slot element containing proper class name
            |ad                 |class-name          |
            |Out Of Page        |gallery_outofpage_1 |
            |Left Side Panel    |gallery_panel_1     |
            |Right Side Panel   |gallery_panel_2     |
            |Wallpaper          |gallery_wallpaper_1 |

    Scenario: Ads slot elements should have proper class name on article page in desktop view
        Given I switch to "desktop" view
        When I am currently viewing "fashion/red-carpet/automation-test-article-with-ad-in-paragraph-18396"
        Then I should see each outside ad slot element containing proper class name
            |ad                 |class-name        |
            |Top Leaderboard    |article_outside_1 |
            |Teads              |article_outside_2 |
            |Bottom Leaderboard |article_outside_4 |
        And I should see each RHS ad slot element containing proper class name
            |ad              |class-name     |
            |MREC RHS 1      |article_rhs_1  |
            |MREC RHS 2      |article_rhs_2  |
            |MREC RHS 3      |article_rhs_3  |
            |MREC RHS 4      |article_rhs_4  |
            |Sticky MREC RHS |article_rhs_5  |
        And I should see each additional ad slot element containing proper class name
            |ad                 |class-name          |
            |Out Of Page        |article_outofpage_1 |
            |Left Side Panel    |article_panel_1     |
            |Right Side Panel   |article_panel_2     |
            |Wallpaper          |article_wallpaper_1 |

#--Start testing in mobile view--#
    Scenario: Ads slot elements should have proper class name on home page in mobile view
        Given I switch to "mobile" view
        When I am currently viewing the homepage
        Then I should see each outside ad slot element containing proper class name
            |ad                     |class-name        |
            |Top Leaderboard        |home_outside_1    |
            |MREC Under Hero Teaser |home_outside_2    |
            |Middle Leaderboard     |home_outside_3    |
        And I should see each body ad slot element containing proper class name
            |ad                   |class-name  |
            |MREC In Bottom Feed  |home_body_1 |
        And I should see each additional ad slot element containing proper class name
            |ad                 |class-name        |
            |Out Of Page        |home_outofpage_1  |
        When I click on the Load More button
        Then I should see each load more ad slot element containing proper class name
            |ad                            |class-name    |
            |Load More MREC In Bottom Feed |home_body_2   |

    Scenario: Ads slot elements should have proper class name on index page in mobile view
        Given I switch to "mobile" view
        When I am currently viewing "fashion"
        Then I should see each outside ad slot element containing proper class name
            |ad                     |class-name        |
            |Top Leaderboard        |index_outside_1   |
            |MREC Under Hero Teaser |index_outside_2   |
            |Middle Leaderboard     |index_outside_3   |
        And I should see each body ad slot element containing proper class name
            |ad                   |class-name  |
            |MREC In Bottom Feed  |index_body_1|
        And I should see each additional ad slot element containing proper class name
            |ad                 |class-name        |
            |Out Of Page        |index_outofpage_1 |
        When I click on the Load More button
        Then I should see each load more ad slot element containing proper class name
            |ad                            |class-name    |
            |Load More MREC In Bottom Feed |index_body_2  |

    Scenario: Ads slot elements should have proper class name on brand page in mobile view
        Given I switch to "mobile" view
        When I am currently viewing "aww"
        Then I should see each outside ad slot element containing proper class name
            |ad                     |class-name        |
            |Top Leaderboard        |brand_outside_1   |
            |MREC Under Hero Teaser |brand_outside_2   |
            |Middle Leaderboard     |brand_outside_3   |
        And I should see each body ad slot element containing proper class name
            |ad                   |class-name  |
            |MREC In Bottom Feed  |brand_body_1|
        And I should see each additional ad slot element containing proper class name
            |ad                 |class-name        |
            |Out Of Page        |brand_outofpage_1 |
        When I click on the Load More button
        Then I should see each load more ad slot element containing proper class name
            |ad                            |class-name    |
            |Load More MREC In Bottom Feed |brand_body_2  |

    Scenario: Ads slot elements should have proper class name on gallery page in mobile view
        Given I switch to "mobile" view
        When I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        Then I should see each outside ad slot element containing proper class name
            |ad                 |class-name        |
            |Top Leaderboard    |gallery_outside_1 |
            |Teads              |gallery_outside_2 |
            |Native             |gallery_outside_3 |
            |Bottom Leaderboard |gallery_outside_4 |
        And I should see each body ad slot element containing proper class name
            |ad                         |class-name     |
            |MREC After Slide 3         |gallery_body_1 |
            |MREC After Slide 7         |gallery_body_2 |
            |MREC Before Recommendation |gallery_body_3 |
        And I should see each additional ad slot element containing proper class name
            |ad                 |class-name          |
            |Out Of Page        |gallery_outofpage_1 |

    Scenario: Ads slot elements should have proper class name on article page in mobile view
        Given I switch to "mobile" view
        When I am currently viewing "fashion/red-carpet/automation-test-article-with-ad-in-paragraph-18396"
        Then I should see each outside ad slot element containing proper class name
            |ad                 |class-name        |
            |Top Leaderboard    |article_outside_1 |
            |Teads              |article_outside_2 |
            |Bottom Leaderboard |article_outside_3 |
        And I should see each body ad slot element containing proper class name
            |ad                     |class-name     |
            |MREC After Paragraph 6 |article_body_1 |
            |MREC After Paragraph 12|article_body_2 |
            |MREC After Paragraph 18|article_body_3 |
            |MREC After Paragraph 24|article_body_4 |
            |MREC Before Recommendation     |article_body_5 |
        And I should see each additional ad slot element containing proper class name
            |ad                 |class-name          |
            |Out Of Page        |article_outofpage_1 |
