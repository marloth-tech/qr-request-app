import Snackbar from 'react-native-snackbar';
import {printLogs} from '../Config/ReactotronConfig';

export const showMessage = (props = {}) => {
  const {title, message, buttonTitle, buttonColor = 'red'} = props || {};
  Snackbar.show({
    text: title || message,
    duration: Snackbar.LENGTH_LONG,
    action: {
      text: buttonTitle || 'Ok',
      textColor: buttonColor || 'red',
    },
  });
};
