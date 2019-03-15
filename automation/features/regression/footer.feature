@footer @now
Feature: Footer
    As a user
    I should be able to see the Footer

    @homepage
    Scenario Outline: Verify GTM in the footer in the "<device>" view
        Given I switch to "<device>" view
        When I am currently viewing the homepage
        * I can navigate to all brands in the footer
            |title                      |url                |
            |Australian Women's Weekly  |/aww               |
            |Woman's Day                |/womansday         |
            |Good Health                |/good-health       |
            |OK! Magazine               |/okmagazine        |
            |NW                         |/nw                |
            |Take 5                     |/take5mag          |
            |Mother and Baby            |/mother-and-baby   |
            |TV WEEK                    |/tvweek            |
            |Empire                     |/empire            |
            |Prizes To Love             |/prizestolove      |
        * I can navigate to all network sites in the footer
            |title                |url                                   |
            |Homes To Love          |https://www.homestolove.com.au/     |
            |Women's Weekly Food  |https://www.womensweeklyfood.com.au/  |
            |Elle                 |https://www.elle.com.au/              |
            |Harper's Bazaar      |https://www.harpersbazaar.com.au/     |
            |Gourmet Traveller    |https://www.gourmettraveller.com.au/  |
            |Dolly                |http://www.dolly.com.au/              |
            |Beauty Heaven        |https://www.beautyheaven.com.au/      |
        * I can navigate to all standard pages in the footer
            |page           |url                                                            |
            |Privacy Policy |http://www.bauer-media.com.au/privacy                          |
            |Advertise      |http://www.bauer-media.com.au/advertising/advertise-with-us    |
            |Terms of Use   |http://www.bauer-media.com.au/terms/website-terms              |
            |Magshop        |https://www.magshop.com.au/                                    |

        @med
        Examples:
            | device            |
            | mobile            |
        @low
        Examples:
            | device            |
            | desktop           |
            | tablet portrait   |
            | tablet landscape  |

    @low @homepage
    Scenario Outline: Verify the footer in the "<device>" view
        Given I switch to "<device>" view
        When I am currently viewing the homepage
        * I can see the social icons clickable to open its page in the footer
            |social     |url                                    |
            |Facebook   |https://www.facebook.com/nowtolove     |
            |Twitter    |https://twitter.com/nowtolove          |
            |Instagram  |https://www.instagram.com/nowtolove    |
        * I can see the standard copyright text in the footer as "© 2018 bauer media PTY LTD"
        Examples:
            |device            |
            |mobile            |
            |desktop           |
            |tablet portrait   |
            |tablet landscape  |

    @low
    Scenario Outline: Verify the footer appearing on the "<page>" page
        Given I switch to "desktop" view
        When I am currently viewing "<url>"
        * 	I can see all main elements in the footer
        @section
        Examples:
            |page               |url                                                                |
            |section            |fashion                                                            |
        @article
        Examples:
            |page               |url                                                                |
            |article            |fashion/red-carpet/automation-test-article-with-hero-image-3663    |
        @gallery
        Examples:
            |page               |url                                                                |
            |gallery            |fashion/red-carpet/automation-test-gallery-13302                   |
        @404
        Examples:
            |page               |url                                                                |
            |404                |404                                                                |
