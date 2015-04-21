
import 	React 			from 'react';
import {RouteHandler}  	from 'react-router';


export default class Home extends React.Component {

  render() {
  	const { isClient, path, cssPath } = this.props;
    return (
      <h1>Hello, world. </h1>
    );
  }
}

