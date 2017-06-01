@ad @now @BXMA-469 @high
Feature: Ads Location
    As a user
    I should see each ad slot containing correct class name which is a adLocation parameter in the ad call.

#--Start testing in desktop view--#
    Scenario: Ads slot elements should have proper class name on home page in desktop view
        Given I switch to "desktop" view
        When I am currently viewing the homepage
        Then I should see each ad slot element containing proper class name
            |no          |class-name        |
            |gpt-slot-0  |home_outside_1    |
            |gpt-slot-2  |home_rhs_1        |
            |gpt-slot-3  |home_outside_3    |
            |gpt-slot-5  |home_rhs_2        |
            |gpt-slot-6  |home_outside_4    |
            |gpt-slot-7  |home_outOfPage_1  |
            |gpt-slot-8  |home_panel_1      |
            |gpt-slot-9  |home_panel_2      |
            |gpt-slot-10 |home_wallpaper_1  |
        When I click on the Load More button
        Then I should see each ad slot element containing proper class name
            |no          |class-name    |
            |gpt-slot-12 |home_rhs_3    |

    Scenario: Ads slot elements should have proper class name on index page in desktop view
        Given I switch to "desktop" view
        When I am currently viewing "fashion"
        Then I should see each ad slot element containing proper class name
            |no          |class-name        |
            |gpt-slot-0  |index_outside_1    |
            |gpt-slot-2  |index_rhs_1        |
            |gpt-slot-3  |index_outside_3    |
            |gpt-slot-5  |index_rhs_2        |
            |gpt-slot-6  |index_outside_4    |
            |gpt-slot-7  |index_outOfPage_1  |
            |gpt-slot-8  |index_panel_1      |
            |gpt-slot-9  |index_panel_2      |
            |gpt-slot-10 |index_wallpaper_1  |
        When I click on the Load More button
        Then I should see each ad slot element containing proper class name
            |no          |class-name    |
            |gpt-slot-12 |index_rhs_3   |

    Scenario: Ads slot elements should have proper class name on brand page in desktop view
        Given I switch to "desktop" view
        When I am currently viewing "aww"
        Then I should see each ad slot element containing proper class name
            |no          |class-name        |
            |gpt-slot-0  |brand_outside_1    |
            |gpt-slot-2  |brand_rhs_1        |
            |gpt-slot-3  |brand_outside_3    |
            |gpt-slot-5  |brand_rhs_2        |
            |gpt-slot-6  |brand_outside_4    |
            |gpt-slot-7  |brand_outOfPage_1  |
            |gpt-slot-8  |brand_panel_1      |
            |gpt-slot-9  |brand_panel_2      |
            |gpt-slot-10 |brand_wallpaper_1  |
        When I click on the Load More button
        Then I should see each ad slot element containing proper class name
            |no          |class-name    |
            |gpt-slot-12 |brand_rhs_3   |

    Scenario: Ads slot elements should have proper class name on gallery page in desktop view
        Given I switch to "desktop" view
        When I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        Then I should see each ad slot element containing proper class name
            |no          |class-name        |
            |gpt-slot-0  |gallery_outside_1 |
            |gpt-slot-1  |gallery_outside_2 |
            |gpt-slot-2  |gallery_body_1    |
            |gpt-slot-3  |gallery_body_2    |
            |gpt-slot-15 |gallery_rhs_6     |
            |gpt-slot-16 |gallery_rhs_7     |
            |gpt-slot-17 |gallery_rhs_8     |
            |gpt-slot-18 |gallery_rhs_9     |
            |gpt-slot-19 |gallery_rhs_10    |
            |gpt-slot-10 |gallery_outside_3 |
            |gpt-slot-11 |gallery_outOfPage_1|
            |gpt-slot-12 |gallery_panel_1    |
            |gpt-slot-13 |gallery_panel_2    |
            |gpt-slot-14 |gallery_wallpaper_1|

    Scenario: Ads slot elements should have proper class name on article page in desktop view
        Given I switch to "desktop" view
        When I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        Then I should see each ad slot element containing proper class name
            |no          |class-name        |
            |gpt-slot-0  |article_outside_1 |
            |gpt-slot-1  |article_outside_2 |
            |gpt-slot-4  |article_rhs_1    |
            |gpt-slot-5  |article_rhs_2    |
            |gpt-slot-6  |article_rhs_3    |
            |gpt-slot-7  |article_rhs_4    |
            |gpt-slot-8 |article_outside_3 |
            |gpt-slot-9 |article_outOfPage_1|
            |gpt-slot-10 |article_panel_1   |
            |gpt-slot-11 |article_panel_2   |
            |gpt-slot-12 |article_wallpaper_1|


#--Start testing in mobile view--#
    Scenario: Ads slot elements should have proper class name on home page in mobile view
        Given I switch to "mobile" view
        When I am currently viewing the homepage
        Then I should see each ad slot element containing proper class name
            |no          |class-name        |
            |gpt-slot-0  |home_outside_1    |
            |gpt-slot-1  |home_outside_2    |
            |gpt-slot-3  |home_outside_3    |
            |gpt-slot-4  |home_body_1       |
            |gpt-slot-7  |home_outOfPage_1  |
        When I click on the Load More button
        Then I should see each ad slot element containing proper class name
            |no          |class-name    |
            |gpt-slot-11 |home_body_2   |

    Scenario: Ads slot elements should have proper class name on index page in mobile view
        Given I switch to "mobile" view
        When I am currently viewing "fashion"
        Then I should see each ad slot element containing proper class name
            |no          |class-name         |
            |gpt-slot-0  |index_outside_1    |
            |gpt-slot-1  |index_outside_2    |
            |gpt-slot-3  |index_outside_3    |
            |gpt-slot-4  |index_body_1       |
            |gpt-slot-7  |index_outOfPage_1  |

        When I click on the Load More button
        Then I should see each ad slot element containing proper class name
            |no          |class-name     |
            |gpt-slot-11 |index_body_2   |

    Scenario: Ads slot elements should have proper class name on brand page in mobile view
        Given I switch to "mobile" view
        When I am currently viewing "aww"
        Then I should see each ad slot element containing proper class name
            |no          |class-name        |
            |gpt-slot-0  |brand_outside_1   |
            |gpt-slot-1  |brand_outside_2   |
            |gpt-slot-3  |brand_outside_3   |
            |gpt-slot-4  |brand_body_1      |
            |gpt-slot-7  |brand_outOfPage_1 |

        When I click on the Load More button
        Then I should see each ad slot element containing proper class name
            |no          |class-name     |
            |gpt-slot-11 |brand_body_2   |

    Scenario: Ads slot elements should have proper class name on gallery page in mobile view
        Given I switch to "mobile" view
        When I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        Then I should see each ad slot element containing proper class name
            |no          |class-name        |
            |gpt-slot-0  |gallery_outside_1 |
            |gpt-slot-1  |gallery_outside_2 |
            |gpt-slot-2  |gallery_body_1    |
            |gpt-slot-3  |gallery_body_2    |
            |gpt-slot-4  |gallery_body_3    |
            |gpt-slot-10 |gallery_outside_3 |
            |gpt-slot-11 |gallery_outOfPage_1|

    Scenario: Ads slot elements should have proper class name on article page in mobile view
        Given I switch to "mobile" view
        When I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        Then I should see each ad slot element containing proper class name
            |no          |class-name         |
            |gpt-slot-0  |article_outside_1  |
            |gpt-slot-1  |article_outside_2  |
            |gpt-slot-2  |article_body_1     |
            |gpt-slot-3  |article_body_2     |
            |gpt-slot-8  |article_outside_3  |
            |gpt-slot-9  |article_outOfPage_1|
