@navigation @now
Feature: Build and Style the Header, Top Site Navigation and Hamburger Menu to be used across all devices

    @homepage
    Scenario Outline: I can see the navigation widget on the homepage "<device>"
        Given I switch to "<device>" view
        When I am currently viewing the homepage
        Then I should see the site header banner
        # And I should see the theme nav background
        And I should see the site header logo clickable to open homepage
        And I should see the site navigation in hamburger menu
        @med
        Examples:
            | device            |
            | desktop           |
        @low
        Examples:
            | device            |
            | tablet portrait   |
            | tablet landscape  |

    @med @homepage
    Scenario: I can see the navigation widget on the homepage mobile
        Given I switch to "mobile" view
        When I am currently viewing the homepage
        And I should not see the site navigation links
        # And I should see the theme nav background
        And I should see the site navigation in hamburger menu

    @med @homepage
    Scenario: I can see the sticky navigation on the homepage
        Given I switch to "desktop" view
        When I am currently viewing the homepage
        And when I scroll down in the page
        And I should see the site header logo in sticky nav clickable to open homepage
        And I should see the site navigation in hamburger menu

    @med @section
    Scenario: I can see the navigation widget on the section page
        Given I switch to "desktop" view
        When I am currently viewing "fashion"
        Then I should see the site header logo clickable to open homepage
        And I can see the link "FASHION" is highlighted on the navigation links
        And I can see the link "Fashion" is highlighted on the hamburger navigation links

    @low @article
    Scenario: I can see the navigation widget on the article page
        Given I switch to "tablet portrait" view
        When I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        Then I should see the site header logo clickable to open homepage
        And I can see the link "Fashion" is highlighted on the hamburger navigation links

    @low @gallery
    Scenario: I can see the navigation widget on the gallery page
        Given I switch to "tablet landscape" view
        When I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        Then I should see the site header logo clickable to open homepage
        And I can see the link "FASHION" is highlighted on the navigation links
        And I can see the link "Fashion" is highlighted on the hamburger navigation links

    @med @gallery
    Scenario: I can see the navigation widget on the gallery page on mobile view
        Given I switch to "mobile" view
        When I am currently viewing "fashion/red-carpet/automation-test-gallery-13302"
        Then I should not see the site navigation links
        And I should see the hamburger menu

    @med @article
    Scenario: Mobile users menu will fade out as they scroll down the page
        Given I switch to "mobile portrait" view
        When I am currently viewing "fashion/red-carpet/automation-test-article-with-hero-image-3663"
        Then the menu fades out as I scroll down the page

    @med
    Scenario: I can see the brands modal in the header
        Given I switch to "desktop" view
        When I am currently viewing the homepage
        And I click on the brands modal button
        Then I can navigate to the brands in the modal
            |title                      |url                |
            |Australian Women's Weekly  |/aww               |
            |Woman's Day                |/womansday         |
            |Good Health                |/good-health       |
            |OK! Magazine               |/okmagazine        |
            |NW                         |/nw                |
            |Take 5                     |/take5mag          |
            |TV WEEK                    |/tvweek            |
            |Empire                     |/empire            |
            |Prizes To Love             |/prizestolove      |
        When I close the brands modal
        Then I can no longer see the brands modal
