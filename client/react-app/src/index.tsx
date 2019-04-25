import './index.scss';

import Amplify from 'aws-amplify';
// @ts-ignore
import { Authenticator, FederatedSignIn } from 'aws-amplify-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';

import App from './App';
import awsExports from './aws-exports';
import registerServiceWorker from './registerServiceWorker';
import * as actions from './store/actions/actions';
import { rootEpic } from './store/epics';
import reducer from './store/reducer';

Amplify.configure({
  ...awsExports,
  aws_appsync_authenticationType: "AWS_IAM",
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware();
const store = createStore(reducer, composeEnhancers(applyMiddleware(epicMiddleware, thunk)));
epicMiddleware.run(rootEpic);

const authStateChanged = async (authState: string) => {
  switch (authState) {
    case 'signedIn':
      store.dispatch(actions.fetchProfile());
      return;
    case 'signedOut':
      store.dispatch(actions.signOut());
      return;
    default:
      return;
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
