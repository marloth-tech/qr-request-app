import {AsyncStorage} from 'react-native';
import {printLogs} from '../Config/ReactotronConfig';

export const getAsyncStorageItem = async (key = '') => {
  if (!key) {
    return null;
  }
  return AsyncStorage.getItem(key);
};

export const setStorageItem = (key, value) => {
  try {
    return AsyncStorage.setItem(key, value);
  } catch (e) {}
};

const parseJson = (data) => {
  try {
    return JSON.parse(data || '{}');
  } catch (e) {
    return {};
  }
};

export const stringifyJson = (data) => {
  try {
    return JSON.stringify(data || {});
  } catch (e) {
    return '{}';
  }
};

export const getAllInformation = async () => {
  const url = await getAsyncStorageItem(STORAGE_KEYS.URL);
  const auth = await getAsyncStorageItem(STORAGE_KEYS.AUTH);
  const template = await getAsyncStorageItem(STORAGE_KEYS.TEMPLATE);
  return {
    url,
    auth,
    template: parseJson(template),
  };
};

export const setAllInformation = async (props) => {
  const {url, auth, template} = props || {};
  await setStorageItem(STORAGE_KEYS.URL, url || '');
  await setStorageItem(STORAGE_KEYS.AUTH, auth || '');
  await setStorageItem(STORAGE_KEYS.TEMPLATE, template || '{}');
};

export const STORAGE_KEYS = {
  URL: 'URL',
  AUTH: 'AUTH',
  TEMPLATE: 'TEMPLATE',
};
