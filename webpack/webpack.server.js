
import path 				from 'path';
import webpack 				from 'webpack';
import WebpackDevServer		from 'webpack-dev-server';
import devConfig 			from './dev.config';

import * as config 			from '../core/config.js'

/**
 * define the ports
 */
const {
	wp_port,
	wp_host
} = config;

/**
 * set the webpack server options
 * @type {Object}
 */
const serverSettings = {
	quiet 				: true,
	noInfo 				: false,
	debug 				: true,
  	hot 				: true,
  	historyApiFallback	: true,
  	stats 				: {colors: true},
  	headers 			: {"Access-Control-Allow-Origin": "*"},
  	publicPath  		: `http://${wp_host}:${wp_port}/build/`
}

/**
 * create new webpack server instance
 * @type {WebpackDevServer}
 */
const webpackDevServer = new WebpackDevServer(webpack( devConfig(config) ),serverSettings);

webpackDevServer.listen( wp_port, wp_host, (err, result) => {
	console.log("Webpack development server listening on %s:%s", wp_host, wp_port);
});
