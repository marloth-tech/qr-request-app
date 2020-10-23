/**
 * @format
 */
import App from './App/Containers/AppNavigation';
import {AppRegistry, TouchableOpacity} from 'react-native';
import {name as appName} from './app.json';

console.ignoredYellowBox = [
  'Warning: BackAndroid is deprecated. Please use BackHandler instead.',
  'source.uri should not be an empty string',
  'Invalid props.style key',
];

TouchableOpacity.defaultProps = {
  ...(TouchableOpacity.defaultProps || {}),
  delayPressIn: 0,
};
AppRegistry.registerComponent(appName, () => App);
