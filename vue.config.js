const {vue} = require('./package.json');

module.exports = {
    ...vue,
    ...require('./vue.config.local.js')
}