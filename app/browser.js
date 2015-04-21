import React    			from 'react';
import Router   			from 'react-router';
import routes   			from './Routes';
import getDeviceType 		from './server/uaParser';


Router.run( routes, Router.HistoryLocation, (Handler, state) => {
	const handlerName = state.routes[ state.routes.length - 1 ].name;
	let deviceType    = getDeviceType();
	
	React.render(<Handler path={window.location.pathname} isClient={true} pathName={handlerName} deviceType={deviceType} />,  document.body );
});


