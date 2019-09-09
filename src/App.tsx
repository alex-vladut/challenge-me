import "./App.scss";

import React, { useEffect, FunctionComponent } from "react";
import { connect } from "react-redux";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Hub } from "aws-amplify";
import { State } from "./store/reducers";
import { FetchProfile, SignOut } from "./store/actions/auth.actions";

import Home from "./components/Home/Home";
import Auth from "./containers/Auth/Auth";
import LogOut from "./containers/Auth/LogOut";
import Layout from "./containers/Layout/Layout";
import PrivateRoute from "./hoc/PrivateRoute";
import Activity from "./containers/Activity/Activity";
import Activities from "./containers/Activities/Activities";
import ViewActivity from "./containers/ViewActivity/ViewActivity";

interface AppProps {
  isAuthenticated: boolean;
  fetchProfile(): void;
  signOut(): void;
}

const App: FunctionComponent<AppProps> = ({ isAuthenticated, fetchProfile, signOut }) => {
  useEffect(
    () =>
      Hub.listen("auth", ({ payload }) => {
        switch (payload.event) {
          case "signIn":
            return fetchProfile();
          case "signOut":
            return signOut();
          default:
            return;
        }
      }),
    [fetchProfile, signOut]
  );

  return (
    <HashRouter>
      <Layout>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/auth" component={Auth} />
          <PrivateRoute path="/activities/new" exact component={Activity} isAuthenticated={isAuthenticated} />
          <PrivateRoute path="/activities/:activityId" exact component={ViewActivity} isAuthenticated={isAuthenticated} />
          <PrivateRoute path="/activities" exact component={Activities} isAuthenticated={isAuthenticated} />
          <PrivateRoute path="/logout" exact component={LogOut} isAuthenticated={isAuthenticated} />
          <Route render={() => <h1>Page Not Found!</h1>} />
        </Switch>
      </Layout>
    </HashRouter>
  );
};

const mapStateToProps = (state: State) => ({
  isAuthenticated: state.auth.authenticated
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchProfile: () => dispatch(FetchProfile.create()),
  signOut: () => dispatch(SignOut.create())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
