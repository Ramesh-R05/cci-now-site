@brand @now @BXMA-107 @BXMA-104
Feature: Brand Landing page
    As a user
    I should be able to see brand landing page

    @BXMA-482 @high
    Scenario Outline: Verify the sign-up URL on <page> brand landing page in mobile view
        Given I switch to "mobile" view
        When I am currently viewing "<page>"
        Then I should see the sign up button containing "<link>" url and "gtm-subs-brand" gtm in "mobile" view
        Examples:
            | page                  | link                                              |
            | aww/                  | //www.nowtolove.com.au/aww-newsletter             |
            | womansday/            | //www.nowtolove.com.au/womansday-newsletter       |
            | good-health/          | //www.nowtolove.com.au/good-health-newsletter     |
            | okmagazine/           | //www.nowtolove.com.au/okmagazine-newsletter      |
            | nw/                   | //www.nowtolove.com.au/nw-newsletter              |
            | take5mag/             | //www.nowtolove.com.au/take5mag-newsletter        |
            | yours/                | //www.nowtolove.com.au/yours-newsletter           |
            | mother-and-baby/      | //www.nowtolove.com.au/mother-and-baby-newsletter |
            | tvweek/               | //www.nowtolove.com.au/tvweek-newsletter          |
            | prizestolove/         | //www.nowtolove.com.au/prizestolove-newsletter    |

    @BXMA-482
    Scenario Outline: Verify the sign-up URL on <page> brand landing page in <device> view
        Given I switch to "<device>" view
        When I am currently viewing "<page>"
        Then I should see the sign up button containing "<link>" url and "gtm-subs-brand" gtm in "<device>" view
        @med
        Examples:
            | device            | page         | link                                              |
            | desktop           | aww/         | //www.nowtolove.com.au/aww-newsletter             |
        @low
        Examples:
            | device            | page         | link                                              |
            | tablet landscape  | womansday/   | //www.nowtolove.com.au/womansday-newsletter       |
            | tablet portrait   | good-health/ | //www.nowtolove.com.au/good-health-newsletter     |

    @BXMA-291
    Scenario Outline: Verify the brand title and hero teaser element are functional correctly in "<device>" view
        Given I switch to "<device>" view
        When I am currently viewing "aww"
        * I should see the brand title logo on the brand landing page
        * I should see the main hero item containing its image and clickable to open its page
        * I should see the main hero item containing its title and clickable to open its page
        * I should see the main hero item containing "AUSTRALIAN WOMEN'S WEEKLY" source without date
        @med
        Examples:
            |device           |
            |desktop          |
        @low
        Examples:
            |device           |
            |tablet landscape |

    @BXMA-291
    Scenario Outline: Verify the brand title and hero teaser element are functional correctly in "<device>" view
        Given I switch to "<device>" view
        When I am currently viewing "aww"
        * I should see the brand title logo on the brand landing page
        * I should see the main hero item containing its image and clickable to open its page
        * I should see the main hero item containing its title and clickable to open its page
        * I should see the main hero item containing "AUSTRALIAN WOMEN'S WEEKLY" source without date
        @high
        Examples:
            |device          |
            |mobile          |
        @low
        Examples:
            |device          |
            |tablet portrait |

    @BXMA-291
    Scenario Outline: Verify the top news feed is functional correctly in "<device>" view
        Given I switch to "<device>" view
        When I am currently viewing "aww"
        * I should see 6 top half feed
        * I should see each top feed item containing its image and clickable to open its page
        * I should see each top feed item containing its title and clickable to open its page
        * I should see each top feed item containing source without date
        @med
        Examples:
            |device|
            |mobile|
            |desktop|
        @low
        Examples:
            |device|
            |tablet portrait |
            |tablet landscape|

    @BXMA-291 @low
    Scenario Outline: Verify the bottom news feed is functional correctly in "<device>" view
        Given I switch to "<device>" view
        When I am currently viewing "aww"
        * I should see 8 bottom half feed
        * I should see each bottom feed item containing its image and clickable to open its page
        * I should see each bottom feed item containing its title and clickable to open its page
        * I should see each bottom feed item containing source without date

        Examples:
            |device|
            |mobile|
            |desktop|
            |tablet portrait |
            |tablet landscape|

    @BXMA-292 @low
    Scenario Outline: Verify the subscribe now link and social links of "<brand>" landing page
        Given I switch to "desktop" view
        When I am currently viewing "<brand>"
        * I should see the correct brand "subscribe" link as "<subscribe>"
        * I should see the correct brand "facebook" link as "<facebook>"
        * I should see the correct brand "twitter" link as "<twitter>"
        * I should see the correct brand "instagram" link as "<instagram>"
        * I should see the subscribe button containing GTM "<gtm>"

        Examples:
            |brand              |subscribe          |facebook                                   |twitter                                |instagram                                      |gtm                  |
            |aww                |subscribe-aww      |https://www.facebook.com/WomensWeeklyMag   |https://twitter.com/womensweeklymag    |https://www.instagram.com/womensweeklymag      |gtm-subscribe-aww    |
            |womansday          |subscribe-wd       |https://www.facebook.com/WomansDayAUS      |https://twitter.com/womansdayaus       |https://www.instagram.com/Womansdayaus         |gtm-subscribe-wd     |
            |good-health        |subscribe-gh       |https://www.facebook.com/GoodHealthMag/    |https://twitter.com/goodhealthmag      |https://www.instagram.com/goodhealthmag        |gtm-subscribe-gh     |
            |okmagazine         |subscribe-ok       |https://www.facebook.com/OKmagAustralia    |https://twitter.com/okmagaustralia     |https://www.instagram.com/okmagaustralia       |gtm-subscribe-ok     |
            |nw                 |subscribe-nw       |https://www.facebook.com/NWmagazine        |https://twitter.com/nwmag              |https://www.instagram.com/nwmag/               |gtm-subscribe-nw     |
            |take5mag           |subscribe-take5    |https://www.facebook.com/take5magazine     |https://twitter.com/take5magazine      |https://www.instagram.com/take5magazine/       |gtm-subscribe-take5  |
            |yours              |subscribe-yours    |https://www.facebook.com/Yoursmagazineau/  |https://twitter.com/yoursmagazineau    |https://www.instagram.com/yoursmagazineau/     |gtm-subscribe-yours  |
            |mother-and-baby    |none               |https://www.facebook.com/mbmag/            |https://twitter.com/motherbaby_au      |https://www.instagram.com/motherbaby_au        |none                 |
            |tvweek             |subscribe-tvweek   |https://www.facebook.com/tvweekmag         |https://twitter.com/TVWEEKmag          |https://www.instagram.com/TVWEEKmag            |gtm-subscribe-tvweek |

    @low
    Scenario Outline: Verify the subscribe now and social icons of "<brand>" landing page in "<device>" view
        Given I switch to "<device>" view
        When I am currently viewing "<brand>"
        * I should see the subscribe element under "<position>" and containing title "<subscribe_title>" and image
        * I should see the follow us element under "<position>"

        Examples:
            |device             |brand          |position   |subscribe_title                |
            |mobile             |aww            |hero teaser|Subscribe to The Weekly        |
            |desktop            |womansday      |MREC       |Subscribe to Woman's Day       |
            |tablet portrait    |good-health    |hero teaser|Subscribe to Good Health       |
            |tablet landscape   |tvweek         |MREC       |Subscribe to TV WEEK           |

