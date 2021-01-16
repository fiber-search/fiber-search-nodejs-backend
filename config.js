var defaultConfig = {
    PORT: 48534,
    SHOW_RECORD_URL: true,
    MONGODB_URI: 'mongodb://localhost:27017/fiber-search',
    RESPONSE_HEADER_ACCESS_CONTROL_ALLOW_ORIGIN: 'http://localhost:3000',
}

// Initially, `./config.json` doesn't have any configuration properties, its content is `{}`.
// If you want to edit the configuration, don't edit `defaultConfig`, you should edit `./config.json` instead to overwrite the defaults.
const userConfig = require('./config.json')
for (const i in userConfig) {
    defaultConfig[i] = userConfig[i];
}

module.exports = defaultConfig
