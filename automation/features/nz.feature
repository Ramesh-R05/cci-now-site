@nznow @low @BXMA-221
Feature: Specific value for NZ NTL
    As a user
    I should be able to see the NZ NTL site showing correct NZ value.

    Scenario: Verify desktop WN header is functional correctly on homepage
        When I switch to "desktop" view
        Given I am currently viewing the homepage
        * I can navigate to all sites in the desktop list on the header
            |title                              |url                    |gtm                    |
            |New Zealand's Woman's Weekly       |/nz-womans-weekly      |gtm-uniheader-nzww     |
            |Australian Women's Weekly          |/aww                   |gtm-uniheader-awwnz    |
            |Next                               |/next                  |gtm-uniheader-next     |
            |New Zealand Woman's Day            |/womans-day            |gtm-uniheader-nzwd     |
            |New Zealand Good Health Choices    |/good-health-choices   |gtm-uniheader-nzgh     |
            |Nadia Lim                          |/nadia                 |gtm-uniheader-nadia    |
            |Simply You                         |/simply-you            |gtm-uniheader-simply   |

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
        * I should see the subscribe button containing GTM "<gtm>"
        Examples:
            |brand               |subscribe         |facebook                                       |twitter                            |instagram                                  |gtm                  |
            |nz-womans-weekly    |subscribe-nzww    |https://www.facebook.com/nzwomansweekly        |https://twitter.com/nzwomansweekly |https://www.instagram.com/nzwomansweekly   |gtm-subscribe-nzww   |
            |aww                 |subscribe-awwnz   |https://www.facebook.com/awwmagazine           |none                               |https://www.instagram.com/awwmagazine      |gtm-subscribe-awwnz  |
            |next                |subscribe-next    |https://www.facebook.com/nextmagazine          |https://twitter.com/nextmagazinenz |https://www.instagram.com/nextmagazinenz   |gtm-subscribe-next   |
            |womans-day          |subscribe-nzwd    |https://www.facebook.com/womansdaynz           |https://twitter.com/WomansDayNZ    |https://www.instagram.com/womansdaynz      |gtm-subscribe-nzwd   |
            |good-health-choices |subscribe-nzgh    |https://www.facebook.com/goodhealthchoicesnz   |https://twitter.com/good_health_nz |https://www.instagram.com/goodhealthnz     |gtm-subscribe-nzgh   |
            |nadia               |subscribe-nadia   |https://www.facebook.com/NadiaLimCooks         |https://twitter.com/nadialimchef   |https://www.instagram.com/nadialimcooks    |gtm-subscribe-nadia  |
            |simply-you          |subscribe-simply  |https://www.facebook.com/SimplyYouMagazine     |https://twitter.com/SimplyYouMag   |https://www.instagram.com/simplyyoumag     |gtm-subscribe-simply |

    Scenario: Verify the footer in the "mobile" view
        Given I switch to "mobile" view
        When I am currently viewing the homepage
        * I can see the social icons clickable to open its page in the footer
            |social     |url                                    |
            |Facebook   |https://www.facebook.com/nowtolovenz   |
            |Twitter    |https://twitter.com/NowToLovenz        |
            |Instagram  |https://www.instagram.com/NowToLovenz  |
        * I can navigate to all sites in the footer
            |title                              |url                    |gtm                             |
            |New Zealand's Woman's Weekly       |/nz-womans-weekly      |gtm-footer__logos-list-nzww     |
            |Australian Women's Weekly          |/aww                   |gtm-footer__logos-list-awwnz    |
            |Next                               |/next                  |gtm-footer__logos-list-next     |
            |New Zealand Woman's Day            |/womans-day            |gtm-footer__logos-list-nzwd     |
            |New Zealand Good Health Choices    |/good-health-choices   |gtm-footer__logos-list-nzgh     |
            |Nadia Lim                          |/nadia                 |gtm-footer__logos-list-nadia    |
            |Simply You                         |/simply-you            |gtm-footer__logos-list-simply   |
        * I can navigate to all standard pages in the footer
            |page           |url                                                    |
            |PRIVACY POLICY |http://www.bauermedia.co.nz/privacy                    |
            |ADVERTISE      |http://www.bauermedia.co.nz/advertising/rates-ad-specs |
            |TERMS OF USE   |http://www.bauermedia.co.nz/terms/website-terms        |
            |CONTACT US     |contact-us                                             |
