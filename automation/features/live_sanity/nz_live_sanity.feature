@nzlive
Feature: I have an automated sanity for my live environments

#---- from homepage.feature ----#
    Scenario: Verify homepage is up
        Given I switch to "mobile" view
        When I am currently viewing the homepage
        * I should see 2 must read images and titles which are clickable to open their page

#---- from brand.feature ----#
    Scenario: Verify the brand landing page is up
        Given I switch to "mobile" view
        When I am currently viewing "nz-womans-weekly"
        * I should see the brand title logo on the brand landing page
        * I should see the main hero item containing "NEW ZEALAND WOMAN'S WEEKLY" source without date

#---- from article.feature ----#
    Scenario: Verify the article page is up
        When I switch to "mobile" view
        Given I am currently viewing "celebrity/celeb-news/lucy-lawless-will-perform-special-gig-for-struggling-kiwi-actors-31593"
        * I can see the long title "Lucy Lawless will perform special gig for struggling Kiwi actors"
        * I can see the short teaser "The one-off show supports a cause close to the Kiwi actress’s heart."
        * I can see the body paragraph "Lucy Lawless will take to Auckland’s Pop Up Globe theatre on Sunday"
        * I can see the body related content
        * I can see the outbrain frame with "NowtoLoveNZ" template

#---- from gallery.feature ----#
    Scenario: Verify the gallery page is up
        When I switch to "mobile" view
        Given I am currently viewing "celebrity/celeb-news/behind-the-scenes-of-the-pcas-2841"
        * I can see an image appearing on the gallery
        * I can see the source appearing on the gallery with gtm "gtm-brandlogotop-gallery"
        * I can click the right arrow on the gallery to check the next image
        When I see the image no "2" on the gallery
        * I can see the left arrow on the gallery
        * I can see an image appearing on the gallery


