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

    @hero @BXMA-34 @low
    Scenario Outline: Verify the hero teaser element is functional correctly in "<device>" view
        Given I am currently viewing "fashion"
        When I switch to "<device>" view
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

    @sectionfeed @BXMA-34
    Scenario Outline: Verify the top news feed is functional correctly in "<device>" view
        Given I am currently viewing "fashion"
        When I switch to "<device>" view
        * I should see 6 top half feed
        * I should see each top feed item containing its image and clickable to open its page
        * I should see each top feed item containing its title and clickable to open its page
        * I should see each top feed item containing source and date
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

    @sectionfeed-bottom @BXMA-34 @low
    Scenario Outline: Verify the bottom news feed is functional correctly in "<device>" view
        Given I am currently viewing "fashion"
        When I switch to "<device>" view
        * I should see 7 bottom half feed
        * I should see each bottom feed item containing its image and clickable to open its page
        * I should see each bottom feed item containing its title and clickable to open its page
        * I should see each bottom feed item containing source and date
        Examples:
            |device|
            |mobile|
            |desktop|
            |tablet portrait |
            |tablet landscape|

    @BXMA-562
    Scenario Outline: Verify the subsection button on section page in "<device>" view
        Given I am currently viewing "fashion"
        When I switch to "<device>" view
        * I should see 3 subsection buttons clickable to its subsection page
        @high
        Examples:
            |device|
            |mobile|
        @med
        Examples:
            |device |
            |desktop|
        @low
        Examples:
            |device|
            |tablet portrait |
            |tablet landscape|

    @BXMA-562
    Scenario Outline: Verify the subsection button on subsection page in "<device>" view
        Given I am currently viewing "fashion/fashion-news"
        When I switch to "<device>" view
        * I should see 3 subsection buttons clickable to its subsection page
        * I should see the "/fashion/fashion-news" button highlighted
        * I should see the title changes to "FASHION NEWS"

        @high
        Examples:
            |device|
            |mobile|
        @med
        Examples:
            |device |
            |desktop|
        @low
        Examples:
            |device|
            |tablet portrait |
            |tablet landscape|
