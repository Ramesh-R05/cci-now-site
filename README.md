# Now To Love

[![Run Status](https://api.shippable.com/projects/583638adf207180f005cec9e/badge?branch=master)](https://app.shippable.com/projects/583638adf207180f005cec9e)
[![Run Status](https://api.shippable.com/projects/583638adf207180f005cec9e/coverageBadge?branch=master)](https://app.shippable.com/projects/583638adf207180f005cec9e)

A news and lifestyle hub site for women, with content from popular magazine brands.

## Platform Requirements

### Node

Use NVM to manage Node versions and `nvm install` in this repo for correct Node version to use.

- OSX/Linux: https://github.com/creationix/nvm
- Windows: https://github.com/coreybutler/nvm-windows

### Bash

Use Git Bash only.

## Environment Variable

### `APP_KEY` (not used in NTL)

Used in multi site setup to set the site to use, the correct assets and identifies the app in logs and apm.

Example:

- `APP_KEY=now-site npm start`

NTL is a single site setup and APP_KEY is hard coded in start.js so is not require to be set externally.

### `APP_DEBUG`

Sets debug mode to output extra logs. Also wraps the start function in a try/catch to display hidden errors.

Example:

- `APP_DEBUG=true npm start` Sets winston-logger debug level logs.
- `APP_DEBUG=silly npm start` Sets winston-logger silly level logs.

### `APP_STUBBED`

Loads data from local stubs, does not use content services. Use with start or dev run scripts to work locally. Automation tests use stubbed mode.

Example:

- `APP_STUBBED=true npm start`

### `APP_REGION`

Sets the region. Used by config loader to load region specific config.

Example:

- `APP_REGION=nz npm start` loads the NZ NTL site

## Run Scripts

Node module [npm-run-all](https://github.com/mysticatea/npm-run-all) cli is used to provide cross platform script parallelisation control.

### start

- starts the site.

### test

- instruments all the src files using istanbul. runs tests using mocha. istanbul writes report to coverage folder.
- must be run using babel-node to make sure report is against babel src files rather than compiled code. babel node automatically registers babel into the require hooks and loads the polyfills. the babel-node path is specified because different modules may depend on different babel versions and it is possible that the wrong version of babel is linked to the npm path friendly node_modules/.bin folder.
- there are several istanbul reporters
 - teamcity reporter writes teamcity commands in the output stream. teamcity picked these up and adds stats to build summary screens.
 - cobertura reporter produces an xml file that the coverage app running on the TV screens use
 - html reporter produces the browsable html report in the coverage folder. teamcity is configured to pick this up as a build artefact.
- the mocha command is short as defaults provide most functionality. it automatically looks in the test folder for tests. the recursive switch tells it to look in all sub folders as well. the check-leaks switch will tell you if it find global variables with leaky state across tests.

### test:ci

- runs unit tests with additional xunit mocha reporter used for Shippable CI.

### test:unit

- runs unit tests only. no coverage report.

### test:tdd

- runs unit tests in file watch mode & reruns test on file change.

### clean

- empties the generated assets folders (dist and coverage).
- rimraf is a module that provides a cross platform way of removing non-empty folder structures.
- mkdirp is a cross platform way of creating folder structures.

### build

- the build:css and build:js scripts are run in parallel.

### build:css

- there was negligible difference to scss compile time with compression off or on, so it is always on. this means we only need 1 scss compile script.
- output of the node-sass is built to a `.build` folder. postcss picks it up from there. postcss is a tool to manipulate css after it has been compiled. we use the autoprefixer tool to apply appropriate css vendor prefixes to the css. in the source scss we just write standard scss, autoprefixer figures out if css properties need vendor prefixes or not for the specified browsers.

### build:js

- browserify turns node code into browser code.
- babel (babelify is a babel transform tool for browserify) transforms the ES6 code to node ES5 code and browserify turns that into browser compatible bundles.
- minifify is a browserify plugin that minifies each file as it is requires by browserify, rather than minifying the whole file at the end. better compression that way apparently (about 17% better results).

### dev

- main script devs will use.
- runs clean, css build, js builds, starts a dev server as parallel scripts.

### dev:css

- uses chokidar to watch the styles folder, all the scss files, and when the change run the build:css script. can't use the node-sass built-in watcher as the output piping to postcss will not run.

### dev:js

- watchify is a wrapper around browserify. it does file watching and incremental compilation. initial build is normal speed but subsequent build on file change are around 1 second.
- watchify watches all js files.
- watchify verbose switch is added as otherwise there is no output at all.
- watchify debug switch is added as it produces source maps.
- minifify isnt used in dev.

### dev:serve

- node does not re-require files on change. the node sever must restart in order to see changes to files. this is such a thing as node hot module replacement but we use nodemon to watch the app folder and restart node when files are changed.

### lint:scss

- lints the sass code

### lint:js

- lints the js code

### lint

- lints the code

## Site Patterns

The incumbent data flow libary is [Fluxible](http://fluxible.io). Forward thinking approach is [Redux](http://redux.js.org) flavoured patterns where possible;

- Components that connect to stores are Containers
- Avoid shared state, otherwise move towards using a single store
- Reduce state to store using reducers
- Fetch data in response to route events
- Take notice and fix all warnings
- Use React Prop Types full functionality to define and document data

## BFF

The Backend For Frontend is a place to aggregate data for the site. How it works:

### Site

- page load executes navigation action in the router
- the router determines which route to process
- the page load action set on the route config is executed
- the page load action makes async requests to BFF routes (`/api/getPageContent`)

### BFF Routes

- defines Express route paths
- assigns Express route middleware handlers

### BFF Route Middleware

- process request data using helpers
- make async requests using BFF APIs
- processes response data using helpers

### BFF APIs

- integrates with remote services

# Need to trigger pipeline
