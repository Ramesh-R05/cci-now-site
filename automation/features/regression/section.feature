@section @now
Feature: Section Landing page
    As a user
    I should be able to see section landing page which has the same layout as homepage

    @high
    Scenario Outline: Verify the page loads correctly with pageNo query parameter in "desktop" view
        When I switch to "desktop" view
        Given I am currently viewing "<url>"
        Then I should see the page load correctly

        Examples:
            |url                |
            |fashion/           |
            |fashion/?pageNo=2  |
            |fashion?pageNo=2   |

    @low
    Scenario Outline: Verify the hero teaser element is functional correctly in "<device>" view
        Given I switch to "<device>" view
        When I am currently viewing "fashion"
        * I should not see the section title containing the default word as now
        * I should see the main hero item containing its image and clickable to open its page
        * I should see the main hero item containing its title and clickable to open its page
        * I should see the main hero item containing source

        Examples:
            |device|
            |mobile|
            |desktop|
            |tablet portrait |
            |tablet landscape|

    Scenario Outline: Verify the top news feed is functional correctly in "<device>" view
        Given I switch to "<device>" view
        When I am currently viewing "fashion"
        * I should see 6 "top" half feed
        * I should see a "top" feed item containing its image and clickable to open its page
        * I should see a "top" feed item containing its title and clickable to open its page
        * I should see a "top" feed item containing source and date
        @med
        Examples:
            |device|
            |mobile|
            |desktop|
        @low
        Examples:
            |device|
            |tablet portrait |
            |tablet landscape|

    @low
    Scenario Outline: Verify the bottom news feed is functional correctly in "<device>" view
        Given I switch to "<device>" view
        When I am currently viewing "fashion"
        * I should see 7 "bottom" half feed
        * I should see a "bottom" feed item containing its image and clickable to open its page
        * I should see a "bottom" feed item containing its title and clickable to open its page
        * I should see a "bottom" feed item containing source and date
        Examples:
            |device|
            |mobile|
            |desktop|
            |tablet portrait |
            |tablet landscape|

    Scenario Outline: Verify the subsection button on section and subsection pages in "<device>" view
        Given I switch to "<device>" view
        When I am currently viewing "fashion"
        * I should see the drop down list of subsections with the text as "SELECT A SUB-SECTION..."
        When I am currently viewing "fashion/fashion-news"
        * I should see the drop down list of subsections with the text as "FASHION NEWS"
        * I should see the title changes to "FASHION NEWS"
        @med
        Examples:
            |device |
            |mobile |
            |desktop|
        @low
        Examples:
            |device|
            |tablet portrait |
            |tablet landscape|

