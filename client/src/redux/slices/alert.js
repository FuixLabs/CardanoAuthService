import { createSlice } from '@reduxjs/toolkit';
import { ALERT_CONSTANTS } from '../constants/alert';

const AUTO_ALERT_HIDDEN_TIME = 3000;

const initialState = {
  msg: '',
  err: false,
  loading: false,
  visible: false,
  hideTime: AUTO_ALERT_HIDDEN_TIME,
  severity: '',
};

const notiSlice = createSlice({
  name: 'noti',
  initialState,
  reducers: {
    connectWalletSuccess(state) {
      state.visible = true;
      state.msg = ALERT_CONSTANTS.SUCCESS.walletConnection;
      state.severity = ALERT_CONSTANTS.SUCCESS.severity;
    },
    connectWalletError(state) {
      state.visible = true;
      state.msg = ALERT_CONSTANTS.ERROR.walletConnection;
      state.severity = ALERT_CONSTANTS.ERROR.severity;
    },
    getNetworkIdError(state) {
      state.visible = true;
      state.msg = ALERT_CONSTANTS.ERROR.getNetworkIdError;
    },
    getSelectedWalletAddressError(state) {
      state.visible = true;
      state.msg = ALERT_CONSTANTS.ERROR.getSelectedWalletAddress;
      state.severity = ALERT_CONSTANTS.ERROR.severity;
    },
    getRandomNumberError(state) {
      state.visible = true;
      state.msg = ALERT_CONSTANTS.ERROR.getRandomNumber;
      state.severity = ALERT_CONSTANTS.ERROR.severity;
    },
    connectServerError(state) {
      state.visible = true;
      state.msg = ALERT_CONSTANTS.ERROR.connectServer;
      state.severity = ALERT_CONSTANTS.ERROR.severity;
    },
    getDappInfo(state) {
      state.visible = true;
      state.msg = ALERT_CONSTANTS.ERROR.getDappInfor;
      state.severity = ALERT_CONSTANTS.ERROR.severity;
    },
    getNftInfor(state) {
      state.visible = true;
      state.msg = ALERT_CONSTANTS.ERROR.getInformationWallet;
      state.severity = ALERT_CONSTANTS.ERROR.severity;
    },
    requestLoginError(state) {
      state.visible = true;
      state.msg = ALERT_CONSTANTS.ERROR.requestLogin;
      state.severity = ALERT_CONSTANTS.ERROR.severity;
    },
    hideNotification(state) {
      state.visible = false;
      state.msg = '';
    },
    getWalletInfo(state) {
      state.visible = true;
      state.msg = ALERT_CONSTANTS.ERROR.getWalletInfo;
      state.severity = ALERT_CONSTANTS.ERROR.severity;
    },
    getWalletId(state) {
      state.visible = true;
      state.msg = ALERT_CONSTANTS.ERROR.getNetworkI;
      state.severity = ALERT_CONSTANTS.ERROR.severity;
    },
    loginSuccessfull(state) {
      state.visible = true;
      state.msg = ALERT_CONSTANTS.SUCCESS.login;
      state.severity = ALERT_CONSTANTS.SUCCESS.severity;
    }
  },
});

export const alertActions = notiSlice.actions;
export default notiSlice.reducer;
