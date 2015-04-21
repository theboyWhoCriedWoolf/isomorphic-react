import 'isomorphic-fetch';

import React 			      from 'react';
import {RouteHandler}   from 'react-router';
import path             from 'path';
import Nav              from './nav/main-nav';


class App extends React.Component {

    componentDidMount() {
        if( this.props.isClient ) {
            let cssBundle = require('css/main.css');
            cssBundle.use();
        }
    }

    render() {
      const { path, isClient, pathName, deviceType } = this.props
      return (
        <div className='container' data-view={pathName} >
          <Nav/>
          <div className="">
              <RouteHandler path={path} isClient={isClient} deviceType={deviceType} />
          </div>
        </div>
      )

    }
}

export default App;
