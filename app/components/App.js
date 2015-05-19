import 'isomorphic-fetch';

import React 			      from 'react';
import {RouteHandler}   from 'react-router';
import path             from 'path';
import Nav              from './nav/main-nav';

/**
 * Main React View Wraper
 * Wraps the main route components
 */
class App extends React.Component {

   /*
    * Load in the main css file after the page has already
    * been sent by the server
    * Remove critical CSS
    */
    componentDidMount() {
        
        /* load in complete css and remove old - removal not required */
        if( process.env.BROWSER ) {
          console.log('LOADING THE CSS');
          require("css/main.css");
          let el =  document.getElementById('critical-css');
          el.parentNode.removeChild(el);
        }
    }

    /**
     * Render the main route
     * and return the main view wrapper
     * @return {object} compiled React components
     */
    render() {
      const { path, isClient, pathName, deviceType } = this.props;
      const classes = 'container '+ pathName;

      return (
        <div className={classes} >
            <RouteHandler path={path} isClient={isClient} deviceType={deviceType} />
        </div>
      )
    }
}

export default App;
