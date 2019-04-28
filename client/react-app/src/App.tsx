import './App.scss';

import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import * as actions from './store/actions/actions';
import { connect } from 'react-redux';
// @ts-ignore
import { Authenticator, FederatedSignIn } from 'aws-amplify-react';
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
import Challenge from './containers/Challenge/Challenge';
import Challenges from './containers/Challenges/Challenges';
import ViewChallenge from './containers/ViewChallenge/ViewChallenge';

interface AppProps {
  fetchProfile(): void
  signOut(): void
}

interface AppState { }

class App extends Component<AppProps, AppState> {

  authStateChanged = (authState: string) => {
    console.log(authState);
    switch (authState) {
      case 'signedIn':
        this.props.fetchProfile();
        return;
      case 'signedOut':
        this.props.signOut();
        return;
      default:
        return;
    }
  }

  render() {
    const federated = { google_client_id: '348450922576-hvs2fv955qfv4rjci73b7c3r944mkkdq.apps.googleusercontent.com' };
    return (
      <Authenticator
        onStateChange={this.authStateChanged}
        hideDefault={true} >
        <FederatedSignIn federated={federated} />
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
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => ({
  fetchProfile: () => dispatch(actions.fetchProfile()),
  signOut: () => dispatch(actions.signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
