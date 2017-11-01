var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = require('./node_modules/webpack/lib/optimize/CommonsChunkPlugin')

module.exports = {
	entry: { 
        app: path.resolve(__dirname,'./app/app.jsx'),
        vendorReact: ['react','react-dom']
    },
	output: {
		path: path.resolve(__dirname, 'public/dist/app'),
		filename: '[name].bundle.min.js'
	},
    resolve: {
        modules: [path.resolve(__dirname, "./app/components"), "node_modules"],
        extensions: ['.js', '.jsx']
    },
 	module: {
    	loaders: [
        	{
            	test: /\.jsx$/,
            	loader: 'babel-loader',
            	query: {
                	presets: ['es2015','react']
            	},
                exclude: /(node_modules|bower_components)/
         	}
     	]	
 	},
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: { warnings: false },
        //     comments: false,
        //     sourceMap: false
        // }),

        new webpack.optimize.CommonsChunkPlugin({name:'vendorReact',filename: 'vendor.bundle.min.js'})
    ],
	stats: {
     colors: true
 	},
 	devtool: 'source-map'
};