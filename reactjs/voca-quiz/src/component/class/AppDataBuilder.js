import * as Constant from '../constant';
import AppData from './AppData';

export default class AppDataBuilder {
  appData;

  constructor(){
    let jsonData = window.localStorage.getItem(Constant.AppName);
    let appData = new AppData(Constant.AppName);
    if(jsonData !== null){
      appData = JSON.parse(jsonData);
    }
    this.appData = appData;
  }
}
