@homepage @life
Feature: Homepage
    As a user
    I should be able to see homepage

    @hero @DDO-294
    Scenario: Verify the hero teaser element is functional correctly in mobile view
        Given I am currently viewing the homepage
        When I switch to "mobile" view
        * I should see the homepage hero element
        * I should see the homepage hero image
        * The homepage hero image should be clickable to open its page
        * I should see the homepage hero title
        * The homepage hero title should be clickable to open its page
        * I should see the homepage hero short teaser


    @hero @DDO-294
    Scenario: Verify the hero teaser element is functional correctly in tablet portrait view
        Given I am currently viewing the homepage
        When I switch to "tablet portrait" view
        * I should see the homepage hero element
        * I should see the homepage hero image
        * The homepage hero image should be clickable to open its page
        * I should see the homepage hero custom label in the right side
        * I should see the homepage hero title
        * The homepage hero title should be clickable to open its page
        * I should see the homepage hero short teaser


    @hero @DDO-294
    Scenario: Verify the hero teaser element is functional correctly in tablet landscape view
        Given I am currently viewing the homepage
        When I switch to "tablet landscape" view
        * I should see the homepage hero element
        * I should see the homepage hero image
        * The homepage hero image should be clickable to open its page
        * I should see the homepage hero title
        * The homepage hero title should be clickable to open its page
        * I should see the homepage hero short teaser


    @hero @DDO-294
    Scenario: Verify the hero teaser element is functional correctly in desktop view
        Given I am currently viewing the homepage
        When I switch to "desktop" view
        * I should see the homepage hero element
        * I should see the homepage hero image
        * The homepage hero image should be clickable to open its page
        * I should see the homepage hero custom label in the right side
        * I should see the homepage hero title
        * The homepage hero title should be clickable to open its page
        * I should see the homepage hero short teaser



    @homepagefeed @DDO-235
    Scenario Outline: Verify the news feed is functional correctly in "<device>" view
        Given I am currently viewing the homepage
        When I switch to "<device>" view
        * I should see 7 top half feed
        * I should see each top feed item containing images
        * I should see a correct hero image on top feed item if it has a hero image
        * I should see a default image on top feed item if it does not have a hero image
        * I should see each top feed item containing custom label
        * I should see a custom label "TEST CUSTOM LABEL" on top feed item if it has a custom label
        * I should see a section name "FASHION" on top feed item if it does not have a custom label
        * I should see each top feed item containing short teaser and the first one is "Joe Manual Test Gallery Short Teaser Short Teaser Short Teaser"
        * Image and long title in each top feed item are clickable to open its page with first top teaser page as "fashion/joe-manual-test-gallery-13317"
        Examples:
            |device|
            |tablet landscape|
            |tablet portrait |
            |desktop|
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

