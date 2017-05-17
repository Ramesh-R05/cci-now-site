@section @now
Feature: Section Landing page
    As a user
    I should be able to see section landing page which has the same layout as homepage

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

    Scenario Outline: Top teasers are showing polar ads on "<device>"
        Given I switch to "<device>" view
        And I am currently viewing "fashion"
        And the below position top teasers are replaced with polar ads
            |pos|
            | 1 |
            | 6 |
    @high
        Examples:
            | device    |
            | mobile    |
    @med
        Examples:
            | device    |
            | desktop   |
    @low
        Examples:
            | device |
            | tablet portrait  |
            | tablet landscape |

    Scenario Outline: Bottom teasers are showing polar ads on "<device>"
        Given I switch to "<device>" view
        And I am currently viewing "fashion"
        And the below position bottom teasers are replaced with polar ads
            |pos|
            | 2 |
            | 6 |
    @high
        Examples:
            | device    |
            | mobile    |
    @med
        Examples:
            | device    |
            | desktop   |
    @low
        Examples:
            | device |
            | tablet portrait  |
            | tablet landscape |

    Scenario Outline: Load More teasers are showing polar ads on "<device>"
        Given I switch to "<device>" view
        And I am currently viewing "fashion"
        When I click on the Load More button
        Then the below position added more teasers are replaced with polar ads
            |pos|
            | 2 |
            | 6 |
    @high
        Examples:
            | device    |
            | mobile    |
    @med
        Examples:
            | device    |
            | desktop   |
    @low
        Examples:
            | device |
            | tablet portrait  |
            | tablet landscape |
