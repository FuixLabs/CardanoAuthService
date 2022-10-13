import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: 400,
    backgroundColor: 'white',
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
    alignItems: "center",
    justifyContent: 'center',
    boxShadow: `${theme.palette.boxShadowColor.primary} 0px 3px 8px`,
    borderRadius: 8,
    fontSize: 14,
    padding: '20px 0px',
    [theme.breakpoints.down("md")]: {
      width: "90%",
      height: 'auto',
    },
  },
  blurBackground: {
    position: "absolute",
    top: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    width: "100%",
    height: "100%",
    zIndex: 1001,
  },
  redirectTxt: {
    fontWeight: 'bold',
    fontSize: 26,
  },
  countTxt: {
    fontSize: 14,
    lineHeight: 3
  },
  redirectBtn: {
    color: theme.palette.textColor.primary,
    fontWeight: 'bold',
    cursor: 'pointer'
  }
}));

export default styles;
