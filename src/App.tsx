import React, { useEffect, FunctionComponent, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { Hub, Auth } from "aws-amplify";
import { State } from "./store/reducers";
import { Fetch } from "./store/actions/auth.actions";
import Layout from "./containers/Layout/Layout";
import Home from "./components/Home/Home";
import PrivateRoute from "./hoc/PrivateRoute";

import "./App.scss";

const Activities = lazy(() => import("./containers/Activities/Activities"));
const Authentication = lazy(() => import("./containers/Auth/Auth"));
const LogOut = lazy(() => import("./containers/Auth/LogOut"));
const CreateActivity = lazy(() => import("./containers/CreateActivity/CreateActivity"));
const ViewActivity = lazy(() => import("./containers/ViewActivity/ViewActivity"));
const Profile = lazy(() => import("./containers/Profile/Profile"));
const ViewProfile = lazy(() => import("./containers/ViewProfile/ViewProfile"));
const ContactUs = lazy(() => import("./containers/ContactUs/ContactUs"));
const Notifications = lazy(() => import("./containers/Notifications/Notifications"));
const Conversations = lazy(() => import("./containers/chat/Conversations/Conversations"));
const Conversation = lazy(() => import("./containers/chat/Conversation/Conversation"));

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
      Hub.listen("auth", ({ payload: { event } }) => {
        if (event === "signIn") {
          fetchProfile();
        }
      }),
    [fetchProfile]
  );

  return (
    <Suspense fallback={<h1>loading...</h1>}>
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
            <PrivateRoute path="/notifications" exact component={Notifications} isAuthenticated={isAuthenticated} />
            <Route path="/conversations/:id" exact component={Conversation} />
            <Route path="/conversations" exact component={Conversations} />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </Layout>
      </HashRouter>
    </Suspense>
  );
};

const mapStateToProps = (state: State) => ({
  isAuthenticated: state.auth.authenticated
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchProfile: () => dispatch(Fetch.create())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
