import './index.css';

import Amplify from 'aws-amplify';
import { Authenticator, FederatedSignIn } from 'aws-amplify-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import awsExports from './aws-exports';
import registerServiceWorker from './registerServiceWorker';
import * as actions from './store/actions/actions';
import reducer from './store/reducer';

Amplify.configure({
  ...awsExports,
  aws_appsync_authenticationType: "AWS_IAM",
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

const authStateChanged = async authState => {
  if (authState === 'signedIn') {
    store.dispatch(actions.fetchProfile());
  } else if (authState === 'signedOut') {
    store.dispatch(actions.signOut());
  }
}

const federated = { google_client_id: '348450922576-hvs2fv955qfv4rjci73b7c3r944mkkdq.apps.googleusercontent.com' };

ReactDOM.render((
  <Authenticator
    onStateChange={authStateChanged}
    hideDefault={true} >
    <FederatedSignIn federated={federated} />
    <Provider store={store}><App /></Provider>
  </Authenticator>), document.getElementById('root'));
registerServiceWorker();
