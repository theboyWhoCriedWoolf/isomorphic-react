import React 	from 'react';

import App 		from './components/App';
import NotFound from './components/error/NotFound';
import Home 	from './components/pages/Home';
import About 	from './components/pages/About';
import Contact 	from './components/pages/Contact';

import {
	Route,
	DefaultRoute,
	NotFoundRoute,
	Redirect
} from 'react-router';

export default (
	<Route handler={App} path='/'>
		<DefaultRoute name="home" handler={Home} test='boom' />
		<Route name="about" handler={About} />
		<Route name="contact" handler={Contact}/>
		<NotFoundRoute handler={NotFound}/>
	</Route>
)

