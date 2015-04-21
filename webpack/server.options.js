
import path from 'path';

import { 
	port as WP_PORT, 
	host as WP_HOST 
} from './config.js';

export default {
	quiet 				: false,
	noInfo 				: false,
	debug 				: true,
  	hot 				: true,
  	historyApiFallback	: true,
  	stats 				: {colors: true},
  	headers 			: {"Access-Control-Allow-Origin": "*"},
  	contentBase 		: path.join( path.resolve( './' ), '/public' ) //'http://${WP_HOST}:${WP_PORT}' //path.join( path.resolve( './' ), '/public' )
};