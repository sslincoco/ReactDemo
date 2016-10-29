module.exports = {
	// entry: './main.js',
	entry: './redux-demo.js',
	output: {
		path: './',
		filename: 'index.js' //  bundle file
	},
	devServer: {
		inline: true,
		port: 3333
	},
	module: {
		loaders: [
		  {
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['es2015', 'react']
			}
		  }
		]
	}

}