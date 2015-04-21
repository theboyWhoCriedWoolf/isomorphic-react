import path from 'path';

/**
 * serverside settings
 * @type {string}
 */
export const host = process.env.HOST || 'localhost';
export const port = parseInt(process.env.PORT) + 1 || 4000;

/**
 * general paths 
 */
export const sassPath 		= path.join( __dirname, '../app/styles');
export const contentBase 	= path.join( __dirname, '../public');