# Now To Love

A news and lifestyle hub site which includes popular magazine products for women.

## Platform Requirements

Use NVM to manage Node versions and `nvm install` in this repo for correct Node version to use.

- OSX/Linux: https://github.com/creationix/nvm
- Windows: https://github.com/coreybutler/nvm-windows

## Running 

### Environment Variable

`APP_KEY` environment variable is required for the app to know which resources (components, styles, assets) to use.

```shell
cd src/ && nvm install && npm install && APP_KEY=now-site npm run dev
```

(Windows in Git Bash: `setx APP_KEY now-site` then `npm run dev-win`)

Replace 'now-site' above for site key. Site keys are defined in TeamCity build `serviceName` parameters.

## Run Scripts

Make sure `APP_KEY` environment variable is set before running scripts.

old gulp | new npm | description
---- | ---- | ----
 | clean | empty dist, coverage and build folders.
 | start | starts in production mode.
cover | test | runs units tests with coverage.
tdd | test:tdd | runs unit tests with file watch retest.
build --production | build | cleans then builds css and js in production mode.
build:css | build:css | builds css.
build:js | build:js | builds js. smaller file, takes longer.
 | predev | auto runs before dev. initial clean and initial css and js build.
gulp (default)  | dev | runs dev:css and dev:js and dev:serve.
 | dev-win | like dev but for windows platform
build:css | dev:css | builds css with file watch rebuild.
build:js | dev:js | builds js with file watch rebuild. larger file, faster build.
serve | dev:serve | local server on port 8080 with file watch restart.
gulp --stubbed | stubbed | runs dev in stubbed mode.

### Detailed Run Script Notes

#### clean

- empties the generated assets folders (dist and coverage).
- rimraf is a modules that provides a cross platform way of removing non-empty folder structures.
- mkdirp is a cross platform way of creating folder structures.

#### test

- instruments all the src files using istanbul. runs tests using mocha. istanbul writes report to coverage folder.
- must be run using babel-node to make sure report is against babel src files rather than compiled code. babel node automatically registers babel into the require hooks and loads the polyfills. the babel-node path is specified because different modules may depend on different babel versions and it is possible that the wrong version of babel is linked to the npm path friendly node_modules/.bin folder.
- there are several istanbul reporters
 - teamcity reporter writes teamcity commands in the output stream. teamcity picked these up and adds stats to build summary screens.
 - cobertura reporter produces an xml file that the coverage app running on the TV screens use
 - html reporter produces the brosable html report in the coverage folder. teamcity is configured to pick this up as a build artefact.
- the mocha command is short as defaults provide most functionality. it automatically looks in the test folder for tests. the recursive switch tells it to look in all sub folders as well. the check-leaks switch will tell you if it find global variables with leaky state across tests.

#### test:tdd

- runs unit tests only. no coverage report.
- the mocha command here is a little different to the one used in the test command. babel-node is not used here. babel is registered with polyfills instead using mocha require switches.

#### build

- the `&&` makes the clean scripts run synchronously prior to build css and js. 
- the build:css and build:js scripts are run in parallel (`&`).

#### build:css

- there was negligible difference to scss compile time with compression off or on, so it is always on. this means we only need 1 scss compile script.
- output of the node-sass is built to a `.build` folder. postcss picks it up from there. postcss is a tool to manipulate css after it has been compiled. we use the autoprefixer tool to apply appropriate css vendor prefixes to the css. in the source scss we just write standard scss, autoprefixer figures out if css properties need vendor prefixes or not for the specified browsers.

#### build:js

- browserify turns node code into browser code.
- babel (babelify is a babel transform tool for brwoserify) transforms the ES6 code to node ES5 code and browserify turns that into browser compatible bundles.
- envify is a browserify transform tool to turn node process.env values into strings for the browser.
- minifify is a browserify plugin that minifies each file as it is requires by browserify, rather than minifying the whole file at the end. better compression that way apparently (about 17% better results on Dolly). --no-map means don't produce source maps.

#### predev

- runs automatically before `npm run dev`. does a clean an initial css and js build so that when the server starts there are assets available and errors aren't thrown, while still allowsing css, dev and serve scripts to run in parallel.

#### dev

- main script devs will use.
- runs css build, js builds, starts a dev server as parallel scripts.

#### dev:css

- uses nodemon to watch the styles folder, all the scss files, and when the change run the build:css script. can't use the node-sass built-in watcher as the output piping to postcss will not run.

#### dev:js

- watchify is a wrapper around browserify. it does file watching and incremental compilation. initial build is normal speed but subsequent build on file change are around 1second.
- watchify watches all js files
- watchify verbose switch is added as otherwise there is no output at all.
- minifify isnt used in dev

#### dev:serve

- node does not re-require files on change. the node sever must restart in order to see changes to files. this is such a thing as node hot module replacement but we use nodemon to watch the app folder and restart node when files are changed.

#### stubbed

 - sets NODE\_ENV=stubbed using cross env so it works on windows. NODE\_ENV=stubbed tells the @bxm/server to load up some stub default APIs.

## Site Patterns

The incumbent data flow libary is [Fluxible](http://fluxible.io). Forward thinking approach is [Redux](http://redux.js.org) flavoured patterns where possible;

- Components that connect to stores are Containers
- Avoid shared state, otherwise move towards using a single store
- Reduce state to store using reducer modules 
- Fetch data in response to route events

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
 
