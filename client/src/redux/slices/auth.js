import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  requestRandomNumber,
  requestLogin,
  requestdAppInfor,
} from '../../rest/client.rest';
import jwt_decode from 'jwt-decode';
import { alertActions } from './alert';
import { CLIENT_PATH } from '../../rest/client.path';
import { AUTH_ASYNC_THUNK_ACTIONS } from '../constants/thunk';
import { ERROR_MESSAGES } from '../constants/errMsg';

/**
 * Thunk function is used to get random number from server
 * @function
 * @return {ThunkFunction}
 */
export const getRandomNumber = createAsyncThunk(
  AUTH_ASYNC_THUNK_ACTIONS.GET_RANDOM_NUMBER,
  async (data, { rejectWithValue, dispatch }) => {
    try {
      let resData = await requestRandomNumber(
        CLIENT_PATH.GET_RANDOM_NUMBER_PATH
      );
      if (!resData) {
        dispatch(alertActions.getRandomNumberError());
        return rejectWithValue(ERROR_MESSAGES.GET_RANDOM_NUMBER_ERROR);
      }
      const accessToken = resData?.data?.data?.access_token;
      const decodedData = jwt_decode(accessToken);
      const { randomNumber, timestamp } = decodedData?.data;
      return { accessToken, randomNumber, timestamp };
    } catch (err) {
      dispatch(alertActions.getRandomNumberError());
      rejectWithValue(err);
    }
  }
);

/**
 * Thunk function is used to request access token from server
 * @function
 * @param {String} randomNumber - The random number got from server
 * @param {String} timestamp - The timestamp got from server
 * @param {String} signedData - The signed data from current wallet
 * @param {String} selectedAddress - The address of current wallet
 * @param {String} returnUrl - Url what will return if getting access token from server successfully
 * @return {ThunkFunction}
 */
export const getLoginRequest = createAsyncThunk(
  AUTH_ASYNC_THUNK_ACTIONS.LOGIN_REQUEST,
  async (data, { rejectWithValue, dispatch }) => {
    const { randomNumber, timestamp, signedData, selectedAddress, returnUrl } =
      data;
    try {
      const reqData = await requestLogin(CLIENT_PATH.REQUEST_LOGIN, {
        randomNumber,
        timestamp,
        signedData,
        address: selectedAddress,
      });
      if (reqData) {
        const _accessToken = reqData?.data?.data?.access_token;
        dispatch(alertActions.loginSuccessfull())
        dispatch(authActions.setAccessToken(_accessToken));
        setTimeout(() => {
          window.location.replace(`${returnUrl}?access_token=${_accessToken}`);
        }, 5000);
        return reqData;
      }
      dispatch(alertActions.requestLoginError());
      return rejectWithValue('Error');
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

/**
 * Thunk function is used to get the information of Dapp from server
 * @function
 * @param {String} appKey - example: dapp
 * @return {ThunkFunction}
 */
export const getDappInfo = createAsyncThunk(
  AUTH_ASYNC_THUNK_ACTIONS.DAPP_INFORMATION_REQUEST,
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const appKey = data;
      const appInfo = await requestdAppInfor(CLIENT_PATH.GET_DAPP_INFO, appKey);
      if (appInfo) return appInfo.data;
      dispatch(alertActions.getDappInfo());
      return rejectWithValue('Error');
    } catch (err) {
      dispatch(alertActions.getDappInfo());
      return rejectWithValue(err);
    }
  }
);

function initialState() {
  return {
    loading: false,
    err: false,
    accessToken: null,
    randomNumber: null,
    timestamp: null,
    dappName: null,
    returnUrl: null,
    url: null,
    logo: null,
    redirect: false
  };
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    }
  },
  extraReducers: {
    //Thunk function for getting random number from server
    [getRandomNumber.pending]: (state) => {
      state.loading = true;
    },
    [getRandomNumber.rejected]: (state) => {
      state.err = true;
      state.loading = false;
    },
    [getRandomNumber.fulfilled]: (state, action) => {
      state.loading = false;
      state.accessToken = action.payload.accessToken;
      state.randomNumber = action.payload.randomNumber;
      state.timestamp = action.payload.timestamp;
    },

    //Thunk function for requesting access token from server
    [getLoginRequest.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },

    [getLoginRequest.fulfilled]: (state) => {
      state.loading = false;
      state.redirect = true;
    },

    //Thunk function for getting information of Dapp from server
    [getDappInfo.pending]: (state) => {
      state.loading = true;
    },
    [getDappInfo.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [getDappInfo.fulfilled]: (state, action) => {
      const appData = action.payload.data;
      state.loading = false;
      state.dappName = appData.name;
      state.returnUrl = appData.return_url;
      state.url = appData.url;
      state.logo = appData.logo;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
