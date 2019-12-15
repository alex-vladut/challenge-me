import "./index.scss";

import Amplify from "aws-amplify";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";

import Notifications from "./hoc/Notifications";
import App from "./App";
import config from "./aws-exports";
import registerServiceWorker from "./registerServiceWorker";
import { rootEpic } from "./store/epics";
import reducer from "./store/reducers";

const urlsIn = config.oauth.redirectSignIn.split(",");
const urlsOut = config.oauth.redirectSignOut.split(",");
const oauth = {
  domain: config.oauth.domain,
  scope: config.oauth.scope,
  redirectSignIn: config.oauth.redirectSignIn,
  redirectSignOut: config.oauth.redirectSignOut,
  responseType: config.oauth.responseType
};
const hasLocalhost = (hostname: string) =>
  Boolean(hostname.match(/localhost/) || hostname.match(/127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/));
const hasHostname = (hostname: string) => Boolean(hostname.includes(window.location.hostname));
const isLocalhost = hasLocalhost(window.location.hostname);
if (isLocalhost) {
  urlsIn.forEach(e => {
    if (hasLocalhost(e)) {
      oauth.redirectSignIn = e;
    }
  });
  urlsOut.forEach(e => {
    if (hasLocalhost(e)) {
      oauth.redirectSignOut = e;
    }
  });
} else {
  urlsIn.forEach(e => {
    if (hasHostname(e)) {
      oauth.redirectSignIn = e;
    }
  });
  urlsOut.forEach(e => {
    if (hasHostname(e)) {
      oauth.redirectSignOut = e;
    }
  });
}
Amplify.configure({ ...config, oauth });

const epicMiddleware = createEpicMiddleware();
const store = createStore(reducer, composeWithDevTools(applyMiddleware(epicMiddleware)));
epicMiddleware.run(rootEpic);

ReactDOM.render(
  <Provider store={store}>
    <Notifications>
      <App />
    </Notifications>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
