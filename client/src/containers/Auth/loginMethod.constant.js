import NamiWallet from "../../asset/image/nami-wallet.svg";
import TrezorWallet from "../../asset/image/trezor-wallet.svg";
import YoroiWallet from "../../asset/image/yoroi-wallet.svg";

export const LOGIN_METHOD = [
  {
    name: "Nami Wallet",
    img: NamiWallet,
    available: true,
  },
  {
    name: "Trezor",
    img: TrezorWallet,
    available: false,
  },
  {
    name: "Yoroi Wallet",
    img: YoroiWallet,
    available: false,
  },
];
