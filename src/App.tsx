import "./App.scss";

import React, { Component } from "react";
import { connect } from "react-redux";
import { HashRouter, Route, Switch } from "react-router-dom";

import Home from "./components/Home/Home";
import Auth from "./containers/Auth/Auth";
import LogOut from "./containers/Auth/LogOut";
import Challenge from "./containers/Challenge/Challenge";
import Challenges from "./containers/Challenges/Challenges";
import Layout from "./containers/Layout/Layout";
import ViewChallenge from "./containers/ViewChallenge/ViewChallenge";
import PrivateRoute from "./hoc/PrivateRoute";
import Activity from "./containers/Activity/Activity";
import Activities from "./containers/Activities/Activities";

interface AppProps {
  isAuthenticated: boolean;
}

class App extends Component<AppProps> {
  render() {
    return (
      <HashRouter>
        <Layout>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/auth" component={Auth} />
            <PrivateRoute path="/activities/new" exact component={Activity} isAuthenticated={this.props.isAuthenticated} />
            <PrivateRoute path="/activities" exact component={Activities} isAuthenticated={this.props.isAuthenticated} />
            <PrivateRoute path="/challenges/new" exact component={Challenge} isAuthenticated={this.props.isAuthenticated} />
            <PrivateRoute path="/challenges" exact component={Challenges} isAuthenticated={this.props.isAuthenticated} />
            <PrivateRoute path="/challenges/:challengeId" exact component={ViewChallenge} isAuthenticated={this.props.isAuthenticated} />
            <PrivateRoute path="/logout" exact component={LogOut} isAuthenticated={this.props.isAuthenticated} />
            <Route render={() => <h1>Page Not Found!</h1>} />
          </Switch>
        </Layout>
      </HashRouter>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.authenticated
});

export default connect(mapStateToProps)(App);
