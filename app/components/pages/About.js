import 	React 			from 'react';
import {RouteHandler} 	from 'react-router';
import path 			from 'path';


export default class about extends React.Component {
  render() {
  	const { deviceType } = this.props;
  	console.log('this props ')
    return (
      <h1>Hello, world. About {deviceType}</h1>
    );
  }
}