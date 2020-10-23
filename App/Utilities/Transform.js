import * as _ from 'lodash';
import {isEmpty} from 'lodash';
import moment from 'moment';
import {showMessage} from './UiUtilities';
import {getAllInformation} from './Storage';

export const buildApiParams = async (rawData) => {
  const {data: actualDataString} = rawData || {};
  const {url, auth, template} = await getAllInformation();
  if (isEmpty(url) || isEmpty(auth) || isEmpty(template)) {
    showMessage({title: 'Configure info on setting page'});
    return {isError: true};
  }
  const templateItem = template?.data?.items?.[0];
  if (isEmpty(templateItem)) {
    showMessage({title: 'Configure info on setting page'});
    return {isError: true};
  }
  try {
    const scannedData = JSON.parse(actualDataString);
    if (isEmpty(scannedData) || isEmpty(scannedData?.data)) {
      showMessage({title: 'Scanned Data is empty'});
      return {isError: true};
    }
    let isUnknownKey = false;
    _.forOwn(scannedData?.data, (value, key) => {
      if (!_.has(templateItem, key)) {
        isUnknownKey = true;
      } else {
        templateItem[key] = value;
      }
    });
    
    const transformedTemplateItem = {};
    _.forOwn(templateItem, (value, key) => {
      transformedTemplateItem[key] = getTransformedValue(value);
    });
    
    if (isUnknownKey) {
      showMessage({title: 'Unknown key is found'});
      return {isError: true};
    }
    return {isError: false, params: transformedTemplateItem};
  } catch ({message}) {
    showMessage({title: message || 'Error is found'});
    return {isError: true};
  }
};

export const transformReservedWords = (template) => {
  const {data} = template || {};
  const {items, ...rest} = data || {};
  const formattedDataMap = {};
  _.forOwn(rest, (value, key) => {
    formattedDataMap[key] = getTransformedValue(value);
  });
  return formattedDataMap;
};

const getTransformedValue = (value) => {
  if (value === '{{ today }}' || value === '{{today}}') {
    return moment().format('YYYY-MM-DD');
  }
  return value;
};
