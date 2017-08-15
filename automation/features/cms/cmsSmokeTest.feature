@cms @now
Feature: CMS Smoke Test
    As an editor
    I should be able to use CMS to create and update content

    Scenario Outline: Create the <doctype> item
        Given I am logging in CMS
        When I am currently viewing the create form
        * I should be able to select "<doctype>" doc type
        * I should be able to add the name
        * I should be able to click the create button
        * I should see the item is created

        Examples:
            | doctype    |
            | Article    |
            | Gallery    |

    Scenario Outline: Update and publish the <doctype> item
        Given I am logging in CMS
        When I am currently viewing "editContent.aspx?id=" of "<doctype>"
        * I should be able to add content in the item
            | field         | tab               |
            | Long Title    | Editorial         |
            | Short Teaser  | Editorial         |
            | Image         | Editorial         |
            | Body Paragraph| Editorial         |
            | Body Heading  | Editorial         |
            | Page Title    | Search and Social |
        * I should be able to publish the item
        * I should be able to see the "preview" URL
        * I should be able to see the "live" URL

        Examples:
            | doctype    |
            | Article    |
            | Gallery    |

    #This scenario won't be run in phantomjs because we haven't found a solution to work with the alert popup
    @manual
    Scenario Outline: Unpublish the <doctype> item
        Given I am logging in CMS
        When I am currently viewing "editContent.aspx?id=" of "<doctype>"
        * I should be able to unpublish the item

        Examples:
            | doctype    |
            | Article    |
        #The other doc type will be tested in the deletion scenario

    #This scenario won't be run in phantomjs because we haven't found a solution to work with the alert popup
    #Also we need a solution to select a menu from the right click popup in phantomjs
    @manual
    Scenario Outline: Search and delete the <doctype> item
        Given I am logging in CMS
        When I am currently viewing "#content"
        * I should be able to find the "<doctype>" in the LHR list
        * I should be able to delete the item

        Examples:
            | doctype    |
            | Gallery    |
