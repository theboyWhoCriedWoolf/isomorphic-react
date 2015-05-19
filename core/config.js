
import path from 'path';

/**
 * serverside settings
 * @type {string}
 */
export const wp_host = process.env.HOST || 'localhost';
export const wp_port = parseInt(process.env.PORT) + 1 || 4000;
export const port 	 = process.env.PORT || 8080;
export const env 	 = process.env.NODE_ENV || 'development'; //get the environemnt var or set as development 	


/**
 * root paths
 */
export const rootPath 	= path.normalize(__dirname + '/..');
export const publicPath = path.join( rootPath, 'public' );
export const scriptPath = (env === 'production')? 'bundle.js' : 'build/bundle.js';


