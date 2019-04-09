import './App.css';

import Amplify from 'aws-amplify';
import { Authenticator, SignIn } from 'aws-amplify-react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';

import awsExports from './aws-exports';
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
import Challenge from './containers/Challenge/Challenge';
import Challenges from './containers/Challenges/Challenges';
import ViewChallenge from './containers/ViewChallenge/ViewChallenge';
import * as actions from './store/actions/actions';

Amplify.configure({
  ...awsExports,
  aws_appsync_authenticationType: "AWS_IAM",
});

class App extends Component {

  authStateChanged = async (authState) => {
    if (authState === 'signedIn') {
      this.props.fetchProfile();
    } else if (authState === 'signedOut') {
      this.props.signOut();
    }
  }

  render() {
    const federated = { google_client_id: '348450922576-hvs2fv955qfv4rjci73b7c3r944mkkdq.apps.googleusercontent.com' };

    return (
      <Authenticator
        onStateChange={this.authStateChanged}
        hideDefault={true} >
        <SignIn federated={federated} />
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
      </Authenticator>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  loading: state.loading,
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  fetchProfile: () => dispatch(actions.fetchProfile()),
  signOut: () => dispatch(actions.signOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
