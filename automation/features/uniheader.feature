@wnheader @BXMA-89 @now
Feature: Uniheader
    As a user
    I should be able to see the Uniheader

    @homepage @high
    Scenario: Verify desktop WN header is functional correctly on homepage
        When I switch to "desktop" view
        Given I am currently viewing the homepage
        * I can navigate to all sites in the desktop list on the header
            |title                      |url                                |gtm                  |
            |Australian Women's Weekly  |/aww                               |gtm-uniheader-aww    |
            |Woman's Day                |/womansday                         |gtm-uniheader-wd     |
            |Good Health                |/good-health                       |gtm-uniheader-gh     |
            |OK! Magazine               |/okmagazine                        |gtm-uniheader-ok     |
            |SHOP Til You Drop          |/shop-til-you-drop                 |gtm-uniheader-shop   |
            |NW                         |/nw                                |gtm-uniheader-nw     |
            |Take 5                     |/take5mag                          |gtm-uniheader-take5  |
            |Yours                      |/yours                             |gtm-uniheader-yours  |
            |Mother and Baby            |/mother-and-baby                   |gtm-uniheader-mb     |
