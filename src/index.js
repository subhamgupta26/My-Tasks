import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/home';
import Login from './components/login';
import registerServiceWorker from './registerServiceWorker';
import 'font-awesome/css/font-awesome.min.css';

// ReactDOM.render(<Home url='http://localhost:3001/' /> , document.getElementById('root'));

ReactDOM.render(<Login  /> , document.getElementById('root'));
registerServiceWorker();
