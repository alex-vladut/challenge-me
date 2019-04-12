import './App.css';

import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
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
            <Route path="/challenges/new-challenge" exact component={Challenge} />
            <Route path="/challenges" exact component={Challenges} />
            <Route path="/challenges/:challengeId" exact component={ViewChallenge} />
            <Route render={() => <h1>Page Not Found!</h1>} />
            {/*<Redirect from="/" to="/posts" />*/}
          </Switch>
        </Layout>
      </HashRouter>
    )
  }
}

export default App;
