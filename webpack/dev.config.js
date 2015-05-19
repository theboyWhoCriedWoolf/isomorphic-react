require("babel/register");

import path 							from 'path';
import webpack 							from 'webpack';
import notify 							from './utils/errorNotify';

/**
 * export the webpack development configuration
 * @param  {object} config env config
 * @return {object}
 */
export default (config) => {

	/* Define the config variables */
	const {

		wp_host,
		wp_port,
		publicPath

	} = config;

	return {
		devtool 		: 'eval',
		debug 			: true,
		devServer 		: true,
		hotComponents 	: true,
		cache 			: {},

		entry   : { 
			'bundle' : [ 
				`./app/browser.js`,
				`webpack-dev-server/client?http://${wp_host}:${wp_port}`,
				`webpack/hot/only-dev-server`,
			],

		},

		output : {
			filename 				: `[name].js`,
			chunkFilename 			: `[name]-[chunkhash].js`,
			path 					:  path.join( __dirname, '../public' ),
			publicPath  			:  `http://${wp_host}:${wp_port}/build/`
		},

		module : {
			loaders: [
		      { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.eot$|\.ttf$|\.wav$|\.mp3$/, loader: "file-loader!url-loader?limit=100000"},
		      { test: /\.js$|.jsx$/, exclude: /node_modules/, loaders: ["react-hot", "babel"] },
		      { test: /\.css$/, exclude: /\.useable\.css$/, loader: "style!css" },
      		  { test: /\.useable\.css$/, loader: "style/useable!style-loader!css" }
		    ]
		},

		progress : true,


		resolve : {
			unsafeCache 		: new RegExp('node_modules'),
			root 				: [ path.join( __dirname, '../app/styles'),  publicPath ],
			modulesDirectories  : ['node_modules', 'public', 'app'],
			resolveLoader  		: [ 'public', 'assets', 'fonts' ],
			extensions: [
	            '',
	            '.js', '.jsx',
	            '.html', '.jade',
	            '.css', '.styl', '.scss', '.less'
	        ]
		},

		plugins : [
			new webpack.HotModuleReplacementPlugin({ quiet: true }),
			new webpack.NoErrorsPlugin(),
			new webpack.DefinePlugin({
		        "process.env": {
			        BROWSER 	: JSON.stringify(true),
			        NODE_ENV 	: JSON.stringify("development")
		        }
		    }),

			new webpack.ProgressPlugin((percentage, message) => {
		      const MOVE_LEFT = new Buffer("1b5b3130303044", "hex").toString();
		      const CLEAR_LINE = new Buffer("1b5b304b", "hex").toString();
		      process.stdout.write(`${CLEAR_LINE}${Math.round(percentage * 100)}%: ${message}${MOVE_LEFT}`);
		    }),

			/* trace out errors */
			function() { this.plugin("done", notify ); }
		]
	}



}





// const sassLoaders = [
//   "style",
//   "css",
//   'autoprefixer?browsers=last 2 version',
//   "sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true&includePaths[]=" + path.join( __dirname, '../app/styles' )
// ];

