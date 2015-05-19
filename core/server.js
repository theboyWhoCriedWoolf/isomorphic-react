
import express  		from 'express';
import http  			from 'http';
import expressServer   	from './expressServer';
import * as config 		from './config';


// log out the environment variable to the terminal
console.log('ENVIRONMENT = ' + config.env);

/* init express server and start http server */
const app 		= express(),
	  server 	= http.createServer(app);

/**
 * initial express setup
 */
expressServer( app, config );

/**
 * start the server
 */
server.listen( app.get('port'), function() {
	console.log(`Express ${app.get("env")} server listening on ${app.get("port")}`);
});

/**
 * server closed
 */
server.on('close', function(socket) {
	console.log('server.js: Server has closed');
});

