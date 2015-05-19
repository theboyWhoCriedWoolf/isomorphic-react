
import express 			from 'express';
import cors 			from 'cors';
import ejs 				from 'ejs';
import pkg 				from '../package.json';
import path 			from 'path';
import proxy 			from 'proxy-middleware';
import url 				from 'url';
import compress 		from 'compression';
import render 			from './render';


export default (app, config) => {

 	/* define all the required variables from config */
	const { 
		env,
		port,
		wp_host,
		wp_port,
		publicPath
	} = config;

	app.set('showStackError', true);

	// use cors
	app.use(cors());

	// compression
	app.use( compress({
		filter: function (req, res) {
			return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
		},
		level: 9
	}));

	/**
	 * get the favicon
	 */
	//app.use(express.favicon(__dirname + '../public/favicon.ico'));

	// Set ejs as the templating engine
	app.set('view engine', 'ejs');

	/* set the port information */
	app.set("env", env);
	app.set('port', port);

	// expose package.json to views
	app.use(function (req, res, next) {
		res.locals.pkg = pkg;
		next();
	});

	/*
	 * use the public path for production
	 */
	if( config.env === 'production' ) {
		app.use( express.static( publicPath ) );
	} 

	/**
	 * use a proxy path for development with
	 * webpack dev server
	 */
	if( config.env === 'development' ) {
		app.use('/build', proxy(url.parse(`http://${wp_host}:${wp_port}/build`)));
		/* start the webpack server */
		require('../webpack/webpack.server');
	}

	/**
	 * pass in view renderer
	 */
	app.use(render);

	// Generic server errors (e.g. not caught by components)
	app.use((err, req, res, next) => {
		console.log("Error on request %s %s", req.method, req.url);
		console.log(err);
		console.log(err.stack);

		res.status(500).render('serverError', {
			title : 'Something went wrong',
			criticalCss   : '',
			routeCritical : ''
		});
	});

}

