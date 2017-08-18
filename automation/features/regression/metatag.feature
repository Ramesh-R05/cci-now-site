@metatag @now @med
Feature:Meta tag
    As a user
    I should be able to see specific meta tags in view source

    @BXMA-741
    Scenario: Verify specific meta tag in view source
        When I am currently viewing the homepage
        * I should see correct meta tag in view source
            | field    | value         |
            | property | fb:pages      |
            | name     | sailthru.date |
            | name     | sailthruimage |
