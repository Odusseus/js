/*jshint esversion: 6 */
// https://www.robinwieruch.de/react-function-component#react-arrow-function-component

import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [data, setData] = useState(
    'Allo Pascal'
  );
  return (
  <div className="App">
    <MyDiv value={data}></MyDiv>  
  </div>
  );
}

const MyDiv = ({value}) => {
  return <div>{value}</div>;
};

export default App;
