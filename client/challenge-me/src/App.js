import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Challenge from './containers/Challenge/Challenge';
import Challenges from './components/Challenges/Challenges';
import ViewChallenge from './components/ViewChallenge/ViewChallenge';

import './App.css';

const app = () => (
  <HashRouter>
    <Layout>
      <Switch>
        <Route path="/" render={() => <h1>Home</h1>} exact />
        <Route path="/challenges/new-challenge" exact component={Challenge} />
        <Route path="/challenges" exact component={Challenges} />
        <Route path="/challenges/:challengeId" exact component={ViewChallenge} />
        <Route render={()=> <h1>Page Not Found!</h1>} />
        {/*<Redirect from="/" to="/posts" />*/}
      </Switch>
    </Layout>
  </HashRouter>
)

export default app;
