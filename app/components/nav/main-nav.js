
import 	React 			    	from 'react';
import {RouteHandler, Link}   	from 'react-router';

export default class Nav extends React.Component {

	render() {
		return (
			<header>
				<ul>
		           <li><Link to="home">Home</Link></li>
		           <li><Link to="about">About</Link></li>
		           <li><Link to="contact">Contact</Link></li>
		        </ul>
			</header>
		)
	}
}