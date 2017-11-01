var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = require('./node_modules/webpack/lib/optimize/CommonsChunkPlugin')

module.exports = {
	entry: { 
        login: './public/js/login.js',
        signup: './public/js/signup.js',
        vendor: ['jquery']
    },
	output: {
		path: path.resolve(__dirname, 'public/dist'),
		filename: '[name].bundle.min.js'
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
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            comments: false,
            sourceMap: false
        }),
        new webpack.ProvidePlugin({
           $: "jquery",
           jQuery: "jquery"
        }),

        new webpack.optimize.CommonsChunkPlugin({name:'vendor',filename: 'vendor.bundle.min.js'})
    ],
	stats: {
     colors: true
 	},
 	devtool: 'source-map'
};