require("babel/register");

import path 				from 'path';
import webpack 				from 'webpack';

import { 
	port as WP_PORT, 
	host as WP_HOST,
	contentBase,
	sassPath
} from './config.js'


const sassLoaders = [
  "style",
  "css",
  'autoprefixer?browsers=last 2 version',
  "sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true&includePaths[]=" + path.join( __dirname, '../app/styles' )
];


console.log('BOOM :: ', sassLoaders.join('!') );


export default {
	devtool 		: 'eval',
	debug 			: 'true',
	hotComponents 	: true,
	cache 			: {},

	node : {  fs: "empty" },

	entry   : { 
		'bundle' : [ 
			`./app/browser.js`,
			`webpack-dev-server/client?http://${WP_HOST}:${WP_PORT}`,
			`webpack/hot/only-dev-server`,
		],

	},

	output : {
		filename 				: `[name].js`,
		chunkFilename 			: `[name]-[chunkhash].js`,
		path 					:  contentBase,
		publicPath  			: `http://${WP_HOST}:${WP_PORT}/assets/`,
		hotUpdateMainFilename	: `update/[hash]/update.json`,
		hotUpdateChunkFilename  : `update/[hash]/[id].update.js`
	},

	module : {
		loaders: [
	      { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/, loader: "file-loader"},
	      { test: /\.js$/, exclude: /node_modules/, loaders: ["react-hot", "babel?stage=0"] },
	      { test: /\.css$/, exclude: /\.useable\.css$|\.css$/, loader: "style!css" },
      	  { test: /\.useable\.css$|\.css$/, loader: 'style/useable!css' },
      	  { test: /\.scss$/, loader:  sassLoaders.join('!') }
	    ]
	},

	progress : true,


	resolve : {
		unsafeCache : true,
		root : [ sassPath, contentBase ],
		modulesDirectories : ['node_modules', 'public', 'app' ],
		extensions: [
            '',
            '.js', '.coffee',
            '.html', '.jade',
            '.css', '.styl', '.scss', '.less'
        ]
	},


	plugins : [
		new webpack.HotModuleReplacementPlugin(),
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


		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin()

	]

}

