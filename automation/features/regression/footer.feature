@footer @now
Feature: Footer
    As a user
    I should be able to see the Footer

    @homepage
    Scenario Outline: Verify GTM in the footer in the "<device>" view
        Given I switch to "<device>" view
        When I am currently viewing the homepage
        * I can navigate to all sites in the footer
            |title                      |url                |gtm                           |
            |Australian Women's Weekly  |/aww               |gtm-footer__logos-list-aww    |
            |Woman's Day                |/womansday         |gtm-footer__logos-list-wd     |
            |Good Health                |/good-health       |gtm-footer__logos-list-gh     |
            |OK! Magazine               |/okmagazine        |gtm-footer__logos-list-ok     |
            |NW                         |/nw                |gtm-footer__logos-list-nw     |
            |Take 5                     |/take5mag          |gtm-footer__logos-list-take5  |
            |Yours                      |/yours             |gtm-footer__logos-list-yours  |
            |Mother and Baby            |/mother-and-baby   |gtm-footer__logos-list-mb     |
            |TV WEEK                    |/tvweek            |gtm-footer__logos-list-tvweek |

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
        * I can see the social logo in the footer
        * I can see the social icons clickable to open its page in the footer
            |social     |url                                    |
            |Facebook   |https://www.facebook.com/nowtolove     |
            |Twitter    |https://twitter.com/NowToLove          |
            |Instagram  |https://www.instagram.com/NowToLove   |
        * I can see the brands title in the footer as "CONTENT SUPPORTED BY"
        * I can see the standard copyright text in the footer as "COPYRIGHT BAUER MEDIA PTY LTD ALL RIGHTS RESERVED"
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
