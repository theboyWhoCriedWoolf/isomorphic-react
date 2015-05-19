
import React 			         from "react";
import Router   		       from 'react-router';
import routes  			       from '../app/Routes';
import fs 				         from 'fs';
import path 			         from 'path';
import getDeviceType       from './uaParser';

import { // get config data
   env,
   publicPath, 
   scriptPath 
 }  from './config';


/**
 * Server Side Rendering
 * express render method for React components,
 * renders React components on the server
 * using renderToStaticMarkup passes in compiled React views into
 * the main index.ejs
 * @param  {object}  req  
 * @param  {object}   res  
 * @param  {Function} next
 */
function render(req, res, next) 
{
    // detect the type of device being used
    // can be used here to alter paths for the router and also
    // redirect css loading to device specific styles
    let deviceType = getDeviceType( req );

  	Router.run(routes, req.path, (Handler, state) => {

      const handlerName      = state.routes[ state.routes.length - 1 ].name;
      const markup 	 		     = React.renderToStaticMarkup(
            // render the handler to string
            <Handler path={req.path} isClient={false} pathName={handlerName} deviceType={deviceType} />

          ),
		 		  
          /* load the inline css (change this for personalised css locations) */
          criticalCss 	   = getCss('critical'),
		 		  routeCritical 	 = getCss(handlerName, 'modules/' );
          
          // index page 
          res.render('index', {
            title         : res.locals.pkg.name,
            criticalCss   : criticalCss,
            routeCritical : routeCritical,
            markup        : markup,
            scriptPath    : scriptPath
          }); 
  	});
}

/**
 * load css file from location
 * to embed 
 * @param  {string} routeName - location of the file based on the route
 * @param  {string} pathExt   - path to append to the route if one exists
 * @return {}           [description]
 */
function getCss( routeName, pathExt ) {
  pathExt  = pathExt || '';
  let path = (publicPath+'/css/'+pathExt+routeName)+'.css';
  
  /* if the file exists, return it */
  if( fs.existsSync(path) ) {
      return fs.readFileSync(path);
  }
  return '';
}


export default render;

