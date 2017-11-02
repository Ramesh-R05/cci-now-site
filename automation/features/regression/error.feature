@404 @now @low
Feature: Error page
    As a user
    I should be able to see the error page

    Scenario: I can see the 404 error page in the mobile style
        Given I switch to "mobile" view
        When I am currently viewing "404"
        * I should see the site header logo clickable to open homepage and contain "gtm-navbar-now" class name
        * I should see the hamburger menu
        * I should see the error title as "Sorry, this page is broken."
        * I should see the error giphy image
        * I should see the text clickable to homepage with gtm "gtm-error-goback"

    Scenario Outline: I can see the 404 error page in the desktop style on "<device>"
        Given I switch to "<device>" view
        When I am currently viewing "404"
        * I should see the large header banner clickable to open homepage
        * I should not see the hamburger menu
        * I should see the error title as "Sorry, this page is broken."
        * I should see the error giphy image
        * I should see the text clickable to homepage with gtm "gtm-error-goback"
        Examples:
            | device            |
            | desktop           |
            | tablet portrait   |
            | tablet landscape  |

