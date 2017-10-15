@sitAU
Feature: Smoke test for AU NOW
    As a user
    I should be able to see the AU NOW site working

    Scenario: Verify the homepage
        Given I switch to "mobile" view
        When I am currently viewing the homepage
        Then I should see the sign up button containing "https://www.nowtolove.com.au/now-newsletter" url and "gtm-subs-homepage" gtm in "mobile" view
        And I should see 2 must read images and titles which are clickable to open their page
        And I should see the main hero item containing its image and clickable to open its page
        And I should see 2 promoted images and titles which are clickable to open their page
        And I should see each top feed item containing its image and clickable to open its page
        And I should see each bottom feed item containing its image and clickable to open its page
        When I click on the Load More button
        Then I should see extra 14 teasers after loading more
        And I should see each load more feed item containing its image and clickable to open its page

    Scenario Outline: Verify the <page> brand landing page
        Given I switch to "mobile" view
        When I am currently viewing "<page>"
        Then I should see the sign up button containing "<link>" url and "gtm-subs-brand" gtm in "mobile" view
        And I should see the brand title logo on the brand landing page
        And I should see the main hero item containing its image and clickable to open its page
        Examples:
            | page                 | link                                                   |
            | aww                  | https://www.nowtolove.com.au/aww-newsletter             |
            | womansday            | https://www.nowtolove.com.au/womansday-newsletter       |
            | good-health          | https://www.nowtolove.com.au/good-health-newsletter     |
            | okmagazine           | https://www.nowtolove.com.au/okmagazine-newsletter      |
            | nw                   | https://www.nowtolove.com.au/nw-newsletter              |
            | take5mag             | https://www.nowtolove.com.au/take5mag-newsletter        |
            | yours                | https://www.nowtolove.com.au/yours-newsletter           |
            | mother-and-baby      | https://www.nowtolove.com.au/mother-and-baby-newsletter |
            | tvweek               | https://www.nowtolove.com.au/tvweek-newsletter          |
            | prizestolove         | https://www.nowtolove.com.au/prizestolove-newsletter    |

    Scenario: Verify the section landing page
        Given I switch to "mobile" view
        When I am currently viewing "celebrity"
        Then I should see the main hero item containing its image and clickable to open its page
        And I should see each top feed item containing its image and clickable to open its page
        And I should see each bottom feed item containing its image and clickable to open its page
        When I click on the Load More button
        Then I should see extra 14 teasers after loading more
        And I should see each load more feed item containing its image and clickable to open its page

    Scenario: Verify the tag landing page
        Given I switch to "mobile" view
        When I am currently viewing "tags/adele"
        Then I should see the main hero item containing its image and clickable to open its page
        And I should see each top feed item containing its image and clickable to open its page
        And I should see each bottom feed item containing its image and clickable to open its page
        When I click on the Load More button
        Then I should see extra 14 teasers after loading more
        And I should see each load more feed item containing its image and clickable to open its page

    Scenario: Verify the article page
        Given I switch to "desktop" view
        Given Emily just published the "article" doc type item
        When I navigate to the "news/latest-news/test-article" page
        Then our readers can enjoy the latest content
        And I switch to "mobile" view
        When I navigate to the "amp/news/latest-news/test-article" page
        Then our readers can enjoy the latest content

    Scenario: Verify the gallery page
        Given I switch to "desktop" view
        Given Emily just published the "gallery" doc type item
        When I navigate to the "celebrity/celeb-news/test-gallery" page
        Then our readers can enjoy the latest content
        Given I switch to "mobile" view
#---->  The below url will be changed to AMP once this is rolled out
        When I navigate to the "celebrity/celeb-news/test-gallery" page
        Then our readers can enjoy the latest content

    Scenario: Verify the 404 page
        Given I switch to "mobile" view
        When I am currently viewing "404"
        Then I should see the error title as "Sorry, this page is broken."
