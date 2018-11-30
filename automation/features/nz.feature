@nznow @low @BXMA-221
Feature: Specific value for NZ NTL
    As a user
    I should be able to see the NZ NTL site showing correct NZ value.

    Scenario: Verify desktop WN header is functional correctly on homepage
        When I switch to "desktop" view
        Given I am currently viewing the homepage
        * I can navigate to all sites in the desktop list on the header
            |title                              |url                    |
            |New Zealand Woman's Weekly         |/nz-womans-weekly      |
            |Woman's Day                        |/womans-day            |
            |The Australian Women's Weekly      |/australianwomensweekly|
            |NEXT                               |/next                  |
            |Good Health Choices                |/good-health-choices   |
            |Nadia                              |/nadia                 |
            |Beauty To Love                     |/beauty-to-love        |

    Scenario: I can see the brand logos in the hamburger menu
        Given I switch to "mobile" view
        When I am currently viewing the homepage
#        * I can navigate to all sites in the hamburger navigation menu
#            |title              |url                                 |gtm                    |
#            |Homes To Love      |https://www.homestolove.co.nz/      |gtm-hamburger-nzhomes  |
#            |Food To Love       |http://www.foodtolove.co.nz/        |gtm-hamburger-nzfood   |
#            |Fashion Quarterly  |https://www.fq.co.nz/               |gtm-hamburger-fq       |
#            |Miss FQ            |https://www.fq.co.nz/missfqhome/    |gtm-hamburger-missfq   |
#            |Noted              |https://www.noted.co.nz/            |gtm-hamburger-noted    |

    Scenario Outline: Verify the subscribe now link and social links of "<brand>" landing page
        Given I switch to "desktop" view
        When I am currently viewing "<brand>"
        * I should see the correct brand "subscribe" link as "<subscribe>"
        * I should see the correct brand "facebook" link as "<facebook>"
        * I should see the correct brand "twitter" link as "<twitter>"
        * I should see the correct brand "instagram" link as "<instagram>"
        * I should see the correct brand "pinterest" link as "<pinterest>"
        * I should see the subscribe button containing GTM "<gtm>"
        Examples:
            |brand               |subscribe         |facebook                                       |twitter                            |instagram                                          |pinterest                              |gtm                  |
            |nz-womans-weekly    |subscribe-nzww    |https://www.facebook.com/nzwomansweekly        |https://twitter.com/nzwomansweekly |https://www.instagram.com/newzealandwomansweekly   |none                                   |gtm-subscribe-nzww   |
            |womans-day          |subscribe-nzwd    |https://www.facebook.com/womansdaynz           |https://twitter.com/WomansDayNZ    |https://www.instagram.com/womansdaynz              |none                                   |gtm-subscribe-nzwd   |
            |australianwomensweekly |subscribe-awwnz  |https://www.facebook.com/awwmagazine         |none                               |https://www.instagram.com/awwmagazine              |none                                   |gtm-subscribe-awwnz  |
            |next                |subscribe-next    |https://www.facebook.com/nextmagazine          |https://twitter.com/nextmagazinenz |https://www.instagram.com/nextmagazinenz           |none                                   |gtm-subscribe-next   |
            |good-health-choices |subscribe-nzgh    |https://www.facebook.com/goodhealthchoicesnz   |https://twitter.com/good_health_nz |https://www.instagram.com/goodhealthnz             |https://nz.pinterest.com/goodhealthmag |gtm-subscribe-nzgh   |
            |nadia               |subscribe-nadia   |none                                           |none                               |https://www.instagram.com/nadiamagazine            |none                                   |gtm-subscribe-nadia  |

    Scenario: Verify the footer in the "mobile" view
        Given I switch to "mobile" view
        When I am currently viewing the homepage
        * I can see the social icons clickable to open its page in the footer
            |social     |url                                    |
            |Facebook   |https://www.facebook.com/nowtolovenz   |
            |Twitter    |https://twitter.com/NowToLovenz        |
            |Instagram  |https://www.instagram.com/NowToLovenz  |
            |Pinterest  |https://nz.pinterest.com/NowToLoveNZ   |
        * I can navigate to all sites in the footer
            |title                              |url                    |gtm                             |
            |New Zealand Woman's Weekly         |/nz-womans-weekly      |gtm-footer__logos-list-nzww     |
            |Woman's Day                        |/womans-day            |gtm-footer__logos-list-nzwd     |
            |The Australian Women's Weekly      |/australianwomensweekly|gtm-footer__logos-list-awwnz    |
            |NEXT                               |/next                  |gtm-footer__logos-list-next     |
            |Good Health Choices                |/good-health-choices   |gtm-footer__logos-list-nzgh     |
            |Nadia                              |/nadia                 |gtm-footer__logos-list-nadia    |
            |Beauty To Love                     |/beauty-to-love        |gtm-footer__logos-list-btl      |


    @BXMA-304
    Scenario: Verify RHS follow us now in the "desktop" view
        Given I switch to "desktop" view
        When I am currently viewing the homepage
        * I can see the social icons clickable to open its page in the RHS
            |social     |url                                    |
            |Facebook   |https://www.facebook.com/nowtolovenz   |
            |Twitter    |https://twitter.com/NowToLovenz        |
            |Instagram  |https://www.instagram.com/NowToLovenz  |
            |Pinterest  |https://nz.pinterest.com/NowToLoveNZ   |



    @BXMA-482
    Scenario: Verify the sign-up URL on homepage
        Given I switch to "mobile" view
        When I am currently viewing the homepage
        Then I should see the sign up button containing "https://www.nowtolove.co.nz/now-nz-newsletter" url in "mobile" view


    @BXMA-482
    Scenario Outline: Verify the sign-up URL on <page> brand landing page in mobile view
        Given I switch to "mobile" view
        When I am currently viewing "<page>"
        Then I should see the sign up button containing "<link>" url in "mobile" view
        Examples:
            | page                    | link                                                            |
            | nz-womans-weekly/       | https://www.nowtolove.co.nz/nz-womans-weekly-newsletter         |
            | womans-day/             | https://www.nowtolove.co.nz/womans-day-newsletter               |
            | australianwomensweekly/ | https://www.nowtolove.co.nz/australianwomensweekly-newsletter   |
            | next/                   | https://www.nowtolove.co.nz/next-newsletter                     |
            | good-health-choices     | https://www.nowtolove.co.nz/good-health-choices-newsletter      |
            | nadia/                  | https://www.nowtolove.co.nz/nadia-newsletter                    |

    Scenario: Verify the RSS feed
        Given I am currently viewing "rss"
        Then I should see "link" tag containing "http://now-site-nz.sit.bxm.net.au" value
        * I should see "dc:creator" tag containing "Now To Love" in CDATA
        * I should see "title" tag containing a value
        * I should see "dc:creator" tag containing a value
        * I should see "content:encoded" tag containing a value
        When I am currently viewing "rss/summary"
        * I should see "title" tag containing a value
        * I should not see "content:encoded" tag
        When I am currently viewing "rss/summary/nzww"
        * I should see "title" tag containing a value
        When I am currently viewing "rss/info"
        * I should see "rss/summary/nzww" in json

    Scenario Outline: Verify the search feature on <page> in <device> (Mobile style)
        Given I switch to "<device>" view
        When I am currently viewing "<pageUrl>"
        * I should see the search icon in the navigation bar
#        * I should see the search box after clicking the icon
#        * I should still see the search box after scrolling the page down
#        * I should be able to search a keyword "wedding" on "navigation bar" and see the result page
#        * I should not see the search bar on the search result page in mobile version
        Examples:
            |device             |page       |pageUrl                                            |
            |mobile             |homepage   |                                                   |

    Scenario Outline: Verify the search feature on <page> in <device> (Desktop style)
        Given I switch to "<device>" view
        When I am currently viewing "<pageUrl>"
        * I should see the search icon in the navigation bar
#        * I should see the search box after clicking the icon
#        * I should still see the search box after scrolling the page down
#        * I should be able to search a keyword "wedding" on "navigation bar" and see the result page
#        * I should be able to search a keyword "cake" on "search result page" and see the result page
        Examples:
            |device             |page       |pageUrl                                            |
            |desktop            |homepage   |                                                   |

#    Scenario Outline: Verify the search feature on <page> in <device> (Desktop style)
#        Given I switch to "<device>" view
#        When I am currently viewing "<pageUrl>"
#        * I should be able to search a keyword "wedding" on "navigation bar" and see the result page
#        Examples:
#            |device             |page       |pageUrl                                            |
#            |tablet landscape   |section    |celebrity                                          |

#    Scenario Outline: Verify the search feature on <page> in <device> (Desktop style)
#        Given I switch to "<device>" view
#        When I am currently viewing "<pageUrl>"
#        * I should be able to search a keyword "wedding" on "navigation bar" and see the result page
#        Examples:
#            |device             |page       |pageUrl                                            |
#            |tablet portrait    |section    |celebrity |
