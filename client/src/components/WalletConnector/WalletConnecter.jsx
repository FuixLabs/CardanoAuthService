import React from "react";
import arrow from "../../asset/image/arrow-right-solid.svg";
import styles from "./style/walletConnector.st";

export default function WalletConnecter(props) {
  const { loginMethods, handleConnectNamiWallet } = props;

  const classes = styles();
  return (
    <>
      {loginMethods.map((item, index) => (
        <div
          onClick={item.available ? () => handleConnectNamiWallet() : null}
          key={index}
          className={item.available ? "connection" : `notAvailableMethod`}
        >
          <div className={classes.walletInfoContainer}>
            <object
              type="image/svg+xml"
              data={item.img}
              width="30"
              height="30"
              className={classes.walletLogo}
              aria-labelledby="wallet-connect"
            ></object>
            <span className="boldLabel">{item.name}</span>
          </div>

          {item.available && (
            <div className="hoverContainer">
              <div className="expandBtnWrapper">
                <object
                  type="image/svg+xml"
                  data={arrow}
                  width="20"
                  height="20"
                  aria-labelledby="wallet-logo"
                ></object>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
