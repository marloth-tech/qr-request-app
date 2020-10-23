import {NativeModules} from 'react-native';
import {AsyncStorage} from 'react-native';
import Reactotron from 'reactotron-react-native';

const scriptURL = NativeModules.SourceCode.scriptURL;
const host = scriptURL.split('://')[1].split(':')[0];

let TronConnector = null;
TronConnector = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({name: 'aimp', host}) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect();

Reactotron.clear();
if (__DEV__) {
  console.tron = Reactotron;
}

export default TronConnector;

export const printLogs = (log) => {
  if (__DEV__) {
    console.tron.warn(log);
  }
};

export const printLogs1 = (log) => {
  if (__DEV__) {
    console.tron.log(log);
  }
};
