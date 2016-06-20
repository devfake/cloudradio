module.exports = {
  "src_folders": ["tests/e2e/specs"],
  "output_folder": "tests/e2e/reports",
  "custom_assertions_path": "",

  "selenium": {
    "start_process": true,
    "server_path": "node_modules/selenium-server/lib/runner/selenium-server-standalone-2.53.0.jar",
    "host": "127.0.0.1",
    "port": 4444,
    "cli_args": {
      "webdriver.chrome.driver": require('chromedriver').path
    }
  },

  "test_settings": {
    "default": {
      "launch_url" : "http://localhost:8888/cloudradioo/public/",
      "selenium_port": 4444,
      "selenium_host": "localhost",
      "silent": true,

      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    },

    "firefox": {
      "desiredCapabilities": {
        "browserName": "firefox",
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    }
  }
}