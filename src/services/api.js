import axios from 'axios';

const defaultConfig = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const post = async (url, data, config) => {
  return axios.post(url, data, config || defaultConfig);
};
const put = async (url, data, config) => {
  return axios.put(url, data, config || defaultConfig);
};
const get = async (url, config) => {
  return axios.get(url, config || defaultConfig);
};

export const api = {post, get, put};
