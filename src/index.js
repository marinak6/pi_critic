// entry point of the application
// initialize app 
// use ReactDOM.render to render RouteC which calls upon another component 
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RouteC from './RouteC';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<RouteC />, document.getElementById('root'));
registerServiceWorker();
