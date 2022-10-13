import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  container: {
    height: "fit-content",
    position: "fixed",
    transform: "translate(-50%, -50%)",
    left: "50%",
    top: "50%",
    width: 450,
    [theme.breakpoints.down("md")]: {
      width: "90%",
      fontSize: 10,
    },
  },
  errorInfoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  errorTitle: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: "center",
    lineHeight: 1.2,
    color: theme.palette.textColor.error,
    [theme.breakpoints.down("md")]: {
      fontSize: 30,
    },
  },
  errorSubtitle: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: 600,
    lineHeight: 1.5,
    color: theme.palette.textColor.error,
    [theme.breakpoints.down("md")]: {
      fontSize: 15,
    },
  },
  errorContent: {
    fontSize: 13,
    textAlign: "center",
    fontWeight: 400,
    lineHeight: 2,
    color: theme.palette.textColor.error,
    [theme.breakpoints.down("md")]: {
      fontSize: 8,
    },
  },
  errorContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100vw",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 14,
    backgroundColor: '#BCDBCC',
    [theme.breakpoints.down("sm")]: {
      fontSize: 10,
    },
  },
  errorImage: {
    height: "60%",
    width: "90%", 
    marginTop: '-12%',
    [theme.breakpoints.down("sm")]: {
      marginTop: -150,
    },
  },
  connectContainer: {
    height: "75%",
    boxSizing: "border-box",
    display: "flex",
    paddingTop: 30,
    alignItems: "flex-start",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      paddingTop: 12,
    },
  },
  urlContainer: {
    height: "15%",
    borderRadius: 4,
    backgroundColor: "#F2F4F5",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    padding: "20px 0px",
    [theme.breakpoints.down("md")]: {
      padding: "10px 0px",
    },
  },
  logoContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    height: 50,
    alignItems: "flex-start",
    marginBottom: 40,
  },
  logo: {
    height: "fit-content",
    width: "20%",
  },
  authForm: {
    height: "75%",
    boxShadow: `${theme.palette.boxShadowColor.primary} 0px 3px 8px`,
    borderRadius: 8,
    padding: 30,
  },
  errorForn: {
    height: "75%",
    boxShadow: `${theme.palette.boxShadowColor.primary} 0px 3px 8px`,
    borderRadius: 8,
    padding: 30,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footer: {
    marginTop: 27,
    textAlign: "center",
  },
  loginLabelContainer: {
    height: "10%",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
  },
  errorFooterLabel: {
    fontWeight: "bold",
    color: theme.palette.textColor.error,
    marginTop: 40,
    [theme.breakpoints.down("sm")]: {
      marginTop: -100,
    },
  },
  footerLabel: {
    fontWeight: "bold",
    color: "#1D1D1D",
    opacity: "65%",
  },
  logoIcon: {
    height: 30,
    width: 30,
    marginRight: 8,
  },
  expandBtn: {
    display: "none",
  },
  subtitleColor: {
    color: theme.palette.textColor.primary,
    opacity: "65%",
  },
  blurBackground: {
    position: "absolute",
    top: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    width: "100%",
    height: "100%",
    zIndex: 1001,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default styles;
