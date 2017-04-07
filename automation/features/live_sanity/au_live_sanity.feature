@aulive
Feature: I have an automated sanity for my live environments

#---- from homepage.feature ----#
    Scenario: Verify homepage is up
        Given I switch to "mobile" view
        When I am currently viewing the homepage
        * I should see 2 must read images and titles which are clickable to open their page

#---- from brand.feature ----#
    Scenario: Verify the brand landing page is up
        Given I switch to "mobile" view
        When I am currently viewing "aww"
        * I should see the brand title logo on the brand landing page
        * I should see the main hero item containing "AUSTRALIAN WOMEN'S WEEKLY" source without date

#---- from article.feature ----#
    Scenario: Verify the article page is up
        When I switch to "mobile" view
        Given I am currently viewing "celebrity/tv/justin-theroux-wants-to-work-with-jennifer-aniston-36504"
        * I can see the long title "Please make this happen! Justin Theroux wants to work with Jennifer Aniston"
        * I can see the short teaser "The actor is willing to mix work and play for the right project."
        * I can see the body paragraph "has revealed that he wants to write a TV role for his wife."
        * I can see the body related content
        * I can see the outbrain frame with "NowtoLove" template

#---- from gallery.feature ----#
    Scenario: Verify the gallery page is up
        When I switch to "mobile" view
        Given I am currently viewing "celebrity/celeb-news/natalie-portman-is-pregnant-with-second-child-5734"
        * I can see an image appearing on the gallery
        * I can see the source appearing on the gallery with gtm "gtm-brandlogotop-gallery"
        * I can click the right arrow on the gallery to check the next image
        When I see the image no "2" on the gallery
        * I can see the left arrow on the gallery
        * I can see an image appearing on the gallery
