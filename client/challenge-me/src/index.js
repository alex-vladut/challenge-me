import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import AppWithAuth from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './store/reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
const federated = {
    google_client_id: '348450922576-ndqrghsmiguadj32uehn4f9f5kjkoja1.apps.googleusercontent.com'
}
ReactDOM.render(<Provider store={store}><AppWithAuth federated={federated} /></Provider>, document.getElementById('root'));
registerServiceWorker();
