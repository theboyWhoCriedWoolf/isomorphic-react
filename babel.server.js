// if( ! (require("piping")({ hook:true, ignore:/(node_modules|components|pages|webpack|styles|app[\\\/]browser)\/[^\/]+\.js$/ }) ) ) {
// 	return false;
// }

require("babel/register");

/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;

require("./app/server");
