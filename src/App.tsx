import "./App.scss";

import React, { useEffect, FunctionComponent } from "react";
import { connect } from "react-redux";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { Hub, Auth } from "aws-amplify";
import { State } from "./store/reducers";
import { Fetch } from "./store/actions/auth.actions";

import Home from "./components/Home/Home";
import Authentication from "./containers/Auth/Auth";
import LogOut from "./containers/Auth/LogOut";
import Layout from "./containers/Layout/Layout";
import PrivateRoute from "./hoc/PrivateRoute";
import CreateActivity from "./containers/CreateActivity/CreateActivity";
import Activities from "./containers/Activities/Activities";
import ViewActivity from "./containers/ViewActivity/ViewActivity";
import Profile from "./containers/Profile/Profile";
import ViewProfile from "./containers/ViewProfile/ViewProfile";
import ContactUs from "./containers/ContactUs/ContactUs";

interface AppProps {
  isAuthenticated: boolean;
  fetchProfile(): void;
}

const App: FunctionComponent<AppProps> = ({ isAuthenticated, fetchProfile }) => {
  if (!isAuthenticated) {
    Auth.currentAuthenticatedUser()
      .then(() => fetchProfile())
      .catch(() => {});
  }

  useEffect(
    () =>
      Hub.listen("auth", ({ payload }) => {
        if (payload.event === "signIn") {
          fetchProfile();
        }
      }),
    [fetchProfile]
  );

  return (
    <HashRouter>
      <Layout>
        <Switch>
          <Route path="/" component={isAuthenticated ? Activities : Home} exact />
          <Route path="/auth" component={Authentication} />
          <PrivateRoute path="/activities/new" exact component={CreateActivity} isAuthenticated={isAuthenticated} />
          <PrivateRoute
            path="/activities/:activityId"
            exact
            component={ViewActivity}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute path="/activities" exact component={Activities} isAuthenticated={isAuthenticated} />
          <PrivateRoute path="/profiles/:profileId" exact component={ViewProfile} isAuthenticated={isAuthenticated} />
          <PrivateRoute path="/profile" exact component={Profile} isAuthenticated={isAuthenticated} />
          <PrivateRoute path="/contact-us" exact component={ContactUs} isAuthenticated={isAuthenticated} />
          <PrivateRoute path="/logout" exact component={LogOut} isAuthenticated={isAuthenticated} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Layout>
    </HashRouter>
  );
};

const mapStateToProps = (state: State) => ({
  isAuthenticated: state.auth.authenticated
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchProfile: () => dispatch(Fetch.create())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
