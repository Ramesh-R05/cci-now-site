First of All
============
1. Get [Sublime](http://www.sublimetext.com/) as your text editor
2. Get [Git Bash](https://code.google.com/p/msysgit/downloads/list?q=label:Featured)
3. Get GitExtention (optional, if you are a GUI person)
4. Get [Ansicon](https://github.com/adoxa/ansicon/downloads) for color coded test result
5. Update all ProjectName folders and text in files with your actual project name example = ProjectName is changes to Cosmo
Optional. Get Rubymine as your IDE as this will integrate all of the above

Setup Your Local Develop Environment
====================================
For more instructions on installing Ruby and setting up your local environment go to [Confluence Page](https://jira.bauermedia.net.au/confluence/display/ADD/Automation+-+Local+Environment+Setup)


Work with Automation
====================
1. Create a feature branch and name it based on the project and feature you are working on
2. Understand how to use tag properly and effectively [Tag Manual](https://jira.bauermedia.net.au/confluence/display/ADD/How+to+use+tag)
3. Execute your automation scripts on your local mulitple times and make sure they all pass
4. Commit to your branch and inform Michael for code review
5. Merge your branch into master branch once passed code review

Create Your First Test Case
===========================
1. Create a feature file under features directory, such as feature-name.feature
2. Create a ruby steps file under step_definitions directory and make sure you name it this way: feature-name_steps.rb
3. Copy and paste what's in sandbox.feature & sandbox_steps.rb into the files you just created
4. Customize the steps using [Capybara DSL](https://github.com/jnicklas/capybara#the-dsl)


Execute Test Cases On Your Local
================================
1. Open ansicon.exe
2. Navigate to your project folder
3. execute command: cucumber env=local base_url=http://<url> -t @tag1 -t @tag2


Generate Steps Structure
========================
1. Have your feature file written
2. Execute that feature file and the steps structure will be generated in the output
3. Copy and paste the steps into the right steps ruby file

Points to note on Test Date
===========================
1. We use js format for our test data
2. Add you test data in /test_data/

For CrossBrowser Execution
==================================
1. tag your test case with @crossbrowser @javascript @manual so it is only picked for crossbrowser execution
2. from the project folder execute command that will setup the environment
3. run the crossbrowser task => bundle exec rake crossbrowser["bsusername=bxmaccnt bskey=bxmkey"] nodes=1

Node chimp framework
==========================

# Requirement:
- git bash if using windows

# Setup:
- cd automation
- npm install

# Run locally:
(MAC)
- cd automation
    - `export URL=` (or populate with local host)
    - `export APP_KEY=site` (cosmo-site or dolly-site)
    - `export APP_ENV=environment` (automation, dev, prelive, live)
    - `export WN=true` (true will use url for WN sites `.APP_KEY-site.wn`, false will use share repo sites `dolly and cosmo`)
    - `npm run once` (run once)
    or
    - `npm run watch` (watching file changes, run features when any file is saved)
(WIDNOWS)
open git-bash
- cd automation
    - `export URL=` (or populate with local host)
    - `export APP_KEY=site` (cosmo-site or dolly-site)
    - `export APP_ENV=environment` (automation, dev, prelive, live)
    - `export WN=true` (true will use url for WN sites `.APP_KEY-site.wn`, false will use share repo sites `dolly and cosmo`)
    - `export HTTP_PROXY=` <= this will enable the selenium-standalone package to interact with selenium
    - `npm run once` (run once)
    or
    - `npm run watch` (watching file changes, run features when any file is saved)
  
# Run browserstack: - WIP -
Ensure you update the browser or device the test will run on in the chimp.bs.js file config
- cd automation
- `export APP_KEY=site` (cosmo-site or dolly-site)
- `export APP_ENV=environment` (automation, dev, prelive, live)
- `export WN=true` (true will use url for WN sites `.APP_KEY-site.wn`)
- `npm run bs`

# Configuration
- configs are environment variable based
- URL is configured base on `APP_KEY`, `APP_ENV` and `WN`
- you can run on stubb by using `export URL=http://localhost:3001/` environment variable
- runner config can be found in ./automation/config/APP_KEY.js

# Other modes:
- `npm run debug` (run in debug mode)
Below are set in the ./runner.js file
- `npm run features` (run multiple features concurrently)
- `npm run browsers` (run multiple browsers concurrently)

# Troubleshooting:
### Microsoft JScript compilation error
Use git bash/cygwin

### Selenium complains about missing drivers
npm run setup should have installed necessary drivers, otherwise set chimp.js config => offline = false for chimp to install requirements automatically

### Firefox error: Unable to connect to host 127.0.0.1 on port 7055 after 45000 ms.
Your selenium is not compatible with your firefox installation, see also https://github.com/SeleniumHQ/selenium/issues/1431. Two options:
- use firefox v40
  - set PATH pointing to this firefox
  - OR set desiredCapabilities.firefox_binary, see also https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities
- use a newer selenium-standalone server:
  - run ./node_modules/chimp/node_modules/.bin/selenium-standalone install --version=2.53.0
  - modifies ./node_modules/chimp/dist/lib/selenium.js:seleniumStandaloneOptions to use version=2.53.0

