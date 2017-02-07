@footer @BXMA-145 @now
Feature: Footer
    As a user
    I should be able to see the Footer

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
        * I can navigate to all sites in the footer
            |title                      |url                |gtm                           |
            |Australian Women's Weekly  |/aww               |gtm-footer__logos-list-aww    |
            |Woman's Day                |/womansday         |gtm-footer__logos-list-wd     |
            |Good Health                |/good-health       |gtm-footer__logos-list-gh     |
            |OK! Magazine               |/okmagazine        |gtm-footer__logos-list-ok     |
            |SHOP Til You Drop          |/shop-til-you-drop |gtm-footer__logos-list-shop   |
            |NW                         |/nw                |gtm-footer__logos-list-nw     |
            |Take 5                     |/take5mag          |gtm-footer__logos-list-take5  |
            |Yours                      |/yours             |gtm-footer__logos-list-yours  |
            |Mother and Baby            |/mother-and-baby   |gtm-footer__logos-list-mb     |
        * I can navigate to all standard pages in the footer
            |page           |url                                                            |
            |PRIVACY POLICY |http://www.bauer-media.com.au/privacy                          |
            |ADVERTISE      |http://www.bauer-media.com.au/advertising/advertise-with-us    |
            |TERMS OF USE   |http://www.bauer-media.com.au/terms/website-terms              |
            |CONTACT US     |contact-us                                                     |
        * I can see the standard copyright text in the footer as "COPYRIGHT BAUER MEDIA PTY LTD ALL RIGHTS RESERVED"
        @high
        Examples:
            |device            |
            |mobile            |
            |desktop           |
        @low
        Examples:
            |device            |
            |tablet portrait   |
            |tablet landscape  |

    @high
    Scenario Outline: Verify the footer appearing on the "<page>" page
        Given I switch to "desktop" view
        When I am currently viewing "<url>"
        * 	I can see all main elements in the footer
        Examples:
            |page               |url                                                                |
            |section landing    |fashion                                                            |
            |article            |fashion/red-carpet/automation-test-article-with-hero-image-3663    |
            |gallery            |fashion/red-carpet/automation-test-gallery-13302                   |
            |404                |404                                                                |
