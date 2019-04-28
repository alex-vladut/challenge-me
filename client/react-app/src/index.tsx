import './index.scss';

import Amplify from 'aws-amplify';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import App from './App';
import awsExports from './aws-exports';
import registerServiceWorker from './registerServiceWorker';
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
const store = createStore(reducer, composeEnhancers(applyMiddleware(epicMiddleware)));
epicMiddleware.run(rootEpic);

ReactDOM.render((<Provider store={store}><App /></Provider>), document.getElementById('root'));
registerServiceWorker();
