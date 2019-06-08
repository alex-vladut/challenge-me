import React, { Component } from 'react';
// @ts-ignore
import { Authenticator, FederatedSignIn } from 'aws-amplify-react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { FetchProfile, SignOut } from '../../store/actions/auth.actions';

const federated = { google_client_id: '348450922576-hvs2fv955qfv4rjci73b7c3r944mkkdq.apps.googleusercontent.com' };
interface AuthProps {
  isAuthenticated: boolean;
  fetchProfile(): void;
  signOut(): void;
}

class Auth extends Component<AuthProps> {

  authStateChanged = (authState: string) => {
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
    if (this.props.isAuthenticated) {
      return <Redirect to="/challenges" />
    }
    return (
      <Authenticator
        onStateChange={this.authStateChanged}
        hideDefault={true} >
        <FederatedSignIn federated={federated} />
      </Authenticator>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.authenticated,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchProfile: () => dispatch(FetchProfile.create()),
  signOut: () => dispatch(SignOut.create()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
