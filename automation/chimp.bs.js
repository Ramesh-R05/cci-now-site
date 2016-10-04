module.exports = {
  offline: false,
  // - - - - SELENIUM  - - - -
  browser: 'iPhone',
  platform: 'MAC',
    //browser: 'Chrome',
    //platform: 'Any',
  name: 'Share Repo',
  user: 'yichen2',
  key: 'foeFJmYhApmMpwdyPA1q',
  port: 80,
  host: 'hub.browserstack.com',
  webdriverio: {
    desiredCapabilities: {"browserstack.debug": true}
  }
};
