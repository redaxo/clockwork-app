const {existsSync} = require('fs');
const vue = {
	publicPath: "./",
	outputDir: "build",
	configureWebpack: {
		"devtool": "inline-cheap-module-source-map"
	},
	chainWebpack: config => {
		const svgRule = config.module.rule('svg')

		svgRule.uses.clear()

		svgRule.use('vue-svg-loader')
			.loader('vue-svg-loader')
			.options({ svgo: { plugins: [{ removeDimensions: true }, { removeViewBox: false }] } })
	}
}

module.exports = {
	...vue,
	...existsSync('./vue.config.local.js') ? require('./vue.config.local.js') : {}
}