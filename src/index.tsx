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
import awsExports from "./aws-exports";
import registerServiceWorker from "./registerServiceWorker";
import { rootEpic } from "./store/epics";
import reducer from "./store/reducers";

Amplify.configure({
  ...awsExports,
  aws_appsync_authenticationType: "AWS_IAM"
});

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
