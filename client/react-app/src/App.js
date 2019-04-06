import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Challenge from './containers/Challenge/Challenge';
import Challenges from './containers/Challenges/Challenges';
import ViewChallenge from './containers/ViewChallenge/ViewChallenge';
import Home from './components/Home/Home';

import './App.css';

import Amplify from 'aws-amplify';
import awsExports from './aws-exports';

Amplify.configure({
  API: {
    endpoints: [
      {
        name: "ChallengeMeAPI",
        endpoint: 'https://pmx92v7jw6.execute-api.eu-central-1.amazonaws.com/production',
        region: 'eu-central-1'
      }
    ]
  },
  ...awsExports,
  aws_appsync_authenticationType: "AWS_IAM"
});
// Amplify.configure({
  // Added User and Identity Pools to Amplify directly
  // Auth: {
  //   region: 'eu-central-1',
  //   identityPoolId: 'eu-central-1:9417e06d-8f42-413c-9f9c-55b0f495039e'
  // },

// })

const app = () => (
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

export default app;
