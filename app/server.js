// Require our dependencies
import React 			from 'react';
import express 			from 'express';
import cors 			from 'cors';
import Router   		from 'react-router';
import compression 		from 'compression';
import routes  			from './Routes';
import path 			from 'path';
import proxy 			from 'proxy-middleware';
import url 				from 'url';
import render 			from './server/render';
import ejs 				from 'ejs';

// import webpack config props
import { 
	port as WP_PORT, 
	host as WP_HOST 
} 	from '../webpack/config.js'

// setup express 
const app 			= express(),
	  port  		= process.env.PORT || 8080,
	  __rootPath  	= path.join( path.resolve( './' ), '/public' );//process.env.PORT || 8080;


// Set ejs as the templating engine
app.set('view engine', 'ejs');


app.set('port', port);
// use cors + compression
app.use(cors());
app.use(compression());

app.get('/favicon.ico', (req, res) => { res.send('') });

if( app.get("env") === 'production' ) {
	// Set /public as our static content dir
	app.use("/", express.static( __rootPath ) );
}

if( app.get("env") === 'development' ) {
	require('../webpack/server');
	app.use('/assets', proxy(url.parse(`http://${WP_HOST}:${WP_PORT}/assets`)));
}

/**
 * pass to the react renderer
 */
app.use(render);


// Generic server errors (e.g. not caught by components)
app.use((err, req, res, next) => {
  console.log("Error on request %s %s", req.method, req.url);
  console.log(err);
  console.log(err.stack);
  res.status(500).send("Something bad happened");
});

app.listen(port, () => {
  console.log(`Express ${app.get("env")} server listening on ${app.get("port")}`);
});






