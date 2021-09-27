import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
require('dotenv').config();

// console.log(process.env.REACT_APP_MAP_TOKEN);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
