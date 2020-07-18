import React from 'react';
import AppData from './AppData';

export default function AppDataShow() {
  let appData = new AppData("xx");

  const appDataShow =
  <div>
    <h1>AppData</h1>
    <p>
      {appData.items}
    </p>
  </div>
  ;

  return appDataShow;
}