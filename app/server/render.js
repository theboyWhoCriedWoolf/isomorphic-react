
import React 			         from "react";
import Router   		       from 'react-router';
import routes  			       from '../Routes';
import HtmlDocument 	     from "./HtmlDocument";
import fs 				         from 'fs';
import path 			         from 'path';
import RenderToString      from 'react-async';
import { buildPath }       from './../config';
import getDeviceType       from './uaParser';


function render(req, res, next) 
{
    // detect the type of device being used
    // can be used here to alter paths for the router and also
    // redirect css loading to device specific styles
    let deviceType = getDeviceType( req );

  	Router.run(routes, req.path, (Handler, state) => {

       // console.log('device type ::: ', Router );

      const handlerName      = state.routes[ state.routes.length - 1 ].name;
  		const markup 	 		     = React.renderToStaticMarkup(
            // render the handler to string
            <Handler path={req.path} isClient={false} pathName={handlerName} deviceType={deviceType} />

          ),
		 		  criticalCss 	   = getCss('critical'),
		 		  routeCritical 	 = getCss(handlerName, 'modules/' );
         
          // index page 
          res.render('index', {
            title         : '',
            criticalCss   : criticalCss,
            routeCritical : routeCritical,
            markup        : markup
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
  let path = (buildPath+'/css/'+pathExt+routeName)+'.css';
  console.log('fetching critical css ::: ', path );
  if( fs.existsSync(path) ) {
      return fs.readFileSync(path);
  }
  return '';
}


export default render;

