import base64 from 'react-native-base64';
import {showMessage} from '../Utilities/UiUtilities';
import {transformReservedWords} from '../Utilities/Transform';

export const addItem = async ({url, auth, params, template}) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Basic ${base64.encode(auth)}`);
  
  const body = JSON.stringify({
    data: {
      ...transformReservedWords(template),
      items: [params],
    },
  });
  
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: body,
    redirect: 'follow',
  };
  
  try {
    const apiResponse = await fetch(url, requestOptions);
    const formattedResponse = await apiResponse.json();
    showMessage({title: 'Item Added Successfully', buttonColor: 'green'});
    return {isError: false, resData: formattedResponse};
  } catch (e) {
    showMessage({title: 'Error is found'});
    return {isError: true};
  }
};
