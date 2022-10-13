import { combineReducers } from "redux";
import authReducer from "./auth";
import walletReducer from "./wallet";
import notiReducer from "./alert";

let rootReducer = combineReducers({
  authReducer: authReducer,
  walletReducer: walletReducer,
  alertReducer: notiReducer,
});

export default rootReducer;
