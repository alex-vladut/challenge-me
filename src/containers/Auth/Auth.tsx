import React, { FunctionComponent } from "react";

import Auth, { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { FacebookLoginButton, GoogleLoginButton, AmazonLoginButton } from "react-social-login-buttons";

import { State } from "../../store/reducers";

interface AuthProps {
  isAuthenticated: boolean;
}

const Authentication: FunctionComponent<AuthProps> = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  const signInWithFacebook = () => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook });
  const signInWithGoogle = () => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });
  const signInWithAmazon = () => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Amazon });

  return (
    <div>
      <FacebookLoginButton onClick={signInWithFacebook}>
        <span>Sign in with Facebook</span>
      </FacebookLoginButton>
      <GoogleLoginButton onClick={signInWithGoogle}>
        <span>Sign in with Google</span>
      </GoogleLoginButton>
      <AmazonLoginButton onClick={signInWithAmazon}>
        <span>Sign in with Amazon</span>
      </AmazonLoginButton>
    </div>
  );
};

const mapStateToProps = ({ auth }: State) => ({
  isAuthenticated: auth.authenticated
});

export default connect(mapStateToProps)(Authentication);
