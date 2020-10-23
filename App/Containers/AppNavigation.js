import {HomeScreen} from './index';
import React, {Component} from 'react';
import {Colors} from '../Theme/Colors';
import SettingScreen from './SettingScreen';
import {StatusBar, View} from 'react-native';
import {printLogs1} from '../Config/ReactotronConfig';
import {navigationRef} from '../Services/NavigatorServices';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

class AppNavigation extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor={Colors.primary} />
        <NavigationContainer
          ref={navigationRef}
          onStateChange={(state) => {
            const {index, routes = []} = state || {};
            printLogs1(routes[index]);
          }}>
          <Stack.Navigator headerMode="none">
            <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
            <Stack.Screen name={'SettingScreen'} component={SettingScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

export default AppNavigation;
