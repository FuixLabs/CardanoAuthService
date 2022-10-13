import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import fuixlabLogo from '../../asset/image/logo.svg';
import { LOGIN_METHOD } from './loginMethod.constant';
import styles from '../style/auth.st';
import WalletConnecter from '../../components/WalletConnector/WalletConnecter';
import {
  connectNamiWallet,
  getNamiNetworkId,
  getSelectedWalletAddress,
  requestLogin,
} from '../../redux/slices/wallet';
import { alertActions } from '../../redux/slices/alert';
import { getRandomNumber, getDappInfo } from '../../redux/slices/auth';
import CircularProgress from '@mui/material/CircularProgress';
import CustomSnackbar from '../../components/Snackbar/Snackbar';
import errorPage from '../../asset/image/404.svg';
import Redirect from '../../components/Redirect/Redirect'

function Auth() {
  const dispatch = useDispatch();

  const { namiWallet, selectedAddress } = useSelector(
    (state) => state.walletReducer
  );
  const { visible, msg, hideTime, severity } = useSelector(
    (state) => state.alertReducer
  );
  const {
    loading,
    accessToken,
    randomNumber,
    timestamp,
    dappName,
    returnUrl,
    url,
    logo,
    error,
    redirect
  } = useSelector((state) => state.authReducer);

  useEffect(() => {
    const dappKey = window.location.search.split('?app-key=')[1];
    dispatch(getDappInfo(dappKey));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //get all information of nami-wallet when nami-wallet change
  useEffect(() => {
    if (namiWallet) {
      handleGetNetworkID();
      handleGetSelectedNamiWallet();
      dispatch(getRandomNumber({}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [namiWallet]);

  useEffect(() => {
    if (selectedAddress && randomNumber) {
      dispatch(
        requestLogin({
          randomNumber: randomNumber,
          timestamp: timestamp,
          accessToken: accessToken,
          currNamiWallet: namiWallet,
          selectedAddress: selectedAddress,
          returnUrl: returnUrl,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAddress, randomNumber]);

  const handleHideNotification = () => {
    dispatch(alertActions.hideNotification());
  };

  const handleConnectNamiWallet = () => {
    dispatch(
      connectNamiWallet({
        currNamiWallet: namiWallet,
      })
    );
  };

  const handleGetSelectedNamiWallet = () => {
    dispatch(
      getSelectedWalletAddress({
        currNamiWallet: namiWallet,
      })
    );
  };

  const handleGetNetworkID = () => {
    dispatch(
      getNamiNetworkId({
        currNamiWallet: namiWallet,
      })
    );
  };

  const loadingScreen = () => (
    <div className={classes.blurBackground}>
      <CircularProgress />
    </div>
  );

  const errorScreen = () => (
    <>
      <div className={classes.errorContainer}>
        <div className={classes.errorInfoContainer}>
          <span className={classes.errorTitle}>Uh Oh!</span>
          <span className={classes.errorSubtitle}>Page not found ..</span>
          <span className={classes.errorContent}>
            Maybe the link is broken, or the page has been removed. Please check
            again
          </span>
        </div>
        <img alt='error' className={classes.errorImage} src={errorPage} />
        <div className={classes.footer}>
          <p className={classes.errorFooterLabel}>
            Copyright © 2022 fuixlabs.com
          </p>
        </div>
      </div>
    </>
  );

  const classes = styles();
  return (
    <>
      {loading ? (
        loadingScreen()
      ) : error ? (
        errorScreen()
      ) : (
        <div className={classes.container}>
          <div className={classes.logoContainer}>
            <img className={classes.logo} src={fuixlabLogo} alt='fuixlabs' />
          </div>
          <div className={classes.authForm}>
            <div className={classes.loginLabelContainer}>
              <img src={logo} className={classes.logoIcon} alt='dapp' />
              <span className='bold-label'>
                <span className='secondaryColor'>{dappName}</span> want to
                request your login
              </span>
            </div>
            <div className={classes.urlContainer}>
              <span className='bold-label secondary-color'>URL</span>
              <span className='secondary-fontSize'>{url}</span>
            </div>
            <div className={classes.connectContainer}>
              <div style={{ textAlign: 'flex-start', marginBottom: 5 }}>
                <span className='bold-label'>Login with</span>
                <br />
                <span className='subtitleColor'>
                  Please select a wallet connect
                </span>
              </div>
              <WalletConnecter
                handleConnectNamiWallet={handleConnectNamiWallet}
                loginMethods={LOGIN_METHOD}
              />
            </div>
          </div>
          <div className={classes.footer}>
            <p className={classes.footerLabel}>Copyright © 2022 fuixlabs.com</p>
          </div>
        </div>
      )}
      <CustomSnackbar
        msg={msg}
        hideTime={hideTime}
        severity={severity}
        visible={visible}
        hideNotification={handleHideNotification}
      />
      {redirect && <Redirect returnUrl={returnUrl} _accessToken = {accessToken} dappName = {dappName} />}
    </>
  );
}

export default Auth;
