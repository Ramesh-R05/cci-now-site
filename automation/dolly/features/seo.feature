@seo @local @javascript
Feature: Dolly site has the right SEO structure

#enable the rest after promoting
    @DDO-49
    Scenario: Verify crawlers dont crawl development environments
        Given i visit "http://automation.dolly-site.bauer-media.net.au/robots.txt"
        * I can see the relevant file that disallow the crawler
#        Given i visit "http://dev.dolly-site.bauer-media.net.au/robots.txt"
#        * I can see the relevant file that disallow the crawler
#        Given i visit "http://prelive.dolly-site.bauer-media.net.au/robots.txt"
#        * I can see the relevant file that disallow the crawler
