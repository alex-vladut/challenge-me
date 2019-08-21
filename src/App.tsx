import "./App.scss";

import React, { Component } from "react";
import { connect } from "react-redux";
import { HashRouter, Route, Switch } from "react-router-dom";

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
            <PrivateRoute path="/activities/:activityId" exact component={ViewActivity} isAuthenticated={this.props.isAuthenticated} />
            <PrivateRoute path="/activities" exact component={Activities} isAuthenticated={this.props.isAuthenticated} />
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
