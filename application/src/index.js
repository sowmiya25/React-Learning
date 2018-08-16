import React from 'react';
import ReactDOM from 'react-dom';
import './Assets/css/reset.css';
import './Assets/css/index.css';
import './Assets/css/bootstrap.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
