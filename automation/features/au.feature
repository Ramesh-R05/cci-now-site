@sitAU
Feature: Smoke test for AU NOW
    As a user
    I should be able to see the AU NOW site working

    Scenario: Verify the homepage
        Given I switch to "mobile" view
        When I am currently viewing the homepage
        Then I should see the sign up button containing "https://www.nowtolove.com.au/now-newsletter" url in "mobile" view
        And I should see 2 must read images and titles which are clickable to open their page
        And I should see the main hero item containing its image and clickable to open its page
        And I should see 2 promoted images and titles which are clickable to open their page
        And I should see a "top" feed item containing its image and clickable to open its page
        And I should see a "bottom" feed item containing its image and clickable to open its page
        When I click on the Load More button
        Then I should see extra 14 teasers after loading more
        And I should see a load more feed item containing its image and clickable to open its page

    Scenario Outline: Verify the static <page> brand data on its brand landing page
        Given I switch to "mobile" view
        When I am currently viewing "<page>"
        Then I should see the sign up button containing "<link>" url in "mobile" view
        And I should see the brand title logo on the brand landing page
        Examples:
            | page                  | link                                                    |
            | aww                   | https://www.nowtolove.com.au/aww-newsletter             |
            | womansday             | https://www.nowtolove.com.au/womansday-newsletter       |
            | good-health           | https://www.nowtolove.com.au/good-health-newsletter     |
            | okmagazine            | https://www.nowtolove.com.au/okmagazine-newsletter      |
            | nw                    | https://www.nowtolove.com.au/nw-newsletter              |
            | take5mag              | https://www.nowtolove.com.au/take5mag-newsletter        |
            | mother-and-baby       | https://www.nowtolove.com.au/mother-and-baby-newsletter |
            | tvweek                | https://www.nowtolove.com.au/tvweek-newsletter          |
            | prizestolove          | https://www.nowtolove.com.au/prizestolove-newsletter    |

    Scenario: Verify the brand landing page
        Given I switch to "mobile" view
        When I am currently viewing "aww"
        Then I should see the main hero item containing its image and clickable to open its page
        And I should see a "top" feed item containing its image and clickable to open its page
        And I should see a "bottom" feed item containing its image and clickable to open its page
        When I click on the Load More button
        Then I should see extra 14 teasers after loading more
        And I should see a load more feed item containing its image and clickable to open its page

    Scenario: Verify the section landing page
        Given I switch to "mobile" view
        When I am currently viewing "celebrity"
        Then I should see the main hero item containing its image and clickable to open its page
        And I should see a "top" feed item containing its image and clickable to open its page
        And I should see a "bottom" feed item containing its image and clickable to open its page
        When I click on the Load More button
        Then I should see extra 14 teasers after loading more
        And I should see a load more feed item containing its image and clickable to open its page

    Scenario: Verify the tag landing page
        Given I switch to "mobile" view
        When I am currently viewing "tags/adele"
        Then I should see the main hero item containing its image and clickable to open its page
        And I should see a "top" feed item containing its image and clickable to open its page
        And I should see a "bottom" feed item containing its image and clickable to open its page
        When I click on the Load More button
        Then I should see extra 14 teasers after loading more
        And I should see a load more feed item containing its image and clickable to open its page

    Scenario: Verify the 404 page
        Given I switch to "mobile" view
        When I am currently viewing "404"
        Then I should see the error title as "Sorry, this page is not found."

    Scenario: Verify all the doc type items
        Given I switch to "mobile" view
        Given Emily just published the "section" doc type item
        When I navigate to the "section" page
        Then our readers can enjoy the created "section" page
        Given Emily just published the "subsection" doc type item
        When I navigate to the "subsection" page
        Then our readers can enjoy the created "subsection" page
        Given Emily just published the "article" doc type item
        When I navigate to the "article" page
        Then our readers can enjoy the created "article" page
        Given Emily just published the "gallery" doc type item
        When I navigate to the "gallery" page
        Then our readers can enjoy the created "gallery" page
        When I navigate to the "amp article" page
        Then our readers can enjoy the created "amp article" page
        When I navigate to the "amp gallery" page
        Then our readers can enjoy the created "amp gallery" page

    Scenario: Verify the RSS feed
        Given I am currently viewing "rss"
        Then I should see "link" tag containing "http://now-site-au.sit.bxm.net.au" value
        * I should see "dc:creator" tag containing "Now To Love" in CDATA
        * I should see "title" tag containing a value
        * I should see "dc:creator" tag containing a value
        * I should see "content:encoded" tag containing a value
        When I am currently viewing "rss/summary"
        * I should see "title" tag containing a value
        * I should not see "content:encoded" tag
        When I am currently viewing "rss/summary/aww"
        * I should see "title" tag containing a value
        When I am currently viewing "rss/info"
        * I should see "rss/summary/aww" in json
