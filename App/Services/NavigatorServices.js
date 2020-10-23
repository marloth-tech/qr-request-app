import * as React from 'react';
import {CommonActions} from '@react-navigation/native';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function dispatch(params) {
  navigationRef.current?.dispatch(params);
}

export function goBack(params) {
  navigationRef.current?.goBack(params);
}

export const resetAndNavigate = (screenName, index = 0) => {
  NavigationService.dispatch(
    CommonActions.reset({
      index: index,
      routes: [{name: screenName}],
    }),
  );
};

export const NavigationService = {
  goBack: goBack,
  navigate: navigate,
  dispatch: dispatch,
  resetAndNavigate: resetAndNavigate,
};
