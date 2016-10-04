@editorial-collection-page @food
Feature: Editorial Collection Page
    As a user
    I should be able to view a collection of recipes in order to cook recipes which interests me

    @DFO-204 @DFO-208 @DFO-474
    Scenario: Verify an editorial collection page which contains a collection of recipes on mobile
        When I switch to "mobile" view
        Given I am currently viewing "recipe/collections/anzac-day-baking-recipes"
        * I can see the long title "ANZAC Day baking"
        * I can see the collage of images on editorial collection
        * I can see the short teaser "Whatever you prefer"
        * I can see a heading "Showing 12 recipes" on recipe collection page
        * I can see 12 recipes
        * I can see each recipe containing its image
        * I can see each recipe containing its name
        * I can see each recipe clickable to open its page

    Scenario: Verify an editorial collection page which contains a collection of recipes on tablet portrait
        When I switch to "tablet portrait" view
        Given I am currently viewing "recipe/collections/anzac-day-baking-recipes"
        * I can see the long title "ANZAC Day baking"
        * I can see the collage of images on editorial collection
        * I can see the short teaser "Whatever you prefer"
        * I can see a heading "Showing 12 recipes" on recipe collection page
        * I can see 12 recipes
        * I can see each recipe containing its image
        * I can see each recipe containing its name
        * I can see each recipe clickable to open its page

    Scenario: Verify an editorial collection page which contains a collection of recipes on desktop
        When I switch to "desktop" view
        Given I am currently viewing "recipe/collections/anzac-day-baking-recipes"
        * I can see the long title "ANZAC Day baking"
        * I can see the collage of images on editorial collection
        * I can see the short teaser "Whatever you prefer"
        * I can see a heading "Showing 12 recipes" on recipe collection page
        * I can see 12 recipes
        * I can see each recipe containing its image
        * I can see each recipe containing its name
        * I can see each recipe clickable to open its page
