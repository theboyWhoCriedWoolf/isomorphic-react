import React    			from 'react';
import Router   			from 'react-router';
import routes   			from './Routes';
import getDeviceType 		from '../core/uaParser';

/**
 * Routing on the client side
 * Displayes the relevant route based
 * on path
 * @param  {object} routes                 
 * @param  {object} Router.HistoryLocation [
 * @param  {object} Handler 
 * @return {object} compiled view
 */
Router.run( routes, Router.HistoryLocation, (Handler, state) => {
	const handlerName = state.routes[ state.routes.length - 1 ].name;
	
	/* get device type using UA-Parser */
	let deviceType    = getDeviceType();
	
	React.render(
		<Handler 
			path 		= {window.location.pathname} 
			isClient 	= {true} 
			pathName 	= {handlerName} 
			deviceType 	= {deviceType} />
		,document.body );
});


