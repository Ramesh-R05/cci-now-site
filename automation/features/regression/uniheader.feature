@uniheader @now
Feature: Uniheader
    As a user
    I should be able to see the Uniheader

    @homepage @low
    Scenario: Verify desktop WN header is functional correctly on homepage
        When I switch to "desktop" view
        Given I am currently viewing the homepage
        * I can navigate to all sites in the desktop list on the header
            |title                      |url                                |
            |Australian Women's Weekly  |/aww                               |
            |Woman's Day                |/womansday                         |
            |Good Health                |/good-health                       |
            |OK! Magazine               |/okmagazine                        |
            |NW                         |/nw                                |
            |Take 5                     |/take5mag                          |
            |Yours                      |/yours                             |
            |Mother and Baby            |/mother-and-baby                   |
            |TV WEEK                    |/tvweek                            |
            |Prizes To Love             |/prizestolove                      |
