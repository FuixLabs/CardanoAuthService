import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  connectWallet,
  getNetworkId,
  getUsedAddresses,
  signLoginData,
} from '../../utils/nami';
import { alertActions } from './alert';
import { getLoginRequest } from './auth';
import { WALLET_ASYNC_THUNK_ACTIONS } from '../constants/thunk';

/**
 * Thunk function is used to handle the connection with nami wallet
 * @function
 * @return {ThunkFunction}
 */
export const connectNamiWallet = createAsyncThunk(
  WALLET_ASYNC_THUNK_ACTIONS.CONNECT_WALLET,
  async (data, { rejectWithValue, dispatch }) => {
    const { currNamiWallet } = data;
    try {
      const namiWallet = await connectWallet(currNamiWallet);
      if (!namiWallet) {
        dispatch(alertActions.connectWalletError());
        return rejectWithValue();
      }
      dispatch(alertActions.connectWalletSuccess());
      return namiWallet;
    } catch (e) {
      dispatch(alertActions.connectWalletError());
      return rejectWithValue(e);
    }
  }
);

/**
 * Thunk function is used to get the Network ID of current Nami's wallet
 * @function
 * @return {ThunkFunction}
 */
export const getNamiNetworkId = createAsyncThunk(
  WALLET_ASYNC_THUNK_ACTIONS.GET_NETWORK_ID,
  async (data, { rejectWithValue, dispatch }) => {
    const { currNamiWallet } = data;
    try {
      const networkId = await getNetworkId(currNamiWallet);
      if (!networkId) {
        dispatch(alertActions.getWalletId());
        return rejectWithValue('error');
      }
      return networkId;
    } catch (e) {
      dispatch(alertActions.getWalletId());
      return rejectWithValue(e);
    }
  }
);

/**
 * Thunk function is used to get the information (signed data) of current wallet
 * @function
 * @return {ThunkFunction}
 */
export const requestLogin = createAsyncThunk(
  WALLET_ASYNC_THUNK_ACTIONS.REQUEST_LOGIN,
  async (data, { rejectWithValue, dispatch }) => {
    const {
      randomNumber,
      timestamp,
      currNamiWallet,
      selectedAddress,
      returnUrl,
    } = data;
    try {
      const signedData = await signLoginData(
        currNamiWallet,
        selectedAddress,
        randomNumber,
        timestamp
      );
      if (!signedData) {
        dispatch(alertActions.getWalletInfo());
        return rejectWithValue('Error');
      }
      dispatch(
        getLoginRequest({
          randomNumber,
          timestamp,
          signedData,
          selectedAddress,
          returnUrl,
        })
      );
      return signedData;
    } catch (e) {
      dispatch(alertActions.getWalletInfo());
      return rejectWithValue(e);
    }
  }
);

/**
 * Thunk function is used to get the address of current wallet
 * @function
 * @return {ThunkFunction}
 */
export const getSelectedWalletAddress = createAsyncThunk(
  WALLET_ASYNC_THUNK_ACTIONS.GET_SELECTED_WALLET_ADDRESS,
  async (data, { rejectWithValue, dispatch }) => {
    const { currNamiWallet } = data;
    try {
      const selectedAddress = await getUsedAddresses(currNamiWallet);
      if (!selectedAddress) {
        dispatch(alertActions.getSelectedWalletAddressError());
        return rejectWithValue('Error');
      }
      return selectedAddress;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const initialState = {
  namiWallet: null,
  netWork: null,
  walletBalance: null,
  nftInfor: null,
  selectedAddress: '',
  err: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {},
  extraReducers: {
    //Thunk function for connecting to nami-wallet
    [connectNamiWallet.pending]: (state) => {
      state.loading = true;
    },
    [connectNamiWallet.rejected]: (state) => {
      state.loading = false;
      state.err = true;
    },
    [connectNamiWallet.fulfilled]: (state, action) => {
      state.loading = false;
      state.namiWallet = action.payload;
    },

    //Thunk function for getting network id of nami-wallet
    [getNamiNetworkId.fulfilled]: (state, action) => {
      state.netWork = action.payload;
    },

    //Thunk function for getting selected address of using wallet
    [getSelectedWalletAddress.fulfilled]: (state, action) => {
      state.selectedAddress = action.payload;
    },

    //Thunk function for get information of selected wallet
    [requestLogin.rejected]: (state) => {
      state.namiWallet = null;
      state.netWork = null;
      state.walletBalance = null;
      state.nftInfor = null;
      state.selectedAddress = '';
      state.err = false;
      state.loading = false;
    },
  },
});

export const actions = authSlice.actions;
export default authSlice.reducer;
