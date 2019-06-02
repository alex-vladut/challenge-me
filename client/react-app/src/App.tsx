import './App.scss';

import React, { Component } from 'react';

import { HashRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Challenge from './containers/Challenge/Challenge';
import Challenges from './containers/Challenges/Challenges';
import ViewChallenge from './containers/ViewChallenge/ViewChallenge';

class App extends Component {

  render() {
    return (
      <HashRouter>
        <Layout>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/challenges/new" exact component={Challenge} />
            <Route path="/challenges" exact component={Challenges} />
            <Route path="/challenges/:challengeId" exact component={ViewChallenge} />
            <Route path="/auth" component={Auth} />
            <Route render={() => <h1>Page Not Found!</h1>} />
          </Switch>
        </Layout>
      </HashRouter>
    );
  }
}

export default App;
