import React from "react";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";

import Login from "../components/login/login";
import Container from "../components/Main/Main";
import PrivateRoute from "./PrivateRoute";
import help from "../components/help";
const AppRouter = () => {
  return (
    <BrowserRouter basename={"/"}>
      <Switch>
		<Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/tallycheckerhelp" component={help} />
        <PrivateRoute path="/" component={Container} />
        {/* <Route exact path="/select" component={Layout} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
