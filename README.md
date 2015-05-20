# Isomorphic React Template

A barebones template to help you quickly start developing a server side application using React.

React components enable you to create views which can run on both the client and server, making it easier to create server side applications using shared view components.

This template contains everything you need to start development, with a few extras such as critical css loading, should you choose to use it.

It uses the following dependancies: 
- [express](http://expressjs.com/) server
- [React](http://facebook.github.io/react/) components
- [React Router](https://github.com/rackt/react-router) to handle server and client side routing
- [webpack](http://webpack.github.io/) compiles client side code
- [react-hot-loader](http://gaearon.github.io/react-hot-loader/) to provide live component editing.
- [ejs](http://www.embeddedjs.com/) provides the main index template

##Installation
``` git clone https://github.com/theboyWhoCriedWoolf/isomorphic-react.git ```

##Instructions
Once downloaded, make sure you install all of the dependancies by running ```npm install```.

To start development run: ```npm run watch``` which will build the application and start the server at ```localhost:8080```

To compile for production run: ```npm run build```.

# Components
The template is pretty self explanatory, there are however a few key components that affect the application compilation and general functionality.

Below is a list of the key files and what they are responsible for.

###./core

- ```config.js``` contans all the server configuration
- ```expressServer.js``` handles all the express package, middleware and rendering setup
- ```render.js``` handles all the serverside routing and compilation

###./app
- ```browser.js``` handles the client side route handling and React compilation
- ```Routes.js``` handles the React route definitions 
