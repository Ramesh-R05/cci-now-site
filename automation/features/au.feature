@sitAU
Feature: Team is able to confirm the environment is working e2e
    As a user
    I should be able to see the AU NTL site showing correct AU value.

    Scenario: Editorial team is able to create content
        Given Emilly just published "new-now-article"
        When  I navigate to the article "celebrity/celeb-news/alejandro-test"
        Then our readers can enjoy the latest content
