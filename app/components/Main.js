import React 			      from 'react';
import {RouteHandler}   from 'react-router';
import path             from 'path';
import Nav              from './nav/main-nav';


var mui = require('material-ui'),
RaisedButton = mui.RaisedButton;


const { AppCanvas, AppBar, IconButton } = mui;

/**
 * Main React View Wraper
 * Wraps the main route components
 */
class Main extends React.Component {

   /*
    * Load in the main css file after the page has already
    * been sent by the server
    * Remove critical CSS
    */
    componentDidMount() {
       
        
        if( process.env.BROWSER  )
        {
           console.log('LOADED IN LLL ');
           
            
            // var ThemeManager = new mui.Styles.ThemeManager();
            console.log(  mui )

        }
    } 

     getStyles() {
        var darkWhite = 'eeeeee';
        return {
          footer: {
            backgroundColor: 'eeeeee',
            textAlign: 'center'
          },
          a: {
            color: darkWhite
          },
          p: {
            margin: '0 auto',
            padding: '0',
            color: 'FFFFFF',
            maxWidth: '335px'
          },
          iconButton: {
            color: darkWhite
          }
        };
    }


    /**
     * Render the main route
     * and return the main view wrapper
     * @return {object} compiled React components
     */
    render() {
      const { path, isClient, pathName, deviceType } = this.props;
         var styles = this.getStyles();
         var githubButton = (
            <IconButton
              iconStyle={styles.iconButton}
              iconClassName="muidocs-icon-custom-github"
              href="https://github.com/callemall/material-ui"
              linkButton={true} />
          );


      return (
        <AppCanvas predefinedLayout={1}>

                  <AppBar
                      onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap}
                      title='title'
                      zDepth={0}
                      iconElementRight={githubButton}/>

         </AppCanvas>
      )
    }
}

export default Main;
