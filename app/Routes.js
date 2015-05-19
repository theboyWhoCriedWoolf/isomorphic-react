import React 	from 'react';

import App 		from './components/App';
import NotFound from './components/error/404';
import Home 	from './components/pages/Home';

import {
	Route,
	DefaultRoute,
	NotFoundRoute,
	Redirect
} from 'react-router';

/**
 * specify all the routes
 * loaded in based on their path
 * App handling all the routing 
 * @type {Object}
 */
export default (
	<Route handler={App} path='/' >
		<DefaultRoute name="home" handler={Home} />
		<NotFoundRoute handler={NotFound}/>
	</Route>
)

