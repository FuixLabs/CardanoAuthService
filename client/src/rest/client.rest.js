import axiosClient from './client.base';
const BASE_URL = '';

/**
 * function to get random number from server
 * @function
 * @param {String} path
 * @return {Promise}
 */

export const requestRandomNumber = async (path) => {
  return await axiosClient.get(`${BASE_URL}${path}`);
};

/**
 * function to login and get access token from server.Note that these post requests do not require
 * the user to be authenticated.
 * @function
 * @param {String} path
 * @param {Object} data
 * @return {Promise}
 */

export const requestLogin = async (path, data) => {
  return await axiosClient.post(`${BASE_URL}${path}`, JSON.stringify(data));
};

/**
 * function get request and get the information of dapp from server.Note that these post requests do not require
 * the user to be authenticated.
 * @param {String} path
 * @param {String} appKey
 * @return {Promise}
 */

export const requestdAppInfor = async (path, appKey) => {
  return await axiosClient.get(`${BASE_URL}${path}?app-key=${appKey}`);
};
