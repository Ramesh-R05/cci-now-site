@section @now
Feature: Section Landing page
    As a user
    I should be able to see section landing page which has the same layout as homepage

    @hero @BXMA-34
    Scenario Outline: Verify the hero teaser element is functional correctly in "<device>" view
        Given I am currently viewing "fashion"
        When I switch to "<device>" view
        * I should not see the section title containing the default word as now
        * I should see the main hero item containing its image and clickable to open its page
        * I should see the main hero item containing its title and clickable to open its page
        * I should see the main hero item containing source
        @high
        Examples:
            |device|
            |mobile|
            |desktop|
        @low
        Examples:
            |device|
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
        @high
        Examples:
            |device|
            |mobile|
            |desktop|
        @low
        Examples:
            |device|
            |tablet portrait |
            |tablet landscape|

    @sectionfeed-bottom @BXMA-34
    Scenario Outline: Verify the bottom news feed is functional correctly in "<device>" view
        Given I am currently viewing "fashion"
        When I switch to "<device>" view
        * I should see 6 bottom half feed
        * I should see each bottom feed item containing its image and clickable to open its page
        * I should see each bottom feed item containing its title and clickable to open its page
        * I should see each bottom feed item containing source and date
        @high
        Examples:
            |device|
            |mobile|
            |desktop|
        @low
        Examples:
            |device|
            |tablet portrait |
            |tablet landscape|
