import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import styles from "./style";

const REDIRECT_IN = 5;

export default function Redirect({ returnUrl, _accessToken, dappName }) {
  const [count, setCount] = useState(REDIRECT_IN);
  const theme = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [count]);

  const handleRedirect = () => {
    window.location.replace(`${returnUrl}?access_token=${_accessToken}`);
  };

  const redirectButton = () => (
    <Button
      variant="outlined"
      onClick={() => handleRedirect()}
      sx={{
        fontSize: 11,
        color: theme.palette.textColor.primary,
        borderColor: theme.palette.textColor.primary,
        ":hover": {
          color: theme.palette.textColor.secondary
        },
      }}
    >
      OR REDIRECT NOW
    </Button>
  );

  const classes = styles();
  return (
    <div className={classes.blurBackground}>
      <div className={classes.container}>
        <span className={classes.redirectTxt}>Login successfully!</span>
        <p className={classes.countTxt}>
          We will redirect to {dappName} after {count}s
        </p>
        {redirectButton()}
      </div>
    </div>
  );
}
