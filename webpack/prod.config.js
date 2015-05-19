require("babel/register");

var path  				      = require('path'),
	  webpack     		    = require('webpack'),
    config              = require('../core/config');


module.exports =  {
  devtool: "source-map",

  entry   : { 
    'bundle'    : './app/browser.js'
  },

  output : {
    filename          : '[name].js',
    chunkFilename     : '[name].js',
    path              :  config.publicPath
  },

  module : {
    loaders: [
          { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.eot$|\.ttf$|\.wav$|\.mp3$/, loader: "file-loader!url-loader?limit=100000"},
          { test: /\.js$|.jsx$/, exclude: /node_modules/, loaders: ["babel"] },
          { test: /\.css$/, exclude: /\.useable\.css$/, loader: "style!css" },
          { test: /\.useable\.css$/, loader: "style/useable!style-loader!css" },
      ]
  },

  resolve : {
    root                : [ path.join( __dirname, '../app/styles'), config.publicPath ],
    modulesDirectories  : ['node_modules', 'public', 'app' ],
    extensions : [
            '',
            '.js', '.jsx',
            '.html', '.jade',
            '.css', '.styl', '.scss', '.less'
        ]
  },

  plugins : [
    new webpack.IgnorePlugin(/fonts\/.+\.(ttf|eot|svg|woff|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/),

    new webpack.DefinePlugin({
          "process.env": {
            BROWSER   : JSON.stringify(true),
            NODE_ENV  : JSON.stringify("development")
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