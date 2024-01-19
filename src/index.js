import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import App from './modules/App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
