import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import ShowEvents from './ShowEventsFC';
//import ShowEvents from './ShowEvents';
//import ShowEventsTest from './ShowEventsTest';
//import AddTest from './AddTest';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <ShowEvents />,
  document.getElementById('root'));
    
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
