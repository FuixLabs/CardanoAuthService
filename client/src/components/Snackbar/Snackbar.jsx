import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const SNACKBAR_ANCHOR = { vertical: "bottom", horizontal: "center" };

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomSnackbar(props) {
  const { visible, msg, hideTime, severity, hideNotification } = props;

  return (
    <Snackbar
      anchorOrigin={SNACKBAR_ANCHOR}
      open={visible}
      autoHideDuration={hideTime}
      onClose={() => hideNotification()}
    >
      <Alert severity={severity}>{msg}</Alert>
    </Snackbar>
  );
}
