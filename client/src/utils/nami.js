import { Buffer } from 'buffer';

export const connectWallet = async (currNamiWallet) => {
  if (!currNamiWallet) {
    return await window?.cardano?.nami?.enable();
  }
};

export const signLoginData = async (
  currNamiWallet,
  selectedAddress,
  randomNumber,
  timestamp
) => {
  if (currNamiWallet) {
    return await window.cardano.signData(
      selectedAddress,
      Buffer.from(
        JSON.stringify({
          randomNumber,
          timestamp,
        }),
        'utf8'
      ).toString('hex')
    );
  }
};

export const getUsedAddresses = async (currNamiWallet) => {
  return await currNamiWallet.getUsedAddresses().then((addresses) => {
    if (addresses.length > 0) {
      return addresses[0];
    }
  });
};

export const getNetworkId = async (currNamiWallet) => {
  const networkId = await currNamiWallet.getNetworkId().then((networkId) => {
    if (networkId === 1) {
      return 'Mainnet';
    } else if (networkId === 0) {
      return 'Testnet';
    }
  });
  return networkId;
};
