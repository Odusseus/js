import * as Environement from './environment';
import AppDataBuilder from './class/AppDataBuilder';

export default class Common {
  static GetHost(){
    let appDataBuilder = new AppDataBuilder();
    if(appDataBuilder.appData.debug){
      return Environement.HostDebug;
    }
    return Environement.Host;

  }
}