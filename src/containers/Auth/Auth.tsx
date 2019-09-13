import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Auth, { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { State } from "../../store/reducers";

interface AuthProps {
  isAuthenticated: boolean;
}

const Authentication: FunctionComponent<AuthProps> = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <button onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}>
        <p>Sign in with Google</p>
      </button>
      <button onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook })}>
        <p>Sign in with Facebook</p>
      </button>
    </div>
  );
};

const mapStateToProps = ({ auth }: State) => ({
  isAuthenticated: auth.authenticated
});

export default connect(mapStateToProps)(Authentication);
