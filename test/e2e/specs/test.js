// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#tnvapp', 5000)
      .assert.elementPresent('.tnvvote')
      .assert.containsText('span', 'Tax N Vote')
      .waitForElementVisible('#renderer', 10000)
      .assert.elementCount('canvas', 1)
      .end()
  }
}
