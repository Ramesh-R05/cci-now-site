@homepage @now
Feature: Homepage
    As a user
    I should be able to see homepage

    @trending @DD0-69
    Scenario Outline: Verify the trending element is functional correctly in "<device>" view
        Given I am currently viewing the homepage
        When I switch to "<device>" view
        * I should see the trending title at the "<position>"
        * I should see <number> trending teaser images and titles which are clickable to open their page
        Examples:
            |device             | position  | number |
            | mobile            | top       | 2      |
            | tablet portrait   | top       | 3      |
            | tablet landscape  | top       | 5      |
            | desktop           | top       | 5      |

    @hero @BXMA-40
    Scenario Outline: Verify the hero teaser element is functional correctly in "<device>" view
        Given I am currently viewing the homepage
        When I switch to "<device>" view
        * I should see the homepage hero element
        * I should see the homepage hero image
        * The homepage hero image should be clickable to open its page
        * I should see the homepage hero title
        * The homepage hero title should be clickable to open its page
        Examples:
            |device|
            |mobile|
            |tablet portrait |
            |tablet landscape|
            |mobile|

    @homepagefeed @BXMA-82
    Scenario Outline: Verify the top news feed is functional correctly in "<device>" view
        Given I am currently viewing the homepage
        When I switch to "<device>" view
        * I should see 6 top half feed
        * I should see each top feed item containing its image and clickable to open its page
        * I should see each top feed item containing its title and clickable to open its page
        * I should see each top feed item containing source
        Examples:
            |device|
            |mobile|
            |tablet portrait |
            |tablet landscape|
            |mobile|

    @homepagefeed-bottom @DDO-234
    Scenario: Verify the homepage bottom half news feed is functional correctly in mobile view
        Given I am currently viewing the homepage
        When I switch to "mobile" view
        * I should see 7 bottom half feed
        * I should see each bottom feed item containing images
        * I should see each bottom feed item containing custom label
        * I should see a custom label "KWEEN ARI" on bottom feed item if it has a custom label
        * I should see a section name "FASHION" on bottom feed item if it does not have a custom label
        * Image and long title in each bottom feed item are clickable to open its page with first bottom teaser page as "beauty/you-can-now-dress-like-ariana-grande-without-going-broke-13523"

    @homepagefeed-bottom @DDO-234
    Scenario Outline: Verify the homepage bottom half news feed is functional correctly in "<device>" view
        Given I am currently viewing the homepage
        When I switch to "<device>" view
        * I should see 7 bottom half feed
        * I should see each bottom feed item containing images
        * I should see each bottom feed item containing custom label
        * I should see a custom label "KWEEN ARI" on bottom feed item if it has a custom label
        * I should see a section name "FASHION" on bottom feed item if it does not have a custom label
        * I should see each bottom feed item containing short teaser with first short teaser as "Get your high pony ready for this."
        * Image and long title in each bottom feed item are clickable to open its page with first bottom teaser page as "beauty/you-can-now-dress-like-ariana-grande-without-going-broke-13523"
Examples:
        |device|
        |tablet landscape|
        |desktop|

