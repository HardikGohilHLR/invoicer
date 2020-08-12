module.exports = {
	css: {
		extract: {
			filename: 'css/[name].css',
			chunkFilename: 'css/[name].css'
		}
	},
	configureWebpack: {
		output: {
			filename: 'js/[name].js',
			chunkFilename: 'js/[name].js'
		}
	}
}