module.exports = {
  '@disabled': false,

  'Play shared track': function(client) {
    client
    .url(client.launch_url + '184757886')
    .pause(2000)
    .assert.containsText('.title', 'Alan Walker - Spectre [NCS Release]')
    .assert.containsText('.author', 'NCS')
    .assert.containsText('.genre', 'Electro House')
    .end();
  }
};