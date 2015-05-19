import React            from 'react';
import {RouteHandler}   from 'react-router';
import path             from 'path';

/**
 * Main React View Wraper
 * Wraps the main route components
 */
class Main extends React.Component {

  mixins: [StylePropable, StyleResizable]

   /*
    * Load in the main css file after the page has already
    * been sent by the server
    * Remove critical CSS
    */
    componentDidMount() {
       
        if( process.env.BROWSER  ) {
           
        }
    } 

    /**
     * Render the main route
     * and return the main view wrapper
     * @return {object} compiled React components
     */
    render() {
      const { path, isClient, pathName, deviceType } = this.props;

      return (
          <div className='welcome-box' >
               <h1>Well Done!</h1>
               <h2>You Have set up your isomorphic environment.</h2> 
          </div>
      )
    }
}

export default Main;
