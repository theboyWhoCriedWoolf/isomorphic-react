
import path 				from 'path';
import webpack 				from 'webpack';
import WebpackDevServer		from 'webpack-dev-server';
import serverSettings 		from './server.options';
import config 				from './dev.config';
import debug 				from 'debug';

import { 
	port as WP_PORT, 
	host as WP_HOST 
} from './config.js'


// set the public path
serverSettings.publicPath  = '/assets/';
// // serverSettings.contentBase = config.output.path;

const compiler 			= webpack(config);
const webpackDevServer 	= new WebpackDevServer(compiler,serverSettings);

webpackDevServer.listen( WP_PORT, WP_HOST, (err, result) => {
	console.log("Webpack development server listening on %s:%s", WP_HOST, WP_PORT);
});
