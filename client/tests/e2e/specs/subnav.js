module.exports = {
  '@disabled': false,

  'Subnav is hidden': function(client) {
    client
    .url(client.launch_url)
    .assert.hidden('.subnav')
    .end();
  },

  'Show and close subnav': function(client) {
    client
    .url(client.launch_url)
    .resizeWindow(1500, 800)
    .click('.nav-cloudradioo')
    .pause(500)
    .assert.visible('.subnav')
    .click('.nav-cloudradioo')
    .pause(500)
    .assert.hidden('.subnav')
    .end();
  },

  'Show correct subnav content': function(client) {
    client
    .url(client.launch_url)
    .resizeWindow(1500, 800)
    .click('.nav-cloudradioo')
    .pause(500)
    .assert.containsText('.option-elements.active', 'Discover New Music')
    .click('.nav-filter')
    .pause(500)
    .assert.containsText('.option-elements.active', 'Filter Your Taste')
    .click('.nav-history')
    .pause(500)
    .assert.containsText('.option-elements.active', 'History Of Your Tracks')
    .end();
  }
};