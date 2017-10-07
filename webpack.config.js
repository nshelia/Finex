var path = require('path');
var webpack = require('webpack');
module.exports = {
	entry: './public/js/app.js',
	output: {
		path: path.resolve(__dirname, 'public/js'),
		filename: 'bundle.js'
	},
 	module: {
    	loaders: [
        	{
            	test: /\.js$/,
            	loader: 'babel-loader',
            	query: {
                	presets: ['es2015','react']
            	}
         	}
     	]	
 	},
 	plugins: [
    	new webpack.ProvidePlugin({
      		$: "jquery",
      		jQuery: "jquery"
    	}),
 	],
	stats: {
     colors: true
 	},
 	devtool: 'source-map'
};