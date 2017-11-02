@homepage @now
Feature: Homepage
    As a user
    I should be able to see homepage

    Scenario Outline: Verify the sign-up URL on homepage
        Given I switch to "<device>" view
        When I am currently viewing the homepage
        Then I should see the sign up button containing "//www.nowtolove.com.au/now-newsletter" url and "gtm-subs-homepage" gtm in "<device>" view
        @med
        #Test desktop as the high priority for now until the mobile issue is fixed. Then desktop one can be @med
        Examples:
            | device            |
            | desktop           |
            | mobile            |
        @low
        Examples:
            | device            |
            | tablet landscape  |
            | tablet portrait   |

    Scenario Outline: Verify the must read module is functional correctly in "<device>" view
        Given I switch to "<device>" view
        When I am currently viewing the homepage
        * I should see must read header as "MUST READ"
        * I should see <number> must read images and titles which are clickable to open their page
        * I should see each must read items containing gtm
            |no |gtm                    |
            |1  |gtm-mustread1-homepage |
            |2  |gtm-mustread2-homepage |
            |3  |gtm-mustread3-homepage |
            |4  |gtm-mustread4-homepage |
            |5  |gtm-mustread5-homepage |
            |6  |gtm-mustread6-homepage |
        @high
        Examples:
            |device             | number |
            | mobile            | 2      |
        @med
        Examples:
            |device             | number |
            | desktop           | 6      |
        @low
        Examples:
            |device             | number |
            | tablet portrait   | 4      |
            | tablet landscape  | 6      |

    @low
    Scenario Outline: Verify the hero teaser element is functional correctly in "<device>" view
        Given I switch to "<device>" view
        When I am currently viewing the homepage
        * I should see the main hero item containing its image and clickable to open its page
        * I should see the main hero item containing its title and clickable to open its page
        * I should see the main hero item containing source
        Examples:
            |device|
            |mobile|
            |desktop|
            |tablet portrait |
            |tablet landscape|

    @low
    Scenario Outline: Verify the promoted module is functional correctly in "<device>" view
        Given I switch to "<device>" view
        When I am currently viewing the homepage
        * I should see promoted header as "WOMEN OF THE YEAR"
        * I should see <number> promoted images and titles which are clickable to open their page
        * I should see each promoted items containing gtm
            |no |gtm                 |
            |1  |gtm-promo1-homepage |
            |2  |gtm-promo2-homepage |
            |3  |gtm-promo3-homepage |
            |4  |gtm-promo4-homepage |
        Examples:
            |device             | number |
            | mobile            | 2      |
            | tablet portrait   | 3      |
            | tablet landscape  | 4      |
            | desktop           | 4      |

    Scenario Outline: Verify the top news feed is functional correctly in "<device>" view
        Given I am currently viewing the homepage
        When I switch to "<device>" view
        * I should see 6 top half feed
        * I should see each top feed item containing its image and clickable to open its page
        * I should see each top feed item containing its title and clickable to open its page
        * I should see each top feed item containing source and date
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

    @low
    Scenario Outline: Verify the bottom news feed is functional correctly in "<device>" view
        Given I am currently viewing the homepage
        When I switch to "<device>" view
        * I should see 8 bottom half feed
        * I should see each bottom feed item containing its image and clickable to open its page
        * I should see each bottom feed item containing its title and clickable to open its page
        * I should see each bottom feed item containing source and date

        Examples:
            |device|
            |mobile|
            |desktop|
            |tablet portrait |
            |tablet landscape|

