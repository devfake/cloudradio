module.exports = {
  'See hidden-tools disappear': function(client) {
    client
    .url(client.launch_url)
    .assert.visible('.hidden-tools')
    .pause(2000)
    .assert.hidden('.hidden-tools')
    .end()
  },

  'See hidden-tools on hover': function(client) {
    client
    .url(client.launch_url)
    .pause(3000)
    .assert.hidden('.hidden-tools')
    .moveToElement('header', 10, 10)
    .assert.visible('.hidden-tools')
  },

  'Show share-track link': function(client) {
    client
    .click('.share-btn')
    .assert.visible('.share-track-wrap')
    .assert.hidden('.share-btn')
  },

  'Close share-track link': function(client) {
    client
    .click('.close-btn')
    .assert.visible('.share-btn')
    .assert.hidden('.share-track-wrap')
    .end();
  },

  'See header items': function(client) {
    client.url(client.launch_url);
    client.pause(2000); // Wait for ajax
    client.expect.element('.title').text.to.not.equal("");
    client.expect.element('.author').text.to.not.equal("");
    client.expect.element('.genre').text.to.not.equal("");
    client.end();
  }
};