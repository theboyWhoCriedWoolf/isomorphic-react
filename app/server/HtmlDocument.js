
import React 				from 'react';
import DocumentTitle 		from 'react-document-title';
import {RouteHandler} 		from 'react-router';
import {PureRenderMixin} 	from 'react/addons';

class HtmlDocument extends React.Component {
		
	mixins : [ PureRenderMixin ]

	 render() {
	 	const { state, src, criticalCss, lang, markup, isClient, routeCritical } = this.props;
	 	return (
	      	<html lang={lang}>
	      		<head>
	      			<meta charSet="utf-8" />
	      			<title>{ DocumentTitle.rewind() }</title>
	      			<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
	      			<meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
	      			<meta httpEquiv="Cache-Control" content="no-cache" />
	      			
	      			<style  dangerouslySetInnerHTML={{__html: criticalCss}} /> 

	      		</head>
	      		<body> 
	      			 <div id="root" dangerouslySetInnerHTML={{__html: markup}} />
	      		</body>
	      		
	      	</html>
	    );


	 }
} // end HtmlDocument
  

HtmlDocument.defaultProps = { 
	src 	: 'assets/bundle.js',
	lang    : 'en',
	name    : "Kitty Cat Jonson"
};




export default HtmlDocument;
