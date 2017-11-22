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
            |Simply You                         |/simply-you            |

    Scenario: I can see the brand logos in the hamburger menu
        Given I switch to "mobile" view
        When I am currently viewing the homepage
        * I can navigate to all sites in the hamburger navigation menu
            |title              |url                                |gtm                    |
            |Homes To Love      |http://homestolove.co.nz/          |gtm-hamburger-nzhomes  |
            |Food To Love       |http://foodtolove.co.nz/           |gtm-hamburger-nzfood   |
            |Fashion Quarterly  |http://www.fq.co.nz/               |gtm-hamburger-fq       |
            |Miss FQ            |http://www.fq.co.nz/missfqhome/    |gtm-hamburger-missfq   |
            |Noted              |http://www.noted.co.nz/            |gtm-hamburger-noted    |

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
            |simply-you          |subscribe-simply  |https://www.facebook.com/SimplyYouMagazine     |https://twitter.com/SimplyYouMag   |https://www.instagram.com/simplyyoumag             |none                                   |gtm-subscribe-simply |

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
            |Simply You                         |/simply-you            |gtm-footer__logos-list-simply   |
        * I can navigate to all standard pages in the footer
            |page           |url                                                    |
            |PRIVACY POLICY |http://www.bauermedia.co.nz/privacy                    |
            |ADVERTISE      |http://www.bauermedia.co.nz/advertising/rates-ad-specs |
            |TERMS OF USE   |http://www.bauermedia.co.nz/terms/website-terms        |
            |CONTACT US     |contact-us                                             |

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
        Then I should see the sign up button containing "http://www.nowtolove.co.nz/now-nz-newsletter" url in "mobile" view


    @BXMA-482
    Scenario Outline: Verify the sign-up URL on <page> brand landing page in mobile view
        Given I switch to "mobile" view
        When I am currently viewing "<page>"
        Then I should see the sign up button containing "<link>" url in "mobile" view
        Examples:
            | page                    | link                                                         |
            | nz-womans-weekly/       | http://www.nowtolove.co.nz/nz-womans-weekly-newsletter       |
            | womans-day/             | http://www.nowtolove.co.nz/womans-day-newsletter             |
            | australianwomensweekly/ | http://www.nowtolove.co.nz/australianwomensweekly-newsletter |
            | next/                   | http://www.nowtolove.co.nz/next-newsletter                   |
            | good-health-choices     | http://www.nowtolove.co.nz/good-health-choices-newsletter    |
            | simply-you/             | http://www.nowtolove.co.nz/simply-you-newsletter             |
