import { combineReducers } from "redux";
import dashboard from "./dashboardReducer";
import zone from "./zoneReducer";
import camera from "./cameraReducer";
import rules from "./rulesReducer";
import apiCallStatus from "./apiStatusReducer";
import workForce from "../../modals/workForceManagement";
import appData from "../../modals/app";
import users from "../../modals/userManagement";
import yard from "../../modals/YardManagement";
import roasters from "../../modals/roaster/roaster-service"

const rootReducer = combineReducers({
  dashboard,
  rules,
  zone,
  camera,
  apiCallStatus,
  workForce,
  appData,
  users,
  roasters,
  yard
});

export default rootReducer;
