require("babel/register");

var path  				      = require('path'),
	  webpack     		    = require('webpack'),
	  ExtractTextPlugin 	= require("extract-text-webpack-plugin");


const contentBase = path.join( path.resolve( './' ), '/public' ),
      sassPath    = path.join( __dirname, '../app/styles');

module.exports =  {
  devtool: "source-map",

  entry   : { 
    'bundle'    : './app/browser.js'
  },

  output : {
    filename          : '[name].js',
    chunkFilename     : '[name].js',
    path              :  contentBase,
    // publicPath        : '/assets/',
  },

  module : {
    loaders: [
        { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/, loader: "file-loader"},
        { test: /\.js$/, exclude: /node_modules/, loaders: ["babel"] },
        { test: /\.css$/, exclude: /\.useable\.css$|\.css$/, loader: "style!css" },
        { test: /\.useable\.css$|\.css$/, loader: 'style/useable!css' },
      ]
  },

  resolve : {
    root : [ sassPath ],
    modulesDirectories : ['node_modules', 'public', 'app' ],
    extensions: [
            '',
            '.js', '.coffee',
            '.html', '.jade',
            '.css', '.styl', '.scss', '.less'
        ]
  },

  plugins : [

    new webpack.DefinePlugin({
          "process.env": {
            BROWSER   : JSON.stringify(true),
            NODE_ENV  : JSON.stringify("production")
          }
    }),

    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
        }
    })

  ]

}