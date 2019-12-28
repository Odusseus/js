import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import ShowEvents from './ShowEvents';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <ShowEvents />,
  document.getElementById('root'));
// https://webpack.js.org/guides/hot-module-replacement/
if(module.hot){
  module.hot.accept('./ShowEvents.js', function() {
         console.log('Accepting the updated printMe module!');
        })
      } else {
        console.log('Not HCR');
      }
      
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
