import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import {
  appFetchNotifications,
  appFetchZonesData,
} from "../../modals/app/thunk";

import Header from "../Header/Header";
import LeftNavigation from "../LeftNavigation/LeftNavigation";
// import  from "../Notifications/Notifications";
import Overlay from "../Overlay/Overlay";
import Dashboard from "../dashboard/dashboard";
import Assignment from "../assignment/assignment"
import Layout from "../layout/layout";
import Users from "../users/users";
import WorkerManager from "../workForce";
import UserManager from"../userManagement";
import YardManager from"../YardManagement";
import SidePanel from "../common/panel";
import Reports from "../reports/Reports"

import NotificationDescription from "../notification/notificationDescription/notificationDescription";
import { BodySection, MainSection, SubSections } from "./styles";
import { appSelectNotifications } from "../../modals/app/selectors";
import SidePanelNotifications from "../notification/sidePanelNotifications";
import NotificationBar from "../common/pushNotification";

function Container({ fetchNotifications, fetchZones }) {
  const [navOpen, setNavOpen] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(null);
  const notifications = useSelector((state) => state.appData.notifications);
  let interval = 0;

  useEffect(() => {
    fetchZones();
    interval = setInterval(() => {
      fetchNotifications();
    }, 5000);
  }, []);

  return (
    <MainSection>
      <Header
        onMenuClick={() => setNavOpen(navOpen === "" ? "open" : "")}
		onLogOut={() => localStorage.clear()}
        onNotificationsClick={() =>
          setNotificationsOpen(notificationsOpen === null ? "open" : null)
        }
        navOpen={navOpen}
       
      />
      <NotificationBar />
      <BodySection>
        <LeftNavigation navOpen={navOpen} />
        <SidePanel
          isPanelOpen={Boolean(notificationsOpen)}
          Heading={"Notifications"}
          closeAction={setNotificationsOpen}
        >
          <SidePanelNotifications notifications={notifications} />
        </SidePanel>
        <SubSections>
          <Route
            path="/dashboard"
            render={(props) => <Dashboard {...props} navOpen={navOpen} />}
          />
          <Route
            path="/add-zone"
            render={(props) => <Layout {...props} navOpen={navOpen} />}
          />
          <Route exact path="/users" component={Users} />
         
         

		  <Route exact path="/assignment" component={Assignment} />
          <Route exact path="/manage-user" component={UserManager} />
          <Route exact path="/manage-yard" component={YardManager} />
		  <Route exact path="/reports" component={Reports} />
        
          <Route
            exact
            path="/"
            render={(props) => <Redirect {...props} to="/dashboard" />}
          />
        </SubSections>
      </BodySection>
    </MainSection>
  );
}

const mapStateToProps = (state) => ({
  notifications: state.appData,
});

const mapDispatchToProps = {
  fetchNotifications: appFetchNotifications,
  fetchZones: appFetchZonesData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
