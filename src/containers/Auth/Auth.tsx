import React, { FunctionComponent } from "react";

import Auth, { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { FacebookLoginButton, GoogleLoginButton, AmazonLoginButton } from "react-social-login-buttons";

import { State } from "../../store/reducers";
import { Typography } from "@material-ui/core";

interface AuthProps {
  isAuthenticated: boolean;
  location: any;
}

const Authentication: FunctionComponent<AuthProps> = ({ isAuthenticated, location }) => {
  const originalUrl = location.state && location.state.from;
  if (isAuthenticated) {
    return <Redirect to={originalUrl || "/activities"} />;
  }

  const signInWith = (provider: CognitoHostedUIIdentityProvider) => {
    localStorage.setItem("original_url", originalUrl);
    Auth.federatedSignIn({ provider });
  };

  const signInWithFacebook = () => signInWith(CognitoHostedUIIdentityProvider.Facebook);
  const signInWithGoogle = () => signInWith(CognitoHostedUIIdentityProvider.Google);
  const signInWithAmazon = () => signInWith(CognitoHostedUIIdentityProvider.Amazon);

  return (
    <div>
      {!!originalUrl ? (
        <Typography variant="h6">
          Please log in first in order to be able to access the page you are looking for.
        </Typography>
      ) : null}
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
