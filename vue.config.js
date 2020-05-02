const {existsSync} = require('fs');
const {vue} = require('./package.json');

module.exports = {
    ...vue,
    ...existsSync('./vue.config.local.js') ? require('./vue.config.local.js') : {}
}